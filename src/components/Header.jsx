import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import Logo from '../assets/animalter-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useGetTypesQuery } from '../store/slices/apiSlice'

const Header = () => {

  const [cookie,setCookie]=useCookies(['role','name','id']);
  
  const [mobileMenu,setMobileMenu]=useState(false);

  const types=useGetTypesQuery();
  

  return (
    <header className='bg-[#0093E9] lg:sticky lg:top-0 z-10 text-white w-full flex xs:flex-col lg:flex-row items-center justify-between xs:px-8 lg:px-2'>

     <div className='xs:w-full lg:w-4/5 lg:mx-auto h-16 flex items-center justify-between'>
      
      <Link to="/">
      <div className='flex items-center gap-3 '>
        <ReactSVG src={Logo}/>

        <h1 className='text-xl font-bold'>Animalter</h1>

      </div>
      </Link>

      <nav className='xs:hidden lg:flex gap-5'>

        {types?.data?.map((e,i)=>(
          <NavLink key={i} to={`animal/${e.typeee}-${e.typeeId}` }className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>{e.typeee}</NavLink>
        ))}

        
        
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-black' : 'hover:underline underline-offset-4'}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-black' : 'hover:underline underline-offset-4'}>Contact</NavLink>
        <NavLink to="/faq" className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>FAQ</NavLink>
        {cookie.role==3 && (
          <NavLink to={`/user/${cookie.id}`} className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>{cookie.name}</NavLink>
        )}
        {cookie.role==4 && (
          <NavLink to={`/admin/${cookie.id}`} className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>Admin Panel</NavLink>
        )}
        {!cookie.role && (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>Login</NavLink>
        )} 

      </nav>

      <i onClick={()=>setMobileMenu((prev)=>!prev)} className={`${mobileMenu ? 'fa-x':'fa-bars'} xs:block lg:hidden fa-solid `}></i>

      </div> 

      {mobileMenu && (

        <nav className='xs:flex lg:hidden py-2 gap-5 flex-wrap w-full'>

        {types?.data?.map((e,i)=>(
          <NavLink key={i} to={`animal/${e.typeee}-${e.typeId}` }className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>{e.typeee}</NavLink>
        ))}

        
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-black' : 'hover:underline underline-offset-4'}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-black' : 'hover:underline underline-offset-4'}>Contact</NavLink>
        <NavLink to="/faq" className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>FAQ</NavLink>
        {cookie.role=="1" && (
          <NavLink to={`/user/${cookie.id}`} className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>{cookie.name}</NavLink>
        )}
        {cookie.role==2 && (
          <NavLink to={`/admin/${cookie.id}`} className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>Admin Panel</NavLink>
        )}
        {!cookie.role && (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'text-black ' : 'hover:underline underline-offset-4'}>Login</NavLink>
        )} 

      </nav>
      )}

    </header>
  )
}

export default Header
