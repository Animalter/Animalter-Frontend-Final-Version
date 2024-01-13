import React, { useEffect, useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from "react-select"
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAnimalsQuery, useGetGenusQuery, useGetTypesQuery, useGetUsersQuery } from '../store/slices/apiSlice';
import AnimalTable from '../components/AnimalTable';
import PersonTable from '../components/adminpanel/PersonTable';
import UpdateForm from '../components/adminpanel/UpdateForm';
import AddForm from '../components/adminpanel/AddForm';


const AdminPanel = () => {

  const navigate=useNavigate();
  const [cookie,setCookie]=useCookies(['role']);


  const [selectedTab,setSelectedTab]=useState("animal");
  const [operationType,setOperationType]=useState("animal");
  const [showPopup,setShowPopup]=useState(false);
  const [selectedId,setSelectedId]=useState("");
  const [adoptFilter,setAdoptFilter]=useState("");

    
  const personInfo = useGetUsersQuery();
  const animalInfo=useGetAnimalsQuery();
  const types=useGetTypesQuery();
  const genuses=useGetGenusQuery();
   

  const notifyAdd = () => toast.success("Registry Added");
  const notifyUpdate = () => toast.success("Registry Updated");
  const notifyDelete = () => toast.success("Registry Deleted");
  const notifyError = () => toast.error("Operation Failed Try Again");


  const logout=()=>{

    setCookie('name',"");
    setCookie("role","");
    setCookie("id","")
    navigate("/");
    
  }

  const adoptStates=[
    {value:"adopted",label:"Adopted"},
    {value:"notadopted",label:"Not Adopted"},
    {value:"waiting",label:"Waiting"},
  ]

  const onChangeFilter = (selectedOption) => {
 
    setAdoptFilter(selectedOption.value);  
  
  };

  const changeOperation=(value)=>{

    setOperationType(value);   
  }

  useEffect(()=>{

    if(!cookie.role && !cookie.role=="admin") navigate("/login");
    
    
  },[])

  useEffect(()=>{

    if(adoptFilter) animalInfo.data.filter((element)=>{element.adoptstate==adoptFilter})

  },[adoptFilter])
  
  

  return (
    <div className='relative my-6'>

      <ToastContainer position="top-right" autoClose={5000} />

      <div className='w-full flex justify-center items-center xs:gap-3 lg:gap-5'>
        <h1 className='font-bold xs:text-2xl lg:text-3xl text-center'>Admin Panel</h1>
        <i className="fa-solid fa-right-from-bracket text-white p-1 m-2 rounded-lg bg-red-500" onClick={()=>logout()}></i>
      </div>
      

      {showPopup && (


      <div className='absolute z-20 w-full h-full backdrop-blur-sm flex flex-col  items-center'>  

      <div className='relative xs:w-9/10 lg:w-2/3 xs:h-2/3 lg:h-3/4 mx-auto bg-[#d8e2dc] flex flex-col justify-center px-8 rounded-xl'> 
       
        <i className='fa-solid fa-x absolute right-3 top-3' onClick={()=>setShowPopup(false)}></i>
        
        <div className='flex justify-center gap-5 mb-8'>
          <h5 className="text-lg capitalize font-semibold underline underline-offset-4" >{selectedTab}</h5>
          
        </div>

          <UpdateForm selectedTab={selectedTab} adoptStates={adoptStates} notifyDelete={notifyDelete} notifyUpdate={notifyUpdate} notifyError={notifyError} selectedId={selectedId} setSelectedId={setSelectedId} setShowPopup={setShowPopup} types={types} genuses={genuses}/>

        </div>

      </div>

      )}

      <div className='xs:w-9/10 md:w-4/5 mx-auto flex flex-col  gap-16 mt-10'>

      <div className='xs:w-full lg:w-1/2 mx-auto lg:pr-5'>
        <div className='flex justify-center gap-5 mb-8'>
          <h5 className={`text-lg ${operationType=="animal" ? 'font-semibold underline-offset-4 underline':''}`} onClick={()=>changeOperation("animal")}>Animal</h5>
          <h5 className={`text-lg ${operationType=="user" ? 'font-semibold underline-offset-4 underline':''}`} onClick={()=>changeOperation("user")}>Person</h5>       

        </div>

        <AddForm operationType={operationType} notifyAdd={notifyAdd} notifyError={notifyError} adoptStates={adoptStates} setSelectedId={setSelectedId} types={types} genuses={genuses}/>

      </div>

      <div className='w-full mx-auto mb-10 '>

        <div className='flex flex-col items-end'>

          <div className='w-full flex justify-center gap-5 pb-5'>
            <h5 className={`text-lg ${selectedTab=="animal" ? 'font-semibold underline-offset-4 underline':''}`} onClick={()=>setSelectedTab("animal")}>Animals</h5>
            <h5 className={`text-lg ${selectedTab=="user" ? 'font-semibold underline-offset-4 underline':''}`} onClick={()=>setSelectedTab("user")}>Person</h5>
           
          </div>
          {/* {selectedTab=="animal" && (

          <Select name="adoptfilter" value={adoptFilter} options={adoptStates} getOptionLabel={(option) => option.label} 
                  getOptionValue={(option) => option.value}  onChange={onChangeFilter} placeholder={adoptFilter || "Select Filter"} 
                  className="xs:w-1/3 md:w-1/4 lg:w-36 xs:text-xs md:text-sm mb-3 text-black rounded-lg border border-black"/>
          
          )} */}

        </div>

        <div className='my-5'>

        {selectedTab=="animal" && (

          <AnimalTable data={animalInfo?.data} state={"admin"} setSelectedId={setSelectedId} setShowPopup={setShowPopup}/>
            
        )}

        {selectedTab=="user" && (

          <PersonTable data={personInfo?.data} setSelectedId={setSelectedId} setShowPopup={setShowPopup}/>
            
        )}
          
        </div>

      </div>

      </div>
      
    </div>
  )
}

export default AdminPanel
