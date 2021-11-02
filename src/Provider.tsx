import React, { createContext, useReducer } from 'react'

const initialState = {
  repos: [],
  repo: {},
  loading: false,
  errors: {},
  fetchRepos: (term: string) => new Promise((resolve, reject) => {}),
  fetchRepo: (owner: string, repo: string) => new Promise((resolve, reject) => {})
}

enum ActionType {
  MAKING_API_REQUEST = "MAKING_API_REQUEST",
  SUCCESSFUL_REPOS_FETCH = "SUCCESSFUL_REPOS_FETCH",
  FAILED_API_REQUEST = "FAILED_API_REQUEST",
  SUCCESSFUL_REPO_FETCH = "SUCCESSFUL_REPO_FETCH"
}

interface State {
  repos?: any,
  repo: any,
  loading: boolean,
  errors?: any,
  fetchRepos: ((term: string) => Promise<any>) | undefined,
  fetchRepo: ((owner: string, repo: string) => Promise<any>) | undefined
}

interface Action {
  type: ActionType,
  payload: any | null
}

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.MAKING_API_REQUEST:
      return { 
        ...state,
        loading: true,
        errors: {}
      }
    case ActionType.FAILED_API_REQUEST:
      return { 
        ...state,
        loading: false,
        errors: action.payload,
        repos: [],
        repo: {}
      }
    case ActionType.SUCCESSFUL_REPOS_FETCH:
      return { 
        ...state,
        loading: false,
        errors: {},
        repos: action.payload 
      }
    case ActionType.SUCCESSFUL_REPO_FETCH:
      return { 
        ...state,
        loading: false,
        errors: {},
        repo: action.payload 
      }
    default:
      return state
  }
}

export const ReposContext = createContext(initialState)

const ReposProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)

  async function fetchRepos (queryString:String) {
    dispatch({ type: ActionType.MAKING_API_REQUEST, payload: null })
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=cats+language:&sort=&order=desc`)
      // +language:Python&sort=stars&order=desc
      // const res = await fetch(`https://api.github.com/search/repositories?q=${queryString}`)
      const apiResponse = await res.json()
      if (apiResponse.items) {
        dispatch({ type: ActionType.SUCCESSFUL_REPOS_FETCH, payload: apiResponse.items })
      } else {
        dispatch({ type: ActionType.FAILED_API_REQUEST, payload: apiResponse })
      }
    } catch {
      alert("Fetch failed")
      dispatch({ type: ActionType.FAILED_API_REQUEST, payload: { 'message': 'fetch failed.'} })
    }
  }
  async function fetchRepo (owner:String, repo:String) {
    dispatch({ type: ActionType.MAKING_API_REQUEST, payload: null })
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
      const apiResponse = await res.json()
      if (apiResponse.message) {
        dispatch({ type: ActionType.FAILED_API_REQUEST, payload: apiResponse.message })
      } else {
        dispatch({ type: ActionType.SUCCESSFUL_REPO_FETCH, payload: apiResponse })
      }
    } catch {
      alert("Fetch failed")
      dispatch({ type: ActionType.FAILED_API_REQUEST, payload: { 'message': 'fetch failed.'} })
    }
  }

  const values = {
    loading: state.loading,
    errors: state.errors,
    repos: state.repos,
    repo: state.repo,
    fetchRepos,
    fetchRepo,
  }

  return (
    <ReposContext.Provider value={ values }>
      { children }
    </ReposContext.Provider>
  )
}

export default ReposProvider
