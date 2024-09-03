import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Link,
} from "@mui/material";
import customstyle from "@/style/custom.style";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
const Footer = () => {
  return (
    <Box
      id="footer-bakebuck"
      sx={{
        backgroundColor: "black",

        padding: "10%",
        color: "white",
        fontFamily: "Inter",
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="white" gutterBottom>
              <strong> SignUp For Updates </strong>
            </Typography>
            <Typography variant="body2"></Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
              }}
            >
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                size="small"
                sx={{
                  // Root class for the input field
                  "& .MuiOutlinedInput-root": {
                    color: customstyle.colors.buttonBorderMainPage,

                    // Class for the border around the input field
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: customstyle.colors.buttonBorderMainPage,
                      borderWidth: "1px",
                    },
                  },
                  // Class for the label of the input field
                  "& .MuiInputLabel-outlined": {
                    color: customstyle.colors.buttonBorderMainPage,
                    fontSize: "13px",
                    fontWeight: "100",
                  },
                }}
                fullWidth
              />
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderColor: customstyle.colors.buttonBorderMainPage,
                  border: "1.3px solid #B28E5E",
                  color: customstyle.colors.buttonBorderMainPage,
                  fontWeight: "500",
                  fontFamily: "Arial",
                  borderRadius: "20px",
                }}
              >
                <small>Sign Up</small>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Container sx={{ ml: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "right",
                  mb: 1,
                  textAlign: "right",
                }}
              >
                <LocalPhoneIcon sx={{ mr: 1 }} />
                <Typography textAlign="center" variant="body2">
                  +91- 78274 70399
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <MailOutlineIcon sx={{ mr: 1 }} />
                <Typography variant="body2">contact@bakebucks.com</Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: customstyle.colors.buttonBorderMainPage,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <InstagramIcon
                      sx={{
                        color: customstyle.colors.buttonBorderMainPage,
                      }}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: customstyle.colors.buttonBorderMainPage,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <YouTubeIcon
                      sx={{
                        color: customstyle.colors.buttonBorderMainPage,
                      }}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: customstyle.colors.buttonBorderMainPage,
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <TwitterIcon
                      sx={{
                        color: customstyle.colors.buttonBorderMainPage,
                      }}
                    />
                  </Link>
                </Box>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" gutterBottom>
                  Our Story
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Our Products
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Specality Cakes
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Blogs
                </Typography>
                <Typography variant="body2" gutterBottom>
                  CSR
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Html Site
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" gutterBottom>
                  Privacy Plociy
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Cookies Policy
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Refund Policy
                </Typography>
                <Typography variant="body2" gutterBottom>
                  FAQ Policy
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Nutrition Policy
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
