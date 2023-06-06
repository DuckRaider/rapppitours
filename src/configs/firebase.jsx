import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxrBuw5tj788SweSp4HoCpyoqkUcnNtrA",
    authDomain: "rappitoursdb.firebaseapp.com",
    projectId: "rappitoursdb",
    storageBucket: "rappitoursdb.appspot.com",
    messagingSenderId: "763119332318",
    appId: "1:763119332318:web:9c3a4d2ff484fbd79e0b4f"
};

function createUser(email, password){
    //from https://firebase.google.com/docs/auth/web/password-auth?hl=en#create_a_password-based_account
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("WORKED")
      setLoginInformation(user.email)

      window.location.replace("/trails")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  });
}
function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("Successful sign in")
        // ...
        window.location.replace("/trails")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
function signOut(){
    auth.signOut()
}

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
let currentUser = getAuth(app).currentUser

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user)
        currentUser = user
        console.log(currentUser)
        return user;
    } else {
        return null;
    }
});

function signInWithGoogle(){
    signInWithPopup(auth, provider)
    .then(result => {
        //from https://firebase.google.com/docs/auth/web/google-signin?hl=de
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        window.location.replace("/trails")
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

function getUser(){
    return currentUser
}

export{db, auth, createUser, signInUser, getUser, signOut, signInWithGoogle}