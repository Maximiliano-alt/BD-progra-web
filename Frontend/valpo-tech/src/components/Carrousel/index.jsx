import React from 'react'
import { laptopL,laptop,tablet, mobileS, mobileL } from '../../const/screens'
import styled from 'styled-components'
import ProductCards from '../Admin/ProductsCards'
import AllBuysCards from '../Client/AllBuysCards'
const Container = styled.div`
    width: 90%;
    max-width: 1000px;
    height: fit-content;
    margin: auto;
    display: grid;
    padding: 5px;
    box-sizing: border-box;
    margin-top: 20px ;
    grid-template-columns: repeat(3,1fr);
    @media(${laptop}){
        padding: 5px;
        grid-template-columns: repeat(3,1fr);
    }
    @media(${tablet}){
       
        grid-template-columns: repeat(2,1fr);
    }
    @media(${mobileL}){
  
        grid-template-columns: repeat(1,1fr);
    }
   
`
const ItemUnique = styled.div`
    height: 300px;
    width: 300px;
    min-height: 102px;
    display: flex;
    align-items: center;
    margin: 10px 0 10px 0;
    justify-content: center;
    position: relative;

    @media(${laptop}){
        width: 100%;
    }

    @media(${mobileL}){
        margin: 10px 0 10px 0;
    }
`
const ButtonModify = styled.button`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: black;
    position: absolute;
    top: -9px;
    right: 0;
    cursor: pointer;
    &:hover{
        -webkit-box-shadow: -1px 0px 27px -1px rgba(255,255,255,1);
        -moz-box-shadow: -1px 0px 27px -1px rgba(255,255,255,1);
        box-shadow: -1px 0px 27px -1px rgba(255,255,255,1);
    }

`
const Carrousel = (props) => {
    
  return (
    <Container>
        {
            props?.data?.map((data,index)=>{
                return(
                    <ItemUnique key={index} >
                        {
                            console.log("Productos:", data?.clientBuys?.map((i) =>{return i}))
                        }
                        {/* <ButtonModify onClick={(e)=>{
                            e.preventDefault()
                            props?.setModalModify({value:true,id:data._id,data: data})
                        }}>
                            
                        </ButtonModify> */}
                        
                        {
                            props?.tipo === 'Product' && <ProductCards 
                                // indice={index} 
                                producto={data} 
                                actualizar={props?.actualizar}
                               
                            />
                        }
                        {
                            props?.tipo === 'Allbuys' && <AllBuysCards 
                                // indice={index} 
                                producto={data?.clientBuys} 
                                actualizar={props?.actualizar}
                               
                            />
                        }
                        
                    </ItemUnique>
                )
            })
        } 
    </Container>
  )
}

export default Carrousel