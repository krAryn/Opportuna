import React from 'react'
import {Routes, Route} from "react-router"
import Home from "./pages/Home"
import Applications from "./pages/Applications"
import ApplyJobs from "./pages/ApplyJobs"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RecruiterLogin from './components/recruiter/RecruiterLogin'
import { useAppContext } from './context/AppContext'

const App = () => {

  return (
    <div>
      <RecruiterLogin />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
