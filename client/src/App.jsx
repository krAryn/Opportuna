import React, { useEffect } from 'react'
import {Routes, Route} from "react-router"
import Home from "./pages/Home"
import Applications from "./pages/Applications"
import ApplyJobs from "./pages/ApplyJobs"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RecruiterLogin from './components/recruiter/RecruiterLogin'
import { useAppContext } from './context/AppContext'
import AddJob from './pages/recruiter/AddJob'
import Dashboard from './pages/recruiter/Dashboard'
import ManageJobs from './pages/recruiter/ManageJobs'
import ViewApplications from './pages/recruiter/ViewApplications'
import { useLocation } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'quill/dist/quill.snow.css'

const App = () => {

  const location = useLocation()

  return (
    <div>
      <ToastContainer />
      <RecruiterLogin />
      {!String(location.pathname).includes("recruiter") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/recruiter-dashboard" element={<Dashboard />}>
          <Route index element={<AddJob />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>

      </Routes>
      {!String(location.pathname).includes("recruiter") && <Footer />}
    </div>
  )
}

export default App
