import React, { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Signout } from '../components/UserUI/Signout';
import { UserUI } from '../components/UserUI/UserUI';
import { GuestUI } from '../components/GuestUI/GuestUI';

export function SiteView( { auth, user, firebase, firestore, authSignout } ) {

    return (
        <>

            <Container>
                { user ? <UserUI user={user} firebase={firebase} firestore={firestore}/> : <GuestUI auth={auth} firebase={firebase} firestore={firestore} />}
            </Container>
            <Container>
                <Signout user={user} authSignout={authSignout}/>
            </Container>

        </>
    );
}
