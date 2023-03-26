import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAXLCJD8753pbBSGiqWcgYJaeQW61HLfXc",
  authDomain: "hackafor-7564e.firebaseapp.com",
  projectId: "hackafor-7564e",
  storageBucket: "hackafor-7564e.appspot.com",
  messagingSenderId: "1009575689184",
  appId: "1:1009575689184:web:254e6dabbfa8e7c3c18985",
  databaseURL: "https://hackafor-7564e-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const loginWithGithub = () => {
  const provider = new GithubAuthProvider();
  const authResponse = signInWithPopup(auth, provider);
};

export const logout = () => {
  signOut(auth);
};

export const database = getDatabase(app);
