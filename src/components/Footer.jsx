import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#817FA2] text-white flex xs:flex-col md:flex-row xs:gap-8 md:gap-0 md:justify-center  py-3'>

      <div className='flex justify-around md:w-2/5'>

        <div className='flex flex-col items-center'>
          <h3 className='font-bold text-lg mb-3'>Animalter</h3>

          <p className='underline mb-2 cursor-pointer'>Privacy Police</p>
          <p>@copyright 2023, <br /> Tüm Hakları Saklıdır</p>

        </div>

        <div className='flex flex-col items-center'>
          <h3 className='font-bold text-lg mb-3'>Follow Us</h3>

          <div className='flex gap-10'>
            <i className="fa-brands fa-facebook text-2xl hover:text-blue-400"></i>
            <i className="fa-brands fa-twitter text-2xl hover:text-cyan-500"></i>
          </div>

          <div className='flex gap-10'>
            <i className="fa-brands fa-instagram text-2xl hover:text-purple-600"></i>
            <i className="fa-brands fa-tiktok text-2xl hover:text-[#f72585]"></i>
          </div>

        </div>

      </div>

      <div className='flex justify-around md:w-2/5'>

        <div>
          <h3 className='font-bold text-lg mb-3'>Contact</h3>
          <div className='flex items-center gap-2 mb-2'>
            <i className="fa-brands fa-google"></i>
            <p className='hover:underline'>info@gmail.com</p>

          </div>
        
          <i className="fa-brands fa-whatsapp text-2xl mr-6 hover:text-green-500"></i>
          <i className="fa-brands fa-telegram text-2xl hover:text-cyan-600"></i>      

        </div>

        <div className='flex flex-col'>
          <h3 className='font-bold text-lg mb-3'>App</h3>
       
          <i className="fa-brands fa-google-play text-2xl cursor-pointer"></i>
          <i className="fa-brands fa-app-store text-2xl cursor-pointer"></i>    
        
        </div>

      </div>
      
    </div>
  )
}

export default Footer
