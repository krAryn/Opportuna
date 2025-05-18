import React from 'react'
import { assets } from '../assets/assets'
import parse from "html-react-parser"
import { useNavigate } from 'react-router'

const JobCard = ({ job }) => {

  const navigate = useNavigate()

  return (
    <div className='border border-gray-300 p-6 shadow rounded flex flex-col justify-between'>
      <div>

      <div className='flex justify-between items-center'>
        <img className='h-8' src={job.companyId.image} alt="" />
      </div>
      <h4 className='font-bold text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <div className='text-gray-500 text-sm mt-4'>
        {parse(job.description.slice(0, 150))}
      </div>
      </div>
      <div className='mt-4 flex gap-4 text-sm max-sm:flex-col'>

        <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0, 0);}} className='bg-primary hover:bg-primary-dull cursor-pointer transition text-white px-4 py-2 rounded flex items-center justify-center'>Apply Now</button>
        <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0, 0);}} className='text-gray-500 border hover:bg-gray-100 cursor-pointer transition border-gray-500 px-4 py-2 rounded flex items-center justify-center'>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard
