import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Search from '../../components/Search'
import { ReposContext } from '../../Provider'


const Repos: React.FC = () => {
  const { loading, repos } = useContext(ReposContext)
  console.log(repos)
  
  const repoList = repos?.map((r:any) => (
    <div><Link to={`/repos/{ r.id }`}>{ r.name }</Link></div>
  ))

  loading && <div>Loading...</div>


  return (
    <div>
      <Search />
      { repoList }
    </div>
  )
}


export default Repos
