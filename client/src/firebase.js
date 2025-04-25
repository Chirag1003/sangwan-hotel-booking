// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMMcS5iEaAEPvZOKJDweqpkUXTwj1N_sM",
  authDomain: "sangwan-hotel.firebaseapp.com",
  projectId: "sangwan-hotel",
  storageBucket: "sangwan-hotel.firebasestorage.app",
  messagingSenderId: "815159561472",
  appId: "1:815159561472:web:dd14ef6e19d9246d5cf7e5",
  measurementId: "G-SVNCF2NSNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };