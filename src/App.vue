<script>
import Sidebar from './components/Sidebar.vue'
import Feed from './components/Feed.vue'
import Search from './components/Search.vue'
import { RouterLink, RouterView } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import your Firebase auth instance
import { useSpotifyAuthStore } from './stores/spotifyAuthStore'
import { mapStores } from 'pinia';

// Inside your main app component

export default{
  computed: {
    ...mapStores(useSpotifyAuthStore), 
  },
  async created() { 
    // await this.spotifyAuthStore.getSongByID('7fEI29hmaWcCMPi8VJf33C');
  },
  components: {
    Sidebar,
    Search

  }
}


</script>

<template>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
  <v-container>
    <v-layout class="rounded rounded-md">
    <v-app-bar app color="rgb(16,16,16)">
      <v-app-bar-nav-icon icon="mdi-music" style="color: green">
        <RouterLink to="/"></RouterLink>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="mx-auto" style="color: hsla(160, 100%, 37%, 1);;">Musescape</v-toolbar-title>
      <div class="mx-auto">
        <v-sheet class="d-flex">
          <div>
            <Search style="width: 300px;" />
          </div>
        </v-sheet>

      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
      
    <v-navigation-drawer location="left" :width="300">
      <v-list>
        <Sidebar/>
      </v-list>
    </v-navigation-drawer>


    <RouterView/>



  </v-layout>
</v-container>

  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: middle;
    margin-left: -1rem;
    font-size: 1rem;
    background-color: rgb(16, 16, 16);
    /* padding: 1rem 0; */
    margin-top: 1rem;
  }
}
</style>
