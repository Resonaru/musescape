// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0lYI5tp_6rTOFeoaWOKVNPO6h21HyJF4",
  authDomain: "musescape-89f0a.firebaseapp.com",
  projectId: "musescape-89f0a",
  storageBucket: "musescape-89f0a.appspot.com",
  messagingSenderId: "282894828706",
  appId: "1:282894828706:web:87a34af063973817b703fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
