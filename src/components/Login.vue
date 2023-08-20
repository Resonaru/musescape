<template>
  <v-card class="mx-auto" title="User Authentication">
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
    }),
  }
</script>