<script>
  import { mapStores } from 'pinia'
  import { useSpotifyStore } from '../stores/spotifyAuthStore.js' 
  export default {
    computed: {
      ...mapStores(useSpotifyStore),
    },

  }
</script>


<template>

  
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search songs"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
</template>