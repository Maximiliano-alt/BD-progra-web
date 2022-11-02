import React from 'react'
import styled from 'styled-components'
import BackGround from '../../Layout/Background'

import {tablet} from "../../const/screens.js"
import Logo from "../../assets/logoPS.png"
const Master = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: brightness(0.4);
`
const ContainerLogo = styled.div`
  top: 0;
  left: 0;
  width: 20%;
  height: 15%;
  padding: 10px;
  display: flex;
  position: absolute;
  align-items: center;
  margin: 30px 0 0 30px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  @media (${tablet}){
    visibility: hidden;
  }
`
const ImagenLogo = styled.img`
  width: 100%;
  height: 150%;
  object-fit: contain;
`

const Login = () => {
  return (
    <BackGround>
        <Master>
          <ContainerLogo>
            <ImagenLogo src={Logo} alt='LOGO'/>
          </ContainerLogo>
          
        </Master>
    </BackGround>
  )
}

export default Login