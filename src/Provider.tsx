import React, { createContext, useReducer } from 'react'

const initialState = {
  loading: false,
  repos: []
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

const ReposContext = createContext(initialState)

const ReposProvider: React.FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const values = {
    loading: state.loading
  }


  return (
    <ReposContext.Provider value={ values }>
      { children }
    </ReposContext.Provider>

  )
}

export default ReposProvider
