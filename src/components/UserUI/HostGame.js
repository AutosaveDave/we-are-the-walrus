import React, { useState } from "react";
import { TextField, Typography, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useUserData } from "../../context/UserDataProvider";
import { useSessions } from "../../context/SessionsContext";
import { Navigate } from "react-router-dom";

export function HostGame() {
    const { userData, getUserId } = useUserData();
    const { createSession } = useSessions();
    const uid = getUserId();
    
    const [ title, setTitle ] = useState( '' );
    const [ joinPhrase, setJoinPhrase ] = useState( '' );
    const [ playing, setPlaying ] = useState( true );
    const [ gameReady, setGameReady ] = useState( false );

    const handleTitleInput = ( e ) => {
        setTitle( e.target.value );
    }
    const handleJoinPhraseInput = ( e ) => {
        setJoinPhrase( e.target.value );
    }
    const handlePlayingChange = ( e ) => {
        setPlaying( e.target.value );
    }
    const getNewSessionObj = () => {
        return {
            title: title,
            joinPhrase: joinPhrase,
            hostId: uid,
            hostName: userData.username,
            players: ( playing ? [ { type:'user', id:uid, nickname:userData.nickname } ] : [] ),
            spectators: ( playing ? [] : [ { id:uid, nickname:userData.nickname } ] ),
            mode: '',
            chat: [],
        };
    }
    const handleCreateSession = () => {
        createSession( getNewSessionObj(), setGameReady )
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
        <Button onClick={handleCreateSession} >Start Session</Button>
        <br/><br/>
        { gameReady && <Navigate to={`/game/${ gameReady }`} replace={true} /> }
    </>
}