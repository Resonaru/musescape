import { defineStore } from 'pinia';
import {auth} from 'firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const authStore = defineStore('authStore', () =>{
    const registerUser = (credentials) => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return{
        registerUser
    };
});

