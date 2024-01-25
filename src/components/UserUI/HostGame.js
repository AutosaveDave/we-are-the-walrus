import React, { useState } from "react";
import { TextField, Typography, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { updateDoc, doc } from 'firebase/firestore';

export function HostGame( { userData, getUserId, firestore, setPage, setGameId, sessionsRef } ) {
    const uid = getUserId();
    

    const [ title, setTitle ] = useState( '' );
    const [ joinPhrase, setJoinPhrase ] = useState( '' );
    const [ playing, setPlaying ] = useState( true );

    const getNewGameId = ( res ) => {
        const segs = res._delegate._key.path.segments;
        return segs[ segs.length - 1 ];
    } 

    const handleTitleInput = ( e ) => {
        setTitle( e.target.value );
    }
    const handleJoinPhraseInput = ( e ) => {
        setJoinPhrase( e.target.value );
    }
    const handlePlayingChange = ( e ) => {
        setPlaying( e.target.value );
    }
    const createSession = async () => {
        await sessionsRef.add( {
            title: title,
            joinPhrase: joinPhrase,
            hostId: uid,
            hostName: userData.username,
            players: ( playing ? [ { type:'user', id:uid, nickname:userData.nickname } ] : [] ),
            spectators: ( playing ? [] : [ { id:uid, nickname:userData.nickname } ] ),
            mode: '',
            chat: [],
        } )
        .then( res => { 
            const gid = getNewGameId( res );
            setGameId( gid );
            setPage( 'lobby' );
         } )
        .catch( error => {
            console.log( error );
        } )
    }

    return <>
        <TextField id="host-title-input" onInput={handleTitleInput} value={title} label='Game Name'/>
        <br/><br/>
        <TextField id="host-joinphrase-input" onInput={handleJoinPhraseInput} value={joinPhrase} label='Join Phrase'/>
        <br/><br/>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Use this device as a...</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={ playing }
                name="radio-buttons-group"
                onChange={handlePlayingChange}
            >
                <FormControlLabel value={true} control={<Radio />} label="Player" />
                <FormControlLabel value={false} control={<Radio />} label="Display" />
            </RadioGroup>
        </FormControl>
        <br/><br/>
        <Button onClick={createSession} >Start Session</Button>
        <br/><br/>
    </>
}