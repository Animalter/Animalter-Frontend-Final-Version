import React, { useEffect, useState } from 'react'
import Example from '../assets/animalter-example-img.jpg'
import AnimalCard from '../components/AnimalCard';
import axios from 'axios';
import { useGetAnimalsQuery } from '../store/slices/apiSlice';
import Loading from '../components/Loading';

const ExplorerPage = () => {

  const animals=useGetAnimalsQuery();
  

  useEffect(()=>{

    window.scrollTo({ top: 0, behavior: 'smooth' });

  },[])


  return (
    <div className='my-8 lg:w-3/4 mx-auto'>

      <h1 className='font-bold text-xl mb-8'>Explore New Friends</h1>
      <div className='flex gap-12 flex-wrap'>
      {!animals.data ? (

        <Loading/>

      ):(
        
        animals?.data?.map((animal,i)=>{

          return(
          <AnimalCard key={i} id={animal.animalId} name={animal.animalName} type={animal.typeee} genus={animal.genuss} age={animal.animalAgeYear} image={animal.animaiImageUrl}/>
          )
          })
      )}
      </div>
      
    </div>
  )
}

export default ExplorerPage
