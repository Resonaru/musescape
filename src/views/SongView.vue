<template>
    <div class="song-view">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-img src="https://i.scdn.co/image/ab67616d0000b2735bc0a615145b2e32f8a2d677" alt="Album Cover"></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <template v-if="songData">
                <h1 class="song-title">{{ songData.title }}</h1>
                <h2 class="song-artist">YOASOBI</h2>
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
      songData: null, // Initialize with null or an empty object
    };
  },

  async created() {
      try {
        console.log(`Attempting to fetch song ${this.id}`);
        const docRef = doc(db, "songs", "ycaBLqkvQ412TEzrVJnO");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          
          this.songData = {
            title: docSnap.data().title,
            img: docSnap.data().img
          }
          console.log(`Successfully fetched song ${this.songData.title}`)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch(e) {

      }
    },

  methods: {
        }
};
</script>

<style>
/* Add your CSS for song page styling */
</style>