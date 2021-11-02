import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Search from '../../components/Search'
import { ReposContext } from '../../Provider'


const Repos: React.FC = () => {

  const { loading, repos, errors } = useContext(ReposContext)
  
  // console.log(errors, loading, repos)
  const repoList = repos?.map((r:any) => (
    <div key={ r.id }>
      <Link 
        to={{
          pathname: `/repos/${ r.owner.login }+${ r.name }`,
          // state: {
          //   owner: r.owner.login,
          //   repo: r.name
          // }
        }}
      >{ r.name }</Link>
    </div>
  ))

  const errorDisplay = Object.keys(errors).length > 0 ? 
    Object.values(errors).map((error:any) => <div>{ error }</div>)
  : null

  loading && <div>Loading...</div>
  

  return (
    // Need to add sort and filter both before(param choice) and after (provider reducer) results 
    <div>
      <Search />
      { errorDisplay }
      { repoList }
    </div>
  )
}


export default Repos
