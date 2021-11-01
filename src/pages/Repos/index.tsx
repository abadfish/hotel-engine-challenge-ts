import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Search from '../../components/Search'
import { ReposContext } from '../../Provider'


const Repos: React.FC = () => {
  const { loading, repos, errors } = useContext(ReposContext)
  console.log(errors, loading, repos)
  debugger
  const repoList = repos?.map((r:any) => (
    <div key={ r.id }><Link to={`/repos/${ r.id }`}>{ r.name }</Link></div>
  ))

  const errorDisplay = Object.keys(errors).length > 0 ? 
    Object.values(errors).map((error:any) => <div>{error}</div>)
  : null
  loading && <div>Loading...</div>
  

  return (
    <div>
      <Search />
      { errorDisplay }
      { repoList }
    </div>
  )
}


export default Repos
