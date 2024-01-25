import React, { useState } from "react";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button } from "@mui/material";
import { Login } from "./Login";
import { GuestHome } from "./GuestHome";
import { GuestJoin } from "./GuestJoin";


export function GuestUI( { auth, firebase, firestore } ) {
    const [ page, setPage ] = useState( 'home' );
    const sessionsRef = firestore.collection('Sessions');
    const guestsRef = firestore.collection( 'Guests' );

    const Pages = {
        home: <GuestHome auth={auth} firebase={firebase} page={page} setPage={setPage} />,
        join: <GuestJoin auth={auth} firebase={firebase} page={page} setPage={setPage} sessionsRef={sessionsRef} guestsRef={guestsRef} />,
    }

    return <>
        { Pages[ page ] }
    </>
}