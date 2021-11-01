import React, { useState, useRef, useContext } from 'react'
import { ReposContext } from '../Provider'


const Search: React.FC = () => {

  const { fetchRepos } = useContext(ReposContext)

  const [searchTerm, setSearchTerm] = useState('')
  const formRef = useRef<HTMLFormElement>(null!)


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
