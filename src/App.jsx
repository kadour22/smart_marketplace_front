import './App.css'
import { useState } from 'react'
import ProductsList from './components/products/ProductsList'
import Login from './components/User/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Herosection from './components/HeroSection/Herosection'
import AISearchBar from './components/HeroSection/AISearchBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Herosection/>
    <AISearchBar />
      <Routes>
        <Route path='/' element={<ProductsList/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
