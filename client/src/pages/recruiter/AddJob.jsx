import {useEffect, useRef, useState} from 'react'
import { useForm } from 'react-hook-form'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting, errors}
  } = useForm()

  const submitData = async () => {
    return new Promise((res, _) => {
      setTimeout(() => {
        res()
      }, 4000)
    })
  }

  const {axios} = useAppContext()

  const onSubmit = async (jobData) => {

    // jobData = { 
    //   title: "", 
    //   category: "", 
    //   location: "", 
    //   level: "", 
    //   salary: , 
    //   description: ""
    // }
    jobData.description = document.querySelector(".ql-editor").innerHTML

    try {
      const {data} = await axios.post("/api/company/post-job", jobData)

      if (data.success) {
        toast.success("Job Posted Successfully")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      reset()
      document.querySelector(".ql-editor").innerHTML = ""
    }

  }

  useEffect(() => {
    if (!document.querySelector("#editor").innerHTML) {
      new Quill("#editor", {
        theme: "snow",
        placeholder: "Start Here..."
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='container py-4 px-5 flex flex-col w-full items-start gap-3 text-slate-700'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input 
          type="text" 
          placeholder='Type here'
          className='w-full px-3 py-2 border border-gray-300 rounded max-w-[600px]'
          {...register("title", {required: "Please enter a Job Title"})} />
      </div>

      <div className='w-full max-w-[600px]'>
        <p className='my-2'>Job Description</p>
        <div id='editor'>
            {/* ql-editor class contains the required information */}
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded'
            {...register("category", {required: "Please select a category"})}
            >
              <option disabled selected>Choose a Category</option>
              {JobCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
              ))}
            </select>
        </div>
        <div>
          <p className='mb-2'>Job Location</p>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded'
            {...register("location", {required: "Please select a Location"})}
            >
              <option disabled selected>Choose a Location</option>
              {JobLocations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
              ))}
            </select>
        </div>
        <div>
          <p className='mb-2'>Job Level</p>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded'
            {...register("level", {required: "Please select a Level"})}
            >
              <option disabled selected>Choose a Level</option>
              <option value="Beginner Level">Beginner Level</option>
              <option value="Intermediate Level">Intermediate Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
        </div>
      </div>
      <div>
        <p className='mb-2'>Job Salary</p>
        <input 
          type="Number" 
          min={0}
          className='w-full px-3 py-2 border border-gray-300 rounded sm:w-[120px]'
          placeholder='25000' 
          {...register("salary", {required: "Please enter the Salary"})} />
      </div>

      {!isSubmitting
        ? <button className='cursor-pointer w-38 py-3 mt-4 bg-black text-white rounded'>Add Job</button>
        : <button className='w-38 py-3 mt-4 bg-gray-300 text-gray-600 rounded' disabled>Please Wait</button>}
    </form>
  )
}

export default AddJob
