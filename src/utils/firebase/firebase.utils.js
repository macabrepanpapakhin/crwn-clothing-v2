import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, endAt } from "firebase/firestore";
import { async } from "q";

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
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSanpShot = await getDoc(userDocRef);
  if (!userSanpShot.exists()) {
    const createdAt = new Date();
    const { displayName, email, password } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        password,
        createdAt,
      });
      console.log("done");
    } catch (error) {
      console.log("error creating user " + error);
    }
  }
};
export const randomWordGenerator = (length) => {
  let outputString = "";
  const abcString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  for (let i = 0; i < length; i++) {
    outputString += abcString.charAt(
      Math.floor(Math.random() * abcString.length)
    );
  }
  console.log("the string is " + outputString);
  return outputString;
};

export const createUserWithEmailAndPassword1 = async ({
  email,
  password,
  displayName,
}) => {
  if (!email || !password || !displayName) {
    console.log("invalid fields");
    return;
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = response.user.uid;
    createUserDocumentFromAuth({ displayName, email, password, uid });
  } catch (error) {
    if (error.code === "auth/email-already-in-use")
      console.log("Already Sign Up");
  }
};

export const signInWithEmailAndPass = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("sign in response");
    console.log(response);
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        alert("incorrect password or email");
        break;

      case "auth/user-not-found":
        alert("incorrect password or email");
        break;

      default:
        console.log(error);
    }
  }
};
