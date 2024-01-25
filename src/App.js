
import React, { useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from "./firebaseConfig";
import { SiteView, ViewContainer } from './Views/SiteView';
import { GameView } from './Views/GameView';
import { ViewRouter } from './Views/ViewRouter';

firebase.initializeApp( firebaseConfig );

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

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