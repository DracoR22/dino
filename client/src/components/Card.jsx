import React from 'react'
import { downloadImage } from '../utils'

const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img src={photo} alt={prompt}  className='w-full h-auto object-cover rounded-xl'/>

      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute
       bottom-0 right-0 left-0 bg-black m-2 p-4 rounded-md opacity-90'>
       <p className='text-white overscroll-y-auto prompt'>{prompt}</p>

       <div className='mt-5 flex justify-between items-center gap-2'>
         <div className='flex items-center gap-2'>
           <div className='w-7 h-7 rounded-full object-cover
            bg-green-600 flex justify-center items-center text-sm font-bold'>
             {name[0].toUpperCase()}
           </div>
           <p className='text-sm'>{name}</p>
         </div>
         <button type='button' onClick={() => downloadImage(_id, photo)}
          className='outline:none bg-transparent border-none'>
         <img src="download.png" alt="download" className='w-6 h-6 object-contain invert'/>
         </button>
       </div>
      </div>
    </div>
  )
}

export default Card