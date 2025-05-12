import { createContext, useContext, useState } from "react"

const AppContext = createContext()

const AppContextProvider = ({children}) => {

    const [searchQuery, setSearchQuery] = useState({
        title: "",
        location: ""
    })

    const [isSearched, setIsSearched] = useState(false)

  return (
    <AppContext.Provider value = {{
        searchQuery, setSearchQuery, isSearched, setIsSearched
    }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}

export default AppContextProvider
