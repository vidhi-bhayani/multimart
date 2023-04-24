import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDns7wEs4UAlCmzF0m9IW7kNblicOY4zvw",
  authDomain: "maltimart-80510.firebaseapp.com",
  projectId: "maltimart-80510",
  storageBucket: "maltimart-80510.appspot.com",
  messagingSenderId: "670463583702",
  appId: "1:670463583702:web:4cdaf0ae76cc50da8eb077"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;