import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AnimalCard from './AnimalCard';

const Carousel = ({data}) => {
  return (
    <Swiper  breakpoints={{320: {slidesPerView: 3,},720: {slidesPerView: 4,},1040: { slidesPerView: 5,},}}>

    {data?.map((animal,i)=>(

      <SwiperSlide key={i}>
        <AnimalCard name={animal.animalName} type={animal.typeee} genus={animal.genuss} age={animal.animalAgeYear} image={animal.animaiImageUrl} id={animal.animalId}/>
      </SwiperSlide>

    ))}
    
    
  </Swiper>
  )
}

export default Carousel
