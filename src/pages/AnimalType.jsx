import React from 'react'
import { useParams } from 'react-router-dom'
import AnimalCard from '../components/AnimalCard';
import Example from '../assets/animalter-example-img.jpg'
import { useEffect } from 'react'
import { useGetSameTypeAnimalsQuery } from '../store/slices/apiSlice';
import Loading from '../components/Loading';

const AnimalType = () => {

  const params =useParams();
  const parameteres=params.animaltype.split("-");

  const filteredAnimals=useGetSameTypeAnimalsQuery(parameteres[1]);
  console.log(filteredAnimals);
  

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])

  return (
    <div className='p-8 lg:w-3/4 mx-auto'>
      <h1 className='capitalize text-2xl font-bold mb-8'>{parameteres[0]}</h1>

      <div className='flex gap-10 flex-wrap'>
        
        {!filteredAnimals.data ? (

          <Loading/>

        ):(

          filteredAnimals.data.map((animal,i)=>(
            <AnimalCard key={i} name={animal.animalName} type={animal.typeee} genus={animal.genuss} image={animal.animaiImageUrl} age={animal.animalAgeYear} id={animal.animalId}/>
          ))

        )}
      </div>
      
    </div>
  )
}

export default AnimalType
