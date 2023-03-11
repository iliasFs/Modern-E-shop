import React from "react";
import {
  Box,
  Button,
  Divider,
  formControlClasses,
  IconButton,
  Typography,
} from "@mui/material";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

//styled Component. It is actually a way to reuse css Code , almost as a component in jsx files
const FlexBox = styled(Box)`
display:flex;
justify-content:space-between
align-items:center;

`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box // OVERLAY
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto" //this will help us with the scrolling
    >
      {/* MODAL */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px,30%)" // this is a function in css that its gonna give a maximum of 400px if it goes beyond that you can say this is a width of 30% if the screens are bigger
        height="100%"
        backgroundColor="white"
      >
        <Box padding='30px' overflow ='auto' height = '100%' >
            {/* HEADER SECTION */}
        <FlexBox mb = '15px'>

            <Typography variant = 'h3'>SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick = {()=>dispatch(setIsCartOpen({}))}>
                <CloseIcon/>
            </IconButton>
        </FlexBox>

        {/* CART LIST */}
        <Box>
        {cart.map((item)=> (

            <Box key = {`${item.attributes.name}-${item.id}`}>

                <FlexBox p = '15px 0'>
                    <Box flex = '1 1 40%'>
                        <img 
                                src= {`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                alt={item?.name} 
                                width = '123px'
                                height = '164px'
                        />
                    </Box>
                </FlexBox>
                <Box/>
        ))}

        </Box>

        </Box>

      </Box>
    </Box>
  );
};

export default CartMenu;
