// import React from 'react';

// export default function Login() {
//     const handleLogin = () => {
//         const clientId = process.env.TWITCH_CLIENT_ID;
//         if (!clientId) {
//             console.error('TWITCH_CLIENT_ID is not defined in environment variables.');
//             return;
//         }
//         const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback');
//         const scopes = 'clips:edit user:read:email';

//         const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;

//         window.location.href = twitchAuthUrl;
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f3f3f3' }}>
//             <h1 style={{ fontSize: '2rem', color: '#6441a5', marginBottom: '1rem' }}>Login with Twitch</h1>
//             <button
//                 onClick={handleLogin}
//                 style={{ padding: '0.5rem 1rem', fontSize: '1rem', color: '#fff', backgroundColor: '#6441a5', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//                 Login
//             </button>
//         </div>
//     );
// }


export default function Login() {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
        const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI);
        const scopes = 'clips:edit user:read:email';

        window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: 100 }}>
            <h1>TwitchRadar 🎯</h1>
            <button onClick={handleLogin}>Login with Twitch</button>
        </div>
    );
}
