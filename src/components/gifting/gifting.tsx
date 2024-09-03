import { Box, Button, Grid, Typography } from "@mui/material";
import { Gifting as giftimage } from "@/assets/images";
import customStyle from "@/style/custom.style";
import { useNavigate } from "react-router-dom";

const Gifting = () => {
  let navigate = useNavigate();
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* First Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: "white", height: "100%" }}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  p: 2,
                  fontFamily: "Overlock",
                  color: customStyle.colors.buttonBorderMainPage,
                }}
                textAlign="center"
              >
                Packed With Love & <br></br>
                All Your Favoraite
              </Typography>

              <Typography variant="body2" textAlign="center">
                Now Gift your Love Onse Our Specila Hamber Designed Specaaly for
                you
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
                  onClick={() => {
                    navigate("shop");
                  }}
                >
                  <small>Know More</small>
                </Button>
              </Box>
            </Box>
          </Grid>
          {/* Second Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={giftimage}
                alt="Placeholder"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Gifting;
