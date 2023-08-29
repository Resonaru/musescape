import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'

import { auth } from './firebase';
import { useAuthStore } from './stores/authStore';


const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

auth.onAuthStateChanged((user) => {
  const authStore = useAuthStore();
  authStore.setUser(user);
});

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
