import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Search from '../../components/Search'
import { ReposContext } from '../../Provider'


const Repos: React.FC = () => {

  const { loading, repos, errors } = useContext(ReposContext)
  
  // console.log(errors, loading, repos)
  const repoList = repos?.map((r:any) => (
    <div key={ r.id }>
      <Link to={ `/repos/${ r.owner.login }+${ r.name }`}>{ r.name }</Link>
    </div>
  ))

  const errorDisplay = Object.keys(errors).length > 0 ? 
    Object.values(errors).map((error:any) => <div>{ error }</div>)
  : null

  loading && <div>Loading...</div>
  
  // const sortByOrder = (a:any, b:any) => {
  //   const isDescending = columnClicks % 2 === 0
  //   if (sortBy === 'stargazers_count'){
  //     const compareValue =  a.startgazers_count.localeCompare(b.stargazers_count)
  //     return isDescending ? compareValue : compareValue * -1
  //   } else if (sortBy === 'inception_date') {
  //     const date1 = new Date(b['inception_date'])
  //     const date2 = new Date(a['inception_date'])
  //     return isDescending ? date1 - date2 : date2 - date1
  //   } else {
  //     return isDescending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
  //   }
  // }

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
