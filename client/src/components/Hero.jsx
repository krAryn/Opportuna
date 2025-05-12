import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {

    const {searchQuery, setSearchQuery, setIsSearched} = useAppContext()

    const handleChange = (id, value) => {
        setIsSearched(false)
        const newSearchQuery = {...searchQuery}
        newSearchQuery[id] = value
        setSearchQuery(newSearchQuery)
    }


  return (
    <div className='container px-10 lg:px-20 w-[100vw] max-w-[1500px] m-auto my-10'>
        <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center rounded-xl px-4'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
            <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Unlock your potential and embrace new opportunities. Your next career breakthrough is within reach—explore, apply, and achieve greatness today!</p>
            <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 sm:mx-auto'>
                <div className='flex items-center'>
                    <img src={assets.search_icon} alt="" />
                    <input 
                    type="text"
                    placeholder='Search for Jobs'
                    id='title'
                    value={searchQuery.title}
                    className='max-sm:text-xs p-2 rounded outline-none w-full'
                    onChange = {(e) => handleChange(e.currentTarget.id, e.currentTarget.value)}
                    />    
                </div>
                {/* <p className='flex items-start text-2xl font-light text-gray-400'>|</p> */}
                <div className='w-[1.5px] h-[25px] bg-gray-300 rounded-full'></div>
                <div className='flex items-center'>
                    <img src={assets.location_icon} alt="" />
                    <input 
                    type="text"
                    placeholder='Location'
                    id='location'
                    value={searchQuery.location}
                    className='max-sm:text-xs p-2 rounded outline-none w-full'
                    onChange = {(e) => handleChange(e.currentTarget.id, e.currentTarget.value)}
                    />    
                </div>
                <button onClick={() => {setIsSearched(true); console.log(searchQuery)}} className='bg-primary cursor-pointer hover:bg-primary-dull px-6 py-2 rounded text-white m-1'>Search</button>
            </div>
        </div>
        <div className='px-10 border border-gray-300 shadow-md mt-5 py-6 rounded-md flex'>
            <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                <p className='font-bold text-gray-500'>Trusted By</p>
                <img className='h-6' src={assets.microsoft_logo} alt="" />
                <img className='h-6' src={assets.walmart_logo} alt="" />
                <img className='h-6' src={assets.accenture_logo} alt="" />
                <img className='h-6' src={assets.samsung_logo} alt="" />
                <img className='h-6' src={assets.amazon_logo} alt="" />
                <img className='h-6' src={assets.adobe_logo} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Hero
