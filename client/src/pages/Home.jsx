import React, { useEffect, useState } from 'react'
import { Loader, Card, FormField } from '../components'

const RenderCards = ({data, title}) => {
if(data?.length > 0){
return data.map((post) => <Card key={post._id} {...post}/>)
  }
  return (
    <h2 className='mt-5 font-bold text-[#62ffb8] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
 
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)

      try {
         const response = await fetch ('https://dino-api.vercel.app/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
         })
         if(response.ok) {
          const result = await response.json()

          setAllPosts(result.data.reverse())
         }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
    setTimeout(() => {
      const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())
       || item.prompt.toLowerCase().includes(searchText.toLowerCase()))

       setSearchedResults(searchResults)
    }, 500)
    )
  }

  return (
    <section className='max-w-7xl mx-auto text-white'>
      <div>
       <h1 className='font-bold text-[32px]'>The Community Showcase</h1>
       <p className='mt-2 text-[16px] max-w-[500px] text-gray-300'>Browse through various stylish AI generated images</p>
      </div>

      <div className='mt-16'>
       <FormField 
       labelName='Search posts'
       type='text'
       name='text'
       placeholder='Search Posts'
       value={searchText}
       handleChange={handleSearchChange}/>
      </div>

      <div className='mt-10'>
       {loading ? (
        <div className='flex justify-center items-center'>
         <Loader/>
        </div>
       ) : (
        <>
        {searchText && (
          <h2 className='font-medium text-xl mb-3'>Showing results for 
          <span className='text-gray-300'> {searchText}</span></h2>
        )}
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
         {searchText ? (
          <RenderCards data={searchedResults} title='no search results found'/>
         ) : (
          <RenderCards data={allPosts} title='no posts found'/>
         )}
        </div>
        </>
       )}
      </div>
    </section>
  )
}

export default Home