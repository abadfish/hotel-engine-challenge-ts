import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
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
      { repoCount === '0' ?
        <h2>There are no repos matching those parameters. </h2>
        : repoCount && parseInt(repoCount) > 0 ?
        repoList 
        :
        null
      }
    </div>
  )
}


export default Repos
