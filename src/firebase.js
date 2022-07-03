import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from 'firebase/auth';
import { getFirestore, doc, collection, getDocs, updateDoc, setDoc, getDoc, arrayUnion, orderBy, query, where, addDoc, onSnapshot, deleteDoc, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCJ23ovyJxCHJdL5fJ6D1dIJH01WGc86og",
  authDomain: "promotezone-e8985.firebaseapp.com",
  projectId: "promotezone-e8985",
  storageBucket: "promotezone-e8985.appspot.com",
  messagingSenderId: "839258648991",
  appId: "1:839258648991:web:37bd9b63b1703ead6acdaa"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
    firebase,
    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    db,
    doc,
    collection,
    getDocs,
    getDoc,
    updateDoc,
    setDoc,
    addDoc,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    arrayUnion,
    orderBy,
    query,
    where,
    onSnapshot,
    deleteDoc,
    arrayRemove
}