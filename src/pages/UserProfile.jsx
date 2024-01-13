import React, { useEffect, useId, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetMyAnimalQuery, useGetUserByIdQuery } from '../store/slices/apiSlice';
import AnimalTable from '../components/AnimalTable';

const UserProfile = () => {
  
  const [showForm,setShowForm]=useState(false);
  const [deleteSection,setDeleteSection]=useState(false);
  const [showPassword,setShowPassword]=useState(false);

 

  const id=useId();
  const navigate=useNavigate();
  const [cookie,setCookie]=useCookies(['name']);
  const params=useParams();

  const notifyUpdate = () => toast.success("Profile Info Updated");

  const profileInfo=useGetUserByIdQuery(params.id);
  const myAnimals=useGetMyAnimalQuery(profileInfo?.data?.userId);
   
  console.log(myAnimals);
  
  
  const [name,setName]=useState(profileInfo?.data?.userName || "");
  const [password,setPassword]=useState(profileInfo?.data?.userPassword || "");
  const [email,setEmail]=useState(profileInfo?.data?.mail || "");
  const [phone,setPhone]=useState(profileInfo?.data?.phoneNumber || "");

  const changeName=(value)=>{ setName(value);  }

  const changePassword=(value)=>{  setPassword(value);  }
  
  const changeEmail=(value)=>{  setEmail(value);  }

  const changePhone=(value)=>{  setPhone(value);  }

  const editProfile=()=>{

    const data={
      userId:profileInfo.data.userId,
      userName:name,
      userPassword:password,
      mail:email,
      phoneNumber:phone,
    }
    console.log(data);
    const url=`http://localhost:8641/User`;
    axios.put(url,data).then((res)=>{
      
      notifyUpdate();    
      setCookie('name',name);

    }).catch((err)=>{
      console.log(err);
    });

  }

  const deleteProfile=()=>{

    const data={
      userId:profileInfo.data.userId,
      userName:name,
      userPassword:password,
      mail:email,
      phoneNumber:phone,
    }

    axios.delete(`http://localhost:8641/User?UserId=${profileInfo?.data?.userId}`,data).then((res)=>{
      
      if(res.status===200){  
        setCookie("name","");
        setCookie("role","");
        setCookie("id","");
        navigate("/");
      }

    }).catch((err)=>{
      console.log(err);
    });

  }

  const logout=()=>{

    setCookie('name',"");
    setCookie("role","");
    setCookie("id","")
    navigate("/");
    
  }

  useEffect(()=>{

    //if(!cookie.role) navigate('/login');

  },[])

  const adoptedAnimals=[];

  return (
    <div className='flex xs:flex-col-reverse lg:flex-row xs:w-9/10 md:w-4/5 lg:w-3/4  mx-auto my-10 '>

      <ToastContainer position="top-right" autoClose={5000} />

      <div className='xs:w-full xs:h-128 lg:h-screen lg:w-1/2 pr-3 lg:border-r-2 border-black h-screen'>

        <div className='flex justify-between items-center mb-12'>
                    
          <h1 className='font-bold xs:text-2xl md:text-3xl '>Profile Info</h1>

          <div className='flex gap-3 items-center'>
            <i className={`fa-solid ${showForm ? 'fa-x':'fa-pen'}`} onClick={()=>{setShowForm((prev)=>!prev); setDeleteSection(false); 
                                                                                  changeName(profileInfo?.data?.userName); changePassword(profileInfo?.data?.userPassword);
                                                                                  changeEmail(profileInfo?.data?.mail); changePhone(profileInfo?.data?.phoneNumber)}}></i>
            <i className={`fa-solid ${deleteSection ? 'fa-x':'fa-trash'}`} onClick={()=>{setDeleteSection((prev)=>!prev); setShowForm(false);
                                                                                         changeName(profileInfo?.data?.userName); changePassword(profileInfo?.data?.userPassword);
                                                                                         changeEmail(profileInfo?.data?.mail); changePhone(profileInfo?.data?.phoneNumber)}}></i>
            <i className="fa-solid fa-right-from-bracket text-white p-1 rounded-lg bg-red-500" onClick={()=>logout()}></i>
          </div>
          
          
        </div>

        <div className='flex flex-col gap-3'>

        <h3 className='font-bold md:text-lg'>{profileInfo?.data?.userName}</h3>
        
        <div className='flex items-center gap-4'>
          <p className={`${showPassword ? 'text-black':'text-transparent'} md:text-lg`}>{profileInfo?.data?.userPassword}</p>
          <i onClick={()=>setShowPassword((prev)=>!prev)} className={`fa-solid ${showPassword ? 'fa-lock-open':'fa-lock'} `}></i>
        </div>
        
        <p className='md:text-lg'>{profileInfo?.data?.mail}</p>
        <p className='md:text-lg'>{profileInfo?.data?.phoneNumber}</p>

        </div>

        {showForm && (

        <div className='mt-12 '>          

          <form action="" onSubmit={(e)=>editProfile(e)} className=' flex flex-col gap-5'>

            <input type="text" id={id+'name'} value={name} onChange={(e)=>changeName(e.target.value)} placeholder='Enter Your Name' className='px-3 py-1 rounded-full border border-black outline-none'/>          
               
            <input type="password" name="" id={id+'password'} value={password} onChange={(e)=>changePassword(e.target.value)} placeholder='Enter Your Password' className='px-3 py-1 rounded-full border border-black outline-none' />
       
            <input type="email" id={id+'mail'} value={email} onChange={(e)=>changeEmail(e.target.value)} placeholder='Enter Your Email' className='px-3 py-1 rounded-full border border-black outline-none'/>
       
            <input type="tel" id={id+'phone'} value={phone} onChange={(e)=>changePhone(e.target.value)} pattern='[0]{1}[5]{1}[0-9]{9}' placeholder='Enter Your Phone Number' className='px-3 py-1 rounded-full border border-black outline-none'/>
       
            <button onClick={()=>editProfile()} className='w-full p-2 rounded-full text-white bg-[#009D69] border border-white hover:border-[#009D69]'>Update</button>               

          </form>

        </div>

        )} 

        {deleteSection && (
            
          <div>

            <p className='font-bold mt-12 text-center mb-5'>Are You Sure Delete This Profile</p>

            <button onClick={()=>deleteProfile()} className='w-full p-2 rounded-full text-white bg-[#FF566A] border border-white hover:border-[#FF566A]'>Delete</button>

          </div>
        )}

      </div>

      <div className='flex flex-col items-center xs:h-72 lg:h-screen xs:w-full lg:w-2/3'>

        <h3 className='font-bold xs:text-2xl md:text-3xl xs:mb-6 lg:mb-12'>Adopted Animals</h3>

          <AnimalTable data={myAnimals?.data} state={"profile"} />
        
      </div>     
      
      
    </div>
  )
}

export default UserProfile
