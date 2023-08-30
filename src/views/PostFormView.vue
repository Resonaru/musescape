<template>
    <v-navigation-drawer location="right" style="background-color: black;" :width="450">
          <SongInfoCard :songID="songId"/>
    </v-navigation-drawer>

    <v-main>
      <v-container class="d-flex justify-center align-center fill-height">
        <PostForm @postCreated="handlePostCreated" />
      </v-container>
    </v-main>
  </template>
  
  <script>
  import PostForm from '@/components/PostForm.vue'; // Adjust the import path as needed
  import SongInfoCard from '../components/SongInfoCard.vue';
  
  export default {
    components: {
      PostForm,
      SongInfoCard
    },
    data() {
      return {
        songId: null
      }
    },
    methods: {
      handlePostCreated() {
        // Handle post creation and any necessary navigation
        this.$router.push('/'); // Redirect to the main view after creating a post
      },
    },
    created() {
      this.songId = this.$route.params.id
    }
  };
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  