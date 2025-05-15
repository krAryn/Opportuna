import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const RecruiterLogin = () => {

    const [formType, setFormType] = useState("Log In")
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    // for signup
    const [image, setImage] = useState()
    const { showRecruiterLogin, setShowRecruiterLogin } = useAppContext()

    // Submit Simulator
    const submitData = async () => {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, 4000)
        })
    }


    const onSubmit = async (data) => {
        console.log(data)
        console.log(isSubmitting)
        await submitData()
        console.log("Data Submitted!")
    }

    const validate = () => {
        if (Object.keys(errors).length > 0) {
            console.log(errors[Object.keys(errors)[0]].message)
        }
    }

    useEffect(() => {

        if (showRecruiterLogin) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

    }, [showRecruiterLogin])

    useEffect(() => {
        setTimeout(() => {
            if (document.querySelector(".popUp")) {
                document.querySelector(".popUp").style.transform = "translateY(-5%)"
                document.querySelector(".popUp").style.opacity = "1"
            }
        }, 0)
    })

    return showRecruiterLogin && (
        <div onClick={() => setShowRecruiterLogin(false)} className='h-[100vh] w-[100vw] absolute z-10 bg-black/50 backdrop-blur-xs flex justify-center items-center'>
            <div onClick={e => e.stopPropagation()} className='bg-white rounded-xl relative shadow-2xl m-10 p-10 text-slate-500 transition-all translate-y-[5%] duration-300 opacity-0 popUp'>
                <img src={assets.cross_icon} className='absolute right-8 top-8 cursor-pointer transition-all' onClick={(e) => setShowRecruiterLogin(false)} alt="" />
                <form onSubmit={handleSubmit(onSubmit)}>

                    {
                        formType === "Log In"
                            ? <h2 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter Log In</h2>
                            : <h2 className='text-left text-2xl text-neutral-700 font-medium'>Hey there,</h2>
                    }


                    {
                        formType === "Log In"
                            ? <p className='text-sm'>Welcome back! Please sign In to continue</p>
                            : <p className='text-sm'>Welcome Recruiter, Please Register to continue</p>
                    }


                    <div>

                    {formType === "Register" && (
                            <div className='flex items-center gap-4 my-5'>
                                <label htmlFor="image">
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image):assets.upload_area} alt="" />
                                <input 
                                    type="file" 
                                    name="" 
                                    id="image"
                                    onChange={(e) => setImage(e.currentTarget.files[0])}
                                    hidden 
                                    required
                                />
                                </label>
                                <p>
                                    Upload Company Logo <br />
                                    <span className='text-[15px] text-red-500'>File size should be less than 50KB</span>
                                </p>
                            </div>
                    )}

                        {formType === "Register" && (
                            <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <label htmlFor="company-name">
                                    <img src={assets.person_icon} alt="" />
                                </label>
                                <input
                                    className='outline-none text-sm'
                                    type="text"
                                    placeholder='Company Name'
                                    id='company-name'
                                    {...register("companyName", { required: "Please enter your Company Name!" })}
                                />
                            </div>
                        )}
                        <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <label htmlFor="email">
                                <img src={assets.email_icon} alt="" />
                            </label>
                            <input
                                className='outline-none text-sm'
                                type="text"
                                placeholder='Email Id'
                                id='email'
                                {...register("email", { required: "Please enter a correct Email Address!" })}
                            />
                        </div>
                        <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <label htmlFor="password">
                                <img src={assets.lock_icon} alt="" />
                            </label>
                            <input
                                className='outline-none text-sm'
                                type="password"
                                placeholder='Password'
                                id='password'
                                {...register("password", { required: "Please enter your Password!" })}
                            />
                        </div>
                        {formType === "Log In" && <p className='text-sm text-primary cursor-pointer my-4'>Forgot Password</p>}
                    </div>

                    

                    {
                        formType === "Log In"
                            ? !isSubmitting 
                                ? (<button
                                    className='bg-primary cursor-pointer hover:bg-primary-dull transition w-full text-white py-2 rounded-full'
                                    onClick={() => validate()}
                                    >Log In</button>)
                                : (<button
                                    className='bg-gray-300 cursor-pointer  transition w-full text-gray-600 py-2 rounded-full'
                                    disabled
                                    >Please Wait</button>)
                            : !isSubmitting 
                                ? (<button
                                    className='bg-primary cursor-pointer mt-5 hover:bg-primary-dull transition w-full text-white py-2 rounded-full'
                                    onClick={() => validate()}
                                    >Register</button>)
                                : (<button
                                    className='bg-gray-300 cursor-pointer mt-5  transition w-full text-gray-600 py-2 rounded-full'
                                    disabled
                                    >Please Wait</button>)
                    }

                    {
                        formType === "Log In"
                            ? <p className='mt-5 text-center'>Dont have an Account? <span className='text-primary cursor-pointer' onClick={() => setFormType("Register")}>Sign Up</span></p>
                            : <p className='mt-5 text-center'>Already have an Account? <span className='text-primary cursor-pointer' onClick={() => setFormType("Log In")}>Log In</span></p>
                    }

                </form>
            </div>
        </div>
    )
}

export default RecruiterLogin
