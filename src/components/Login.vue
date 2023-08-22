<template>
  <v-card class="mx-auto" max_width="355" title="User Authentication">
    <v-container>
      <v-text-field v-model="username" label="Username" variant="underlined"></v-text-field>
      <v-text-field v-model="password" label="Password" variant="underlined"></v-text-field>
    </v-container>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn>
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
  export default {
    data: () => ({
      username: null,
      password: null,
      loggedIn: false,
    }),
  }

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedIn = true;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    loggedIn = false;
    // User is signed out
    // ...
  }
});
</script>