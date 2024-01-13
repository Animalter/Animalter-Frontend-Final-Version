import React, { useEffect, useState } from 'react'
import AnimalCard from '../components/AnimalCard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { useGetFilteredAnimalsQuery } from '../store/slices/apiSlice';

const SearchResult = () => {

  const params=useParams();
  const filters=params.filter.split("-");

  const result=useGetFilteredAnimalsQuery({genusId:filters[1],typeId:filters[0],age:filters[2]});
  console.log(result);
  

  useEffect(()=>{

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  },[])

  return (
    <div className='my-16 lg:w-3/4 mx-auto flex gap-10 flex-wrap'>
      
      {
        result?.data?.map((animal,i)=>(
          
          <AnimalCard key={i} name={animal.animalName} type={animal.typeee} genus={animal.genuss} image={animal.animaiImageUrl} age={animal.animalAgeYear} id={animal.animalId} />

        ))
      }
      
    </div>
  )
}

export default SearchResult
