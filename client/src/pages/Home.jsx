import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import Loader from '../components/Loader'

const Home = () => {

  const { jobs } = useAppContext()

  return jobs
    ? (
      <div>
        <Hero />
        <JobListing />
      </div>
    )
    : (
      <div className='w-full h-[100vh] flex justify-center items-center'>
        <Loader />
      </div>
    )
}

export default Home
