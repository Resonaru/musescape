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
              <h1 class="song-title">Idol</h1>
              <h2 class="song-artist">YOASOBI</h2>
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
  created() {
    // Fetch song data using the ID from Firestore
    // Update this.songData with the fetched data
  },
  methods: {
    querySong() {
      console.log("querying current song")
    }
        }
};
</script>

<style>
/* Add your CSS for song page styling */
</style>