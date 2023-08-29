<template>
    <div class="auth">
        <template v-if="!loggedIn">
            Display Name: <input id="name" type="text" v-model.trim="name"/>
            <br>
            Email: <input id="email" type="text" v-model.trim="email"/>
            <br>
            Password: <input id="pswd" type="password" v-model.trim="pswd"/>
            <br>
            <button @click="createAccountAndLogin()">Create Account</button>
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
            pswd: null,
        };
    },
    methods: {
        async createAccountAndLogin() {

        }
    },
    components: { RouterLink }
}
</script>