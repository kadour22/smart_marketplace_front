import './App.css'
import { useState } from 'react'
import ProductsList from './components/products/ProductsList'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Herosection from './components/HeroSection/Herosection'
import AISearchBar from './components/HeroSection/AISearchBar'
import FeaturesSection from './components/Features/FeatureSections'
import ProductDetail from './components/products/ProductDetail'
import LandingPage from './components/Landing/LandingPgae'
import AuthComponents from './components/User/AuthComponent'
import ContactSeller from './components/User/ContactSeller'
import Profile from './components/User/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <Navbar />
    <br />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products' element={<ProductsList/>}/>
        <Route path='/login' element={<AuthComponents/>}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
        <Route path='/seller-contact' element={<ContactSeller/>}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
