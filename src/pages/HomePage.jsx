import React from 'react'
import HeroBanner from '../components/homepage/HeroBanner'
import FilterAnimal from '../components/homepage/FilterAnimal'
import { useEffect } from 'react'
import GPTBanner from '../components/homepage/GPTBanner'

const HomePage = () => {


  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])

  return (
    <div>     
      <HeroBanner/>

      <GPTBanner/>

      <FilterAnimal/>
    </div>
  )
}

export default HomePage
