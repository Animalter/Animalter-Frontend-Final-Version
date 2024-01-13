import React from 'react'
import { Link } from 'react-router-dom';

const AnimalTable = ({data,state,setSelectedId ,setShowPopup}) => {
  return (
    <div className={`${state=="profile" ? 'w-full px-5':''}`}>

        <div className='flex justify-between border-b-2 border-black mb-5 pb-1'>
          <p className='w-1/5 font-semibold xs:text-sm md:text-md lg:text-lg'>Name</p>
          {state=="admin" &&(
          <p className='font-semibold md:text-md lg:text-lg xs:hidden lg:block'>Id</p>
          )}
          <p className='font-semibold xs:text-sm md:text-md lg:text-lg'>Type</p>
          <p className='font-semibold xs:text-sm md:text-md lg:text-lg'>Genus</p>
          <p className='font-semibold xs:text-sm md:text-md lg:text-lg'>Gender</p>
          <p className='font-semibold xs:text-sm md:text-md lg:text-lg'>Age</p>
          {state=="admin" &&(
          <p className='font-semibold xs:text-sm md:text-md lg:text-lg'>Edit</p>
          )}
        </div>

        {data && (
            data?.map((element,i)=>(
              <div key={i} className='flex justify-between items-center border-b border-black py-2'>
                <h3 className='font-bold text-lg w-1/5 xs:text-sm md:text-md lg:text-base '>{element.animalName}</h3>

                <p className='xs:text-sm md:text-md lg:text-base xs:hidden lg:block'>{element.animalId}</p>
                <p className='xs:text-sm md:text-md lg:text-base '>{element.typeee}</p>
                <p className='xs:text-sm md:text-md lg:text-base '>{element.genuss }</p>
                <p className='xs:text-sm md:text-md lg:text-base '>{element.animalGender}</p>
                <p className='xs:text-sm md:text-md lg:text-base '>{element.animalAgeYear }</p>

                {state=="admin" &&(

                  <div className='flex gap-3'>
                    <i className='fa-solid fa-pen' onClick={()=>{ setSelectedId(element.animalId); console.log(element.animalId); setShowPopup(true); }}></i>
                    <i className='fa-solid fa-trash xs:hidden md:flex' onClick={()=>{setSelectedId(element.animalId); setShowPopup(true); }}></i>
                  </div>
                )}

              </div>
            ))
        )}



    </div>
  )
}

export default AnimalTable
