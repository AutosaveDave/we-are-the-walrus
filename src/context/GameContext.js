import { createContext, useContext, useState } from "react";
import { updateDoc, doc } from 'firebase/firestore';
import { useUserAuth } from "./UserAuthProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";

const gameContext = createContext();

export function GameProvider({ children }) {
    const { user, firestore } = useUserAuth();
    const sessionsRef = firestore.collection('Sessions');
    const usersRef = firestore.collection('Users');
    const q = usersRef.where( "email", "==", user.email ).limit( 1 );
    const [ userDataArray, userDataLoading, userDataError, userDataSnapshot ] = useCollectionData( q );
    const userData = ( userDataArray ? userDataArray[0] : false );
    const [ gameId, setGameId ] = useState( false );
    

    return (
        <gameContext.Provider
            value={{  }}
        >
        {children}
        </gameContext.Provider>
    );
}

export function useGame() {
  return useContext(gameContext);
}