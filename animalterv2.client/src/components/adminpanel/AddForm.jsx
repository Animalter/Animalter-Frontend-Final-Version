import React, { Fragment, useId, useState } from 'react'
import Select from "react-select"
import axios from 'axios';

const AddForm = ({notifyAdd,notifyError,operationType,adoptStates,setSelectedId,types,genuses}) => {

  const id=useId();

  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [role,setRole]=useState("");
  
  const [animalName,setAnimalName]=useState("");
  const [type,setType]=useState("");
  const [typeId,setTypeId]=useState("");
  const [genus,setGenus]=useState("");
  const [genusId,setGenusId]=useState("");
  const [age,setAge]=useState();
  const [ageMonth,setAgeMonth]=useState("");
  const [image,setImage]=useState("");
  const [adoptState,setAdoptState]=useState("");
  const [gender,setGender]=useState("");
  const [about,setAbout]=useState();


  const changeName=(value)=>{  setName(value);  }

  const changePassword=(value)=>{  setPassword(value);  }

  const changeEmail=(value)=>{  setEmail(value);  }

  const changePhone=(value)=>{  setPhone(value);  }

  const changeAnimalName=(value)=>{  setAnimalName(value);  }

  const changeType=(value)=>{  setType(value);  }
  
  const changeGenus=(value)=>{  setGenus(value);  }

  const changeAge=(value)=>{  setAge(value);  }

  const changeAgeMonth=(value)=>{  setAgeMonth(value);  }

  const changeImage=(value)=>{  setImage(value);  }

  const resetStates=()=>{

    setName("");
    setPassword("");
    setEmail("");
    setPhone("");

    setAnimalName("");
    setType("");
    setTypeId("");
    setGenus("");
    setGenusId("");
    setAge("");
    setAgeMonth("");
    setImage("");
    setAdoptState("");
    setGender("");
    setAbout("");

    setSelectedId("");
  }
  

  const onChangeType=(selectedOption)=>{

    
    setTypeId(selectedOption.typeeId);
    setType(selectedOption.typeee);

  }

  const onChangeGenus=(selectedOption)=>{

    
    setGenusId(selectedOption.genusId);
    setGenus(selectedOption.genuss);

  }

  const onChangeGender = (selectedOption) => {
 
    setGender(selectedOption.value);  
  
  };

  const onChangeRole = (selectedOption) => {
 
    setRole(selectedOption.value);  
  
  };

  const onChange = (selectedOption) => {
 
    setAdoptState(selectedOption.value);  
  
  };


  const addData=()=>{

    const personUrl="http://localhost:8641/User";
    const animalUrl="http://localhost:8641/Animal";
    let data;
    let url;

    const animalData={
      animalName:animalName,
      typeee:type,
      typeeId:typeId,
      genuss:genus,
      genusId:genusId,
      animalAgeYear:age,
      animalAgeMouth:ageMonth,
      animaiImageUrl:image,
      adoptionState:adoptState,
      animalGender:gender,
      animalAbout:about,
      adoptionStatusId: 0,
      userId:null

    }

    const personData={
      userName:name,
      userPassword:password,
      mail:email,
      phoneNumber:phone,
      roleId:role=="user" ? "3":"4",

    }

    if(operationType=="animal") {
      data=animalData;
      url=animalUrl;
    } 
    else {
      data=personData
      url=personUrl;
    }

    if(operationType=="animal"){
      axios.post("http://localhost:8641/Image/upload",image).then((res)=>{

      }).catch((err)=>{
        console.log(err);
        notifyError();

      })
    }

    axios.post(url,data).then(()=>{

      notifyAdd();
      resetStates();

    }).catch((err)=>{

      console.log(err);
      notifyError();
    })

  }


  return (
    <Fragment>
        {(operationType=="user") && (

          <form action="" className='flex flex-col gap-3'>
    
            <input required type="text" id={id+'name'} value={name} onChange={(e)=>changeName(e.target.value)} placeholder='Enter Name' className='px-3 py-1 rounded-full border border-black outline-none'/>          
               
            <input required type="password" name="" id={id+'password'} value={password} onChange={(e)=>changePassword(e.target.value)} placeholder='Enter Password' className='px-3 py-1 rounded-full border border-black outline-none' />

            <input required type="email" id={id+'email'} value={email} onChange={(e)=>changeEmail(e.target.value)} placeholder='Enter Email' className='px-3 py-1 rounded-full border border-black outline-none'/>

            <input required type="tel" id={id+'tel'} value={phone} onChange={(e)=>changePhone(e.target.value)} pattern='[0]{1}[5]{1}[0-9]{9}' placeholder='Enter Phone Number' className='px-3 py-1 rounded-full border border-black outline-none'/>          

            <Select name="role" value={role} options={[{label:"User",value:"user"},{label:"Admin",value:"admin"}]} getOptionLabel={(option) => option.label} 
                      getOptionValue={(option) => option.value}  onChange={onChangeRole} placeholder={role || "Select Role"} 
                      className="xs:w-1/2 lg:w-48 text-black rounded-lg border border-black"/> 

            <button onClick={(e)=>{e.preventDefault(); addData()}} className='w-full p-2 rounded-full text-white bg-[#009D69] border border-white hover:border-[#009D69]'>Add Person</button>       

          </form>

          )}

          {operationType=="animal" && (

          <form action=""  className='flex flex-col gap-3'>
    
              <input required type="text" id={id+'animalName'} value={animalName} onChange={(e)=>changeAnimalName(e.target.value)} placeholder="Enter Animal's Name" className='px-3 py-1 rounded-full border border-black outline-none'/>          

              <Select name="type" value={typeId} options={types?.data} getOptionLabel={(option) => option?.typeee} 
                      getOptionValue={(option) => option?.typeeId}  onChange={onChangeType} placeholder={type || "Select Type"} 
                      className="xs:w-1/2 lg:w-48 text-black rounded-lg border border-black"/>

              <Select name="genus" value={genusId} options={genuses?.data} getOptionLabel={(option) => option?.genuss} 
                      getOptionValue={(option) => option?.genusId}  onChange={onChangeGenus} placeholder={genus || "Select Genus"} 
                      className="xs:w-1/2 lg:w-48 text-black rounded-lg border border-black"/>

              <input required type="text" id={id+'age'} value={age} onChange={(e)=>changeAge(e.target.value)} placeholder="Enter Animal's Age" className='px-3 py-1 rounded-full border border-black outline-none'/>          
   
              <input required type="text" id={id+'agemonth'} value={ageMonth} onChange={(e)=>changeAgeMonth(e.target.value)} placeholder="Enter Animal's Month" className='px-3 py-1 rounded-full border border-black outline-none'/>   
   
              <Select name="gender" value={gender} options={[{label:"Male",value:"male"},{label:"Female",value:"female"}]} getOptionLabel={(option) => option.label} 
                      getOptionValue={(option) => option.value}  onChange={onChangeGender} placeholder={gender || "Select Gender"} 
                      className="xs:w-1/2 lg:w-48 text-black rounded-lg border border-black"/>                 

              <Select name="adopt" value={adoptState} options={adoptStates} getOptionLabel={(option) => option.label} 
                      getOptionValue={(option) => option.value}  onChange={onChange} placeholder={adoptState || "Select State"} 
                      className="xs:w-1/2 lg:w-48 text-black rounded-lg border border-black"/>

              <input required type="text" id={id+'about'} value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="Write Animal About" className='px-3 py-1 rounded-full border border-black outline-none'/> 
            
              <input required style={{ display: "none" }} type="file" id={id+'image'} value={image} onChange={(e)=>changeImage(e.target.value)} placeholder="Enter Animal's Image" />
              <label htmlFor={id+'image'} className='flex gap-3 items-center '>
              <i className="fa-solid fa-images text-3xl"></i>
              <span className='font-semibold'>Add a Photo</span>
              </label>

              <button onClick={(e)=>{e.preventDefault(); addData()}} className='w-full p-2 rounded-full text-white bg-[#009D69] border border-white hover:border-[#009D69]'>Add Animal</button>       

          </form>
          )}
      
    </Fragment>
  )
}

export default AddForm
