import React from 'react'
import { useAppContext } from '../context/AppContext'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'

const Home = () => {

  return (
    <div>
      <Hero />
      <JobListing />
    </div>
  )
}

export default Home
