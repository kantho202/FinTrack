// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5SE5a5ySoawAzDnuqWPjjMdFFzRpoAwA",
  authDomain: "fintrack-34929.firebaseapp.com",
  projectId: "fintrack-34929",
  storageBucket: "fintrack-34929.firebasestorage.app",
  messagingSenderId: "954534563512",
  appId: "1:954534563512:web:0c06982aadc994cc176e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);