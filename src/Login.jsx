import { signInUser, signOut, auth } from "./configs/firebase"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";

export function Login(){
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

    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.inputEmail.value
        const password = event.target.inputPassword.value

        signInUser(email, password)
    }


    return(
        <>
            { authUser ? 
            <div id="loginSignedIn">
                <button onClick={signOut} className="btn btn-primary">Sign out</button>
            </div> : 
            <div id="loginDiv">
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="inputPassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            }
        </>
    )
}