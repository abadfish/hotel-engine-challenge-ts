import React, { createContext, useReducer } from 'react'

const initialState = {
  repos: [],
  loading: false,
  errors: {},
  fetchRepos: (term: string) => new Promise((resolve, reject) => {})
}

enum ActionType {
  MAKING_API_REQUEST = "MAKING_API_REQUEST",
  SUCCESSFUL_REPOS_FETCH = "SUCCESSFUL_REPOS_FETCH",
  FAILED_API_REQUEST = "FAILED_API_REQUEST"
}

interface State {
  repos?: any,
  loading: boolean,
  errors?: any,
  fetchRepos: ((term: string) => Promise<any>) | undefined
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
        repos: []
      }
    case ActionType.SUCCESSFUL_REPOS_FETCH:
      return { 
        ...state,
        loading: false,
        errors: {},
        repos: action.payload 
      }
      default:
        return state
    }
  }

export const ReposContext = createContext(initialState)

const ReposProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)

  async function fetchRepos (term:String) {
    dispatch({ type: ActionType.MAKING_API_REQUEST, payload: null })
    try {
      const res = await fetch(`https://api.github.com/search/repositories+q=${term}`)
      const repoResponse = await res.json()
      if (repoResponse.items) {
        dispatch({ type: ActionType.SUCCESSFUL_REPOS_FETCH, payload: repoResponse.items })
      } else {
        dispatch({ type: ActionType.FAILED_API_REQUEST, payload: repoResponse })
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
    fetchRepos,
  }

  return (
    <ReposContext.Provider value={ values }>
      { children }
    </ReposContext.Provider>
  )
}

export default ReposProvider
