import React, { useState } from "react";
import { UserSetup } from "../UserSetup/UserSetup";
import { UserDashboard } from "./UserDashboard";
import { HostGame } from "./HostGame";
import { GameUI } from "../Game/GameUI";
import { useUserData } from "../../context/UserDataProvider";
export function UserUI() {
    const { userData, userDataLoading } = useUserData();
    const [ page, setPage ] = useState( 'dash' );
    const [ gameId, setGameId ] = useState( false );

    return ( <>
        <> { ( page === 'dash' ) && 
            ( !userDataLoading
                ? ( userData
                    ? <UserDashboard setPage={setPage}/>
                    : <UserSetup />
                )
                : <p>Loading...</p>
            ) 
        } </>
        <> { ( page === 'host' ) &&
            <HostGame setPage={setPage} setGameId={setGameId} />
        } </>
        <> { (page === 'lobby') &&
            <GameUI setPage={setPage} gameId={gameId} />
        } </>
    </> );
}