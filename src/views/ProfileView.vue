

<template>
    <div class = "profile">
        <template v-if="this.authStore.loggedIn">
            <!-- <v-sheet
            class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
            elevation="4"
            height="250"
            rounded
            max-width="800"
            width="100%"
            >
                <div class="text-h5 font-weight-medium mb-2">
                    {{ this.authStore.name }}
                </div>

                <p class="text-body-2 mb-4">
                    {{ this.authStore.email }}
                </p>
            </v-sheet> -->
        <v-card color="#4C4948" theme="dark">
            <div class="d-flex flex-no-wrap justify-space-between"
            max-width="800"
            width="100%"
            height="500"
            >
                <v-avatar
                class="ma-3"
                size="125"
                rounded="1"
                >
                <v-img src="https://cdn.discordapp.com/attachments/722208323981803585/1146261244110700564/stupid.jpg"></v-img>
                </v-avatar>
                <div>
                <v-card-title class="text-h5">
                    {{this.authStore.name}}
                </v-card-title>

                <v-card-subtitle>{{ this.authStore.email }}</v-card-subtitle>
                <v-card-text> Placeholder description </v-card-text>
                </div>
            </div>
        </v-card>
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
        <!-- <div>
            {{ this.authStore.email + ', ' + this.authStore.password  + ', ' + this.authStore.name}}
            <br>
        </div> -->
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