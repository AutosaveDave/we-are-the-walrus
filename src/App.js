import React from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SiteView } from './Views/SiteView';
import { useLoaderData, useParams } from 'react-router-dom';
import { GameView } from './Views/GameView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserAuthProvider } from './context/UserAuthProvider';
import { UserDataProvider } from './context/UserDataProvider';
import { SessionsProvider } from './context/SessionsContext';
import UserDataSwitch from './context/UserDataSwitch';
import SessionsSwitch from './context/SessionsSwitch';

const router = createBrowserRouter([
      {
        path: "game/:game_id",
        element: <GameView/>,
        loader: ( { params } ) => { return { game_id: params.game_id, currentView: 'game' } },
      },
      {
        path: "/",
        element: <SiteView />,
        loader: ( { params } ) => { return { game_id: false, currentView: 'site' } },
      }, 
], { basename: process.env.REACT_APP_PUBLIC_URL } );
console.log(process.env.REACT_APP_PUBLIC_URL)

export default function App() {

  return (
    <div className="App">
      <UserAuthProvider>
        <UserDataSwitch>
          <SessionsSwitch>
            <RouterProvider router={router} />
          </SessionsSwitch>
        </UserDataSwitch>
      </UserAuthProvider>
    </div>
  );
}