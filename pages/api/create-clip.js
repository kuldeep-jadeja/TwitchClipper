import Clip from '../../models/Clip';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
    const { token, broadcasterId, streamerName } = req.body;

    if (!token || !broadcasterId || !streamerName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Step 1: Create clip via Twitch API
    const twitchResponse = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}`, {
        method: 'POST',
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
        },
    });

    const twitchData = await twitchResponse.json();
    const clip = twitchData.data?.[0];

    if (!clip) {
        return res.status(500).json({ error: 'Failed to create clip', raw: twitchData });
    }

    // Step 2: Save to MongoDB
    try {
        await connectToDatabase();

        const newClip = await Clip.create({
            clipId: clip.id,
            url: `https://clips.twitch.tv/${clip.id}`,
            streamerName,
            streamerId: broadcasterId,
        });

        return res.status(200).json({ url: newClip.url, id: newClip._id });
    } catch (err) {
        console.error('❌ MongoDB error:', err);
        return res.status(500).json({ error: 'Failed to save clip to database' });
    }
}
