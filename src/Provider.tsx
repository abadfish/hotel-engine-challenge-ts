import React, { createContext } from 'react'

const initialState = {
  loading: false,
  repos: []
}

const ReposContext = createContext(initialState)

const ReposProvider = () => {
  return (
    <div>
      
    </div>
  )
}

export default ReposProvider
