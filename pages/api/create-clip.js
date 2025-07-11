export default async function handler(req, res) {
    const { token, broadcasterId } = req.body;

    const response = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}`, {
        method: 'POST',
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    const clip = data.data?.[0];

    if (clip) res.status(200).json({ url: `https://clips.twitch.tv/${clip.id}` });
    else res.status(500).json({ error: 'Clip creation failed', raw: data });
}
