<template>
    <v-main class="post-form-view">
      <!-- <v-container fluid fill-height> -->
        <div class="post-form-container">
          <h1>Comment</h1>
          <v-form @submit.prevent="submitComment">
            <v-textarea v-model="commentContent" label="Content" required></v-textarea>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-form>
        </div>
      <!-- </v-container> -->
    </v-main>
  </template>
  
  <style scoped>
  .post-form-view {
    vertical-align: text-top;
    width: 800px;
    min-height: 300px;
    margin: 5px;
    border-radius: 25px;
    background-color: #423a42;
  }
  
  .post-form-container {
    width: 100%;
    max-width: 600px;
    margin:0 auto;
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
        commentContent: '',
        postId: null, // Store the post ID
      };
    },
    computed:{
      ...mapStores(useAuthStore)
    },
    created() {
      // Retrieve the post ID from the route parameter
      this.postId = this.$route.params.id;
      console.log(this.postId)
    },
    methods: {
      async submitComment() {
        try {
            // get the post its associated to
            const postDocRef = doc(db, 'posts', this.postId);
          // Get the currently logged-in user's data
          const userDocRef = doc(db, 'users', this.username);
          if (userDocRef) {
            const commentsCollection = collection(db, 'comments');
            const newCommentRef = await addDoc(commentsCollection, {
              content: this.commentContent,
              author: userDocRef,
              likes: 0,
              isReply: false,
              post: postDocRef,
            });
            console.log(newCommentRef);
  
            // Update the post's 'posts' field with the reference to the new post
            await updateDoc(postDocRef, {
              comments: arrayUnion(newCommentRef),
            });
  
            // Clear the form
            // this.$nextTick(() => {
              this.commentContent = '';
            // });
  
            console.log('Comment submitted successfully');
          } else {
            console.error('User is not logged in');
          }
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      },
    },
  };
  </script>
  