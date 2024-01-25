import React, { useState } from "react";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { UserSetup } from "../UserSetup/UserSetup";
import { UserDashboard } from "./UserDashboard";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { HostGame } from "./HostGame";
import { GameUI } from "../Game/GameUI";
export function UserUI( { user, firebase, firestore } ) {
    const sessionsRef = firestore.collection('Sessions');
    const UsersRef = firestore.collection('Users');
    const q = UsersRef.where( "email", "==", user.email ).limit( 1 );
    const [ values, loading, error, snapshot ] = useCollectionData( q );
    const [ page, setPage ] = useState( 'dash' );
    const [ gameId, setGameId ] = useState( false );
    const getUserId = () => {
        const uidSegments = (snapshot ? snapshot._snapshot.docs.sortedSet.root.key.key.path.segments : false );
        return ( uidSegments ? uidSegments[ uidSegments.length - 1 ] : false );
    }

    return ( <>
        <> { ( page === 'dash' ) && 
            ( !loading
                ? ( values[0] 
                    ? <UserDashboard usersRef={UsersRef} user={user} userData={values[0]} getUserId={getUserId} firestore={firestore} firebase={firebase} setPage={setPage}/>
                    : <UserSetup usersRef={UsersRef} user={user} firestore={firestore} firebase={firebase}/>
                )
                : <p>Loading...</p>
            ) 
        } </>
        <> { ( page === 'host' ) &&
            <HostGame userData={values[0]} getUserId={getUserId} firestore={firestore} setPage={setPage} setGameId={setGameId} sessionsRef={sessionsRef}/>
        } </>
        <> { (page === 'lobby') &&
            <GameUI userData={values[0]} getUserId={getUserId} firestore={firestore} setPage={setPage} gameId={gameId} sessionsRef={sessionsRef}/>
        } </>
    </> );
}