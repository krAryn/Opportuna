import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'


const Dashboard = () => {
  const { navigate, company, setCompany, fetchCompany, axios } = useAppContext()

  useEffect(() => {
    fetchCompany()
  }, [])

  const logout = async () => {
    const {data} = await axios("/api/company/logout")

    if (data.success) {
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
    setCompany(null)
    navigate("/")
  }

  return company && (
    <div className='min-h-screen'>
      <div className='shadow py-4'>
        <div className='px-5 flex justify-between items-center'>
          <div onClick={() => navigate("/")}>
            <img src={assets.logo_mobile} className='h-[40px] sm:hidden cursor-pointer' alt="" />
            <img src={assets.logo} className='hidden sm:block h-[40px] md:h-[45px] cursor-pointer' alt="" />
          </div>
          <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Hey, {company.name}</p>
            <div className='group h-[40px] w-[40px] cursor-pointer relative flex items-center justify-end'>
              <img src={company.image} className='w-8 border-2 rounded-full border-gray-300 shadow-' alt="" />
              <div className='absolute right-0 top-10 group-hover:h-[65px] group-hover:py-2 transition-all w-[110px] group-hover:border border-gray-300 h-0 overflow-hidden rounded shadow bg-white'>
                <ul className='text-sm flex flex-col gap-1'>
                  <li className='hover:bg-gray-100 px-4 cursor-pointer'>My Profile</li>
                  <li 
                    className='hover:bg-gray-100 px-4 cursor-pointer'
                    onClick = {logout}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start'>
        <div className='inline-block min-h-screen border-r-2 border-gray-200'>
          <ul className='flex flex-col items-start pt-5 text-gray-800'>
            <NavLink to="/recruiter-dashboard/add-job" className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full  ${isActive ? "bg-blue-100 border-r-4 border-primary/80" : "hover:bg-gray-100 "}`}>
              <img className='min-w-4' src={assets.add_icon} alt="" /><p className='max-sm:hidden'>Add Jobs</p></NavLink>
            <NavLink to="manage-jobs" className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full  ${isActive ? "bg-blue-100 border-r-4 border-primary/80" : "hover:bg-gray-100 "}`}>
              <img className='min-w-4' src={assets.home_icon} alt="" /><p className='max-sm:hidden'>Manage Jobs</p></NavLink>
            <NavLink to="view-applications" className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full  ${isActive ? "bg-blue-100 border-r-4 border-primary/80" : "hover:bg-gray-100 "}`}>
              <img className='min-w-4' src={assets.person_tick_icon} alt="" /><p className='max-sm:hidden'>View Applications</p></NavLink>
          </ul>
        </div>

        <div>

          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Dashboard
