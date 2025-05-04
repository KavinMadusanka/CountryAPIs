import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import NotFound from './pages/NotFound.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Countries from './pages/Countries.jsx';
import Signup from './pages/Signup.jsx';
import SignIn from './pages/SignIn.jsx';
import CountryDetailsPage from './pages/CountryDetailsPage.jsx';
import Homepage from './pages/Homepage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      {/* <Homepage /> */}
      <main className='relative min-h-screen overflow-x-hidden'>
        <div className=' absolute -bottom-20 -right-30 w-[600px] h-[600px] bg-gradient-to-tr
        from-teal-500/20 to-blue-500/20 rounded-full blur-[80px]'></div>
        <div className=' absolute -top-28 -left-10 w-[600px] h-[600px] bg-gradient-to-tr
        from-teal-500/20 to-blue-500/20 rounded-full blur-[80px]'></div>
        <div className= 'overflow-hidden'>
          <Routes>
            <Route path="/" element={< Homepage/> } />
            <Route path="*" element={< NotFound/> } />
            <Route path="/about" element={< AboutUs/> } />
            <Route path="/Countries" element={< Countries/> } />
            <Route path="/Signup" element={< Signup/> } />
            <Route path="/SignIn" element={< SignIn/> } />
            <Route path="/country-details/:countryCode" element={<CountryDetailsPage />} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
