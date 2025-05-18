import { useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../../assets/assets'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/AppContext'
import Loader from '../../components/Loader'

const ViewApplications = () => {

  const [applicants, setApplicants] = useState()
  const { axios } = useAppContext()

  const fetchJobApplications = async () => {
    try {
      const { data } = await axios.post("/api/company/applicants", {})

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleApplicantStatus = async (applicantId, status) => {
    try {
      const { data } = await axios.post("/api/company/change-status", { applicantId, status })
      if (data.success) {
        fetchJobApplications()
        toast.success("Done")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchJobApplications()
  }, [])

  return applicants
    ? applicants.length === 0
      ? (
        <div className='flex items-center justify-center h-[70vh]'>
          <p className='text-xl sm:text-2xl'>No Applications yet</p>
        </div>
      )
      : (
        <div className='container mx-auto p-4'>
          <div>
            <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='py-2 px-4 text-left'>#</th>
                  <th className='py-2 px-4 text-left'>Full Name</th>
                  <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
                  <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                  <th className='py-2 px-4 text-left'>Resume</th>
                  <th className='py-2 px-4 text-left'>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={index} className='text-gray-700'>
                    <td className='py-2 px-4 border-b border-gray-200 text-center'>{index + 1}</td>
                    <td className='py-2 px-4 border-b border-gray-200 text-center'>
                      <div className='flex items-center'>
                        <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                        {applicant.userId.name}
                      </div>
                    </td>
                    <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{applicant.jobId.title}</td>
                    <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{applicant.jobId.location}</td>
                    <td className='py-2 px-4 border-b border-gray-200'>
                      <a href={applicant.userId.resume}
                        target='_blank'
                        className='bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center'>
                        Resume <img src={assets.resume_download_icon} alt="" />
                      </a>
                    </td>
                    <td className='py-2 px-4 border-b border-gray-200 relative group cursor-pointer'>
                      {
                        applicant.status === "Pending"
                          ? <div className='relative inline-block text-left'>
                            <button className='text-gray-500 action-button cursor-pointer'>...</button>
                            <div className='z-10 hidden absolute right-5 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                              <button onClick={() => handleApplicantStatus(applicant._id, "Accepted")} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer'>Accept</button>
                              <button onClick={() => handleApplicantStatus(applicant._id, "Rejected")} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer'>Reject</button>
                            </div>
                          </div>
                          : <div>{applicant.status}</div>
                      }

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

export default ViewApplications
