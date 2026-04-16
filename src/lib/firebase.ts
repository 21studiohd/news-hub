import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmVxHEYmYwG5QgyD3QqMtB3fFP34nK7AM",
  authDomain: "tetova1.firebaseapp.com",
  projectId: "tetova1",
  storageBucket: "tetova1.firebasestorage.app",
  messagingSenderId: "1075014567286",
  appId: "1:1075014567286:web:2fb5e98ded3603b5dd6657",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
