import { Teacake } from "@/assets/images";
import customStyle from "@/style/custom.style";
import { Box, Button, Grid, Typography } from "@mui/material";

const TeaTime = () => {
  return (
    <>
      <Box
        sx={{
          padding: "10%",
          backgroundColor: customStyle.colors.TeaTimeBackgroudnColor,
        }}
      >
        <Grid container spacing={2}>
          {/* First Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={Teacake}
                alt="Placeholder"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
          {/* Second Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: "100%" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  p: 2,
                  fontFamily: "Overlock",
                  color: customStyle.colors.buttonBorderMainPage,
                }}
                textAlign="left"
              >
                Tea-Time Delights
              </Typography>

              <Typography variant="body2" textAlign="left" ml={2}>
                Pick the perfect companion for tea with our wide range of
                breads. Whether you prefer a classic baguette, a soft brioche,
                or a hearty whole grain loaf, our selection offers something for
                every taste. Pair your tea with our freshly baked breads to
                elevate your teatime experience to a new level of delight and
                satisfaction. Enjoy the perfect balance of flavors and textures
                with every bite
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                textAlign="center"
                sx={{ marginTop: "18%" }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: customStyle.colors.buttonBorderMainPage,
                    border: "1.3px solid #B28E5E",
                    backgroundColor:
                      customStyle.colors.FrontPagebackgroundColor,
                    margin: "auto",
                    color: customStyle.colors.buttonBorderMainPage,
                    fontWeight: "500",
                    fontFamily: "Arial",
                    borderRadius: "20px",
                  }}
                >
                  <small>Know More</small>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TeaTime;
