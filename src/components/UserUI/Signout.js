import React from "react";
import { Button } from "@mui/material";
import { useUserAuth } from "../../context/UserAuthProvider";

export function Signout() {
    const { authSignout } = useUserAuth();
    return <>
      <Button className="sign-out" onClick={ () => authSignout() }>Sign Out</Button>
    </>
  }