import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAMCZylSuUspgJLeyzLpLWLRuDEQnhxTEg",
  authDomain: "starwars-cc95a.firebaseapp.com",
  projectId: "starwars-cc95a",
  storageBucket: "starwars-cc95a.firebasestorage.app",
  messagingSenderId: "185431230776",
  appId: "1:185431230776:web:e071b4bbb868aa2577d9cd"
};

const app = initializeApp(firebaseConfig);
console.log(app);
export const auth = getAuth(app); 