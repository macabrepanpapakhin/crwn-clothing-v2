import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { UserContext } from "../../contexts/users.context";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  endAt,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import { async } from "q";
import { useContext } from "react";
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

export const addColelctionsAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = "title"
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

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
    await createUserDocumentFromAuth({ displayName, email, password, uid });
    return response.user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use")
      console.log("Already Sign Up");
  }
};

export const signInWithEmailAndPass = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
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

export const SignOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
