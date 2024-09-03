import customStyle from "@/style/custom.style";
import { Box, Container, Typography } from "@mui/material";

const OrderOnline = () => {
  return (
    <>
      <Box
        sx={{ backgroundColor: customStyle.colors.TeaTimeBackgroudnColor }}
        padding="7%"
      >
        <Container>
          <Typography
            variant="h3"
            color={customStyle.colors.buttonBorderMainPage}
            fontStyle="OverLock"
            textAlign="center"
            mb={5}
          >
            Like Our Products ?
          </Typography>

          <Typography variant="body2" textAlign="center">
            Indulge yourself with your favorite product and experience pure
            bliss. Whether it's a decadent pastry, a luxurious skincare item, or
            any special treat that brings you joy, now is the perfect time to
            savor the moment. Treat yourself—you deserve it!
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default OrderOnline;
