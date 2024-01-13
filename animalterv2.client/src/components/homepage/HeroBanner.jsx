import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroBanner = () => {

  const navigate=useNavigate();

  return (
    <div className=' flex xs:justify-center md:justify-start lg:justify-end  xs:h-96 lg:h-112 xs:bg-hero-section-responsive lg:bg-hero-section bg-cover xs:w-9/10 lg:w-4/5 m-auto my-6 rounded-md'>
      
      <div className='h-full flex flex-col justify-around items-center md:pl-6 lg:pr-16'>

        <h1 className='xs:text-3xl lg:text-4xl font-extrabold text-white'>You are Right Place <br /> for Faithful Friend</h1>

        <button className='text-white xs:px-2 xs:py-1 lg:px-3 lg:py-2 bg-[#FF566A] rounded-full border border-white hover:border-[#FF566A]' onClick={()=>navigate("/explorer")}>Find a Friend</button>
      
      </div>

    </div>
  )
}

export default HeroBanner
