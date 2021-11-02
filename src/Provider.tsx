import React, { createContext, useReducer } from 'react'

enum ActionType {
  MAKING_API_REQUEST = "MAKING_API_REQUEST",
  SUCCESSFUL_REPOS_FETCH = "SUCCESSFUL_REPOS_FETCH",
  FAILED_API_REQUEST = "FAILED_API_REQUEST",
  SUCCESSFUL_REPO_FETCH = "SUCCESSFUL_REPO_FETCH"
}

// declare types to pass to reducer
interface State {
  repos?: any,
  repo: any,
  repoCount: any,
  loading: boolean,
  errors?: any,
  fetchRepos: ((term: string) => Promise<any>) | undefined,
  fetchRepo: ((owner: string, repo: string) => Promise<any>) | undefined
}

interface Action {
  type: ActionType,
  payload: any | null
}

// declare state for provider
const initialState = {
  repos: [],
  repoCount: null,
  repo: {},
  loading: false,
  errors: {},
  fetchRepos: (term: string) => new Promise((resolve, reject) => {}),
  fetchRepo: (owner: string, repo: string) => new Promise((resolve, reject) => {}),
}

// reducer to handle global state change 
const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.MAKING_API_REQUEST:
      return { 
        ...state,
        loading: true,
        repoCount: null,
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
        repos: action.payload.items,
        repoCount: action.payload.total_count.toString() 
      }
      // ^^^ using toString here so we get a truthy value because JS treats null/undefined/0 the same
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

// context to share state globally
export const ReposContext = createContext(initialState)

const ReposProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  async function fetchRepos (queryString:String) {
    dispatch({ type: ActionType.MAKING_API_REQUEST, payload: null })
    try {
      const res = await fetch(`https://api.github.com/search/repositories?${queryString}`)
      const apiResponse = await res.json()
      if (apiResponse.items) {
        dispatch({ type: ActionType.SUCCESSFUL_REPOS_FETCH, payload: apiResponse })
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
    repoCount: state.repoCount,
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
