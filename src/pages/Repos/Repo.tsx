import React, { useContext, useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ReposContext } from '../../Provider'

// there's generally quite a lot of any types in here (and a few in other files)
// I guess this was due to time constraints and not wanting to spend too much time
// on typing

const Repo: React.FC = () => {

  const { fetchRepo, repo } = useContext(ReposContext)
  const { slug } = useParams<{ slug: string }>();
  const repoParams = slug.split("+")
  const owner = repoParams[0]
  const repoName = repoParams[1]
  const [showAllDetails, setShowAllDetails] = useState(false)

  const showFullRepo = () => {
    setShowAllDetails(!showAllDetails)
  }

  useEffect(() => {
    fetchRepo && fetchRepo(owner, repoName)
  }, [owner, repoName])

  // I have done this because there are too many details to type them all. Readme did not specify which to render so you get them all!
  // This function seems like it could be extracted to somewhere outside of this component - even if just
  // above/below it, but also optionally to a separate file (where it could be unit tested also)
  function parseRepoDetails(details: any) {
    const repoKeys:any = []
    const repoValues:any = []
    Object.entries(details).map(([key, value]) => {
      if (value === null ) {
        repoKeys.push(key)
        repoValues.push('N/A')
      // this is a nice trick I learnt which makes these sorts of logical tests more extensible
      } else if (['string', 'number'].includes(typeof value)) {
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

  // from what I can tell this function could also be extracted to outside of this component
  // it doesn't need to be recreated with every render
  const truncatedDetails = (repo:any) => {
    return (
      <section key={ repo?.id }>
        <RepoTitleRow>
          <h3>Repo Name: { repo?.name }</h3>
          <h3>No. of Stars: { repo?.stargazers_count }</h3>
          <h3>Language: { repo?.language }</h3>
        </RepoTitleRow>
        <DetailRow>
          <p>visibility: { repo?.visibility }</p>
          <p>Forks: { repo?.forks }</p>
          <p>Open Issues: { repo?.open_issues }</p>
          <p>Watchers: { repo?.watchers }</p>
          <p>Default Branch: { repo?.default_branch }</p>
          </DetailRow> 
        <DetailRow></DetailRow>
      </section>
    )
  }

  // if they ask about performance, as well as the above two functions being extracted, you could also mention
  // memoizing these two - if the repo doesn't change, neither will these values
  const repoDetails = repo ? parseRepoDetails(repo) : null
  const truncatedRepo = repo ? truncatedDetails(repo) : null

  return (
    <DetailPage>
      <NavLink to='/'>Back to search results</NavLink>
      { showAllDetails ? 
        <div>
          <h3>Showing complete details for { repoName } <button onClick={ showFullRepo }>Hide Full Details</button></h3>
          { repoDetails }
        </div>
      :
        <div>
          <h3>Showing trancated details for { repoName } <button onClick={ showFullRepo }>Show Full Details</button></h3>
          { truncatedRepo }
        </div>
      }
    </DetailPage>
  )
}

export default Repo


// great use of styled components to separate functionality from cosmetics
const DetailPage = styled.main `
  padding: 1rem 1.5rem;
  @media (max-width: 768px) {
    padding: 1rem .5rem;
  }
`
const DataRow = styled.div `
  display: flex;
  font-size: calc(10px + 6 * ((100vw - 350px) / 680));
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const DataCell = styled.div `
  padding: 0.2rem 0.5rem;
  word-break: break-all;
`

const RepoTitleRow = styled.div `
  width: 100%;
  background-color: #f3f3f3;
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const DetailRow = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`