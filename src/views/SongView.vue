<template>
      <!-- Right side (Song Card) -->
      <!-- <v-navigation-drawer location="right" style="background-color: black;" :width="325"> -->
        
        <v-navigation-drawer location="right" style="background-color: black;" :width="500">
          <v-container class="fill-height d-flex align-center justify-center">
           <template v-if="loading">
            Loading song...
            </template>
            <template v-else>
              
                <v-card cover class="song-card rounded-xl justify-center" min-height="500" min-width="350">
                  <br><br>
                  <v-img class="rounded-xl mx-auto" :src="songData.img" alt="Album Cover" :width="250"></v-img>

                  <v-card-title class="text-center" style="color: aliceblue">{{ songData.title }}</v-card-title>
                    <v-card-subtitle class="text-center song-artist">{{ songData.artist.name }}</v-card-subtitle>
                  
                </v-card>
            </template>
          </v-container>
        </v-navigation-drawer>


    <!-- <v-main class="d-flex align-center justify-center" style="min-height: 300px;"> -->
      <v-main class="d-flex align-center" style="min-height: 300px;">
      <v-row>
          <v-col-12>

          </v-col-12>
          <v-col-12>
            <div class="d-flex justify-space-between align-center">
              <h1 class="text-left">Discussions</h1>
              <!-- Use RouterLink to navigate to PostFormView -->
              <RouterLink :to="'/post-form/' + this.id">
                <v-btn color="primary">
                  Create New Post
                </v-btn>
              </RouterLink>
            </div>
                          <!-- Post Creation Component -->
              <!-- <v-row v-if="showPostForm">
                <v-col cols="12">
                  <PostForm />
                </v-col>
              </v-row> -->
              <template v-if="noPosts">
                No posts yet
              </template>
              <template v-else>
                <v-chip class="ma-2" color="success" variant="outlined">
                  <v-icon start icon="mdi-music"></v-icon>
                  Music Theory
                </v-chip>

                <v-chip class="ma-2" color="primary" variant="outlined">
                  Composition
                  <v-icon end icon="mdi-grease-pencil"></v-icon>
                </v-chip>

                <v-chip class="ma-2" color="#fc389a" variant="outlined">
                  Production
                  <v-icon end icon="mdi-grease-pencil"></v-icon>
                </v-chip>


                <template v-for="post in posts">
                  <col-12>
                    <RouterLink :to="'/post/' + post.ID">
                    <v-card class="rounded-xl" color="#5A5252" theme="dark" min-width="500">
                      <v-card-subtitle>
                        <v-avatar color="surface-variant" image="https://64.media.tumblr.com/e3e14a0b25723def857bb5cd8561b30c/720d78986e7588b3-49/s540x810/9b0565d3ea4eacd4b0b85f460be4afd5719556a3.jpg"></v-avatar>
                        {{ post.author }}
                      </v-card-subtitle>
                      <v-card-title>{{ post.title }}</v-card-title>
                    <v-card-text>{{ post.content }}</v-card-text>
                  </v-card>
                    </RouterLink>
                  
                  </col-12>
                  <br>
                </template>
              </template>
          </v-col-12>
        </v-row>

    </v-main>

    <!-- If post was deleted -->
    <v-dialog v-model="showDeletedMessage" max-width="500">
    <v-card>
      <v-card-title class="headline">Post Deleted</v-card-title>
      <v-card-text>
        The post has been deleted successfully.
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="showDeletedMessage = false">Close</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>

      <!-- </v-navigation-drawer> -->

      <!-- Center side (Discussions) -->
      

</template>

<script>
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
} from 'firebase/firestore'
import { useRoute } from 'vue-router';


export default {
  components: {
        PostForm,
  },
  props: ['id'], // Access the song ID from the route parameter
  data() {
    return {
      songData: null,
      posts: [],
      loading: true, // Loading screen renderred
      noPosts: null,
      showPostForm: false,
      showDeletedMessage: this.$route.query.deleted === 'true' || false,
    };
  },

  async created() {
      console.log('showDeletedMessage:', this.showDeletedMessage);
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
              const postID = postReference.id;
              const author = (await getDoc(postObject.author)).data().username
              console.log(postObject)
              this.posts.push({
                title: postObject.title,
                author: author,
                content: postObject.content,
                ID: postID,
                song: this.id,
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
        console.error('Something went wrong bruh', e)
      }
    },

  methods: {
  }
};
</script>

<style>

/* .song-img {
  
} */
.song-title {
  color: #FFFFFF
}
.song-artist {
  color: #959090
}

.song-card {

  background-color: #423A42;
}

.d-flex {
  display: flex;
}
.justify-space-between {
  justify-content: space-between;
}
.align-center {
  align-items: center;
}
</style>
