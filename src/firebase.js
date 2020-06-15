import firebase from "@firebase/app";
import "@firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPGFeo3lBMe4Pl33ZbW77sBRwCsEdiN58",
  authDomain: "think-piece-shipu.firebaseapp.com",
  databaseURL: "https://think-piece-shipu.firebaseio.com",
  projectId: "think-piece-shipu",
  storageBucket: "think-piece-shipu.appspot.com",
  messagingSenderId: "496779419645",
  appId: "1:496779419645:web:0928c7aa2f078fe5eb8394",
  measurementId: "G-JWD5NTGS6W",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const storage = firebase.storage();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  // get a reference to the place in the database where a user profile might or might not exist
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (err) {
    console.error("error in fetching data", err);
  }
};

window.firebase = firebase;

export default firebase;
