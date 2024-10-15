<template>
  <v-card class="post">
    <div class="text" style="color:rgb(245, 245, 245)">
    <h1> {{ commentData.title }}</h1> 
      <v-avatar style="float:left" color="surface-variant" :image="commentData.author.avatarURL"></v-avatar>
        <span style="float:left">{{ commentData.author.username }}</span>
        <span style="float:right">Likes: {{ commentData.likes }}</span><br/> 
    <!-- <template v-if="isReply">
        <div>
          <p>Replying to {{ parentComment.author }}</p>
        </div>
    </template> -->
    <br/>
    <!-- displays html ver of content -->
    <v-card-text v-html="commentData.content"></v-card-text>
    <!-- Display parent comment if this is a reply -->
    <!-- Button to toggle commentForm visibility -->
    <!-- <v-btn color="primary" @click="reply(commentData.author.username)">
        Reply
    </v-btn> -->
      <v-btn color="error" @click="showDeleteDialogue = !showDeleteDialogue">
        Delete
    </v-btn>
    <!-- Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialogue" max-width="500">
    <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>
            Are you sure you want to delete this comment?
        </v-card-text>
        <v-card-actions>
        <v-btn text @click="showDeleteDialogue = false">Cancel</v-btn>
        <v-btn text color="error" @click="deleteComment">Delete</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
    </div>
  </v-card>
</template>

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
        name: 'Comment',
        data() {
            return {
                // showCommentForm:false,
                showDeleteDialogue:false,
                // isReply:false,
                // parentComment: {
                //     id:null,
                //     author:null,
                // },
                // isReplyProp:false,
            }
        },
        props: {
          commentData: Object,
          id: String,
        },
        components: {
          // CommentForm,
        },
        methods: {
          async deleteComment() {
              try {
              const commentReference = doc(db, "comments", this.id);
              const commentDocRef = await getDoc(commentReference);
              const postDocRef = commentDocRef.data().post;
              const commentRef = commentDocRef.ref;

              // Update the post document to remove the comment reference
              await updateDoc(postDocRef, {
                  comments: arrayRemove(commentRef),
              });

              // Delete the comment document
              await deleteDoc(commentRef);
              console.log("comment deleted successfully");
              this.$emit('commentDeleted');
              } catch (error) {
              console.error("Error deleting comment:", error);
              }
          },
        //   async fetchParentComment() {
        //     // console.log("fetching ", this.commentData.isReply, " ", this.commentData.replyTo)
        //     if (this.commentData.isReply && this.commentData.replyTo) {
        //       try {
        //         // console.log(this.commentData.replyTo.id)
        //         const parentCommentReference = doc(db, "comments", this.commentData.replyTo.id);
        //         const parentCommentDoc = await getDoc(parentCommentReference);
        //         const parentCommentData = parentCommentDoc.data();
        //         const parentAuthorDoc = await getDoc(parentCommentData.author);
          
        //         this.parentComment.id = parentCommentReference.id;
        //         this.parentComment.author = parentAuthorDoc.data().username;
        //         this.isReply = true;
        //         } 
        //       catch (error) {
        //         console.error("Error fetching parent comment:", error);
        //       }
        //     }
        //     else {
        //         // console.log("This comment has no parent")
        //     }
        //   },
        //   toggleReplying() {
        //     console.log(this.isReplyProp)
        //     if (this.isReplyProp)
        //         this.$emit('cancelReply')
        //     else {
        //         const replyInfo = {
        //             isReply: true,
        //             parentCommentId: this.commentData.id,
        //         };
        //         this.$emit('replyToComment', replyInfo);
        //     }
        //     this.scrollToCommentForm();
        //   },
        //   async handleReplyToComment() {
            
            
        //     console.log(replyInfo)
            
        //   },
        //   scrollToCommentForm() {
        //     const formPos = document.getElementById('comment-form')
        //     const rect = formPos.getBoundingClientRect();
        //     const offsetY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
        //     window.scrollTo({top: offsetY, behavior : 'smooth'})            
        //   },
        //   reply(username) {
        //     console.log("attempting reply")
        //     this.$emit('reply', username)
        //   },
        },
        created() {
        //   this.fetchParentComment();
        }
    };
</script>

<style scoped>
.post {
  vertical-align: text-top;
  /* width: 800px; */
  margin: 5px;
  border-radius: 25px;
  background-color: #282733;
}

.text {
  padding: 15px;
}
</style>