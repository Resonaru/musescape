import { defineStore } from 'pinia';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
        async login(emailSubmit, passwordSubmit){
            try{
                // setPersistence(auth, browserLocalPersistence);
                this.notFound = false;
                this.invalidPassword = false;
                console.log('logging in...');
                this.email = emailSubmit;
                this.password = passwordSubmit;
                await signInWithEmailAndPassword(auth, emailSubmit, passwordSubmit);
                console.log('successfully logged in!')
                this.loggedIn = true;
                this.user = auth.currentUser;
                
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
                    this.user=null;
                    this.email= null;
                    this.password= null;
                }
                else{
                    console.log('no user signed in');
                }
            }
             catch(err){
                console.error('try catch in logout', err)
             }
        },
    },
});

