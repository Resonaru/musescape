<template>
    <div class="auth">
        <template v-if="!this.authStore.user">
            <!--OLD CODE-->
            <!-- Email: <input type="text" v-model.trim="email"/>
            <br>
            Password: <input type="password" v-model.trim="password"/>
            <br>
            <button @click="this.authStore.login(this.email, this.password)">Login</button>
            <br/> -->
            <v-sheet rounded>
                <v-card color="#101010" class="mx-auto px-6 py-8" min-width="344">
                    <v-form @submit.prevent>
                        <v-text-field
                        v-model="email"
                        class="mb-2"
                        clearable
                        label="Email"
                        bg-color="white"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        clearable
                        label="Password"
                        placeholder="Enter your password"
                        bg-color="white"
                        @click:append="show = !show"
                        class="white-append-icon"
                        >
                        </v-text-field>

                        <br>

                        <v-btn
                        block
                        color="success"
                        size="large"
                        type="submit"
                        variant="elevated"
                        @click="this.authStore.login(this.email, this.password)">
                        Sign In
                        </v-btn>
                    </v-form>
                </v-card>
            </v-sheet>
            <RouterLink to="/register"><button>Sign Up</button></RouterLink>
        </template>
        <template v-else>
            <div>
                <v-card color="#101010" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between"
                    max-width="800"
                    width="100%"
                    height="500"
                    >
                        <div class = "text-center">
                        <v-card-title class="text-h5">
                            Sucessfully logged in!
                        </v-card-title>
                        <RouterLink to="/"><button >Go to Feed</button></RouterLink>
                        </div>
                    </div>

                </v-card>
            </div>
            <!-- <button @click="this.authStore.logout()">Sign Out</button> -->
        </template>
    </div>
</template>


<script>
import { useAuthStore } from '../stores/authStore';
import { mapStores } from 'pinia';


export default{
    data(){
        return{
            show: false,
            email: null,
            password: null,
            notFound: false,
            invalidPassword: false,
            loggedIn: false,
        }
    },
    computed:{
        ...mapStores(useAuthStore),
    },
}

</script>

<style scoped>
.white-append-icon  {
  color: white; 
}
</style>