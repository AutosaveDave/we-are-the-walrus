import { useAuthState } from "react-firebase-hooks/auth";
import { useUserAuth } from "../../context/UserAuthProvider";
import { firebaseConfig } from "../../firebaseConfig";
import { Button } from "@mui/material";

export function Login(  ) {
  
  const { signInWithGoogle } = useUserAuth();
  

  return (
    <>
      <Button className="login-btn" onClick={signInWithGoogle}>Sign in with Google</Button>
    </>
  )
  
  }