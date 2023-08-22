<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      @input="handleSearchInput"
      placeholder="Search..."
    />
    <SearchResultsDropdown v-if="showDropdown" :results="searchResults" />
  </div>
</template>

<script>
import SearchResultsItem from './SearchResultsItem.vue';
import SearchResultsDropdown from './SearchResultsDropdown.vue';
import { useSpotifyStore } from '../stores/spotifyAuthStore';

export default {
  components: {
    SearchResultsItem,
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    async getSearchQuery() {
      if (this.searchQuery) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${this.searchQuery}&type=track`, 
            {
              headers: {
                Authorization: 'Bearer ' + useSpotifyStore.token,
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
            link: '/'+ `${this.type === track ? 'song' : 'artist'}  '/track${this.id}`,
          }));
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

<style>
/* Add your custom styles here */
</style>
