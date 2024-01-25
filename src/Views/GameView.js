import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export function GameView( { auth, user, firebase, firestore, authSignout } ) {
    const { game_id } = useParams();
    const [ page, setPage ] = useState( 'join' );
    

    return <>
        <h4>GAME</h4>
        <p>{game_id}</p>
    </>
}