// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore/lite";
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "*",
  authDomain: "*",
  projectId: "rock-climbing-app",
  storageBucket: "*",
  messagingSenderId: "*",
  appId: "*",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const authentication = getAuth(app);

export const fireStoreDb = getFirestore(app);
