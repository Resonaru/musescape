import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    login(username, password) {
      // auth logic
    },
    logout() {
      // logout logic
    },
  },
});
