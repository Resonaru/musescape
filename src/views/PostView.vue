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
            <CommentForm />
        </template>
    </v-main>
</template>

<script>
import Post from '../components/Post.vue'
import CommentForm from '../components/CommentForm.vue';
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
// deleteDoc,
// updateDoc,
// arrayRemove,
} from 'firebase/firestore'

export default {
    components: {
        Post,
        CommentForm,
    },
    props: ['id'], // Access the post ID from the route parameter
    data() {
        return {
            songTitle: null,
            songId: null,
            comments: [],
            loading: true, // Loading screen renderred
            noComments: null,
            // showCommentForm: false,
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
    
    },
};
</script>

<style>
/* .post {
    vertical-align: text-top;
    width:800px;
    min-height: 300px;
    margin:5px;
    border-radius: 25px;
    background-color: #423A42;
} */

.text {
    padding: 15px;
    
}

.back {
    padding-bottom: 10px;
}
</style>
