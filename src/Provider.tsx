import React, { createContext, useReducer } from 'react'


// I like this file a lot, it's a nice pattern to use to distribute global data (as well as the functions
// to fetch a single repo and several repos) - really nice, good work!
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
  repoCount: number | null,
  loading: boolean,
  errors?: any,
  fetchRepos: ((term: string) => Promise<any>),
  fetchRepo: ((owner: string, repo: string) => Promise<any>) 
}

interface Action {
  type: ActionType,
  payload: any | null
}

// declare state for provider
const initialState:State = {
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
        errors: {}
      }
    case ActionType.FAILED_API_REQUEST:
      return { 
        ...state,
        loading: false,
        errors: action.payload,
        repos: [],
        repo: {},
        repoCount: null
      }
    case ActionType.SUCCESSFUL_REPOS_FETCH:
      return { 
        ...state,
        loading: false,
        errors: {},
        repos: action.payload.items,
        repoCount: action.payload.total_count
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

// context to share state globally
export const ReposContext = createContext(initialState)

const ReposProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  async function fetchRepos (queryString:String) {
    dispatch({ type: ActionType.MAKING_API_REQUEST, payload: null })
    try {
      const res = await fetch(`https://api.github.com/search/repositories?${queryString}&per_page=100`)
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
