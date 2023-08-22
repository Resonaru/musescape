<script setup>
import Feed from '../components/Feed.vue'
</script>

<template>
    <v-navigation-drawer location="right" style="background-color: aliceblue;">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
        <h1>bottom text</h1>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Profile page
    </v-main>
    
</template>
