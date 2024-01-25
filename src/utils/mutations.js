import { getFirestore, doc, addDoc, collection, setDoc, Timestamp, updateDoc } from "firebase/firestore"; 
import app from "../firebase-config";

export async function addNewUser( data ) {

  const { email } = data;

  const db = getFirestore( app );

  const docData = {
    userId: email,
    email: email,
    nickname: [],
    accountCreated: Timestamp.now(),
  };

  return await setDoc( doc( collection( db, "Users" ) ), docData, {merge:false} )
    .then(res => res)
    .catch(error => {
        console.log(error);
    })
}