import { useState } from 'react'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import {Home} from './Home.jsx'
import {NotFound} from './NotFound.jsx'
import {TrailPage} from './TrailPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { AddTrail } from './AddTrail.jsx'

function App() {
  const [count, setCount] = useState(0)

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
      </ul>

      {/*Routers for navigation*/}
      <Routes>
        <Route path="/" index element={<Home/>}/>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/trails' element={<TrailPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
