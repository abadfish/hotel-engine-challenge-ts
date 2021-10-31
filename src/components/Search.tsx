import React, { useState, useRef } from 'react'


const Search: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const formRef = useRef<HTMLFormElement>(null!)

  async function fetchRepos (term:String) {
    const res = await fetch(`https://api.github.com/search/repositories?q=${term}`)
    const repoResponse = await res.json()
    console.log(repoResponse)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchRepos(searchTerm)
    formRef.current.reset()
  }

  return (
    <form ref={ formRef } onSubmit={ handleSubmit }>
      <input 
        type='text' 
        onChange={ handleOnChange }
      />
      <button type='submit'>Search</button>
    </form>
  )
}

export default Search
