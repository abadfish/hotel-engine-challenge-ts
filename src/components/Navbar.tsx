import React from 'react'
import styled from 'styled-components'

const Navbar:React.FC = () => {
  return (
    <Nav>
      <h1>Github Repo Search Tool</h1>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav `
  width: 100%;
  height: 4vh;
  background-color: lightblue;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin: 0;
    font-size: calc(14px + 6 * ((100vw - 100px) / 680));
  }
  @media (max-width: 768px) {
    text-align: center;
    padding: 1rem 0;
  }
`