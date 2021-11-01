import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Repos from './pages/Repos'
import Repo from './pages/Repos/Repo'
import ReposProvider from './Provider'


function App() {
  return (
    <ReposProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={ Repos } />
          <Route path='/repos/:id' component={ Repo } />
        </Switch>
      </BrowserRouter>
    </ReposProvider>

  )
}

export default App;
