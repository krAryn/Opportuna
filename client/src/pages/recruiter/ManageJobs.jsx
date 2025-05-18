import { useEffect, useState } from 'react'
import { manageJobsData } from '../../assets/assets'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

const ManageJobs = () => {

  const [jobs, setJobs] = useState()


  const fetchJobs = async () => {
    try {
      const { data } = await axios.post("/api/company/list-jobs", {});

      if (data.success) {
        setJobs(data.jobsData.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post("/api/company/change-visiblity", { jobId: id })

      if (data.success) {
        toast.success("Toggled Visiblity")
        fetchJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return jobs
    ? jobs.length === 0 
      ? (
        <div className='flex items-center justify-center h-[70vh]'>
          <p className='text-xl sm:text-2xl'>No Jobs Posted</p>
        </div>
      )
      : (
        <div className='container p-4 max-w-5xl'>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
              <thead>
                <tr>
                  <th className='py-4 px-6 border-b border-gray-200 text-left max-sm:hidden'>#</th>
                  <th className='py-4 px-6 border-b border-gray-200 text-left'>Job Title</th>
                  <th className='py-4 px-6 border-b border-gray-200 text-left max-sm:hidden'>Date</th>
                  <th className='py-4 px-6 border-b border-gray-200 text-left max-sm:hidden'>Location</th>
                  <th className='py-4 px-6 border-b border-gray-200 text-center'>Applicants</th>
                  <th className='py-4 px-6 border-b border-gray-200 text-left'>Visiblity</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index} className='text-gray-700'>
                    <td className='py-4 px-6 border-b border-gray-200 max-sm:hidden'>{index + 1}</td>
                    <td className='py-4 px-6 border-b border-gray-200'>{job.title}</td>
                    <td className='py-4 px-6 border-b border-gray-200 max-sm:hidden'>{moment(job.date).format("ll")}</td>
                    <td className='py-4 px-6 border-b border-gray-200 max-sm:hidden'>{job.location}</td>
                    <td className='py-4 px-6 border-b border-gray-200 text-center'>{job.applicants}</td>
                    <td className='py-4 px-6 border-b border-gray-200'>
                      <div className='flex justify-center'>
                        {/* <input className='scale-125' type="checkbox" checked={job.visible} onClick={() => changeJobVisiblity(job._id)} /> */}
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                          <input type="checkbox" className="sr-only peer" checked={job.visible} onChange={() => changeJobVisiblity(job._id)} />
                          <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200">
                            
                          </div>
                          <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                        </label>
                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    : (
      <div className='w-full h-[100vh] flex justify-center items-center'>
        <Loader />
      </div>
    )
}

export default ManageJobs
