import {useEffect, useState} from 'react'
import { assets, jobsApplied } from '../assets/assets'
import moment from "moment"
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Applications = () => {

  const [isEditable, setIsEditable] = useState(false)
  const [resume, setResume] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {userData, userApplications, fetchUserData, user, axios, fetchUserApplications} = useAppContext()

  useEffect(() => {
    fetchUserApplications()
  }, [userData])

  const updateResume = async () => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("resume", resume)
      formData.append("userId", userData._id)
      const {data} = await axios.post("/api/user/update-resume", formData)

      if (data.success) {
        toast.success(data.message)
        fetchUserData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }

    setIsEditable(false)
    setResume(null)
  }

  return (
    <div className='container px-10 min-h-[65vh] lg:px-20 max-w-[1500px] m-auto my-10'>
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {
          isEditable || userData && userData.resume === "" ? (
            <div className='flex'>
              <label className='flex items-center' htmlFor="resume">
                <p className='bg-blue-100 text-primary px-4 py-2 rounded-md mr-2 cursor-pointer'>{resume? resume.name : "Select Resume"}</p>
                <input type="file" name="resume" id="resume" onChange={e => setResume(e.currentTarget.files[0])} hidden />
                <img src={assets.profile_upload_icon} className='cursor-pointer' alt="" />
              </label>
              {!isSubmitting 
                ? <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-md px-4 py-2 ml-2 cursor-pointer'>Save</button>
                :<button onClick={updateResume} className='bg-gray-300 border border-gray-300 text-gray-600 rounded-md px-4 py-2 ml-2 cursor-pointer' disabled>Please Wait</button>}
            </div>
          ) : (
            <div className='flex gap-2'>
              <a className='bg-blue-100 text-primary px-4 py-2 rounded-md' href={userData ? userData.resume : ""}>
                Resume
              </a>
              <button onClick={() => setIsEditable(true)} className='text-gray-500 border border-gray-300 rounded-md px-4 py-2 cursor-pointer'>
                Edit
              </button>
            </div>
          )
        }
      </div>
      <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
      <table className='min-w-full bg-white border border-gray-300 rounded-lg'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>Company</th>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>Job Title</th>
            <th className='py-3 px-4 border-b border-gray-300 text-left max-sm:hidden'>Location</th>
            <th className='py-3 px-4 border-b border-gray-300 text-left max-sm:hidden'>Date</th>
            <th className='py-3 px-4 border-b border-gray-300 text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {userApplications.map((job, index) => true ? (
            <tr key={index}>
              <td className='py-3 px-4 border-b border-gray-300'>
                <div className='flex items-center gap-2'>
                <img className='w-8 h-8' src={job.companyId.image} alt="" />
                {job.companyId.name}
                </div>
              </td>
              <td className='py-3 px-4 border-b border-gray-300'>{job.jobId.title}</td>
              <td className='py-3 px-4 border-b border-gray-300 max-sm:hidden'>{job.jobId.location}</td>
              <td className='py-3 px-4 border-b border-gray-300 max-sm:hidden'>{moment(job.date).format("ll")}</td>
              <td className='py-3 px-4 border-b border-gray-300'>
                <span className={`${job.status === "Accepted" ? "bg-green-100" : job.status === "Rejected" ? "bg-red-100": "bg-blue-100"} px-4 py-1.5 rounded-full`}>

                {job.status}
                </span>
                </td>
            </tr>
          ): (null))}
        </tbody>
      </table>
    </div>
  )
}

export default Applications
