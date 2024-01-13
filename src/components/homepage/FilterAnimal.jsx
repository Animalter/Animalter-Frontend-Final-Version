import React, { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from "react-select"
import { useGetGenusQuery, useGetTypesQuery } from '../../store/slices/apiSlice';

const FilterAnimal = () => {

  const id=useId();
  const navigate=useNavigate();

  const types=useGetTypesQuery();
  const genuses=useGetGenusQuery();

  const [type,setType]=useState("");
  const [typeId,setTypeId]=useState("");
  const [genus,setGenus]=useState("");
  const [genusId,setGenusId]=useState("");
  const [age,setAge]=useState("");

  const onChangeType=(selectedOption)=>{

    
    setTypeId(selectedOption.typeeId);
    setType(selectedOption.typeee);

  }

  const onChangeGenus=(selectedOption)=>{

    
    setGenusId(selectedOption.genusId);
    setGenus(selectedOption.genuss);

  }


  const handleSubmit=()=>{

    navigate(`/search/${typeId}-${genusId}-${age}`)
     
  }

  return (
    <div className='flex flex-col xs:items-center lg:items-start xs:h-96 lg:h-128 xs:bg-filter-field-responsive lg:bg-filter-field bg-cover xs:w-9/10 lg:w-4/5 m-auto my-6 py-5 px-10 rounded-md'>
      
     <h2 className='text-xl text-white underline underline-offset-8 font-semibold '>Detailed Search</h2>

     <form action="" className='flex flex-col items-end lg:w-1/3 lg:gap-8 xs:mt-10 lg:mt-20 '>

      <Select name="type" value={typeId} options={types?.data} getOptionLabel={(option) => option?.typeee} 
                      getOptionValue={(option) => option?.typeeId}  onChange={onChangeType} placeholder={type || "Select Type"} 
                      className="xs:w-1/2 lg:w-72 text-black rounded-lg border border-black"/>

      <Select name="genus" value={genusId} options={genuses?.data} getOptionLabel={(option) => option?.genuss} 
                      getOptionValue={(option) => option?.genusId}  onChange={onChangeGenus} placeholder={genus || "Select Genus"} 
                      className="xs:w-1/2 lg:w-72 text-black rounded-lg border border-black "/>

      
        <input type="text" id={id+'age'} value={age} placeholder="Enter Animal's Age" onChange={(e)=>setAge(e.target.value)} className='lg:w-72 rounded-lg outline-none px-2 py-1.5'/>
      

      <button onClick={handleSubmit} className='xs:w-full lg:w-72 px-2 py-1 bg-[#009D69] rounded-full text-white border border-white hover:border-[#009D69]'>Search</button>

     </form>

    </div>
  )
}

export default FilterAnimal
