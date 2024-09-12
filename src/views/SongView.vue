<template>
      <!-- Right side (Song Card) -->
      <!-- <v-navigation-drawer location="right" style="background-color: black;" :width="325"> -->
        
        <v-navigation-drawer location="right" style="background-color: #282733;" :width="450">
          <SongInfoCard :songID="this.id"/>
        </v-navigation-drawer>


    <!-- <v-main class="d-flex align-center justify-center" style="min-height: 300px;"> -->
      <v-main class="d-flex align-center justify-center">
      <v-row>
          <v-col col="12">
            <div class="d-flex justify-space-between align-center">
              <h1 class="text-left">Discussions</h1>
              <!-- FIXME: Use RouterLink to navigate to PostFormView if logged in-->
              <template v-if="isLoggedIn">
                <RouterLink :to="'/post-form/' + this.id">
                  <v-btn color="primary">
                    Create New Post
                  </v-btn>
                </RouterLink>
              </template>
              <template v-else>
                <v-btn color="primary"
                  @click="toLogin">
                  Log in to post
                </v-btn>
              </template>
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
                    <v-card class="rounded-l song-card pa-5" color="#282733" theme="dark" style="min-width: 30rem;" :elevation="isHovering ? 12 : 2">
                      <v-card-subtitle>
                        <v-avatar style="margin-right: 2%;" color="surface-variant" :image="post.avatarURL"></v-avatar>
                        {{ post.author }}
                      </v-card-subtitle>
                      <RouterLink :to="'/post/' + post.ID">
                      <v-card-title style="color: white; font-weight: bold;">{{ post.title }}</v-card-title>
                      </RouterLink>
                      <v-card-text v-html="post.content"></v-card-text>
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

import { useAuthStore } from '../stores/authStore'
import { mapStores } from 'pinia';



const DEFAULT_PFP = "https://cdn4.iconfinder.com/data/icons/forum-buttons-and-community-signs-1/794/profile-3-512.png"

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
      postsLoading: true,
      noPosts: null,
      isLoggedIn: false, //SET IT TO TRUE SOMEWHERE
    };
  },
  computed: {
    ...mapStores(useAuthStore), 
  },
    async created() {
      // console.log(this.authStore);
      if(this.authStore.name){
        this.isLoggedIn = true;
        // console.log("LOGGED IN SONGVIEW")
      }
    // console.log('showDeletedMessage:', this.showDeletedMessage);
    console.log("Fetching discussions for song with id ", this.id)

    const songRef = doc(db, "songs", this.id);
    const q = query(collection(db, "posts"), where("song", "==", songRef));
    const queryResponse = await getDocs(q);

    // CHECKING FOR POSTS
    if (queryResponse) {
      try {
        const postPromises = queryResponse.docs.map(async doc => {
          const postObject = doc.data();
          const postID = doc.id;
          const authorDoc = await getDoc(postObject.author);
          const author = authorDoc.data();
          console.log('post id', doc.id)
          
          return {
            title: postObject.title,
            author: author.username,
            content: postObject.content,
            ID: postID,
            song: this.id,
            avatarURL: author.avatarURL || DEFAULT_PFP
          };
        });

        this.posts = await Promise.all(postPromises);
        this.noPosts = this.posts.length === 0;
        this.postsLoading = false;
        console.log("All discussion posts successfully fetched");
      } catch (e) {
        console.log("Error fetching discussion posts", e);
      }
    }
  },

  methods: {
    toLogin() {
      // const loginMessage = 'Please log in to submit a post.'
      // this.$emit('loginMessage', loginMessage)
      this.$router.push({name: 'login'})
    }
  }
};
</script>

<style>

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
