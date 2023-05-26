import React from 'react'

const FormField = ({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
        <div className='flex items-center gsp-2m mb-2'>
           <label htmlFor={name} className='block text-sm font-medium text-gray-300'>
              {labelName}
           </label>
            {isSurpriseMe && (
                <button type='button' onClick={handleSurpriseMe}
                 className='ml-2 font-medium font-xs py-1 px-2 rounded-[5px] bg-gray-500'>
                 Surprise me
                </button>
            )}
        </div>
        <input type={type} id={name} name={name} placeholder={placeholder}
         value={value} onChange={handleChange} required
         className=' bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-[#62ffb8]
         focus:border-[#62ff93] outline-none block w-full p-3 '/>
    </div>
  )
}

export default FormField