import { createContext, useContext, useState } from "react";
import { updateDoc, doc } from 'firebase/firestore';
import { useUserAuth } from "./UserAuthProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";

const userDataContext = createContext();

export function UserDataProvider({ children }) {
    const { user, firestore } = useUserAuth();
    const usersRef = firestore.collection('Users');
    const q = usersRef.where( "email", "==", user.email ).limit( 1 );
    const [ userDataArray, userDataLoading, userDataError, userDataSnapshot ] = useCollectionData( q );
    const userData = ( userDataArray ? userDataArray[0] : false );
    const getUserId = () => {
        const uidSegments = (userDataSnapshot ? userDataSnapshot._snapshot.docs.sortedSet.root.key.key.path.segments : false );
        return ( uidSegments ? uidSegments[ uidSegments.length - 1 ] : false );
    }
    const changeUsername = async ( newUsername, thenFunction ) => {
        const uid = getUserId();
        if( uid ) {
            const userDoc = doc( usersRef, uid );
            return await updateDoc( userDoc, { username: newUsername, nickname: newUsername } )
                .then( res => { thenFunction(); } )
                .catch( error => { console.log(error); } );
        }
    }

    return (
        <userDataContext.Provider
            value={{ userData, userDataLoading, userDataError, getUserId, changeUsername }}
        >
        {children}
        </userDataContext.Provider>
    );
}

export function useUserData() {
  return useContext(userDataContext);
}