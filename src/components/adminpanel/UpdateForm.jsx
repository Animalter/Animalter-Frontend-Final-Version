import React, { Fragment, useEffect, useId, useState } from 'react'
import Select from "react-select"
import axios from "axios";

const UpdateForm = ({selectedTab,notifyDelete,notifyUpdate,notifyError,selectedId,setSelectedId,adoptStates,setShowPopup,types,genuses}) => {

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
    setGenus("");
    setAge("");
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


  const editData=()=>{

    const animalUrl=`http://localhost:8641/Animal/GetAnimalById?Id=${selectedId}`;
    const personUrl=`http://localhost:8641/User/GetUserById?Id=${selectedId}`;
    let url;

    if(selectedTab=="animal") url=animalUrl
    else url=personUrl

    axios.get(url).then((res)=>{

      console.log(res);

      if(selectedTab=="animal"){
        setAnimalName(res.data.animalName);
        setType(res.data.typeee);
        setTypeId(res.data.typeeId);
        setGenus(res.data.genuss);
        setGenusId(res.data.genusId);
        setAge(res.data.animalAgeYear)
        setAgeMonth(res.data.animalAgeMouth)
        setAdoptState(res.data.adoptionState)
        setImage(res.data.animaiImageUrl)
        setGender(res.data.animalGender)
        setAbout(res.data.animalAbout)
        setSelectedId(res.data.animalId);
      }else{
        setName(res.data.userName)
        setPassword(res.data.userPassword)
        setEmail(res.data.mail)
        setPhone(res.data.phoneNumber)
        setRole(res.data.roleId=="3" ?"user":"admin")
        setSelectedId(res.data.userId);
      }
    })

  }


  const updateData=()=>{

    const personUrl=`http://localhost:8641/User`
    const animalUrl=`http://localhost:8641/Animal`
    let data;
    let url;

    const animalData={
     
      animalId: selectedId,
      typeee:type,
      typeeId:typeId,
      genuss: genus,
      genusId:genusId,
      animalName:animalName,
      animalAgeYear: age,
      animalAgeMouth: ageMonth,
      animalAbout: about,
      animaiImageUrl: image,
      animalGender: gender,
      adoptionState:adoptState,
      userId:null,

    }

    const personData={
      
      userId: selectedId,
      roleId:role=="user" ?"3":"4",
      userName: name,
      userPassword: password,
      mail: email,
      phoneNumber: phone,
      

    }

    if(selectedTab=="animal"){
      data=animalData 
      url=animalUrl
    }else{
      data=personData
      url=personUrl

    } 

    axios.put(url,data).then(()=>{

      notifyUpdate();
      resetStates();
      setShowPopup(false);

    }).catch((err)=>{

      console.log(err);
      notifyError();
    })

  }

  const deleteData=()=>{

    let url;
    const personUrl=`http://localhost:8641/User?UserId=${selectedId}`
    const animalUrl=`http://localhost:8641/Animal?animal=${selectedId}`

    if(selectedTab=="user") url=personUrl;
    else url=animalUrl

    axios.delete(url).then((res)=>{

      if(res.status===200){
        
        notifyDelete();
        resetStates();
        setShowPopup(false);
      }
    }).catch((err)=>{

      console.log(err);
      notifyError();
    })

  }

  useEffect(()=>{

    editData();
  },[])


  return (
    <Fragment>
    {selectedTab=="user" && (

        <form action='' className='flex flex-col gap-3 '>
            
          <input required type="text" id={id+'name'} value={name} onChange={(e)=>changeName(e.target.value)} placeholder='Enter Name' className='px-3 py-1 rounded-full border border-black outline-none'/>          
                       
          <input required type="password" id={id+'password'} value={password} onChange={(e)=>changePassword(e.target.value)} placeholder='Enter Password' className='px-3 py-1 rounded-full border border-black outline-none' />

          <input required type="email" id={id+'email'} value={email} onChange={(e)=>changeEmail(e.target.value)} placeholder='Enter Email' className='px-3 py-1 rounded-full border border-black outline-none'/>

          <input required type="tel" id={id+'tel'} value={phone} onChange={(e)=>changePhone(e.target.value)} pattern='[0]{1}[5]{1}[0-9]{9}' placeholder='Enter Phone Number' className='px-3 py-1 rounded-full border border-black outline-none'/>          

          <Select name="role" value={role} options={[{label:"User",value:"user"},{label:"Admin",value:"admin"}]} getOptionLabel={(option) => option.label} 
                    getOptionValue={(option) => option.value}  onChange={onChangeRole} placeholder={role || "Select Role"} 
                    className="xs:w-1/2 lg:w-48 text-black rounded-lg border border-black"/> 

          <div>
              
            <button className='w-1/2 p-2 rounded-full text-white bg-[#B5179E] border border-white hover:border-[#B5179E]' onClick={(e)=>{e.preventDefault();updateData()}}>Update Person</button>  
              
            <button className='w-1/2 p-2 rounded-full text-white bg-[#FF566A] border border-white hover:border-[#FF566A]' onClick={()=>deleteData()}>Delete Person</button> 
          </div>

        </form>

        )}

        {selectedTab=="animal" && (

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
            
          
            <div>
              
              <button className='w-1/2 p-2 rounded-full text-white bg-[#B5179E] border border-white hover:border-[#B5179E]' onClick={(e)=>{e.preventDefault();updateData()}}>Update Animal</button>  
              
              <button className='w-1/2 p-2 rounded-full text-white bg-[#FF566A] border border-white hover:border-[#FF566A]' onClick={()=>deleteData()}>Delete Animal</button> 
            </div>
                

          </form>
        )}
        </Fragment>
  )
}

export default UpdateForm
