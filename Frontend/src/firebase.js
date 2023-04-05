// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0iJximpyj0cRQGWPpSrx0xHdgTmsj1BE",
  authDomain: "autostore-ac2b4.firebaseapp.com",
  projectId: "autostore-ac2b4",
  storageBucket: "autostore-ac2b4.appspot.com",
  messagingSenderId: "730269194138",
  appId: "1:730269194138:web:696235ce13926573a5cc23",
  measurementId: "G-VRKKTWJS03"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


