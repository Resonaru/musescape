<template>
    <div class="song-view">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <template v-if="songData">
            <v-img width="600" :src="songData.img" alt="Album Cover"></v-img>
          </template>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <template v-if="songData">
                <h1 class="song-title">{{ songData.title }}</h1>
                <h2 class="song-artist">{{ songData.artist.name }}</h2>
                <h2>ID: {{ id }}</h2>
              </template>
              <template v-else>
                <h1>Loading song data...</h1>
              </template>
            </v-col>
            <v-col cols="12">
              <v-card class="lyrics">
                <v-card-title>
                  <h2 class="lyrics-title">Lyrics</h2>
                </v-card-title>
                <v-card-text>
                  <!-- Collapsible lyrics section content -->
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-card class="discussions">
            <v-card-title>
              <h2 class="discussions-title">Discussions</h2>
            </v-card-title>
            <v-card-text>
              <!-- List of discussion previews -->
              <!-- <v-list>
                <v-list-item v-for="discussion in discussions" :key="discussion.id">
                  <v-list-item-title class="discussion-title">{{ discussion.title }}</v-list-item-title>
                  <v-list-item-subtitle class="discussion-summary">{{ discussion.summary }}</v-list-item-subtitle>
                </v-list-item>
              </v-list> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
      songData: null, // Loading screen rendered
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
          const docSnap2 = await getDoc(song.artist) // get artist object from firestore from reference
          const artist = docSnap2.data();
          console.log(`Successfully fetched artist ${artist.name}`)
          this.songData.artist = {
            name: artist.name,
            img: artist.img
          }
  


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
/* Add your CSS for song page styling */
</style>