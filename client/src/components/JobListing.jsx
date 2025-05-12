import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const { isSearched, searchQuery, setSearchQuery, jobs } = useAppContext()
    const [showFilter, setShowFilter] = useState(true)

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
                                        <input className='cursor-pointer' type="checkbox" name="" id="category" />
                                        <label className='cursor-pointer' htmlFor="category">{category}</label>
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
                                        <input className='cursor-pointer' type="checkbox" name="" id="location" />
                                        <label className='cursor-pointer' htmlFor="location">{location}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>



            </div>
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-bold text-3xl py-2' id="job-list">Latest Jobs</h3>
                <p className='mb-8'>Grab the opportunities from top companies!</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {jobs.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default JobListing
