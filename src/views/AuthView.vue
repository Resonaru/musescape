<template>
    <v-main class="justify-center align-center">
        <v-card class="justify-center" justify="center" min-width="400" max-width="500" title="User Authentication">
      <v-container>
        <v-text-field v-model="email" label="Email" variant="underlined"></v-text-field>
        <v-text-field v-model="password" label="Password" variant="underlined"></v-text-field>
      </v-container>
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-btn>
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-main>
</template>

<script>
export default {
  data() {
    return {
      register: false,
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  computed: {
    formTitle() {
      return this.register ? 'Register' : 'Login';
    }
  },
  methods: {
    onSubmit() {
      if (!this.credentials.email || !this.credentials.password) {
        alert('Please enter email and password');
        return;
      }
      if (this.register) {
        this.$store.dispatch('auth/registerUser', this.credentials);
      } else {
        this.$store.dispatch('auth/loginUser', this.credentials);
      }
    }
  }
};
</script>