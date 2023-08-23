<template>
    <v-main>
        <template v-if="loading">
          Loading...
        </template>
        <template v-else>
            <v-card class="post">
                <div class="text" style="color:rgb(245, 245, 245)">
                <h1> {{ postData.title }}</h1> 
                <p>
                    <span style="float:left">by {{ postData.author.username }}</span>
                    <span style="float:right">Likes: {{ postData.likes }}</span>
                </p> <br/> <br/>
                <p>{{ postData.content }}</p>
                </div>
            </v-card>
        </template>
    </v-main>
</template>

<script>
import Post from '../components/Post.vue'
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
} from 'firebase/firestore'

export default {
    components: {
        Post
    },
    props: ['id'], // Access the post ID from the route parameter
    data() {
        return {
            postData: null,
            comments: [],
            loading: true, // Loading screen renderred
            noComments: null
        };
    },

    async created() {
        try {
        console.log(`Attempting to fetch post with id '${this.id}'`);
        const postReference = doc(db, "posts", this.id)
        const postRefDoc = (await getDoc(postReference));
        const post = postRefDoc.data()
        const author = (await getDoc(post.author)).data()
        if (postRefDoc.exists()) {
            this.postData = {
                title: post.title,
                content: post.content,
                author: author,
                likes: post.likes,
            }
            console.log(`Successfully fetched post ${this.postData.title}`)

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
    }
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
</style>
