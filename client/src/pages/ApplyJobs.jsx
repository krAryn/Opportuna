import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import kconvert from "k-convert"
import moment from "moment"
import parse from "html-react-parser"
import JobCard from '../components/JobCard'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ApplyJobs = () => {

  const { id } = useParams()
  const { jobs, userData, navigate, userApplications, axios, fetchUserApplications } = useAppContext()
  const [jobData, setJobData] = useState()
  const [applied, setApplied] = useState(false)

  const checkAlreadyApplied = () => {

    if (!jobData) {
      return
    }

    const hasApplied = userApplications.filter(item => item.jobId._id === jobData._id)
    if (hasApplied.length > 0) {
      setApplied(true)
    } else {
      setApplied(false)
    }
  }

  useEffect(() => {
    checkAlreadyApplied()
  }, [jobData, userApplications])

  const applyHandler = async () => {

    try {
      if (!userData) {
        return toast.error("Please Login to Apply for Jobs")
      }

      if (userData.resume === "") {
        navigate("/applications")
        return toast.error("Please attach a resume to Apply")
      }

      const { data } = await axios.post("/api/user/apply", {
        jobId: jobData._id,
        userId: userData._id
      })

      if (data.success) {
        toast.success("Application sent")
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    for (let job of jobs) {
      if (job._id === id) {
        setJobData(job)
        return
      }
    }
  }, [id, jobs])

  return jobData ? (
    <div className='container px-10 lg:px-20 flex flex-col w-[100vw] max-w-[1500px] m-auto py-10 min-h-screen'>
      <div className='bg-white text-black rounded w-full'>
        <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
          <div className='flex flex-col md:flex-row items-center'>
            <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200 shadow' src={jobData.companyId.image} alt="" />
            <div className='text-center md:text-left text-neutral-700'>
              <h1 className='text-2xl sm:text-4xl font-bold'>{jobData.title}</h1>
              <div className='flex flex-wrap max-md:justify-center gap-6 items-center text-gray-600 mt-2'>
                <span className='flex items-center gap-1'>
                  <img src={assets.suitcase_icon} alt="" />
                  {jobData.companyId.name}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.location_icon} alt="" />
                  {jobData.location}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.person_icon} alt="" />
                  {jobData.level}
                </span>
                <span className='flex items-center gap-1'>
                  <img src={assets.money_icon} alt="" />
                  CTC: ₹{kconvert.convertTo(jobData.salary)}
                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
            <button
              className='bg-primary hover:bg-primary-dull transition cursor-pointer p-2.5 px-10 text-white rounded'
              onClick={applyHandler}>{applied ? "Applied" : "Apply Now"}</button>
            <p className='mt-2 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
          </div>

        </div>

        <div className='flex flex-col lg:flex-row justify-between items-start'>
          <div className='w-full lg:w-2/3'>
            <h2 className='font-bold text-2xl mb-4'>Job Description</h2>
            <div className='rich-text'>{parse(jobData.description)}</div>
            <button
              className='bg-primary hover:bg-primary-dull transition cursor-pointer p-2.5 px-10 text-white rounded mt-10'
              onClick={applyHandler}>{applied ? "Already Applied" : "Apply Now"}</button>
          </div>

          {/* Side br for More Jobs from same org */}
          <div className='lg:w-1/3 mt-8 lg:mt-0 lg:ml-8'>
            <h2 className='mb-4'>More Jobs from {jobData.companyId.name}</h2>
            <div className='max-lg:grid max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 flex flex-col gap-4'>
              {jobs
                .filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
                .filter(job => {
                  for (let userApplication of userApplications) {
                    if (userApplication.jobId._id === job._id) {
                      return false
                    }
                  }
                  return true
                }).slice(0, 3).map((job, index) => <JobCard key={index} job={job} />)}
            </div>
          </div>

        </div>

      </div>
    </div>
  ) : (
    <div className='w-full h-[100vh] flex justify-center items-center'>
    <Loader />
  </div>
  )
}

export default ApplyJobs
