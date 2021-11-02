import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { ReposContext } from '../Provider'


const Search: React.FC = () => {

  const { fetchRepos } = useContext(ReposContext)

  const [urlParams, setUrlParams] = useState({
    searchTerm: '',
    filterBy: '',
    sortBy: '',
  })

  const formRef = useRef<HTMLFormElement>(null!)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUrlParams({ ...urlParams, [name]: value})
  }
  const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrlParams({ ...urlParams, sortBy: e.currentTarget.value})
  }

  const setQueryString = () => {
    const { searchTerm, filterBy, sortBy } = urlParams
    return `q=${searchTerm}+language:${filterBy}&sort=${sortBy}&order=desc`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const queryString = await setQueryString()
    fetchRepos(queryString)
    formRef.current.reset()
  }

  return (
    <Form ref={ formRef } onSubmit={ handleSubmit }>
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
    </Form>
  )
}

export default Search

const Form = styled.form `

`