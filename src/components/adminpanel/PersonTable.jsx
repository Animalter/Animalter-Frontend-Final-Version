import React from 'react'

const PersonTable = ({data,setSelectedId,setShowPopup}) => {
  return (
    <div>

        <div className='flex justify-between border-b-2 border-black mb-5 pb-1 '>
            <p className='xs:w-1/5 lg:w-40 font-semibold xs:text-sm md:text-md lg:text-lg'>Name</p>
            <p className='xs:hidden lg:block lg:w-1/10 text-center font-semibold xs:text-sm md:text-md lg:text-lg'>Role</p>
            <p className='xs:hidden lg:block lg:w-1/10 text-center font-semibold xs:text-sm md:text-md lg:text-lg'>Id</p>
            <p className='xs:w-1/3 lg:w-1/5 text-center  font-semibold xs:text-sm md:text-md lg:text-lg'>Mail</p>
            <p className='xs:w-1/3 lg:w-1/5 text-center  font-semibold xs:text-sm md:text-md lg:text-lg'>Phone</p>
            <p className='xs:hidden lg:block font-semibold xs:text-sm md:text-md lg:text-lg'>Password</p>
            <p className=' text-right font-semibold xs:text-sm md:text-md lg:text-lg'>Edit</p>
        </div>

        {data && (
            data?.map((element,i)=>(
              <div key={i} className='flex justify-between items-center border-b border-black py-2'>
                <h3 className='xs:text-sm md:text-md lg:text-base font-bold text-lg xs:w-1/5 lg:w-40'>{element.userName}</h3>

                <p className='lg:w-1/10 xs:text-sm md:text-md lg:text-base xs:hidden lg:block text-center'>{element.roleId=="1" ?"User":"Admin"}</p>
                <p className='lg:w-1/10 xs:text-sm md:text-md lg:text-base xs:hidden lg:block text-center'>{element.userId}</p>
                <p className='xs:text-sm md:text-md lg:text-base xs:w-1/3 lg:w-1/5 xs:text-left md:text-center'>{element.mail }</p>
                <p className='xs:text-sm md:text-md lg:text-base xs:w-1/3 lg:w-1/5 xs:text-right md:text-center'>{element.phoneNumber }</p>
                <p className='xs:text-sm md:text-md lg:text-base xs:hidden lg:block'>{element.userPassword}</p>

                <div className='flex gap-3 '>
                  <i className='fa-solid fa-pen ' onClick={()=>{ setSelectedId(element?.userId); setShowPopup(true); }}></i>
                  <i className='fa-solid fa-trash xs:hidden md:flex' onClick={()=>{ setSelectedId(element?.userId); setShowPopup(true);  }}></i>
                </div>

              </div>
            ))

        )}

    </div>
  )
}

export default PersonTable
