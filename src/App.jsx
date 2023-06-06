import { useEffect, useState } from 'react'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import {Home} from './Home.jsx'
import {NotFound} from './NotFound.jsx'
import {TrailPage} from './TrailPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { AddTrail } from './AddTrail.jsx'
import { Login } from './Login.jsx'
import { Register } from './Register.jsx'
import { auth, getUser } from './configs/firebase.jsx'

function App() {
  const [currentUser, setCurrentUser] = useState()


  useEffect(()=>{
    setCurrentUser(getUser())
    console.log("====================")
    console.log(currentUser)
    console.log("====================")
  },[])

  function showUserInfo(){
    console.log(currentUser)
  }

  return (
    <>
    <BrowserRouter>
      {/*Header*/}
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
        <li className="nav-item">
          <h1>Email: {currentUser?.email}</h1>
          <button onClick={showUserInfo}></button>
        </li>
      </ul>

      {/*Routers for navigation*/}
      <Routes>
        <Route path="/" index element={<Home/>}/>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/trails' element={<TrailPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
