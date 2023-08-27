<template>
    <v-main>
      <v-container class="d-flex justify-center align-center fill-height">
        <PostForm @postCreated="handlePostCreated" />
      </v-container>
    </v-main>
  </template>
  
  <script>
  import PostForm from '@/components/PostForm.vue'; // Adjust the import path as needed
  
  export default {
    components: {
      PostForm,
    },
    methods: {
      handlePostCreated() {
        // Handle post creation and any necessary navigation
        this.$router.push('/'); // Redirect to the main view after creating a post
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  