import customStyle from "@/style/custom.style";
import {
  Box,
  Button,
  colors,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import customstyle from "@/style/custom.style";
const AboutUs = () => {
  return (
    <>
      <Box padding="2%">
        <Container>
          <Typography
            variant="h3"
            sx={{
              color: customStyle.colors.buttonBorderMainPage,
              fontFamily: "Overlock",
            }}
            textAlign="center"
          >
            About Us
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="grey"
            sx={{ padding: "7%" }}
          >
            Welcome to BakeBuck, your go-to destination for the freshest and
            most delicious baked goods delivered right to your doorstep. We are
            a team of passionate bakers, tech enthusiasts, and food lovers
            dedicated to bringing you the finest bakery experience through our
            app.
          </Typography>

          <Box display="flex" alignItems="center" textAlign="center">
            <Button
              variant="outlined"
              sx={{
                borderColor: customstyle.colors.buttonBorderMainPage,
                border: "1.3px solid #B28E5E",
                backgroundColor: customStyle.colors.FrontPagebackgroundColor,
                margin: "auto",
                color: customstyle.colors.buttonBorderMainPage,
                fontWeight: "500",
                fontFamily: "Arial",
                borderRadius: "20px",
              }}
            >
              <small>Know More</small>
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export { AboutUs };
