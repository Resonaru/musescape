import { defineStore } from 'pinia';
import {auth} from '../firebase';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'


console.log('l')
export const useAuthStore = defineStore('auth', () =>{
    const registerUser = (credentials) => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log("registerUser Error: " + error.message);
                throw(error);
            });
    };

    const loginUser = (credentials) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log("loginUser Error: " + error.message);
                throw(error)
            });
    };
    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    return{
        registerUser,
        loginUser
    };
});

