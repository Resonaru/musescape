

<template>
    <div class = "profile">
        <template v-if="this.authStore.loggedIn">
            <v-sheet rounded>
                <v-sheet rounded>
                <p>You are signed in!</p>
                <br>
                {{ this.authStore.name + ', ' + this.authStore.email }}
            </v-sheet>
            </v-sheet>
        </template>
        <template v-else>
            <v-sheet rounded>
                <p>You are not signed in!</p>
                <br>
                <p>Please </p>
                <RouterLink to="/login">login here </RouterLink>
                <p>or </p>
                <RouterLink to="/register">create a new account.</RouterLink>
            </v-sheet>
        </template>
        <div>
            {{ this.authStore.email + ', ' + this.authStore.password  + ', ' + this.authStore.name}}
            <br>
        </div>
    </div>
    
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { mapStores } from 'pinia';


export default{
    computed:{
        ...mapStores(useAuthStore),
    },
}
</script>