import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Container } from "@mui/material";
import { FirstCarousle, LogoBuck } from "@/assets/images";

const items = [
  {
    name: "Image 1",
    description: "Image 1 Description",
    imgPath: "../../assets/images/Container.png",
  },
  {
    name: "Image 2",
    description: "Image 2 Description",
    imgPath: "../../assets/images/Container.png",
  },
  {
    name: "Image 3",
    description: "Image 3 Description",
    imgPath: "../../assets/images/Container.png",
  },
];

function NewVarietyCarousel() {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Carousel>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

function Item(
  //@ts-ignore
  props
) {
  return (
    <Paper>
      <Box
        component="img"
        sx={{
          display: "block",
          width: "100%",
          height: "100vh",
        }}
        alt={props.item.name}
        // src={props.item.imgPath}
        src={FirstCarousle}
      />
      {/* <img src={LogoBuck} width="50px" height="100%" alt="Image"></img> */}
      {/* <image src={FirstCarousle}></image> */}
    </Paper>
  );
}

export default NewVarietyCarousel;
