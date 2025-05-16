import { createContext, useContext, useEffect, useState } from "react"
import { jobsData } from "../assets/assets"
import { useNavigate } from "react-router"          
import { useUser } from "@clerk/clerk-react"




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
    
    const fetchJobs = async() => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, []) 
    
    return (
    <AppContext.Provider value = {{
        searchQuery, setSearchQuery, isSearched, setIsSearched, jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin, navigate, user
    }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider
