<template>
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
  </template>

<script>
    import { useAuthStore } from '../stores/auth';
    const register = ref(false);
    const authStore = useAuthStore();
    const credentials = reactive({
        email:'',
        password:''
    });

    const formTitle = computed(() => {
        return register.value ? 'Register' : 'Login';
    });
    const onSubmit = () => {
        if(!credentials.email || !credentials.password){
            alert('please enter email and password');
            return;
        }
        if(register.value){
            authStore.registerUser(credentials);
        }
        else{
            authStore.loginUser(credentials);
        }
    }
</script>