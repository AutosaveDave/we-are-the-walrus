import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { updateDoc, doc } from 'firebase/firestore';
import { Signout } from "./Signout";
import { useUserData } from "../../context/UserDataProvider";

export function UserDashboard( { setPage } ) {
    const { userData, changeUsername } = useUserData();
    const [ editingUsername, setEditingUsername ] = useState( false );
    const [ newUsername, setNewUsername ] = useState( userData.username );
    const handleEditBtnClick = () => { setEditingUsername( true ); }
    const handleCancelEditClick = () => { setEditingUsername( false ); }
    const handleEditUsername = ( e ) => { setNewUsername( e.target.value ); }
    const handleHostGameClick = () => { setPage( 'host' ); }
    const handleSubmitClick = async () => {
        await changeUsername( newUsername, handleCancelEditClick );
    }
    return <>
        { editingUsername 
            ? <>
                <TextField id="change-username-input" label="Username" variant="outlined" onInput={handleEditUsername} value={newUsername}/>
                <Button onClick={handleSubmitClick}>OK</Button>
                <Button onClick={handleCancelEditClick}>Cancel</Button>
            </>
            : <>
                <Typography>{ userData.username }</Typography>
                <Button onClick={handleEditBtnClick}>Edit</Button>
            </>
        }
        <Button onClick={handleHostGameClick}>Host Game</Button>
        <br/><br/>
        <Signout/>
    </>
}