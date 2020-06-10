import firebase from "@firebase/app";
import 'firebase/firestore';


 const firebaseConfig = {
  apiKey: "AIzaSyCPGFeo3lBMe4Pl33ZbW77sBRwCsEdiN58",
  authDomain: "think-piece-shipu.firebaseapp.com",
  databaseURL: "https://think-piece-shipu.firebaseio.com",
  projectId: "think-piece-shipu",
  storageBucket: "think-piece-shipu.appspot.com",
  messagingSenderId: "496779419645",
  appId: "1:496779419645:web:0928c7aa2f078fe5eb8394",
  measurementId: "G-JWD5NTGS6W"
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore()
window.firebase = firebase;

export default firebase;