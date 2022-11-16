import React from 'react'
import styled from 'styled-components'
import ProductServiceClient from '../../../services/Client/ProductData.service'
const ItemUnique = styled.div`
    background-color: #ffffff;
    color: black;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content:start ;
    align-items: center ;
    border-radius: 20px;
    cursor: pointer;
    display:grid;
`
const Label = styled.label`
    width:100%;
    height: 26px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    font-size: .9em;
    display: flex;
    align-items: center;
    padding-left: 8px;
    /* identical to box height */
    color: #000000;
    
   
`
const ContainerButtons = styled.div`
    width:100%;
    height: 32px;
    display: flex ;
    flex-direction: row;
`
const ButtonCarrito = styled.button`
    width: 100%;
    /* height: 32px; */
    background: green;
    color:black;
    border-radius: 0 0 17px 17px;
    
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
   
`
const ButtonModify = styled.button`
    width: 100%;
    /* height: 32px; */
    background: white;
    color:black;
    border-radius: 0 0 17px 17px;
    
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
   
`

const ImagesContainer = styled.div`
    border-radius: 20px 20px 0 0 ;
    width: 100%;
    height: 151px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    ::-webkit-scrollbar:horizontal {
        height: 5px;
    }
    ::-webkit-scrollbar:vertical {
        width: 0px;
    }
    overflow-y: hidden;
`
const Image = styled.img`
    width: 100%;
    height: 151px;
    object-fit: contain;
`
const AllBuysCards = (props) => {
    // const deleteProduct = async ( id ) => {
    //     ProductServiceClient.remove(id)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log("clientBuys eliminado")
    //       window.location.reload();
    //     } else Promise.reject();
    //   })
    //   .catch((err) => {

    //     console.log(err)
    //   });




    //     // await axios.delete(`producto/delete?id=${id}`)
    //     // .then(( res ) => {
    //     //     if(res.data.success){
    //     //         toast.success("Eliminacion correcta del producto "+id);
    //     //         props.actualizar();
    //     //     }
    //     //     else{
    //     //         toast.error("Error al eliminar el producto");
    //     //     }
    //     // }).catch(( err ) => {
    //     //     // toast.error(err.response.error)
    //     // });
    // }
     console.log("client buys: "+props)
    return (
    <ItemUnique>
        {/* <ImagesContainer>
           
            {
                props?.producto?.images?.map((image,index)=>{
                    return(
                        <Image key={index} src={urlImages+image}/>
                    )
                })
            }
        </ImagesContainer> */}
        <Label>
            Nombre: {props?.clientBuys?.category}
        </Label>
        <Label>
            Categoria:  {props?.clientBuys?.category}
        </Label>
        
        <Label>
            Marca: {props?.clientBuys?.mark}
        </Label>
        <Label>
            Precio: ${props?.clientBuys?.price}
        </Label>
        <Label>
            Descripcion: {props?.clientBuys?.description}
        </Label>
        <Label>
            Stock: {props?.clientBuys?.stock}
        </Label>
        <ContainerButtons>
            <ButtonCarrito 
            >
                Agregar al carrito
            </ButtonCarrito>
            
           
        </ContainerButtons>
    </ItemUnique>
  )
}

export default AllBuysCards