import React from 'react'
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ItemsAdmin from '../../const/itemsNavAdmin';
import { colorItemHoverNav } from '../../const/colors';
const Header = styled.div`
    width: 100vw;
    height: 50px;
    background-color: rgba(242,92,5,0);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top:3%;
`
const TitlePage = styled.label`
        color: white;
    /* width: calc( 100vw - 100px ); */
    text-align: center;
    font-size: 1.2em;
    position: absolute;
    left: 5%;
`
const Container = styled.div`
        position: absolute;
    
    transition: all 0.5s ease-in-out;
    /* top: 50px; */
    
    z-index: 2;
    background-color: rgba(242,92,5,0);
    
`
const Ul = styled.ul`
    
    width: 200%;
    /* height: 100%; */
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-flex;

`
const Link = styled.a`
        color: white;
    -webkit-text-decoration: none;
    text-decoration: none;
    /* font-size: 1.3em; */
    /* height: 100%; */
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: space-between;
    
    
    &:hover{
      text-decoration: underline;
      transition: all .35s ease;
      
        
    }
`
const Li = styled.li`
    width: 100%;
    color: white;
    text-align: center;
    height: 14%;
    transition: background-color .2s ease-in-out;
    
    
`
const NavComponent = () => {
  const SampleLocations = useLocation();
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  return (
    <Header>
      <TitlePage htmlFor="">{capitalizarPrimeraLetra(SampleLocations.pathname.split('/')[1])}</TitlePage>
      <Container >
            <Ul>
                {ItemsAdmin.map((item,index)=>{
                    return( 
                    <Li key={index}>
                        <Link href={item.path}>{item.nombre}</Link>
                    </Li>
                    )
                })}
                
                <Link href='login'>Cerrar Sesion</Link>
                
            </Ul>
        </Container>
    </Header>
  )
}

export default NavComponent