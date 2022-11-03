import React from 'react'
import BackGround from './Background.jsx'

const General = styled.div`
    width: 100vw;
    display: flex;
    min-height: 100vh;
    overflow-y: auto;
    height: fit-content;
    flex-direction: column;
    backdrop-filter: brightness(0.2);
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    overflow-x: hidden;
`

const Layout = ({children}) => {
  return (
    <BackGround>
        <General>
        {children}
        </General>
    </BackGround>
  )
}

export default Layout