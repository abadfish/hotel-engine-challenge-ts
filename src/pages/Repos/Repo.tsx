import React from 'react'
import { useParams } from 'react-router-dom'

const Repo = (props:any) => {
  console.log(props.match.params.id)
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
