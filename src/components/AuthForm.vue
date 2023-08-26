<template>
  <v-card>
    <v-card-title>{{ formTitle }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field v-model.trim="credentials.email" label="Email" required></v-text-field>
        <v-text-field v-model.trim="credentials.password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit">{{ formTitle }}</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="toggleForm">{{ toggleButtonText }}</v-btn>
    </v-card-actions>
    <v-card-actions v-if="isSuccess" class="success-message">
      {{ successMessage }}
    </v-card-actions>
  </v-card>
</template>

<script>
import {useAuthStore} from '../stores/auth.js'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      isRegister: false,
      isSuccess: false,
      authStore: useAuthStore(),
    };
  },
  computed: {
    formTitle() {
      return this.isRegister ? 'Register' : 'Login';
    },
    toggleButtonText() {
      return this.isRegister ? 'Login Existing User' : 'Register New User';
    },
    successMessage() {
      return this.isRegister ? 'Registration successful!' : 'Login successful!';
    },
  },
  methods: {
    onSubmit() {
      if (!this.credentials.email || !this.credentials.password) {
        alert('Please enter email and password');
        return;
      }
      console.log("bruh");
      if (this.isRegister) {
        console.log("bruh2");
        this.authStore.registerUser(this.credentials);
      } else {
        console.log("bruh3");
        this.authStore.loginUser(this.credentials);
      }
      this.isSuccess = true;
    },
    toggleForm() {
      this.isSuccess = false;
      this.isRegister = !this.isRegister;
    },
  },
};
</script>

<style scoped>
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>
