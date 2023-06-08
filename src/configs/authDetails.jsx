import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export function AuthDetails(){
    const [authUser, setAuthUser] = useState(null)

    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })
    },[])

    return(
        <>
        {authUser ?<p id="headerAccountDivEmail">{authUser.email}</p> : <p id="headerAccountDivEmail">Not signed in</p>}
        </>
    )
}