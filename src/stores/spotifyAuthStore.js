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
    async getSongByID(id) {
      if (!this.token) {
        console.log('fetching token');
        await this.getSpotifyToken(); // Call the action to get the token
        this.token = this.token; // Access the token from the store
      }
      
      console.log(`running getSongByID: ${id}`);
    
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${id}`,
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }
        );
    
        if (response.ok) {
          const data = await response.json();
    
          const artistsPromises = data.artists.map(async (artist) => {
            try {
              const artistResponse = await fetch(
                `https://api.spotify.com/v1/artists/${artist.id}`,
                {
                  headers: {
                    Authorization: 'Bearer ' + this.token,
                  },
                }
              );
    
              const artistData = await artistResponse.json();
              const artistResult = {
                name: artistData.name,
                img: artistData.images.length > 0 ? artistData.images[0].url : '',
                link: `/'artist'/${artistData.id}`,
                ID: artistData.id,
              };
              return artistResult;
            } catch (error) {
              console.error('artists ForEach breaking', error);
              throw error;
            }
          });
    
          const artistsData = await Promise.all(artistsPromises);
    
          const searchResults = {
            title: data.name,
            img: data.album.images.length > 0 ? data.album.images[0].url : '',
            ID: data.id,
            artists: artistsData,
            link: `/'song'/${data.id}`,
            genres: data.genres,
          };
    
          return searchResults;
        } else {
          console.error('getSongByID Failed to get access token ');
          throw error;
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    },
    async getLyrics(songTitle, artistName){
      console.log(`getLyrics(${songTitle}, ${artistName})`)
      try {
        let apiKey = import.meta.env.VITE_MUSIXMATCH_API_KEY;
        const response = await fetch(
          `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_artist=${artistName}&q_track=${songTitle}&apikey=${apiKey}`
        );
        if(response.ok){
          const data = await response.json();
          console.log("lyrics");
          console.log(data);
          const searchResults = {
            lyrics: data.message.body.lyrics.lyrics_body,
            scriptTracking: data.message.body.lyrics.script_tracking_url,
            copyright: `<script type="text/javascript" src="${data.message.body.lyrics.lyrics_copyright}">`,
          };
          searchResults.lyrics = searchResults.lyrics .replace(/(?:\r\n|\r|\n)/g, '<br>');
          return searchResults;
        }
      } catch (error){
        console.error('GetLyrics broke', error);
        throw error;
      }
    }
  },
});
