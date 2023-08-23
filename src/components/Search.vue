<!-- Search.vue -->
<template>
  <div class="bg-black">
    <v-autocomplete
      v-model="select"
      v-model:search="search"
      :loading="loading"
      :items="searchResults"
      class="mx-4"
      density="comfortable"
      hide-no-data
      hide-details
      chips
      closable-chips
      label="Search songs"
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.img"
          :text="item.raw.name"
        ></v-chip>
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item?.raw.img"
          :title="item?.raw.name"
          :subtitle="item?.raw.artist"
          :href="item?.raw.link"
        ></v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useSpotifyAuthStore } from '../stores/spotifyAuthStore.js';

export default {
  computed: {
    ...mapStores(useSpotifyAuthStore), 
    // {
    //   token: 'token', // Access the token property from the store
    //   getSpotifyToken: 'getSpotifyToken', // Access the action from the store
    // }),
  },
  data() {
    return {
      loading: false,
      search: null,
      select: null,
      searchResults: [],
      showDropdown: true,
      token : ""
    };
  },
  watch: {
    search(val){
      val && val !== this.select && this.getSearchQuery(val)
    }
  },
  methods: {
    async getSearchQuery(userInput) {
      this.loading = true;
      console.log('getSearchQuery')
      // console.log(this.spotifyAuthStore);
      // console.log(this.token);
      if (!this.token) {
        console.log('fetching token')
        await this.spotifyAuthStore.getSpotifyToken(); // Call the action to get the token
        this.token = this.spotifyAuthStore.token; // Access the token from the store
      }
      if (userInput && this.token) {
            try {
            console.log('token ' + this.token)
            const response = await fetch(
              `https://api.spotify.com/v1/search?q=${userInput}&type=track&limit=3`, 
              {
                headers: {
                  Authorization: 'Bearer ' + this.token,
                }
              }
            );
            const data = await response.json();
            // Assuming the structure of the API response and items
            this.searchResults = data.tracks.items.map(track => ({
              name: track.name,
              img: track.album.images.length > 0 ? track.album.images[0].url : '',
              type: track.type,
              id: track.id,
              link:`/${track.type === 'track' ? 'song' : 'artist'}/${track.id}`,
            }));
            console.log('Song name: ' + this.searchResults[0].name);
            console.log(this.searchResults[0])
          } catch (error) {
            console.error('Error fetching data from API:', error);
          }
          this.loading = false;
      } else {
        this.searchResults = [];
      }
    },
  },

};
</script>
