<template>
    <v-main>
        <template v-if="loading">
          Loading...
        </template>
        <template v-else>
            <RouterLink :to="'/song/' + songId">
            <v-row class="back">
                <h2>Return to {{ songTitle }}</h2>
            </v-row>
            </RouterLink>
            <Post :postData="postData" :id="this.id"/>
            <CommentForm 
                id="comment-form" 
                :isReply="isReply"
                :parentCommentId="parentCommentId"
                @commentAdded="fetchComments()"/>
            <!-- Display comments -->
            <Comment v-for="comment in comments" 
                :id="comment.id" 
                :commentData="comment" 
                @commentDeleted="fetchComments(); showDeletedMessage = true"
                @scrollToCommentForm="scrollToCommentForm"
                @replyToComment="handleReplyToComment"
            />
        </template>
    </v-main>
    <!-- If comment has been deleted -->
    <v-dialog v-model="showDeletedMessage" max-width="500">
    <v-card>
      <v-card-title class="headline">Comment Deleted</v-card-title>
      <v-card-text>
        The comment has been deleted successfully.
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="showDeletedMessage = false">Close</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
import Post from '../components/Post.vue'
import CommentForm from '../components/CommentForm.vue';
import Comment from '../components/Comment.vue';
import { db } from '@/firebase';
import {
// collection,
doc,
// addDoc,
// setDoc,
getDoc,
getDocs,
// getDocs,
// query,
// where,
// deleteDoc,
// updateDoc,
// arrayRemove,
} from 'firebase/firestore'

export default {
    components: {
        Post,
        CommentForm,
        Comment,
    },
    props: ['id'], // Access the post ID from the route parameter
    data() {
        return {
            songTitle: null,
            songId: null,
            comments: [],
            loading: true, // Loading screen renderred
            noComments: null,
            showDeletedMessage: false,
            // for replies
            isReply: false,
            parentCommentId: null,
        };
    },

    async created() {
        try {
        console.log(`Attempting to fetch post with id '${this.id}'`);
        const postReference = doc(db, "posts", this.id)
        const postRefDoc = (await getDoc(postReference));
    
        if (postRefDoc.exists()) {
            const post = postRefDoc.data()
            const author = (await getDoc(post.author)).data()
            const song = (await getDoc(post.song)).data()
            this.postData = {
                title: post.title,
                content: post.content,
                author: author,
                likes: post.likes,
                song: song,
            }
            console.log(`Successfully fetched post ${this.postData.title}`)
            this.songTitle = this.postData.song.title
            this.songId = this.postData.song.ID
            this.loading = false;

            await this.fetchComments();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        } catch(e) {
            console.error('Something went wrong bruh')
        }
    },
    methods: {
        async fetchComments() {
            this.comments = []; // Clear the comments array before fetching
            // Fetch comments and update this.comments array
            const postReference = doc(db, "posts", this.id)
            const postRefDoc = (await getDoc(postReference));
            const post = postRefDoc.data();
            console.log("querying comments...")
            if (post.comments && post.comments.length) {
                post.comments.forEach(async commentReference => {
                    try {
                        const commentObject = (await getDoc(commentReference)).data()
                        const author = (await getDoc(commentObject.author)).data()
                        console.log(commentObject)
                        this.comments.push({
                            id: commentReference.id,
                            author: author,
                            content: commentObject.content,
                            likes: commentObject.likes,
                            post: this.id,
                            // index: commentObject.index,
                            isReply: commentObject.isReply,
                            replyTo: commentObject.replyTo,
                        })
                    } catch(e) {
                        console.log("error fetching comments")
                    }
                });
                
                // this.comments.sort((a, b) => a.index - b.index)
            }
            else console.log("No comments found")
        },
        handleReplyToComment(replyInfo) {
            this.isReply=replyInfo.isReply;
            this.parentCommentId = replyInfo.parentCommentId;
        },
        scrollToCommentForm(commentId) {
            // Use $refs to scroll to the comment form
            if (this.$refs.commentForm) {
                const commentFormElement = this.$refs.commentForm.$el;
                const targetCommentElement = document.getElementById(commentId);
                
                if (targetCommentElement) {
                targetCommentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
    },
};
</script>

<style>
.text {
    padding: 15px;
    
}

.back {
    padding-bottom: 10px;
}

.highlight {
  animation: highlightEffect 0.5s ease;
}

@keyframes highlightEffect {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: white; /* Set the desired highlight color */
  }
  100% {
    background-color: transparent;
  }
}
</style>
