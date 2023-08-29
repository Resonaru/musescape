<template>
    <div class="auth">
        <template v-if="!loggedIn">
            <!-- Display Name: <input id="name" type="text" v-model.trim="name"/>
            <br>
            Email: <input id="email" type="text" v-model.trim="email"/>
            <br>
            Password: <input id="pswd" type="password" v-model.trim="pswd"/>
            <br>
            <button @click="createAccountAndLogin()">Create Account</button> -->
            <v-sheet rounded>
                <v-card class="mx-auto px-6 py-8" min-width="344">
                    <v-form
                    v-model="form"
                    @submit.prevent="onSubmit">
                        <v-text-field
                        v-model="name"
                        :readonly="loading"
                        :rules="[required]"
                        class="mb-2"
                        clearable
                        label="Display Name"
                        ></v-text-field>

                        <v-text-field
                        v-model="email"
                        :readonly="loading"
                        :rules="[required]"
                        class="mb-2"
                        clearable
                        label="Email"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :readonly="loading"
                        :rules="[required]"
                        :type="show1 ? 'text' : 'password'"
                        clearable
                        label="Password"
                        placeholder="Enter your password"
                        ></v-text-field>

                        <br>

                        <v-btn
                        :disabled="!form"
                        :loading="loading"
                        block
                        color="success"
                        size="large"
                        type="submit"
                        variant="elevated"
                        @click="createAccountAndLogin(email, password)">
                        Register
                        </v-btn>
                    </v-form>
                </v-card>
            </v-sheet>
        </template>
        <template v-if="loggedIn">
           Account created successfully! 
           <br>
           <RouterLink to="/login">Please proceed to the login page to login!</RouterLink>
        </template>
    </div>
</template>


<script>
import { RouterLink } from 'vue-router';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default{
    data() {
        return {
            loggedIn: false,
            name: null,
            email: null,
            password: null,
        };
    },
    methods: {
        async createAccountAndLogin(email, password) {
            try {
                console.log('creating...');
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('account created!');
                this.loggedIn = true;
                console.log('Current user', auth.currentUser);
            }
            catch (err) {
                console.error('Couldn\'t create account', err);
            }
        }
    },
    components: { RouterLink }
}
</script>

<!-- 
<style>
input[type="text"], textarea {
    background-color : #d1d1d1; 
}
input[type="password"], textarea {
    background-color : #d1d1d1; 
}
</style> -->