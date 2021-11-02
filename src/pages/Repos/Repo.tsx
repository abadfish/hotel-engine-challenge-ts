import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ReposContext } from '../../Provider'


const Repo: React.FC = () => {

  const { fetchRepo, repo } = useContext(ReposContext)
  const { slug } = useParams<{ slug: string }>();
  const repoParams = slug.split("+")
  const owner = repoParams[0]
  const repoName = repoParams[1]
  

  useEffect(() => {
    fetchRepo(owner, repoName)
  }, [owner, repoName])

  function parseRepoDetails(details: any) {
    const repoKeys:any = []
    const repoValues:any = []
    Object.entries(details).map(([key, value]) => {
      if (value === null ) {
        repoKeys.push(key)
        repoValues.push('N/A')
      } else if (typeof value === 'string' || typeof value === 'number') {
        repoKeys.push(key)
        repoValues.push(value)
      } else if (typeof value === 'object') {
        repoKeys.push(key)
        repoValues.push(parseRepoDetails(value))
      }
      return null
    })
    return repoKeys.map((k:any, i:number) => (
      <DataRow key={ k }>
        <DataCell><strong>{ k }: </strong></DataCell> 
        <DataCell>{ repoValues[i] }</DataCell>
      </DataRow>
    ))      
  }


  const repoDetails = repo ? parseRepoDetails(repo) : null
  // console.log(repoDetails)
     
  return (
    <div>
      { repoDetails }
    </div>
  )
}

export default Repo

const DataRow = styled.div `
  display: flex;
`
const DataCell = styled.div `
`
