import React, { useState } from "react";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button } from "@mui/material";
import { Login } from "./Login";


export function GuestHome( { auth, firebase, firestore, page, setPage } ) {

    const handleJoinClick = () => {
        setPage( 'join' );
    }
    return <>
        <Login auth={auth} firebase={firebase} />
        <br/><br/>
        <Button onClick={handleJoinClick} >Join Game</Button>
    </>
}