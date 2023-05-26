import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='w-full flex justify-between items-center
     bg-[#161619] px-4 border-b border-gray-800 h-[70px]'>
    <Link to='/' className='flex items-center'>
     <img className='w-24 object-contain' src="dinologobg.png" alt="logo" />
     <h1 className='text-white font-medium text-3xl'>Dino</h1>
    </Link>

    <Link to='/create-post'
     className='font-medium bg-gradient-to-r from-[#e6fa72] to-[#62ff93] via-[#62ff93] text-black px-4 py-2 rounded-md'>
      Create
    </Link>

    </header>
  )
}

export default Navbar