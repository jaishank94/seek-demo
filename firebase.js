// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoaq6ISEoCmBf_FO0oP5rFb4afcxN2kIo",
  authDomain: "exnomy-test.firebaseapp.com",
  databaseURL: "https://exnomy-test-default-rtdb.firebaseio.com",
  projectId: "exnomy-test",
  storageBucket: "exnomy-test.appspot.com",
  messagingSenderId: "894693019555",
  appId: "1:894693019555:web:aa501bc162cf8388205416"
};

// Initialize Firebase
let app, db;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
db = firebase.firestore(app);

export const UserRef = db.collection("users");

export { auth, db };