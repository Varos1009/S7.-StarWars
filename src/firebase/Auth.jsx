import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const Register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export default async function Login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
};

export const signOut = async () => {
    return await auth.signOut();
};




