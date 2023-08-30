<template>
    <v-main class="post-form-view">
      <!-- <v-container fluid fill-height> -->
        <div class="post-form-container">
          <h2 class="text-center">Create a New Post</h2>
          <v-form @submit.prevent="submitPost">
            <v-text-field v-model="postTitle" label="Title" required></v-text-field>
            <v-textarea v-model="postContent" label="Content" required></v-textarea>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-form>
        </div>
      <!-- </v-container> -->
    </v-main>
  </template>
  
  <style scoped>
  .post-form-view {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  .post-form-container {
    width: 100%;
    max-width: 600px;
    min-width:500px;
  }
  </style>
  
  <script>
  import { db } from '@/firebase';
  import { addDoc, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
  import { mapStores } from 'pinia';
  import { useAuthStore } from '../stores/authStore.js';  
  
  export default {
    data() {
      return {
        postTitle: '',
        postContent: '',
        songId: null, // Store the song ID
      };
    },
    computed:{
      ...mapStores(useAuthStore)
    },
    created() {
      // Retrieve the song ID from the route parameter
      this.songId = this.$route.params.id;
      console.log(this.songId)
    },
    methods: {
      async submitPost() {
        try {
            // get the song its associated to
            const songDocRef = doc(db, 'songs', this.songId);

          // Get the currently logged-in user's data
            const userDocRef = doc(db, 'users', this.authStore.username);

          if (userDocRef) {
            const postsCollection = collection(db, 'posts');
            const newPostRef = await addDoc(postsCollection, {
              title: this.postTitle,
            //   converts all newlines to breaks
              content: this.postContent.replace(/\n/g, '<br>'),
              author: userDocRef,
              likes: 0,
              song: songDocRef,
            });
            console.log(newPostRef);
  
            // Update the song's 'posts' field with the reference to the new post
            await updateDoc(songDocRef, {
              posts: arrayUnion(newPostRef),
            });
  
            // Clear the form
            // this.$nextTick(() => {
              this.postTitle = '';
              this.postContent = '';
            // });
  
            console.log('Post submitted successfully');
            this.postCreated(newPostRef)
          } else {
            console.error('User is not logged in');
          }
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      },
      postCreated(newPostRef) {
        console.log("attempting to route")
        this.$router.push({ name: 'post', params: { id: newPostRef.id }});
      },
    },
  };
  </script>
  