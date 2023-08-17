<script>
export default {
    data() {
        return {
            token: ""
        };
    },
    methods: {
        async getAccessToken() {
            if (this.token) {
                return;
            }
            var client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            var client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
            
            var authOptions = {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            };
            
            try {
                const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
                if (response.ok) {
                    const data = await response.json();
                    this.token = data.access_token;
                    localStorage.setItem("authToken", JSON.stringify(this.token));
                    console.log(JSON.stringify(this.token));
                } else {
                    console.error('Failed to get access token');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}
</script>

<template>
    <div>
        <v-btn variant="outlined" @click="getAccessToken">Get Access Token</v-btn>
        <br>
        Access Token: {{ token }}
    </div>
</template>
