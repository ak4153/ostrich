import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // for authentication

const firebaseConfig = {
  apiKey: "AIzaSyCyssRPFuOlUjKYGbgCWb-9InHlYFWnHcU",
  authDomain: "ostrich4153.firebaseapp.com",
  projectId: "ostrich4153",
  storageBucket: "ostrich4153.appspot.com",
  messagingSenderId: "1068062177963",
  appId: "1:1068062177963:web:5415c54b181640f4b6d5ee",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.EmailAuthProvider();
export { firebaseApp, auth, provider };
