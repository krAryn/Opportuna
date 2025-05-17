import { createContext, useContext, useEffect, useState } from "react"
import { jobsData } from "../assets/assets"
import { useNavigate } from "react-router"          
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { toast } from "react-toastify"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

const AppContext = createContext()

const AppContextProvider = ({children}) => {
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState({
        title: "",
        location: ""
    })
    
    const [isSearched, setIsSearched] = useState(false)
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const {user} = useUser()
    const [company, setCompany] = useState()

    const fetchCompany = async () => {
        try {
            const {data} = await axios.post("/api/company/is-auth", {})
            console.log(data)
            if (data.success) {
                setCompany(data.company)
                navigate("/recruiter-dashboard/add-job") 
            } else {
                console.log(data.message)
                toast.error("Please Log In to continue!")
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    return (
    <AppContext.Provider value = {{
        searchQuery, setSearchQuery, isSearched, setIsSearched, jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin, navigate, user, company, setCompany, axios, fetchCompany
    }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider
