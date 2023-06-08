import { auth, createUser } from "./configs/firebase";

export function Register(){
    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.inputEmail.value
        const password = event.target.inputPassword.value
        const passwordAgain = event.target.inputPasswordAgain.value

        if(password == passwordAgain){
            createUser(email, password)
        }else{
            appendAlert("Passwords not identical","danger")
        }
    }


    //create a warning according with message as parameter
    function appendAlert(message, type){
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }


    return(
        <div id="registerDiv">
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input required type="email" class="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input required type="password" class="form-control" id="inputPassword" name="inputPassword"/>
            </div>
            <div class="mb-3">
                <label for="inputPasswordAgain" class="form-label">Repeat Password</label>
                <input required type="password" class="form-control" id="inputPasswordAgain" name="inputPasswordAgain"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            <div id="liveAlertPlaceholder"></div>
        </div>
    )
}