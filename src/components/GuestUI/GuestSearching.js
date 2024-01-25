import React, { useState } from "react";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, TextField, Typography } from "@mui/material";
import { Login } from "./Login";
import { Navigate } from "react-router-dom";

export function GuestSearching( { sessionsRef, joinPhrase, validPhrase } ) {
    const q = sessionsRef.where( "joinPhrase", "==", joinPhrase ).limit( 1 );
    const [ sessions, loading, error, snapshot ] = useCollectionData( q );
    const [ sessionId, setSessionId ] = useState( false );
    const [ searching, setSearching ] = useState( false );
    const [ err, setErr ] = useState( false );

    const getSessionId = () => {
        if( error || !snapshot ) { return false; }
        console.log(snapshot)
        const uidSegments = ( snapshot ? snapshot._snapshot.docs.sortedSet.root.key.key.path.segments : false );
        return ( uidSegments ? uidSegments[ uidSegments.length - 1 ] : false );
    }

    const handleJoinClick = () => {
        setSearching( true );
    }

    if( searching && !loading ) {
        if( !error ) {
            if( sessions[0] ) {
                setSessionId( getSessionId() );
            } else {
                setErr( 'No games matched that Join Phrase.' );
            }
        } else {
            setErr( error );
        }
        setSearching( false );
    }

    return <>
        { searching && 
            <>{ ( loading
                ?   <Typography color='darkblue'>Searching...</Typography>
                :   <>{ sessions[0] && !error &&
                        <Typography color='darkgreen'>FOUND GAME!</Typography>
                    }</>
            ) }</>
        }
        <br/>
        <br/>
        { err && <><Typography color="darkred">{ err }</Typography><br/></> }
        <Button onClick={handleJoinClick} variant="contained" disabled={ searching || !validPhrase }>Find Game</Button>
        { sessionId && <Navigate to={`/game/${ sessionId }`} replace={true} /> }
    </>
}