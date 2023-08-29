<template>
    <div class="auth">
        <template v-if="!this.authStore.user">
            Email: <input type="text" v-model.trim="email"/>
            <br>
            Password: <input type="password" v-model.trim="password"/>
            <br>
            <button @click="this.authStore.login(this.email, this.password)">Login</button>
            <br/>
            <RouterLink to="/register"><button>Sign Up</button></RouterLink>
        </template>
        <template v-else>
            <div>
                {{ this.authStore.email + ', ' + this.authStore.password }}
                <br>
            </div>
            <button @click="this.authStore.logout()">Sign Out</button>
        </template>
    </div>
</template>


<script>
// import { auth } from '../firebase';
// import { signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '../stores/authStore';
import { mapStores } from 'pinia';

// const { user } = useAuthStore();

export default{
    data(){
        return{
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
    // methods:{
    //     async login(){
    //         try{
    //             setPersistence(auth, browserLocalPersistence);
    //             this.notFound = false;
    //             this.invalidPassword = false;
    //             console.log('logging in...');
    //             await signInWithEmailAndPassword(auth, this.email, this.password);
    //             console.log('successfully logged in!')
    //             this.loggedIn = true;
                
    //         }
    //         catch(e){
    //             console.error('Error in login', e);
    //         }
    //     },
    //     async logout(){
    //         try{
    //             if(auth.currentUser){
    //                 console.log('logging out...');
    //                 await signOut(auth);
    //                 console.log('Successfully logged out!')
    //                 this.loggedIn = false;
    //             }
    //             else{
    //                 console.log('no user signed in');
    //             }
    //         }
    //          catch(err){
    //             console.log('error logging out');
    //          }
    //     }
    // }
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