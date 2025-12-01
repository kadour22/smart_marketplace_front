import './App.css'
import { useState } from 'react'
import ProductsList from './components/products/ProductsList'
import Login from './components/User/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Herosection from './components/HeroSection/Herosection'
import AISearchBar from './components/HeroSection/AISearchBar'
import FeaturesSection from './components/Features/FeatureSections'
import ProductDetail from './components/products/ProductDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Herosection/>
    <br />
      <Routes>
        <Route path='/' element={<ProductsList/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
