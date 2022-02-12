// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore/lite";
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Y2FWgLaGPAtahuzuPm182YGIK8QGoHs",
  authDomain: "rock-climbing-app.firebaseapp.com",
  projectId: "rock-climbing-app",
  storageBucket: "rock-climbing-app.appspot.com",
  messagingSenderId: "618600251243",
  appId: "1:618600251243:web:2b5980c6278087bf10562e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const authentication = getAuth(app);

export const fireStoreDb = getFirestore(app);