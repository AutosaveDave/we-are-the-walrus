import { createContext, useContext, useState } from "react";
import { updateDoc, doc } from 'firebase/firestore';
import { useUserAuth } from "./UserAuthProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUserData } from "./UserDataProvider";

const sessionsContext = createContext();

export function SessionsProvider({ children }) {
    const { user, firestore } = useUserAuth();
    const { userData, userDataLoading, userDataError, getUserId, changeUsername } = useUserData();
    const sessionsRef = firestore.collection('Sessions');

    const getNewGameId = ( res ) => {
        const segs = res._delegate._key.path.segments;
        return segs[ segs.length - 1 ];
    } 

    const createSession = async ( newSessionObj, thenFunction ) => {
        await sessionsRef.add( newSessionObj )
        .then( res => { 
            const gid = getNewGameId( res );
            thenFunction( gid );
         } )
        .catch( error => {
            console.log( error );
        } )
    }

    return (
        <sessionsContext.Provider
            value={{ createSession }}
        >
        {children}
        </sessionsContext.Provider>
    );
}

export function useSessions() {
  return useContext(sessionsContext);
}