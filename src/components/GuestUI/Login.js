import { firebaseConfig } from "../../firebaseConfig";
import { Button } from "@mui/material";

export function Login( {auth, firebase} ) {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <Button className="login-btn" onClick={signInWithGoogle}>Sign in with Google</Button>
      </>
    )
  
  }