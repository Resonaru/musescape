import { defineStore } from "pinia";

export const useSpotifyAuthStore = defineStore("genius", {
  state: () => ({
    token: "",
  }),
  actions: {
    async getGeniusToken() {
      if (this.token) {
        return;
      }
      this.token =
        "WcJRyCUrOwW7NH_d57_M9rhMVG6qwp6iKxNVnqsM-TbaUCzPGcvFonBdWovq7v_f";
      // const client_id = import.meta.env.VITE_GENIUS_CLIENT_ID;
      // const client_secret = import.meta.env.VITE_GENIUS_CLIENT_SECRET;

      // const authOptions = {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: 'grant_type=client_credentials',
      // };

      // try {
      //   const response = await fetch(`https://api.genius.com/oauth/authorize?client_id=${client_id}&redirect_uri=${musescape-89f0a.web.app/callback}&scope=REQUESTED_SCOPE&state=SOME_STATE_VALUE&response_type=token`);
      //   if (response.ok) {
      //     const data = await response.json();
      //     this.token = data.access_token;
      //     console.log(JSON.stringify(this.token));
      //   } else {
      //     console.error('Failed to get access token');
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      // }
    },
    async getLyricsByID(title, artist) {
      if (!this.token) {
        console.log("fetching token");
        await this.getGeniusToken(); // Call the action to get the token
        // this.token = this.token; // Access the token from the store
      }
      console.log(`running getLyricsByID: ${id}`);
      try {
        const searchQuery = `${title}%20${artist}`;
        const response = await fetch(
          `https://api.genius.com/search?q=${searchQuery}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(`data: ${data}`)
          const searchResults = {
            // lyrics:
          };
          // console.log(`results: ${searchResults.title}`);
          return searchResults;
        } else {
          console.error("getSongByID Failed to get access token ");
          throw error;
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
  },
});
