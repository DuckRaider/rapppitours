import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, createUser } from "./configs/firebase";

export function Register(){
    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.inputEmail.value
        const password = event.target.inputPassword.value
        const passwordAgain = event.target.inputPasswordAgain.value

        if(password == passwordAgain){
            createUser(email, password)
        }
    }


    return(
        <div id="registerDiv">
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword" name="inputPassword"/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Repeat Password</label>
                <input type="password" class="form-control" id="inputPasswordAgain" name="inputPasswordAgain"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}