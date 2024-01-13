import React, { useState } from 'react'
import Image from '../components/Image'
import { Link } from 'react-router-dom'
import { useGetAnimalImageQuery } from '../store/slices/apiSlice'
import Example from '../assets/animalter-example-img.jpg'

const AnimalCard = ({name,type,genus,age,image,id}) => {

  const animalimage=useGetAnimalImageQuery(image);

  const dataUrl = `data:image/jpeg;base64,${animalimage.data}`;


  return (
    <Link to={`/animal/${type}/${id}`}>
    <div className='relative xs:h-48 lg:h-60 xs:w-24 lg:w-36'>

        <div className='absolute top-0 left-0 '>
          
          <Image src={dataUrl} className={"xs:h-48 lg:h-60"}/>
          
        </div>

        <div className='absolute bottom-0 -mb-0.5 z-10 bg-[#D9D9D9] opacity-75 w-full xs:px-1 lg:px-3 py-2 '>

          <div className='flex justify-between '>
            <p className='text-sm capitalize'>{name}</p>
            <p className='text-sm capitalize'>{type}</p>

          </div>

          <div className='flex justify-between'>
            <p className='text-sm capitalize'>{genus}</p>
            <p className='text-sm' >{age}</p>

          </div>

        </div>

    </div>
    </Link>
  )
}

export default AnimalCard
