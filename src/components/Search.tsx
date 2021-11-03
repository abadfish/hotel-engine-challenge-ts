import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import { ReposContext } from '../Provider'


const Search: React.FC = () => {

  const { fetchRepos } = useContext(ReposContext)

  // I think Bogdan covers this in one of the frontend videos - using Hooks, it's more useful
  // to have one state variable for each value, rather than an object of all state in one
  // const [urlParams, setUrlParams] = useState({
  //   searchTerm: '',
  //   filterBy: '',
  //   sortBy: '',
  // })

  // this would have knock-on effects further down, of course. I won't make those changes as they should be
  // obvious and straight-forward from here
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');

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
    fetchRepos && fetchRepos(queryString)
    formRef.current.reset()
  }

  return (
    <Form ref={ formRef } onSubmit={ handleSubmit }>
      <Fields>
        <div>
          <p>Search by:</p>
          <input
          // I learnt very recently about this input type!
          // https://www.w3schools.com/html/html_form_input_types.asp
          // Not sure if it's useful, but good to know maybe for interveies
            type='search'
            name='searchTerm'
            placeholder='Enter search term'
            onChange={ handleOnChange }
          />
        </div>
        <div>
          <p>Filter by language:</p>
          <input 
            type='text' 
            name='filterBy'
            placeholder='Enter language'
            onChange={ handleOnChange }
          />
        </div>
        <div>
          <p>Sort by:</p>
          <select
            name='sortBy'
            onChange={ handleOnSelect }
          >
            <option value="default">Best match</option>
            <option value="stars">Number of Stars</option>
          </select>
        </div>
        <Button type='submit'>SEARCH</Button>
      </Fields>
    </Form>
  )
}

export default Search


// again, good use of SC to separate cosmetics
const Form = styled.form `
  width: 100%;
  padding: 1.5rem;
  background-color: #f3f3f3;
`
const Fields = styled.div `
  width: 50%;
  display: flex;
  justify-content: space-between;
  p {
    margin-top: 0;
  }

`
const Button = styled.button `
  width: 90px;
  height: 55px;
  background-color: #fff;
  cursor: pointer;
  border: none;
  transition: .5 ease-in-out;
  &:hover {
    webkit-box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2);
    box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2);
  }
`