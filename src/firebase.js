import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGgGRVkrLWqh2LmssI2OqMpN3O-QuG3e8",
  authDomain: "crud-react-97195.firebaseapp.com",
  projectId: "crud-react-97195",
  storageBucket: "crud-react-97195.firebasestorage.app",
  messagingSenderId: "155120099945",
  appId: "1:155120099945:web:f5dca445cc8bcd4d49b8f8"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()



