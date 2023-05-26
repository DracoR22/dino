import React, { useState } from 'react'
import { getRandomPrompt } from '../utils'
import { FormField,Loader } from '../components'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

const navigate = useNavigate()
const [form, setForm] = useState({
  name: '',
  prompt: '',
  photo: '',
})
const [generatingImg, setGeneratingImg] = useState(false)
const [loading, setLoading] = useState(false)

const generateImage = async () => {
if(form.prompt) {
  try {
    setGeneratingImg(true)
    const response = await fetch('http://localhost:8080/api/v1/dino', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt: form.prompt})
    })

    const data = await response.json()
     setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
  } catch (error) {
    alert(error)
  } finally {
    setGeneratingImg(false)
  }
} else {
  alert('Please enter a prompt')
}
}

const handleSubmit = async (e) => {
e.preventDefault()
if(form.prompt && form.photo) {
  setLoading(true)

  try {
    const response = await fetch('http://localhost:8080/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })

    await response.json()
      navigate('/')
  } catch (err) {
   alert(err)
  } finally {
    setLoading(false)
  }
} else {
  alert('Please generate an image')
}
}

const handleChange = (e) => {
setForm({...form, [e.target.name]: e.target.value})
}

const handleSurpriseMe = () => {
const randomPrompt = getRandomPrompt(form.prompt)
setForm({...form, prompt: randomPrompt})
}

  return (
    <section className='max-w-7xl mx-auto text-white'>
       <div>
       <h1 className='font-bold text-[32px]'>Create</h1>
       <p className='mt-2 text-[16px] max-w-[500px] text-gray-300'>Start with a detailed description</p>
      </div>

      <form className='mt-6 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
          labelName='Your name'
          type='text'
          name='name'
          placeholder='You full name'
          value={form.name}
          handleChange={handleChange}/>

         <FormField
          labelName='Prompt'
          type='text'
          name='prompt'
          placeholder='a bowl of soup that looks like a monster, knitted out of wool'
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}/>

          <div className='relative border-[3px]
           border-[#62ff93] text-sm rounded-lg focus:ring-[#62ffb8]
            focus:border-[#62ffb8] w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
            ) : (
              <img src='preview.png' alt="preview" className='w-9/12 h-9/12 object-contain opacity-40'/>
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]'>
                <Loader/>
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
           <button
            type='button'
            onClick={generateImage}
            className='text-black bg-gradient-to-r from-[#e6fa72] to-[#62ff93] via-[#62ff93] font-medium 
            rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
             {generatingImg ? 'Generating...' : 'Generate'}
           </button>
        </div>

        <div className='mt-10'>
         <p className='text-gray-300 text-[14px]'>Share your image to the community once generated</p>
         <button
          type='submit'
          className='mt-3 bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
           {loading ? 'Sharing...' : 'Share with the community'}
         </button>
        </div>

      </form>
    </section>
  )
}

export default CreatePost