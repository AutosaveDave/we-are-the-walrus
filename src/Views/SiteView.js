import React, { useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Signout } from '../components/UserUI/Signout';
import { UserUI } from '../components/UserUI/UserUI';
import { GuestUI } from '../components/GuestUI/GuestUI';
import { useUserAuth } from '../context/UserAuthProvider';

export function SiteView() {
    const { user } = useUserAuth();

    return (
        <>
            <Container>
                { user 
                    ? <UserUI /> 
                    : <GuestUI /> 
                }
            </Container>
        </>
    );
}
