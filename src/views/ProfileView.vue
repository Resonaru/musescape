

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

                <!-- <v-card-subtitle>{{ this.authStore.email }}</v-card-subtitle> -->
                <v-card-subtitle class="font-weight-medium text-green">Enthusiast</v-card-subtitle>  
                <v-card-text> Nice to meet you! </v-card-text> 
                <br>
                </div>
            </div>
            <v-btn
                    :loading="loading"
                    block
                    color="error"
                    type="submit"
                    variant="elevated"
                    @click="this.authStore.logout()">
                    Log out
            </v-btn>
        </v-card>
        </template>
        <template v-else>
            <div>
                <v-card color="#4C4948" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between"
                    max-width="800"
                    width="100%"
                    height="500"
                    >
                        <div class = "text-center">
                        <v-card-title class="text-h5">
                            You are not signed in!
                        </v-card-title>
                        <RouterLink to="/login"><button >Login</button></RouterLink>
                        <br>
                        <RouterLink to="/register"><button >Register</button></RouterLink>
                        </div>
                    </div>

                </v-card>
            </div>
        </template>
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