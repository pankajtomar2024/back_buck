import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";

export default function AboutUs() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 5 }}>
        <Typography variant="h3" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Welcome to Bake Bucks! Established in 2001, we have been serving the
          community with the finest baked goods for over two decades. Our
          passion for baking is reflected in every loaf, cake, and pastry that
          comes out of our ovens. We are committed to using only the freshest
          ingredients, ensuring that every bite is as delicious as the last.
        </Typography>
        <Typography variant="body1" paragraph align="center">
          At Bake Bucks, we believe that baking is not just a craft but an art.
          Our experienced bakers put their heart and soul into creating a wide
          range of products that cater to every taste and occasion. From
          traditional breads to custom cakes, we have something for everyone.
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Our bakery is more than just a place to buy bread and cakes. It's a
          community hub where people come together to enjoy good food and great
          company. Whether you're here for a quick snack or to place an order
          for a special event, we are dedicated to making your experience
          unforgettable.
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Thank you for choosing Bake Bucks, where every bite is a treat!
        </Typography>
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            {/* <img
              src="https://example.com/your-bakery-image.jpg"
              alt="Bake Bucks"
              style={{ width: "100%", borderRadius: "8px" }}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
