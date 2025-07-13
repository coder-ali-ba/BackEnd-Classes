

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login, Signup } from './Pages/Auth/index'

function App() {


  return (
    <>
     <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>     
     </Routes>
    </>
  )
}

export default App
