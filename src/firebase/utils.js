import { firebaseConfig } from "./config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const handleUserProfile = async (userAuth, { name, phone } = {}) => {
  if (!userAuth) {
    return;
  }
  const { uid } = userAuth;

  const userRef = firestore.collection("users").doc(`${uid}`);

  const snap = await userRef.get();

  if (!snap.exists) {
    const { email } = userAuth;
    const userRoles = ["user"];
    const timestamp = new Date();
    try {
      await userRef.set({
        name,
        email,
        phone,
        userRoles,
        createdAt: timestamp,
      });
    } catch (err) {}
  }
  return userRef;
};
