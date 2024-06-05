// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

console.log(import.meta.env.VITE_API_KEY)

const firebaseConfig = {
  apiKey: "AIzaSyDo9Zd7Kp5AQyPfMFRLndfiMNI1hUdB39o",
  authDomain: "digiwallet-mernauth.firebaseapp.com",
  projectId: "digiwallet-mernauth",
  storageBucket: "digiwallet-mernauth.appspot.com",
  messagingSenderId: "446726429618",
  appId: "1:446726429618:web:e18de3dad166d77c1e22ab"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider , app };
