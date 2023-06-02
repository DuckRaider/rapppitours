import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}
async function getUser(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user)
            return user;
        } else {
            return null;
        }
      });
}
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()

export{db, auth, createUser, signInUser, getUser}