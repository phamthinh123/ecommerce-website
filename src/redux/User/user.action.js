import { userConstant } from "./user.constant";
import { auth, handleUserProfile } from "../../firebase/utils";
import { provider } from "../../firebase/utils";
import { getAuth, signOut } from "firebase/auth";

export const signInSuccess = () => {
  return {
    type: userConstant.SIGN_IN_SUCCESS,
    payload: true,
  };
};
export const signInByEmail = (email, password) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(signInSuccess());
  } catch (err) {}
};
export const signInByGoogle = () => async (dispatch) => {
  try {
    // const { user } = await auth.signInWithPopup(provider);
    await auth.signInWithPopup(provider);
    // const name = user.displayName;
    // const phone = user.phoneNumber;

    // await handleUserProfile(user, { name, phone });

    dispatch(signInSuccess());
  } catch (err) {}
};
export const signUpSuccess = () => {
  return {
    type: userConstant.SIGN_UP_SUCCESS,
  };
};
export const signUpByEmail =
  ({ email, password, confirmPassword, name, phone }) =>
  async (dispatch) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { name, phone });

      await auth.signOut();

      // window.location.assign("https://accounts.google.com/logout");
      dispatch(signUpSuccess());
    } catch (err) {}
  };
export const handleSignOut = () => async (dispatch) => {
  try {
    // await auth.createUserWithEmailAndPassword("a@gmail.com", "111111");

    await auth.signOut();

    // window.location.assign("https://accounts.google.com/logout");

    dispatch(signOutSuccess());
  } catch (err) {}
};

export const signOutSuccess = () => {
  return {
    type: userConstant.SIGN_OUT_SUCCESS,
  };
};
export const setCurrentUser = (user) => {
  return {
    type: userConstant.SET_CURRENT_USER,
    payload: user,
  };
};
