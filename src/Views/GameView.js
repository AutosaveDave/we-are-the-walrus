import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export function GameView() {
    const [ page, setPage ] = useState( 'join' );
    const { game_id } = useParams();
    
    return <>
        <h4>GAME</h4>
        <p>{game_id}</p>
    </>
}