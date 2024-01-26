import React, { useState } from "react";
import { TextField, Typography, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useDocumentData } from "react-firebase-hooks/firestore";
import { updateDoc, doc } from 'firebase/firestore';

export function GameUI( { userData, getUserId, firestore, setPage, gameId, sessionsRef } ) {
    const sessionDoc = doc( sessionsRef, gameId );
    const [ sessionData, sessionLoading, error, sessionSnapshot ] = useDocumentData( sessionDoc );
    if(!sessionLoading){
        console.log('sessionDoc values:')
        console.log(sessionData)
    }
}