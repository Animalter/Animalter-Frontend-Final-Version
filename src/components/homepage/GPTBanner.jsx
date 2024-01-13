import React from 'react'
import { useNavigate } from 'react-router-dom';

const GPTBanner = () => {

  const navigate=useNavigate();

  return (
    <div className='bg-gpt-bg h-96 xs:w-9/10 lg:w-4/5 mx-auto bg-cover text-white p-8 flex flex-col justify-between rounded-md'>

      <p className='xs:text-sm md:text-md'>ChatGPT 3.5</p>

      <div className='flex flex-col gap-5'>
        <h3 className='xs:text-3xl lg:text-4xl'>Get Advice From ChatGPT</h3>
        <p className='xs:text-md md:text-lg lg:text-xl'>ChatGPT can tell you which animal you should adopt based on your character</p>
      </div>

      <div className='w-full flex xs:justify-start lg:justify-end'>
        <button onClick={()=>navigate("/chatwithgpt")} className='xs:px-2 xs:py-1 px-3 py-2 font-semibold  rounded-full text-white border-2 border-white hover:bg-white hover:text-black'>Chat with GPT</button>
      </div>
  </div>
  )
}

export default GPTBanner
