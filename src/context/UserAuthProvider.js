import { createContext, useContext, useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from "../firebaseConfig";

firebase.initializeApp( firebaseConfig );

const _auth = firebase.auth();
const firestore = firebase.firestore();

const userAuthContext = createContext();

export function UserAuthProvider({ children }) {
  const auth = useAuthState( _auth );
  const [ user ] = auth;

  const authSignout = () => {
    _auth.signOut();
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    _auth.signInWithPopup(provider);
  }
  
  return (
    <userAuthContext.Provider
      value={{ auth, user, authSignout, signInWithGoogle, firestore, firebase }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}