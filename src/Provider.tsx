import React, { createContext, useReducer } from 'react'

const initialState = {
  loading: false,
  repos: [],
  fetchRepos: (term: string) => new Promise((resolve, reject) => {})

}

enum ActionType {
  SUCCESSFUL_REPOS_FETCH = "SUCCESSFUL_REPOS_FETCH",
}

interface State {
  repos?: any,
  loading: boolean,
  fetchRepos: ((term: string) => Promise<any>) | undefined
}

interface Action {
  type: ActionType,
  payload: any
}

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.SUCCESSFUL_REPOS_FETCH:
      return { 
        ...state,
        loading: false,
        repos: action.payload 
      }
      default:
        return state
    }
  }

export const ReposContext = createContext(initialState)

const ReposProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  async function fetchRepos (term:String) {
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${term}`)
      const repoResponse = await res.json()
      dispatch({ type: ActionType.SUCCESSFUL_REPOS_FETCH, payload: repoResponse.items })
    } catch {
      alert("Fetch failed")
    }
  }

  const values = {
    loading: state.loading,
    repos: state.repos,
    fetchRepos,
  }

  return (
    <ReposContext.Provider value={ values }>
      { children }
    </ReposContext.Provider>

  )
}

export default ReposProvider
