import React from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion"
import photoBackground from '../assets/background.jpg'

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow-y: auto;
  overflow-x: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${photoBackground});
  object-fit:cover;
  backdrop-filter: contrast(0.2);

  position: relative;
  z-index: 1;
`


const BackGround = ( { children } ) => {
  return (
    <>
        <Background as={motion.div} 
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 0.8 }}
        >
            {children}
        </Background>
    </>
  )
}

export default BackGround