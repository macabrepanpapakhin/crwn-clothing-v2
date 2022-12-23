import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQGLM1ju7K7NxatDTPAyH288kzezkHEEI",
  authDomain: "crown-clothing-f79bd.firebaseapp.com",
  projectId: "crown-clothing-f79bd",
  storageBucket: "crown-clothing-f79bd.appspot.com",
  messagingSenderId: "691248366531",
  appId: "1:691248366531:web:8aa9f25cbda2a7d13af376",
  measurementId: "G-KB7CT2WZ2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();

export const singInGoolgePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", "Saiii");

  const userSanpShot = await getDoc(userDocRef);
  if (!userSanpShot.exists()) {
    const { displayName, email } = {
      displayName: "sailaminoak",
      email: "laminoak@gmail.com",
    };
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user \n" + error);
    }
  }
};
