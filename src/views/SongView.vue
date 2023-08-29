<template>
      <!-- Right side (Song Card) -->
      <!-- <v-navigation-drawer location="right" style="background-color: black;" :width="325"> -->
        
        <v-navigation-drawer location="right" style="background-color: black;" :width="450">
          <SongInfoCard :songID="this.id"/>
        </v-navigation-drawer>
        


    <!-- <v-main class="d-flex align-center justify-center" style="min-height: 300px;"> -->
      <v-main class="d-flex align-center">
      <v-row>
          <v-col col="12">
            <div class="d-flex justify-space-between align-center">
              <h1 class="text-left">Discussions</h1>
              <!-- Use RouterLink to navigate to PostFormView -->
              <RouterLink :to="'/post-form/' + this.id">
                <v-btn color="primary">
                  Create New Post
                </v-btn>
              </RouterLink>
            </div>

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
            <v-chip class="ma-2" color="orange" variant="outlined">
              Lyrics
              <v-icon end icon="mdi-note"></v-icon>
            </v-chip>

            <template v-if="postsLoading">
              <!-- <v-skeleton-loader
              class="mx-auto"
              elevation="12"
              min-width="600"
              type="table-heading, list-item-two-line, image, table-tfoot"
            ></v-skeleton-loader> -->
              <h1>Loading discussions...</h1>
            </template>
            <template v-else>
              <template v-if="noPosts">
                <h1>No posts yet</h1>
              </template>
              <template v-else>
                <template v-for="post in posts">
                  <v-col col="12">
                    <v-hover v-slot="{ isHovering, props }">
                    <v-card class="rounded-xl song-card" color="#5A5252" theme="dark" min-width="600"  :elevation="isHovering ? 12 : 2">
                      <v-card-subtitle>
                        <v-avatar color="surface-variant" image="https://64.media.tumblr.com/e3e14a0b25723def857bb5cd8561b30c/720d78986e7588b3-49/s540x810/9b0565d3ea4eacd4b0b85f460be4afd5719556a3.jpg"></v-avatar>
                        {{ post.author }}
                      </v-card-subtitle>
                      <RouterLink :to="'/post/' + post.ID">
                      <v-card-title>{{ post.title }}</v-card-title>
                      </RouterLink>
                      <v-card-text>{{ post.content }}</v-card-text>
                    </v-card>
                  </v-hover>
                  </v-col>
                  <br>
                </template>
              </template>
            </template>
          </v-col>
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
import SongInfoCard from '../components/SongInfoCard.vue'
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

import { useSpotifyAuthStore } from '../stores/spotifyAuthStore'
import { mapStores } from 'pinia';

export default {
  components: {
        PostForm,
        SongInfoCard
  },
  props: ['id'], // Access the song ID from the route parameter
  data() {
    return {
      songData: null,
      posts: [],
      // loading: true, // Loading screen renderred
      showPostForm: false,
      showDeletedMessage: this.$route.query.deleted === 'true' || false,
      songLoading: true, // Loading screen renderred
      postsLoading: true,
      noPosts: null
    };
  },
  computed: {
    ...mapStores(useSpotifyAuthStore), 
  },
  async created() {
      console.log('showDeletedMessage:', this.showDeletedMessage);
      console.log("Fetching discussions for song with id ", this.id)

      const songRef = doc(db, "songs", this.id)
      const q = query(collection(db, "posts"), where("song", "==", songRef))
      const queryResponse = await getDocs(q);
      // queryResponse.forEach(doc => {
      //   console.log(doc.data())
      // })


          // CHECKING FOR POSTS
          if(queryResponse) {
            console.log("pushing a post to discussion array")
            queryResponse.forEach(async doc => {
            try {
              const postObject = doc.data();
              console.log(postObject)
              const postID = postObject.id;
              const author = (await getDoc(postObject.author)).data().username
              this.posts.push({
                title: postObject.title,
                author: author,
                content: postObject.content,
                ID: postID,
                song: this.id,
              })

              this.postsLoading = false;
              this.noPosts = false;
            } catch(e) {
              console.log("Error fetching discussion posts")
            }
          })
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
.song-card {
  margin-right: 2px;
  transition: margin 0.2s ease-in-out;
}
.song-card:hover {
  margin-top: -2;
}
</style>
