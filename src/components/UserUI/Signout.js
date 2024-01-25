import React from "react";
import { Button } from "@mui/material";

export function Signout( { user, authSignout } ) {
    return user && ( <>
        <Button className="sign-out" onClick={ () => authSignout() }>Sign Out</Button>
      </>
    )
  }