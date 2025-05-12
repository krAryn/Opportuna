import { createContext, useContext, useEffect, useState } from "react"
import { jobsData } from "../assets/assets"

const AppContext = createContext()

const AppContextProvider = ({children}) => {

    const [searchQuery, setSearchQuery] = useState({
        title: "",
        location: ""
    })

    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])

    const fetchJobs = async() => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs().then()
    }, []) 

  return (
    <AppContext.Provider value = {{
        searchQuery, setSearchQuery, isSearched, setIsSearched, jobs, setJobs
    }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider
