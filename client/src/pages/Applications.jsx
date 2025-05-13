import {useState} from 'react'
import { assets } from '../assets/assets'

const Applications = () => {

  const [isEditable, setIsEditable] = useState(false)
  const [resume, setResume] = useState()

  return (
    <div className='container px-10 min-h-[65vh] lg:px-20 max-w-[1500px] m-auto my-10'>
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {
          isEditable ? (
            <div className='flex'>
              <label className='flex items-center' htmlFor="resume">
                <p className='bg-blue-100 text-primary px-4 py-2 rounded-md mr-2 cursor-pointer'>Select Resume</p>
                <input type="file" name="resume" id="resume" onChange={e => setResume(e.currentTarget.files[0])} hidden />
                <img src={assets.profile_upload_icon} className='cursor-pointer' alt="" />
              </label>
              <button onClick={() => setIsEditable(false)} className='bg-green-100 border border-green-400 rounded-md px-4 py-2 ml-2 cursor-pointer'>Save</button>
            </div>
          ) : (
            <div className='flex gap-2'>
              <a className='bg-blue-100 text-primary px-4 py-2 rounded-md' href="">
                Resume
              </a>
              <button onClick={() => setIsEditable(true)} className='text-gray-500 border border-gray-300 rounded-md px-4 py-2 cursor-pointer'>
                Edit
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Applications
