import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
export function UserSetup( { usersRef, user, firestore, firebase } ) {
    const [ newUsername, setNewUsername ] = useState('');
    const [ validName, setValidName ] = useState( false );

    const handleChange = ( e ) => {
        setNewUsername( e.target.value );
        setValidName( e.target.value.length >= 3 );
    }
    const submitNewUsername = async () => {
        if( !validName ) { return ; }
        await usersRef.add( {
            email: user.email,
            username: newUsername,
            nickname: newUsername,
            createdOn: firebase.firestore.FieldValue.serverTimestamp(),
        } )
            .then(res => res)
            .catch(error => {
                console.log(error);
            })
    }

    return <>
        <Typography>Enter a username to use for { user.email }</Typography>
        <TextField id="username-input" label="Username" variant="outlined" onInput={handleChange} value={newUsername}/>
        <Button onClick={submitNewUsername} disabled={!validName}>Submit</Button>
    </>
}