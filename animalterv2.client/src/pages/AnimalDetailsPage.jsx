import React, { useEffect } from 'react'
import Image from '../components/Image'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAnimalByIdQuery, useGetAnimalImageQuery, useGetSameGenusAnimalsQuery, useGetSameTypeAnimalsQuery } from '../store/slices/apiSlice'
import Carousel from '../components/Carousel'


const AnimalDetailsPage = () => {

  const [cookie,setCookie]=useCookies(['name','role','id']);

  const navigate=useNavigate();

  const params=useParams();

  const animalDetails=useGetAnimalByIdQuery(params.id);

  const sameTypesAnimals=useGetSameTypeAnimalsQuery(animalDetails?.data?.genusId);

  const sameGenusAnimals=useGetSameGenusAnimalsQuery(animalDetails?.data?.typeeId);

  const animalimage=useGetAnimalImageQuery(animalDetails?.data?.animaiImageUrl);

  const dataUrl = `data:image/jpeg;base64,${animalimage.data}`;

  

  const notifyAdopt = () => toast.success("We received your adopt request. We contact you as soon as possible");
  const notifyError = () => toast.error("Operation failed. Try again");
  const notifyRoleError = () => toast.error("Sadece Kullanıcılar Hayvan Sahiplenebilir");

  const adoptAnimal=()=>{
    const data={
      animalId: animalDetails?.data?.animalId,
      genusId: animalDetails?.data?.genusId,
      genuss: animalDetails?.data?.genuss,
      typeeId: animalDetails?.data?.typeeId,
      typeee: animalDetails?.data?.typeee,
      animalName: animalDetails?.data?.animalName,
      adoptionState: "waiting",
      userId: cookie.id,
      animalAgeYear: animalDetails?.data?.animalAgeYear,
      animalAgeMouth: animalDetails?.data?.animalAgeMouth,
      animalAbout: animalDetails?.data?.animalAbout,
      animaiImageUrl: animalDetails?.data?.animaiImageUrl,
      animalGender: animalDetails?.data?.animalGender
    }
    if(!cookie.name){ 
      navigate("/login")
    }
    else if(cookie.role!="3"){
      notifyRoleError();
    }
    else{  
    axios.put(`http://localhost:8641/Animal/UpdateState`,data).then((res)=>{
      
      console.log(res);
      notifyAdopt();

    }).catch((err)=>{
      console.log(err);
      notifyError();
    })
    }
  }

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])


  return (
    <div className='my-10'>

    <ToastContainer position="top-right" autoClose={false} />

      <div className='xs:w-9/10 lg:w-3/4 mx-auto flex xs:flex-col lg:flex-row xs:gap-8 lg:gap-20 xs:mb-10 lg:mb-20'>

        <div className='xs:w-full lg:w-1/2 '>
          <Image src={dataUrl} className={"h-156"}/>
        </div>

        <div className='flex flex-col xs:gap-6 lg:gap-0 justify-between lg:max-w-md'>

          <div>      
            <h3 className='text-lg font-semibold capitalize'>{animalDetails?.data?.animalName}</h3>
            <p className='capitalize'>{animalDetails?.data?.typee}</p>
            <p className='capitalize'>{animalDetails?.data?.genuss}</p>
            <p>{animalDetails?.data?.animalAgeYear} Years, {animalDetails?.data?.animalAgeMouth} Months</p>
            <p className='capitalize'>{animalDetails?.data?.animalGender}</p>

          </div>
          
          <div>
            <h6 className='font-semibold text-lg'>Explication</h6>
            <p>{animalDetails?.data?.animalAbout}</p>
          </div>

          <button disabled={animalDetails?.data?.adoptionState!=='0'} onClick={(e)=>{e.preventDefault(); adoptAnimal()}} className={`w-full  p-2 border  ${animalDetails?.data?.adoptionState!=='0' ?"bg-transparent text-black border-black":"bg-[#009D69] hover:border-[#009D69] text-white border-white"} rounded-full `}>Adopt</button>
          
        </div>

      </div>

      <div className='xs:w-9/10 lg:w-3/4 mx-auto'>
        <h3 className='font-semibold text-lg my-5'>Similar</h3>

        <Carousel data={sameGenusAnimals?.data}/>

        

      </div>

      <div className='xs:w-9/10 lg:w-3/4 mx-auto'>
        <h3 className='font-semibold text-lg mb-5 mt-10'>Recommedations</h3>

        <Carousel data={sameTypesAnimals?.data}/>

      </div>
      
    </div>
  )
}

export default AnimalDetailsPage
