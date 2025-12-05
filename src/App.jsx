import './App.css'
import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import ProductsList from './components/products/ProductsList'
import Navbar from './components/Navbar/Navbar'
import ProductDetail from './components/products/ProductDetail'
import LandingPage from './components/Landing/LandingPgae'
import AuthComponents from './components/User/AuthComponent'
import ContactSeller from './components/User/ContactSeller'
import Profile from './components/User/Profile'
import Wishlist from './components/products/Wishlist'
import ConversationList from './components/Messages/ConversationList'

function App() {

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
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/conversations' element={<ConversationList />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
