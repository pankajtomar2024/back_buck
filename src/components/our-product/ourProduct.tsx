import { pastreies } from "@/assets/images";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import customstyle from "@/style/custom.style";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Anniversary Cake",
    description: "This is the description for card 1.",
    imgPath:
      "https://gurgaonbakers.com/wp-content/uploads/2020/12/printed-heart-photo-cake.jpg",
  },
  {
    title: "ChocoLava Cake",
    description: "This is the description for card 2.",
    imgPath:
      "https://gurgaonbakers.com/wp-content/uploads/2020/11/chocolate-heaven-cake.jpg",
  },
  {
    title: "BlueBerry Cake",
    description:
      "https://gurgaonbakers.com/wp-content/uploads/2020/12/blueberry-cakes.jpg",
    imgPath:
      "https://gurgaonbakers.com/wp-content/uploads/2020/12/blueberry-cakes.jpg",
  },
  {
    title: "Plum Cake",
    description: "This is the description for card 4.",
    imgPath:
      "https://gurgaonbakers.com/wp-content/uploads/2020/12/truffle-cakes.jpg",
  },
];

const OurProduct = () => {
  let naviagate = useNavigate();
  return (
    <>
      <Box
        sx={{
          padding: "2%",
          background: "linear-gradient(#694F8E 50%, white 50%)",
        }}
      >
        <Container>
          <Typography
            sx={{ marginBottom: "30px" }}
            textAlign="center"
            fontFamily="Overlock"
            color="white"
            variant="h3"
          >
            Our Product
          </Typography>
          <Container sx={{ backgroundColor: "white", mt: "3" }}>
            <Grid container spacing={3}>
              {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={card.imgPath}
                      onClick={() => {
                        naviagate("shop");
                      }}

                      //   alt={card.title}
                      // src={pastreies}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {card.title}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              p="2"
              sx={{ margin: "5%" }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: customstyle.colors.buttonBorderMainPage,
                  border: "1.3px solid #B28E5E",
                  backgroundColor: customstyle.colors.FrontPagebackgroundColor,
                  margin: "auto",
                  color: customstyle.colors.buttonBorderMainPage,
                  fontWeight: "500",
                  fontFamily: "Arial",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  naviagate("shop");
                }}
              >
                <small>Know More</small>
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export { OurProduct };
