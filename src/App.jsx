import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Maindev from './Componets/Maindev'
import Novabar from './Componets/Novabar'
import History from './Componets/History'
import Footer from './Componets/Footer'





function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element=
          {<>
           
           <Novabar />
            <Maindev />
            <Footer />
          </>}>
        </Route>

        <Route path='/History' element={<History></History>}></Route>
      </Routes>
    </BrowserRouter>




  )
}

export default App
