import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCard from './JobCard'
import { Link, NavLink } from 'react-router'

const JobListing = () => {

    const { isSearched, searchQuery, setSearchQuery, jobs } = useAppContext()
    
    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryFilter = (e) => {
            if (e.currentTarget.checked) {
                // add the element 
                const newSelectedCategory = [...selectedCategories]
                newSelectedCategory.push(e.currentTarget.name)
                setSelectedCategories(newSelectedCategory)
            } else {
                // remove the element
                const newSelectedCategory = [...selectedCategories].filter((item) => item !== e.currentTarget.name)

                setSelectedCategories(newSelectedCategory)
            }

    }

    const handleLocationFilter = (e) => {
        if (e.currentTarget.checked) {
            // add the element 
            const newSelectedLocation = [...selectedLocations]
            newSelectedLocation.push(e.currentTarget.name)
            setSelectedLocations(newSelectedLocation)
        } else {
            // remove the element
            const newSelectedLocation = [...selectedLocations].filter((item) => item !== e.currentTarget.name)

            setSelectedLocations(newSelectedLocation)
        }
    }

    useEffect(() => {
        setFilteredJobs(jobs)
        selectedCategories.length > 0 && setFilteredJobs(prev => prev.filter(job => selectedCategories.includes(job.category)))

        selectedLocations.length > 0 && setFilteredJobs(prev => prev.filter(job => selectedLocations.includes(job.location)))

        searchQuery.title.length > 0 && setFilteredJobs(prev => prev.filter(job => String(job.title).toLowerCase().includes(String(searchQuery.title).toLowerCase())))

        searchQuery.location.length > 0 && setFilteredJobs(prev => prev.filter(job => String(job.location).toLowerCase().includes(String(searchQuery.location).toLowerCase())))

        setCurrentPage(1)
        
    }, [selectedCategories, selectedLocations, searchQuery, jobs])

    return (
        <div className='container px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-start w-[100vw] max-w-[1500px] m-auto'>
            <div className='w-full lg:w-1/4 bg-white px-4 relative'>
                {
                    (isSearched && (searchQuery.title.length > 0 || searchQuery.location.length > 0)) && (
                        <>
                            <h3 className='font-bold text-lg py-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600 flex gap-0.5'>
                                {searchQuery.title && (
                                    <span className='flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                        {searchQuery.title}
                                        <img onClick={() => setSearchQuery((searchQuery) => ({ ...searchQuery, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchQuery.location && (
                                    <span className='flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                        {searchQuery.location}
                                        <img onClick={() => setSearchQuery((searchQuery) => ({ ...searchQuery, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                <button onClick={() => setShowFilter((prev) => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden w-[100px]'>
                    {showFilter ? "Close" : "Filters"}
                </button>

                <div className={`no-scrollbar ${showFilter ? "max-lg:shadow-xl max-lg:pb-6 max-lg:border max-lg:h-[625px] max-lg:opacity-100" : "max-lg:py-0 max-lg:border-0 max-lg:h-[0px] max-lg:opacity-0"} max-lg:bg-white max-lg:mt-2 max-lg:rounded-xl max-lg:border-gray-200 max-lg:px-4 overflow-auto max-lg:absolute max-lg:z-10 transition-all duration-100`}>
                    <div>
                        <h4 className='font-bold text-lg py-4'>Search by Categories</h4>
                        <ul className='text-gray-600 flex flex-col gap-2'>
                            {
                                JobCategories.map((category, index) => (
                                    <li className='flex gap-3 items-baseline' key={index}>
                                        <input 
                                        className='cursor-pointer' 
                                        type="checkbox" 
                                        name={category} 
                                        id={`category${index}`} 
                                        onChange={handleCategoryFilter}
                                    />
                                        <label className='cursor-pointer selection:bg-[transparent]' htmlFor={`category${index}`}>{category}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className='mt-10'>
                        <h4 className='font-bold text-lg py-4'>Search by Location</h4>
                        <ul className='text-gray-600 flex flex-col gap-2'>
                            {
                                JobLocations.map((location, index) => (
                                    <li className='flex gap-3 items-baseline' key={index}>
                                        <input 
                                        className='cursor-pointer' 
                                        type="checkbox" 
                                        name={location} 
                                        id={`location${index}`} 
                                        onChange={handleLocationFilter}
                                    />
                                        <label className='cursor-pointer selection:bg-[transparent]' htmlFor={`location${index}`}>{location}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                            {/* (currentPage - 1) * 6 - (currentPage) * 6
                                0 - 6
                                6 - 12
                                12 - 18
                                18 - 24
                            */}

            </div>
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-bold text-3xl py-2' id="job-list">Latest Jobs</h3>
                <p className='mb-8'>Grab the opportunities from top companies!</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            {
                (jobs.length) > 0 && (
                    <div className='flex gap-2 mt-10 mb-10 items-center justify-center'>
                        <a href='#job-list'>
                            <img src={assets.left_arrow_icon} onClick={() => setCurrentPage(prev => prev - 1)} className={`${currentPage !== 1?"cursor-pointer":"hidden"}`} alt="" />
                        </a>
                        {Array(Math.ceil(filteredJobs.length / 6)).fill(0).map((_, index) => {
                            return (
                                <a href="#job-list" key={index}><button onClick={() => setCurrentPage(index + 1)} className={`cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${(currentPage === index + 1)?"bg-blue-100 text-blue-500 scale-90":"text-gray-500 hover:scale-105 transition"}`} key={index}>{index + 1}</button></a>
                            )
                        })}
                        <a href='#job-list'>
                            <img src={assets.right_arrow_icon} onClick={() => setCurrentPage(prev => prev + 1)} className={`${currentPage !== Math.ceil(filteredJobs.length/6)?"cursor-pointer":"hidden"}`} alt="" />
                        </a>
                    </div>
                )
            }
            </section>

        </div>
    )
}

export default JobListing
