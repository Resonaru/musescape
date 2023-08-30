<template>
    <v-main class="post-form-view align-center d-flex flex-start" style="--v-layout-left:0px; --v-layout-top:2px">
      <!-- <v-container fluid fill-height> -->
        <div class="post-form-container align-center" style="width:90%">
          <h3>Add a Comment</h3>
          <!-- <template v-if="replyingState">
            <div>
              <p>Replying to {{ parentCommentId }}</p>
              <v-btn @click="cancelReply">Cancel</v-btn>
            </div>
          </template> -->
          <v-form class="textbox" @submit.prevent="submitComment">
            <v-textarea class="text-box" 
              v-model="commentContent" 
              label="Content" 
              required
            />
            <v-btn class="submit" type="submit" color="primary">Submit</v-btn>
          </v-form>
        </div>
      <!-- </v-container> -->
    </v-main>
  </template>
  
  <style scoped>
  .post-form-view {
    vertical-align: text-top;
    margin: 5px;
    border-radius: 25px;
    background-color: #423a42;
    max-height: 200px;
  }
  
  .post-form-container {
    /* width: 100%; */
    /* max-width: 600px; */
    margin:2rem;
    /* vertical-align: top; */
    /* text-align: top; */
    /* height:100px; */
  }
  .textbox {
    height:10rem;
  }
  .text-box {
    vertical-align: top;
    height:7rem;
  }
  .submit {
    align-content: right;
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
        // replyingState: false,
      };
    },
    computed:{
      ...mapStores(useAuthStore)
    },
    components: {
      Comment,
    },
    props: {
      // isReply : Boolean,
      // parentCommentId : String,
    },
    created() {
      // Retrieve the post ID from the route parameter
      this.postId = this.$route.params.id;
      // this.replyingState = this.isReply;
      console.log(this.postId)
    },
    methods: {
      async submitComment() {
        try {
            // get the post its associated to
            const postDocRef = doc(db, 'posts', this.postId);
            // const postReference = await(getDoc(postDocRef));
            // const postObject = postReference.data();
            // var numComments = 0;
            // if (postObject.comments) {
            //   numComments = postObject.comments.length;
            // }
            // FIXME: Get the currently logged-in user's data
            const userDocRef = doc(db, 'users', this.authStore.username);
          if (userDocRef) {
            const commentsCollection = collection(db, 'comments');
            const comment = {
              content: this.commentContent.replace(/\n/g, '<br>'),
              author: userDocRef,
              likes: 0,
              // index: numComments,
              // isReply: this.replyingState,
              post: postDocRef,
            }
            // if (comment.replyingState) {
            //   const commentDocRef = doc(db, 'comments', this.parentCommentId);
            //   comment.replyTo = commentDocRef;
            // }

            const newCommentRef = await addDoc(commentsCollection, comment);
            console.log(newCommentRef);
  
            // Update the post's 'posts' field with the reference to the new post
            await updateDoc(postDocRef, {
              comments: arrayUnion(newCommentRef),
            });
  
            // Clear the form
            // this.$nextTick(() => {
            this.$emit('commentAdded');
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
      // cancelReply() {
      //   console.log("cancelling")
      //   this.replyingState = false;
      // },
    },
  };
  </script>
  