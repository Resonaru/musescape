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
    async getSongByID(id){  
      if (!this.token) {
        console.log('fetching token')
        await this.getSpotifyToken(); // Call the action to get the token
        this.token = this.token; // Access the token from the store
      }
      console.log(`getSongByID: ${id}`)
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${id}`, 
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            }
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(`data: ${data}`)
          const searchResults = {
            title: data.name,
            img: data.album.images.length > 0 ? data.album.images[0].url : '',
            // img: data.album.images[0].url,
            id: data.id,
            artists: data.artists.map((item) => ({
                name: item.name,
                img: item.images.length > 0 ? item.images[0].url : '',
                link: `/'artist'/${item.id}`,
                id: item.id
            })),
            link: `/'song'/${data.id}`,
            genres: data.genres,
          };
          console.log(`results: ${searchResults.title}`);
        return searchResults;
        } else {
          console.error('getSongByID Failed to get access token ');
          throw(error);
        }
      } catch (error) {
        console.error('Error:', error);
        throw(error);
      }
    }
  },
});
