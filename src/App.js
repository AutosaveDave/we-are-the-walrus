import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from "./firebaseConfig";
import { SiteView } from './Views/SiteView';
import { useParams } from 'react-router-dom';
import { GameView } from './Views/GameView';

firebase.initializeApp( firebaseConfig );

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App( { currentView } ) {

  const [ user, authLoading, authError ] = useAuthState(auth);
  const { game_id } = useParams();
  const authSignout = () => {
    auth.signOut();
  }
  console.log(currentView)
  console.log(game_id)
  return (
    <div className="App">
      <>{ currentView === 'site' &&
        <SiteView auth={auth} user={user} firebase={firebase} firestore={firestore} authSignout={authSignout} />
      }</>
      <>{ currentView === 'game' &&
        <GameView game_id={game_id} auth={auth} user={user} firebase={firebase} firestore={firestore} authSignout={authSignout} />
      }</>
    </div>
  );
}