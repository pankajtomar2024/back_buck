import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import customStyle from "@/style/custom.style";
import { Tesimonial } from "@/assets/images";

const testimonials = [
  {
    name: "John Doe",
    feedback: "BakeBuck has the best pastries! Always fresh and delicious.",
  },
  {
    name: "Jane Smith",
    feedback: "Their delivery service is top-notch. Never been disappointed!",
  },
  {
    name: "Sam Wilson",
    feedback:
      "I love the variety of breads they offer. Perfect for any occasion.",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <Box padding="5%">
      <Container>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{
            fontFamily: "Overlock",
            color: customStyle.colors.buttonBorderMainPage,
          }}
        >
          Testimonials
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={Tesimonial}
            alt="Placeholder"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <Carousel
          index={currentIndex}
          onChange={(index) => setCurrentIndex(index as any)}
          navButtonsProps={{
            style: {
              display: "none", // Hide default buttons
            },
          }}
          indicatorContainerProps={{
            style: {
              marginTop: "60px",

              //   display: "none",
            },
          }}
          sx={{ marginBottom: "2" }}
        >
          {testimonials.map((testimonial, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{ padding: "2%", margin: "2%" }}
            >
              <Typography
                variant="body2"
                textAlign="center"
                gutterBottom
                color="grey"
              >
                {testimonial.feedback}
              </Typography>
              <Typography variant="subtitle1" textAlign="center">
                <strong>"{testimonial.name}"</strong>
              </Typography>
            </Paper>
          ))}
        </Carousel>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 7 }}
        >
          <Grid item>
            <IconButton
              onClick={handlePrev}
              sx={{
                backgroundColor: customStyle.colors.buttonBorderMainPage,
                color: "white",
              }}
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: customStyle.colors.buttonBorderMainPage,
                color: "white",
              }}
            >
              <ArrowForward />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialCarousel;
