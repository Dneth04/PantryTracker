// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import { getAuth } from 'firebase/auth'; // Add this line

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAHJgBrfIOXPAqXX_qX794nOMdyTJndoXo",
  authDomain: "pantry-app-ff09c.firebaseapp.com",
  projectId: "pantry-app-ff09c",
  storageBucket: "pantry-app-ff09c.appspot.com",
  messagingSenderId: "351020964498",
  appId: "1:351020964498:web:6f3dbb929601843fa5a44b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth(app)
export {app, firestore, auth}