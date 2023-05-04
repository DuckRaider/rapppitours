import { useState } from 'react'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import {Home} from './Home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home/>}/>
        {/*<Route path="/" element={<Home/>}/>*/}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
