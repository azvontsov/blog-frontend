import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDEj8OLZoDlY0gr2IqQ-z5L-K3eno8MAA",
  authDomain: "react-firebase-projects-de4c3.firebaseapp.com",
  projectId: "react-firebase-projects-de4c3",
  storageBucket: "react-firebase-projects-de4c3.appspot.com",
  messagingSenderId: "592193459591",
  appId: "1:592193459591:web:2e44787f32a1a5ab2daf22",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
  return auth.signInWithPopup(provider);
}
function logout() {
  return auth.signOut();
}
export { auth, login, logout };
