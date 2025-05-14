import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-10 lg:px-20 flex justify-between items-center w-[100vw] max-w-[1500px] m-auto gap-4 py-3 mt-20'>

      <img src={assets.logo_mobile} className='h-[50px]' alt="" />
      {/* <img src={assets.logo} className='h-[40px] md:h-[45px] cursor-pointer' alt="" /> */}

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Oppsberg.dev | All rights reserved.</p>
      <div className='flex gap-2.5'>
        <img width={38} src={assets.linked_icon} alt="" />
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.instagram_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
