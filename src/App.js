import React,{useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Container/Home'
import Login from './Components/Login'
import { fetchUser } from './utils/fetchUser'
function App() {
  const navigate=useNavigate()
  useEffect(() => {
const user=fetchUser()
if(!user){
  navigate('/login')
}
  }, [])
  
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='*' exact element={<Home />} />
    </Routes>
  )
}

export default App
