
import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from "./firebaseConfig";
import { ViewRouter } from './Views/ViewRouter';

firebase.initializeApp( firebaseConfig );

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {

  const [ user, authLoading, authError ] = useAuthState(auth);

  const authSignout = () => {
    auth.signOut();
  }
  
  return (
    <div className="App">
      <ViewRouter auth={auth} user={user} firebase={firebase} firestore={firestore} authSignout={authSignout} />
    </div>
  );
}