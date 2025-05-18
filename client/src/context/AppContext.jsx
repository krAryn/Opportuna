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
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const {user} = useUser()
    const [company, setCompany] = useState()

    const [userData, setUserData] = useState()
    const [userApplications, setUserApplications] = useState([])
    
    const fetchJobs = async() => {
        // setJobs(jobsData)
        try {
            const {data} = await axios.get("/api/jobs/list")

            if (data.success) {
                setJobs(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCompany = async () => {
        try {
            const {data} = await axios.post("/api/company/is-auth", {})
            if (data.success) {
                setCompany(data.company)
            } else {
                toast.error("Please Log In to continue!")
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
        if (user) {
            try {
                const {data} = await axios.post("/api/user/user", {userId: user.id})
                if (data.success) {
                    setUserData(data.user)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const fetchUserApplications = async () => {

        if (!userData) {
            return
        }

        try {
            const {data} = await axios.get("/api/user/applications", {
                headers: {userid: userData._id}
            })

            if (data.success) {
                setUserApplications(data.applications)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()
        fetchUserData()
    }, [user]) 

    useEffect(() => {
        fetchUserApplications()
    }, [userData])
    
    return (
    <AppContext.Provider value = {{
        searchQuery, setSearchQuery, isSearched, setIsSearched, jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin, navigate, user, company, setCompany, axios, fetchCompany, userData, userApplications, setUserApplications, fetchUserData, fetchUserApplications
    }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider
