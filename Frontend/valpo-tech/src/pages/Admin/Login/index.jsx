import React,{useState} from 'react'
import styled from 'styled-components'
import BackGround from '../../../Layout/Background'
import InputLogin from '../../../components/Admin/InputLogin'
import Logo from "../../../assets/logoPS.png" 
import AdminDataService from "../../../services/Admin/LoginAdmin.service";
import {tablet} from "../../../const/screens.js"
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
const InputContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  margin: 0 0 32px 0 ;
  justify-content: center;
`

const   Login = (props) => {
  


const [formValues, setFormValues] = useState({ username: '',password: '',})
const onSubmit = loginAdminObject => {
  AdminDataService.get(loginAdminObject)
  .then(res => {
    if (res.status === 200)
      console.log(res)
    else
      Promise.reject()
  })
  .catch(err => console.log(err) )
}
// const handleInformation = async (e) => {
//   e.preventDefault();
//   return setdata({
//     ...data,
//     [e.target.name]: e.target.value
//   })
// };
  return (
    <BackGround>
        <Master>
          <ContainerLogo>
            <ImagenLogo src={Logo} alt='LOGO'/>
          </ContainerLogo>
          <InputContainer>
            <InputLogin initialValues={formValues} onSubmit={onSubmit} enableReinitialize/>

            
          </InputContainer>
          
        </Master>
    </BackGround>
  )
}

export default Login