<template>
    <div class="auth">
        <template v-if="!loggedIn">
            Email: <input type="text" v-model.trim="email"/>
            <br>
            Password: <input type="password" v-model.trim="password"/>
            <br>
            <button @click="login()">Login</button>
            <RouterLink to="/register"><button>Sign Up</button></RouterLink>
        </template>
        <template v-if="loggedIn">
            <!--button @click="logout()">Log Out</button>-->
            <button @click="logout()">Sign Out</button>
        </template>
    </div>
</template>


<script>
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../stores/authStore';
import { mapStores } from 'pinia';

export default{
    data(){
        return{
            email: null,
            password: null,
            notFound: false,
            invalidPswd: false,
            loggedIn: false,
        }
    },
    computed:{
        ...mapStores(useAuthStore),
    },
    methods:{
        async login(){
            try{
                setPersistence(auth, browserLocalPersistence);
                this.notFound = false;
                this.invalidPswd = false;
                console.log('logging in...');
                await signInWithEmailAndPassword(auth, this.email, this.password);
                console.log('successfully logged in!')
                this.loggedIn = true;
                
            }
            catch(e){
                console.error('Error in login', e);
            }
        },
        async logout(){
            try{
                if(auth.currentUser){
                    console.log('logging out...');
                    await signOut(auth);
                    console.log('Successfully logged out!')
                    this.loggedIn = false;
                }
                else{
                    console.log('no user signed in');
                }
            }
             catch(err){
                console.log('error logging out');
             }
        }
    }
}

</script>