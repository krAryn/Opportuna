import React from 'react'
import { assets, viewApplicationsPageData } from '../../assets/assets'

const ViewApplications = () => {
  return (
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
            {viewApplicationsPageData.map((user, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b border-gray-200 text-center'>{index + 1}</td>
                <td className='py-2 px-4 border-b border-gray-200 text-center'>
                  <div className='flex items-center'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={user.imgSrc} alt="" />
                  {user.name}
                  </div>
                </td>
                <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{user.jobTitle}</td>
                <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{user.location}</td>
                <td className='py-2 px-4 border-b border-gray-200'>
                  <a href="" 
                    target='_blank'
                    className='bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center'>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-4 border-b border-gray-200 relative group cursor-pointer'>
                  <div className='relative inline-block text-left'>
                    <button className='text-gray-500 action-button cursor-pointer'>...</button>
                    <div className='z-10 hidden absolute right-5 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
