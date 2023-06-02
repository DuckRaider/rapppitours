import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxrBuw5tj788SweSp4HoCpyoqkUcnNtrA",
    authDomain: "rappitoursdb.firebaseapp.com",
    projectId: "rappitoursdb",
    storageBucket: "rappitoursdb.appspot.com",
    messagingSenderId: "763119332318",
    appId: "1:763119332318:web:9c3a4d2ff484fbd79e0b4f"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{db}