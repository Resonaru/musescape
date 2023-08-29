import { defineStore } from 'pinia';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'
//import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';

console.log('l')
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        email: null,
        password: null,
        notFound: false,
        invalidPassword: false,
        loggedIn: false,
    }),

    actions :{
        async onAccChange() {
            onAuthStateChanged(auth, (currentUser) => {
                this.user.value = currentUser;
            });
            return this.user;
        },
        async login(){
            try{
                // setPersistence(auth, browserLocalPersistence);
                this.notFound = false;
                this.invalidPassword = false;
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
        },
    },
    mutations: {
        setUser(state, payload) {
          state.user = payload;
          console.log(state.user);
        },
    },
});

