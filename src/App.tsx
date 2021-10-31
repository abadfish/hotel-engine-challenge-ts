import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Repos from './pages/Repos'
import Repo from './pages/Repos/Repo'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' component={ Repos } />
        <Route path='/repos/:id' component={ Repo } />
      </Switch>
    </BrowserRouter>

  )
}

export default App;
