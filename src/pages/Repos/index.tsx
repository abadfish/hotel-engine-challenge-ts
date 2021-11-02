import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Search from '../../components/Search'
import { ReposContext } from '../../Provider'


const Repos: React.FC = () => {

  const { loading, repos, errors, repoCount } = useContext(ReposContext)
  
  const repoList = repos?.map((r:any) => (
    <div key={ r.id }>
      <Link to={ `/repos/${ r.owner.login }+${ r.name }`}>{ r.name }</Link>
    </div>
  ))

  const errorDisplay = Object.keys(errors).length > 0 ? 
    Object.values(errors).map((error:any) => <div>{ error }</div>)
  : null

  return (
    <div>
      <Search />
      { loading && <div>Loading...</div> }
      { errorDisplay }
      { repoCount === 0 ?
        <h3>There are no repos matching those parameters. </h3>
        : repos && !loading ?
        <RepoListContainer>
          <h3>Your search returned { repoCount } results. Showing the first 100: </h3>
          { repoList }
        </RepoListContainer>
        :
        null
      }
    </div>
  )
}


export default Repos

const RepoListContainer = styled.section `
  padding: 1.5rem;

`