import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

const Repo = (props:any) => {
  console.log(props)
  const params = useParams()
  console.log(params)
  const location = useLocation()
  console.log(location)


  // const keyValue = Object.entries(data).map(([key,value]) => (
  //   <DataRow key={ key }>
  //     <DataCell align='right'>{ key }:</DataCell> 
  //     <DataCell align='left'>{ value }</DataCell>
  //   </DataRow>
  // ))
  // let { id:string } = useParams()
  return (
    <div>
      repo details page
    </div>
  )
}

export default Repo
