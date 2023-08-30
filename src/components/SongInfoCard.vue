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
import { useSpotifyAuthStore } from '../stores/spotifyAuthStore'
import { mapStores } from 'pinia';

export default {
    props: {
        songID: String
    },
    computed: {
    ...mapStores(useSpotifyAuthStore), 
  },
    data() {
        return {
            songData: null, // Song being shown on the page
            loading: true,
        }
    },
    async created() {
      try {
        console.log(`Attempting to fetch song with id '${this.songID}'`);
        const songDocRef = doc(db, "songs", this.songID);
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
          this.loading = false;

          console.log(this.songData.artist);
        } 
        // komays part
        else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!\nBuilding a new page for this song...");
          try {
            // Fetch data 
            const newSong = await this.spotifyAuthStore.getSongByID(this.songID);// query spotify
            console.log("Got response from spotify")
            await console.log(newSong);
            // Add new Song AND artist (if artist is not stored yet) to firestore

            // Artist
            console.log("trying artists[0]")
            console.log(newSong.artists[0])
            const artist = await getDoc(doc(db, "artists", newSong.artists[0].ID))
            let artistRef;
            console.log("artist: ", newSong.artists[0])
            if(!artist.exists()) {
              // Create new artist doc if none exists yet
              console.log(`No artist found in db, creating document for ${newSong.artists[0].name}`)

              artistRef = await addDoc(collection(db, "artists"), {
                name: newSong.artists[0].name,
                img: newSong.artists[0].img,
              })
            } else {
              // Use existing artist doc if already in our database
              artistRef = await doc(db, "artists", newSong.artists[0].ID)
              console.log(`Artist ${newSong.artists[0]} already exists in db, using that.`)
            }

            console.log("New song:", newSong);
            const docRef = await setDoc(doc(db, "songs", newSong.ID), {
              title: newSong.title,
              artist: artistRef,
              img: newSong.img,
              ID: newSong.ID
            });
            console.log("Document written with ID: ", newSong.ID);
            console.log(`${newSong.title} saved to db!`)


            // Update the component data so no reload required
            this.songData = {
              title: newSong.title,
              img: newSong.img,
              artist: {
                name: newSong.artists[0].name,
                img: newSong.artists[0].img
              }
            }
            this.loading = false;

          } catch (error) {
            // Display error screen
            console.error("Error fetching the song:", error);
  }
        }
      } catch(e) {
        console.error('Something went wrong bruh', e)
      }
    }
}


</script>


<template>
     <v-container class="fill-height d-flex align-center justify-center">
           <template v-if="loading">
            <!-- <v-skeleton-loader
            class="mx-auto"
            elevation="12"
            max-width="400"
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader> -->
           <h1 style="color:aliceblue">Loading song...</h1>
            </template>
            <template v-else>
              <v-card cover class="song-card rounded-xl justify-center" min-height="500" width="350">
                <br><br>
                <v-img class="rounded-xl mx-auto" :src="songData.img" alt="Album Cover" :width="250"></v-img>

                <v-card-title class="text-center" style="color: aliceblue">{{ songData.title }}</v-card-title>
                <v-card-subtitle class="text-center song-artist">{{ songData.artist.name }}</v-card-subtitle>
                <v-card-text style="color: aliceblue">
                  I hate the silence now that you're not here<br>
                  I thought one day you'd come around<br>
                  Am I living in the past with all these questions never asked?<br>
                  Will they keep me here?<br>
                  It's so quiet in the stratosphere<br>
                  I keep my space but I'm still bound<br>
                  To the spell that we both cast but sometimes magic doesn't last<br>
                  For me it did, for me it did<br>
                  <br>
                  I played out this scene<br>
                  Of you with each other<br>
                  But not that with me<br>
                  And that kind of love<br>
                  Is so hard to see<br>
                  Now here we are<br>
                  It's him that you need<br>
                  Looks just like us<br>
                  Us without me<br>
                  <br>
                  Why do I fade into that heart of yours?<br>
                  'Cause you still hold a spot in mine<br>
                  But you're in someone else's room<br>
                  While mine still smells of your perfume<br>
                  I'm tethered<br>
                  Forever<br>
                  <br>
                  I played out this scene<br>
                  Of you with each other<br>
                  But not that with me<br>
                  And that kind of love<br>
                  Is so hard to see<br>
                  Now here we are<br>
                  It's him that you need<br>
                  Looks just like us<br>
                  Us without me<br>
                  <br>
                  Ooh, oh oh oh<br>
                  Without me, oh oh<br>
                  <br>
                  Oh, I played out this scene<br>
                  Of you with each other<br>
                  But not that with me<br>
                  And that kind of love<br>
                  Is so hard to see<br>
                  Now here we are<br>
                  It's him that you need<br>
                  Looks just like us<br>
                  Us without me
                </v-card-text>
                
              </v-card>
            </template>
          </v-container>
</template>