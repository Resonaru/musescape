<!-- Search.vue -->
<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      @input="getSearchQuery"
      placeholder="Search..."
    />
    <SearchResultsDropdown v-if="showDropdown" :results="searchResults" />
  </div>
</template>

<script>
import SearchResultsItem from './SearchResultsItem.vue';
import SearchResultsDropdown from './SearchResultsDropdown.vue';
import { mapStores } from 'pinia';
import { useSpotifyAuthStore } from '../stores/spotifyAuthStore.js';

export default {
  components: {
    SearchResultsItem,
    SearchResultsDropdown,
  },
  computed: {
    ...mapStores(useSpotifyAuthStore), 
    // {
    //   token: 'token', // Access the token property from the store
    //   getSpotifyToken: 'getSpotifyToken', // Access the action from the store
    // }),
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showDropdown: true,
      token : ""
    };
  },
  methods: {
    async getSearchQuery() {
      console.log('getSearchQuery')
      // console.log(this.spotifyAuthStore);
      // console.log(this.token);
      if (!this.token) {
        console.log('fetching token')
        await this.spotifyAuthStore.getSpotifyToken(); // Call the action to get the token
        this.token = this.spotifyAuthStore.token; // Access the token from the store
      }
      if (this.searchQuery && this.token) {
        try {
          console.log('token ' + this.token)
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${this.searchQuery}&type=track&limit=3`, 
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
          console.log(this.searchResults[0].name);
        } catch (error) {
          console.error('Error fetching data from API:', error);
        }
      } else {
        this.searchResults = [];
      }
    },
  },

};
</script>
