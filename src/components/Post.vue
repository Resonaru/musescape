<script>
    import { db } from '@/firebase';
    import {
    // collection,
    doc,
    // addDoc,
    // setDoc,
    getDoc,
    // getDocs,
    // query,
    // where,
    deleteDoc,
    updateDoc,
    arrayRemove,
    } from 'firebase/firestore'
    export default {
        name: 'Post',
        data() {
            return {
              showDeleteDialogue: false,
            }
        },
        props: {
          postData: Object,
          id: String,
        },
        components: {
          // CommentForm,
        },
        methods: {
          async deletePost() {
              try {
              console.log("trying to delete post")
              const postReference = doc(db, "posts", this.id);
              const postDocRef = await getDoc(postReference);
              const songDocRef = postDocRef.data().song;
              const postRef = postDocRef.ref;

              // Update the song document to remove the post reference
              await updateDoc(songDocRef, {
                  posts: arrayRemove(postRef),
              });

              // Delete the post document
              await deleteDoc(postRef);
              console.log("Post deleted successfully");

              // Redirect back to the song page with a deletion confirmation
              this.deletedTrue(songDocRef);
              } catch (error) {
              console.error("Error deleting post:", error);
              }
          },  
          deletedTrue(songDocRef) {
              console.log("attempting to route")
              this.$router.push({ name: 'song', params: { id: songDocRef.id }, query: { deleted: true } });
          }
        }
    };
</script>

<!-- // this is useless currently -->
<template>
  <v-card class="post">
    <div class="text" style="color:rgb(245, 245, 245)">
    <h1> {{ postData.title }}</h1> 
    <p>
        <span style="float:left">by {{ postData.author.username }}</span>
        <span style="float:right">Likes: {{ postData.likes }}</span>
    </p> <br/> <br/>
    <!-- displays content -->
    <p v-html="postData.content"></p>
    <!-- Button to toggle PostForm visibility -->
    <v-btn color="error" @click="showDeleteDialogue = !showDeleteDialogue">
        Delete
    </v-btn>
    <!-- Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialogue" max-width="500">
    <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>
            Are you sure you want to delete this post?
        </v-card-text>
        <v-card-actions>
        <v-btn text @click="showDeleteDialogue = false">Cancel</v-btn>
        <v-btn text color="error" @click="deletePost">Delete</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
    </div>
  </v-card>
</template>

<style scoped>
.post {
  vertical-align: text-top;
  width: 800px;
  min-height: 300px;
  margin: 5px;
  border-radius: 25px;
  background-color: #423a42;
}

.text {
  padding: 15px;
}
</style>