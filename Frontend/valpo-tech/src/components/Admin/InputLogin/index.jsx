import React,{useState} from 'react'
import { Formik, Form, Field,ErrorMessage,getIn } from "formik";
import YupPassword from 'yup-password'
import * as Yup from "yup";
import {tablet} from "../../../const/screens.js"
import { colorItemHoverNav,colorInputLogin } from '../../../const/colors.js';
import styled from 'styled-components'
import LoginAdminService from '../../../services/Admin/LoginAdmin.service.js';
import { useNavigate } from 'react-router-dom';
const Input = styled.input`

      width: 100%;
    height: 50%;
    border: none;
    outline: none;
    color: white;
    margin: 2%;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: rgba(255,255,255,0.1);
    font-size: 1.2em;
  
  &::placeholder {
    color: white;
  }
  @media (${tablet}){
    width: 80%;
  }

`
const ButtonLogin = styled.button`
  margin:5%;
  margin-left:20%;
  width: 50%;
  height: 50%;
  border: none;
  outline: none;
  color: white;
  border-radius: 20px;
  font-size: 1em;
  transition: all 0.3s ease-in-out;
  background-color: ${ colorInputLogin };
  cursor: pointer;
  &:hover {
    background-color: #3e3e7c;
    transition: all 0.3s ease-in-out;
  }
  &:focus{

  }
  
`
const Label = styled.label`
        
        font-family: 'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;
    /* font-style: normal; */
    /* font-weight: 400; */
    font-size: 12px;
    line-height: 15px;
    color: white;
    font-size: 30px;
    /* padding-left: 48px; */
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    /* justify-content: center; */

    
    
   
`
const InputLogin = (props) => {
  const navigate = useNavigate();
  const [rut,setRut] = useState('')

  const handleChange = event => {
    setRut(event.target.value)
    console.log('Rut: '+ event.target.value)
  }
  const login = async ( rut ) => {
    LoginAdminService.get(rut)
  .then((res) => {
    if (res.status === 200) {
      console.log("User: "+res.data)
      return navigate( '/admin/products' );
    } else Promise.reject();

  })
  .catch((err) => {

    console.log(err)
  });
}

    const validationSchema = Yup.object().shape({
        username: Yup.string().email("You have enter an invalid email address").required(),
        // password: Yup.string().password("Wrong password").required(),
    });
    const input = {
      username: 'user@example.com',
      password: '1234',
    }
  return (
    
    <Formik {...props} validationSchema={validationSchema}>
    
              <Form  >
              <Label>LOGIN ADMIN</Label>
                  <Input autocomplete="off" type="user"  placeholder='RUT' name='rut' onChange={handleChange} value={rut} />
                   
                    {/* <Field  name="name" type="text" 
                    className="form-control" /> */}
                    <ErrorMessage
                      name="user"
                      className="d-block invalid-feedback"
                      component="span"
                    />
                   {/* <Field  name="pass" type="text" 
                    className="form-control" /> */}
                  <Input name="password" autocomplete="off" type="user"  placeholder='Contraseña'  />

                  <ErrorMessage
                      name="password"
                      
                      component="span"
                  />
                  <ButtonLogin type='submit'
                    onClick={(e)=>{
                      e.preventDefault();
                      console.log("Usuario: "+rut)
                      login(rut);
                    }
                    }>
                      Login
                      {props.children}
                  </ButtonLogin>
                    
              </Form>
    </Formik>
  )
}

export default InputLogin