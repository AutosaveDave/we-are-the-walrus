import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export function GameView( { game_id, auth, user, firebase, firestore, authSignout } ) {
    const [ page, setPage ] = useState( 'join' );
    

    return <>
        <h4>GAME</h4>
        <p>{game_id}</p>
    </>
}