import React, { useState } from "react";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, TextField, Typography } from "@mui/material";
import { Login } from "./Login";
import { GuestSearching } from "./GuestSearching";

export function GuestJoin( { auth, firebase, firestore, page, setPage, guestsRef, sessionsRef } ) {

    const [ joinPhrase, setJoinPhrase ] = useState( '' );
    const [ validPhrase, setValidPhrase ] = useState( false );
    

    const handlePhraseInput = ( e ) => {
        const val = e.target.value;
        setJoinPhrase( val );
        setValidPhrase( val.length >= 3 );
    }
    
    const handleBackClick = () => {
        setPage( 'home' );
    }

    return <>
        <br/><br/>
        <TextField id="guest-joinphrase-input" onInput={handlePhraseInput} value={joinPhrase} label='Join Phrase' variant="outlined" />
        <br/>
        { !validPhrase && 
            <Typography color="darkred">Join Phrase must be at least 3 characters.</Typography>
        }
        <br/>
        <GuestSearching sessionsRef={sessionsRef} joinPhrase={joinPhrase} validPhrase={validPhrase} />
        <br/><br/>
        <Button variant="outlined" onClick={handleBackClick}>Back</Button>
    </>
}