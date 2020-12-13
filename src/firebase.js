import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDxDiO6If1G1Ir_ik1kYxhWXwyz6W-8W8I",
 authDomain: "react-app-hooks-3ac37.firebaseapp.com",
 databaseURL: "https://react-app-hooks-3ac37.firebaseio.com",
 projectId: "react-app-hooks-3ac37",
 storageBucket: "react-app-hooks-3ac37.appspot.com",
 messagingSenderId: "575029997582",
 appId: "1:575029997582:web:2d00d98561585693274c5f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection("favs");

export const reviewFav = (uid) => {
 return db
  .doc(uid)
  .get()
  .then((snap) => snap.data())
  .then((data) => Object.values(data));
};

export const updateDB = (array, uid) => {
 db.doc(uid).set({
  ...array,
 });
};

export const loginOut = () => {
 firebase.auth().signOut();
};

export async function loginWithGoogle() {
 const provider = new firebase.auth.GoogleAuthProvider();
 const snap = await firebase.auth().signInWithPopup(provider);
 return snap.user;
}
