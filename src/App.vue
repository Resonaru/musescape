<script setup>
import Sidebar from './components/Sidebar.vue'
import Feed from './components/Feed.vue'

</script>

<template>
  <v-container>
    <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Musescape"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <Sidebar/>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <Feed/>
    </v-main>
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
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
