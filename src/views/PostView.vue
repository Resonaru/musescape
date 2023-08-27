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
            <v-card class="post">
                <div class="text" style="color:rgb(245, 245, 245)">
                <h1> {{ postData.title }}</h1> 
                <p>
                    <span style="float:left">by {{ postData.author.username }}</span>
                    <span style="float:right">Likes: {{ postData.likes }}</span>
                </p> <br/> <br/>
                <p>{{ postData.content }}</p>
                <!-- Button to toggle PostForm visibility -->
                <v-btn color="primary" @click="showPostForm = !showPostForm">
                    Reply
                </v-btn>
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
                <!-- Post Creation Component -->
                <v-row v-if="showPostForm">
                    <v-col cols="12">
                    <PostForm />
                    </v-col>
                </v-row>
            </v-card>
        </template>
    </v-main>
</template>

<script>
import Post from '../components/Post.vue'
import PostForm from '../components/PostForm.vue'
import { db } from '@/firebase';
import {
collection,
doc,
addDoc,
setDoc,
getDoc,
getDocs,
query,
where,
deleteDoc,
updateDoc,
arrayRemove,
} from 'firebase/firestore'

export default {
    components: {
        Post,
        PostForm,
    },
    props: ['id'], // Access the post ID from the route parameter
    data() {
        return {
            postData: null,
            songTitle: null,
            songId: null,
            comments: [],
            loading: true, // Loading screen renderred
            noComments: null,
            showPostForm:false,
            showDeleteDialogue:false,
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
            // console.log(author)
            // console.log(song)
            this.songTitle = this.postData.song.title
            this.songId = this.postData.song.ID
            // console.log(this.songTitle)
            // console.log(this.songId)

            // console.log("Now fetching author...");
            // const author = (await getDoc(post.author)).data() // get author object from firestore from reference
            // console.log(`Successfully fetched author ${author.username}`)
            // this.postData.author = {
            // name: author.username,
            // }
            // console.log("Fetching discussions")
            // song.posts.forEach(async postReference => {
            // try {
            //     const postObject = (await getDoc(postReference)).data();
            //     console.log(postObject)
            //     this.posts.push({
            //     title: postObject.title,
            //     author: (await getDoc(postObject.author)).data().username,
            //     content: postObject.content
            // })
            // } catch(e) {
            //     this.noPosts = true;
            // }
            // })
            this.loading = false;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        } catch(e) {
            console.error('Something went wrong bruh')
        }
    },
    methods: {
    async deletePost() {
        try {
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
    },
};
</script>

<style>
.post {
    vertical-align: text-top;
    width:800px;
    min-height: 300px;
    margin:5px;
    border-radius: 25px;
    background-color: #423A42;
}

.text {
    padding: 15px;
    
}

.back {
    padding-bottom: 10px;
}
</style>
