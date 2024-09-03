// src/components/Navbar.tsx
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/system";
import { LogoBuck } from "@/assets/images";
import customStyle from "@/style/custom.style";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Logo = styled("div")({
  backgroundColor: "white",
  paddingTop: "6px",
  //   padding: "10px 20px",
  //   marginTop: "0.5rem",
  //   marginBottom: "0.1rem",
  //   padding: "0px",
  textAlign: "center",
  borderRadius: "4px",
});

const NavbarButton = styled(Button)({
  color: "#B28E5E",
  margin: "0 10px",
});

const OrderButton = styled(Button)({
  backgroundColor: "white",
  color: "#B28E5E",
  borderRadius: "20px",
  border: "1px solid #B28E5E",
  marginLeft: "10px",
  "&:hover": {
    backgroundColor: "#eac4ea",
  },
});

const Navbar = () => {
  const theme = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "20px",
          backgroundColor: "#694F8E",
          color: "white",
          paddingTop: "0.1rem",
          paddingBottom: "0.2rem",
          //   padding: "0.2rem",
        }}
      >
        <Typography textAlign="center">
          <small> Use Our Code Siddhant to Get Additional 15% Discount</small>
        </Typography>
      </Box>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "2px solid #7B5292", padding: "0px" }}
      >
        {showSearch ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        ) : (
          <>
            <Logo>
              <Typography variant="h6" color="black">
                <img
                  src={LogoBuck}
                  width="50px"
                  height="100%"
                  alt="Image"
                ></img>
                {/* <LogoBuck src={LogoBuck}></LogoBuck> */}
              </Typography>
            </Logo>
            <Toolbar
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px",
              }}
            >
              {isMobile ? (
                <>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexGrow={1}
                    sx={{ marginLeft: "70px" }}
                  >
                    <NavbarButton>ABOUT US</NavbarButton>
                    <NavbarButton
                      onClick={() => {
                        navigate("/shop");
                      }}
                    >
                      PRODUCTS
                    </NavbarButton>
                    <NavbarButton>SPECIALITY CAKES</NavbarButton>
                    <NavbarButton>FIND US</NavbarButton>
                    <NavbarButton>CONTACT US</NavbarButton>
                    <NavbarButton>CONTACT US</NavbarButton>
                  </Box>
                </>
              )}
              <Box display="flex" alignItems="center">
                <IconButton color="inherit" onClick={handleSearchClick}>
                  <SearchIcon />
                  <Typography variant="button" color="#B28E5E"></Typography>
                </IconButton>
                <OrderButton variant="contained">ORDER ONLINE</OrderButton>
              </Box>
            </Toolbar>
          </>
        )}
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {[
              "ABOUT US",
              "PRODUCTS",
              "SPECIALITY CAKES",
              "FIND US",
              "CONTACT US",
            ].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
