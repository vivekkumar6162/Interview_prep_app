// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2kHvtBRLL189jo4s2_GubtGidLXMGl3g",
  authDomain: "prepwise-5e164.firebaseapp.com",
  projectId: "prepwise-5e164",
  storageBucket: "prepwise-5e164.firebasestorage.app",
  messagingSenderId: "499346917400",
  appId: "1:499346917400:web:c925cc2c4d521502f99b6d",
  measurementId: "G-2ML8XY2J2G"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
