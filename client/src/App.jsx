import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, CreatePost } from './pages'
import Navbar from './Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#161619] min-h-[calc(100vh-70px)]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App