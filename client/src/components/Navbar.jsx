import React from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, UserProfile } from "@clerk/clerk-react";
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';

const CustomUserButton = () => {
    return (
        <div className='flex items-center justify-center'>
            <UserButton />
        </div>
    )
}


const Navbar = () => {
    const { openSignIn } = useClerk()

    const {showRecruiterLogin, setShowRecruiterLogin, user, fetchCompany, company, navigate} = useAppContext()

    return (
        <div className='shadow py-4'>
            <div className='container px-10 lg:px-20 flex justify-between items-center w-[100vw] max-w-[1500px] m-auto'>
                <Link to={"/home"}>
                <img src={assets.logo_mobile} className='h-[40px] sm:hidden cursor-pointer' alt="" />
                <img src={assets.logo} className='hidden sm:block h-[40px] md:h-[45px] cursor-pointer' alt="" />
                </Link>
                {
                    user ? (
                        <div className='flex items-center gap-3'>
                            <Link to={"/applications"}>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden'>Hi, {user.fullName}</p>
                            <CustomUserButton />
                        </div>
                    ) : (

                        <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={(e) => {
                                e.stopPropagation(); 
                                fetchCompany() 
                                if (company) {
                                    navigate("/recruiter-dashboard/add-job")
                                } else {
                                    setShowRecruiterLogin(true);
                                }
                                }} className='text-gray-600 cursor-pointer'>Recruiters' Space</button>
                            <button onClick={() => {
                                openSignIn()
                            }} className='bg-primary hover:bg-primary-dull transition cursor-pointer text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
