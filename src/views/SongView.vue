<template>
      <!-- Right side (Song Card) -->
      <!-- <v-navigation-drawer location="right" style="background-color: black;" :width="325"> -->
        <v-row>
          <v-col-12>
            <template v-if="loading">
            Loading song...
          
            </template>
            <template v-else>
              <v-card cover class="song-card rounded-xl">
                <v-img class="align-content-center rounded-xl" :src="songData.img" alt="Album Cover"></v-img>
                <div class="song-details">
                  <h1 class="song-title">{{ songData.title }}</h1>
                  <h2 class="song-artist">{{ songData.artist.name }}</h2>
                  <h2>ID: {{ id }}</h2>
                </div>
              </v-card>
            </template>
          </v-col-12>
          <v-col-12>
          <h1>Discussions</h1>
              <template v-if="noPosts">
                No posts yet
              </template>
              <template v-else>

                <template v-for="post in posts">
                  <v-card color="#5A5252" theme="dark">
                    <v-card-title>{{ post.title }}</v-card-title>
                  <v-card-text>{{ post.content }}</v-card-text>
                  </v-card>
                </template>
              </template>
          </v-col-12>
        </v-row>





      <!-- </v-navigation-drawer> -->

      <!-- Center side (Discussions) -->
      

</template>

<script>

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

  props: ['id'], // Access the song ID from the route parameter
  data() {
    return {
      songData: null,
      posts: [],
      loading: true, // Loading screen renderred
      noPosts: null
    };
  },

  async created() {
      try {
        console.log(`Attempting to fetch song with id '${this.id}''`);
        const songDocRef = doc(db, "songs", this.id);
        const docSnap = await getDoc(songDocRef);
        const song = docSnap.data();

        if (docSnap.exists()) {
          
          this.songData = {
            title: song.title,
            img: song.img
          }
          console.log(`Successfully fetched song ${this.songData.title}`)

          console.log("Now fetching artist...");
          const artist = (await getDoc(song.artist)).data() // get artist object from firestore from reference
          console.log(`Successfully fetched artist ${artist.name}`)
          this.songData.artist = {
            name: artist.name,
            img: artist.img
          }
          console.log("Fetching discussions")
          song.posts.forEach(async postReference => {
            try {
              const postObject = (await getDoc(postReference)).data();
              console.log(postObject)
              this.posts.push({
              title: postObject.title,
              author: (await getDoc(postObject.author)).data().username,
              content: postObject.content
            })
            } catch(e) {
              this.noPosts = true;
            }
          })
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

  }
};
</script>

<style>

.song-img {
  
}
.song-title {
  color: #FFFFFF
}
.song-artist {
  color: #959090
}

.song-card {

  background-color: #423A42;
}
</style>
