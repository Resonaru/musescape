<template>
    <div class="auth">
        <template v-if="!this.authStore.loggedIn">
            <!-- OLD CODE -->
            <!-- Display Name: <input id="name" type="text" v-model.trim="name"/>
            <br>
            Email: <input id="email" type="text" v-model.trim="email"/>
            <br>
            Password: <input id="password" type="password" v-model.trim="password"/>
            <br>
            <button @click="this.authStore.register(this.name,this.email,this.password)" style = "color:#1DB954; background-color:#404040;">Create Account</button> -->
            <v-sheet rounded>
                <v-card color="#101010" class="mx-auto px-6 py-8" min-width="344">
                    <v-form
                    v-model="form"
                    @submit.prevent="onSubmit">
                        <v-text-field
                        v-model="name"
                        :readonly="loading"
                        :rules="[required]"
                        clearable
                        label="Display Name"
                        bg-color="white"
                        ></v-text-field>

                        <v-text-field
                        v-model="email"
                        :readonly="loading"
                        :rules="[required]"
                        clearable
                        label="Email"
                        bg-color="white"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :readonly="loading"
                        :rules="[required]"
                        :type="show1 ? 'text' : 'password'"
                        clearable
                        label="Password"
                        placeholder="Enter your password"
                        bg-color="white"
                        ></v-text-field>

                        <br>

                        <v-btn
                        :loading="loading"
                        block
                        color="success"
                        size="large"
                        type="submit"
                        variant="elevated"
                        @click="this.authStore.register(this.name,this.email,this.password)">
                        Register
                        </v-btn>
                    </v-form>
                </v-card>
            </v-sheet>
            <p v-if="errorMessage" class="error-message" style="color:red">{{ errorMessage }}</p>
            
        </template>
        <template v-if="this.authStore.loggedIn">
           Account created successfully! 
           <br>
           <RouterLink to="/">Please proceed to the feed.</RouterLink>
        </template>
    </div>
</template>


<script>
import { mapStores } from 'pinia';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth'

export default{
    data() {
        return {
            loggedIn: false,
            name: null,
            email: null,
            password: null,
        };
    },
    computed:{
        ...mapStores(useAuthStore)
    },
    computed: {
        ...mapStores(useAuthStore),
        errorMessage() {
            return this.authStore.error; // Access the error message from the store
        },
    },
    components: { RouterLink }
}
</script>


<style>
input[type="text"], textarea {
    background-color : #d1d1d1; 
}
input[type="password"], textarea {
    background-color : #d1d1d1; 
}
</style>