import React, { useState, useRef, useContext } from 'react'
import { ReposContext } from '../Provider'


const Search: React.FC = () => {

  const { fetchRepos } = useContext(ReposContext)

  const [queryString, setQueryString] = useState('')
  const [urlParams, setUrlParams] = useState({
    searchTerm: '',
    filterBy: '',
    sortBy: '',

  })
  // https://api.github.com/search/repositories?q=${term}` +language:Python&sort=stars&order=desc
      // +language:${language}&sort=&{sortBy}&order=desc
  console.log(queryString)
  console.log(urlParams)
  const formRef = useRef<HTMLFormElement>(null!)

  // setUrlString(urlString.concat(e.currentTarget.value))
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUrlParams({ ...urlParams, [name]: value})
  }
  const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrlParams({ ...urlParams, sortBy: e.currentTarget.value})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchRepos(queryString)
    setQueryString('')
    formRef.current.reset()
  }

  return (
    <form ref={ formRef } onSubmit={ handleSubmit }>
      <p>Search by:</p>
      <input 
        type='text' 
        name='searchTerm'
        onChange={ handleOnChange }
      />
      <p>Filter by language:</p>
      <input 
        type='text' 
        name='filterBy'
        onChange={ handleOnChange }
      />
      <p>Sort by:</p>
      <select
        name='sortBy'
        onChange={ handleOnSelect }
      >
        <option value="default">Best match</option>
        <option value="stars">Number of Stars</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  )
}

export default Search
