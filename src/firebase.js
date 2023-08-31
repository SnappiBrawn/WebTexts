import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbt9jzP0lDya7P-Ue-xbNjj5dQbtIw55Y",
  authDomain: "webtexts-b9e0b.firebaseapp.com",
  projectId: "webtexts-b9e0b",
  storageBucket: "webtexts-b9e0b.appspot.com",
  messagingSenderId: "244011049035",
  appId: "1:244011049035:web:1352d3c447348ea2d6adce"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();