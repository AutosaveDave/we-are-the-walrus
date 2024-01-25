import React, { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Signout } from '../components/UserUI/Signout';
import { UserUI } from '../components/UserUI/UserUI';
import { GuestUI } from '../components/GuestUI/GuestUI';
import { SiteView } from './SiteView';
import { GameView } from './GameView';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export function ViewRouter( { auth, user, firebase, firestore, authSignout } ) {
    const router = createBrowserRouter([
      {
        path: "game/:game_id",
        element: <GameView auth={auth} user={user} firebase={firebase} firestore={firestore} authSignout={authSignout}/>,
        loader: ( { params } ) => params.game_id,
      },
      {
        path: "/",
        element: <SiteView auth={auth} user={user} firebase={firebase} firestore={firestore} authSignout={authSignout}/>,
      },
      
    ]);
    
    return <RouterProvider router={router}/>
}