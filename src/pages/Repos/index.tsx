import React, { useContext } from 'react'
import Search from '../../components/Search'
import { ReposContext } from '../../Provider'


const Repos: React.FC = () => {
  const { loading, repos } = useContext(ReposContext)
  console.log(repos)
  
  const repoList = repos?.map((r:any) => (
    <div>{ r.name }</div>
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
