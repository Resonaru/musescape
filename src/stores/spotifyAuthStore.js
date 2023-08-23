import { defineStore } from 'pinia';

export const useSpotifyAuthStore = defineStore('spotifyAuth', {
//   id: 'spotifyAuth',
  state: () => ({
    token: "",
  }),
  actions: {
    async getSpotifyToken() {
      if (this.token) {
        return;
      }
      const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

      const authOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      };

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
        if (response.ok) {
          const data = await response.json();
          this.token = data.access_token;
          console.log(JSON.stringify(this.token));
        } else {
          console.error('Failed to get access token');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
});
