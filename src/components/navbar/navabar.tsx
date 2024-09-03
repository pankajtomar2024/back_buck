// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
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
import CartIcon from "@/components/cartIcon/carticon";

import Person2Icon from "@mui/icons-material/Person2";
import { LocalStorageService } from "@/helpers/local-storage-service";
import { useRecoilState } from "recoil";
import {
  CartItemsState,
  LoginState,
  SelectedBranchState,
} from "@/states/state";
import AuthService from "@/services/auth.service";
import {
  Avatar,
  FormControl,
  InputLabel,
  ListItemAvatar,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import items from "razorpay/dist/types/items";
import { Address } from "@/types/auth.type";

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
let local_service = new LocalStorageService();

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
  const [loggedIn, setloggedIn] = useRecoilState(LoginState);
  const [rightdrawerOpen, setRightDrawerOpen] = useState(false);
  const [Cartsize, setCartSize] = useState(0);

  const [cartitem, setCartItems] = useRecoilState(CartItemsState);
  const [searchText, setSearchText] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [products, setProducts] = useState([]);

  const [addresses, setAddress] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useRecoilState<string>(SelectedBranchState);
  const navigate = useNavigate();

  let auth_service = new AuthService();

  useEffect(() => {
    auth_service
      .searchProduct({
        //@ts-ignore
        searchText: searchText,
      })
      .then((data) => {
        if (data?.status == true) {
          console.log(data.products);
          setProducts(data.products);
        }
        console.log(data);
      });
  }, [searchText]);

  useEffect(() => {
    auth_service.getAllBranches().then((data) => {
      if (data.success == true) {
        let alldata = data.branch.map((e) => {
          return {
            ...e.address,
            restorantID: e.restaurantId,
          };
        });

        setAddress(alldata as any);
      }
    });
  }, []);
  const handleAddressChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    console.log(event.target.value);
    setSelectedAddress(event.target.value as string);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);

    // auth_service.searchProduct({
    //   searchText: searchText,
    // });

    console.log(searchText);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // const handleSearchClick = async () => {
  //   try {
  //     const response = await axios.post("/your-api-endpoint", {
  //       searchText: searchText,
  //     });
  //     console.log("Search results:", response.data);
  //     // Handle the API response here (e.g., update state to display results)
  //   } catch (error) {
  //     console.error("Error during search:", error);
  //     // Handle the error (e.g., show a notification)
  //   }

  // };

  const handleProductClick = (
    //@ts-ignore
    productId
  ) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    {
      setCartSize(
        JSON.parse(
          //@ts-ignore
          local_service.get("CartItem")
        )?.length
      );
      if (local_service.get_accesstoken()) {
        setloggedIn(true);
      } else {
        setloggedIn(false);
      }

      // console.log(JSON.parse(local_service.get("CartItem")));
    }
  }, []);

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
          <small> Use Our Code FIRST2024 to Get Additional 15% Discount</small>
        </Typography>
      </Box>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "2px solid #7B5292", padding: "0px" }}
      >
        {showSearch ? (
          <Box
            // display="flex"
            // justifyContent="center"
            // alignItems="center"
            sx={{ position: "relative", width: "100%" }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />

            <List>
              {products.map((product) => (
                <ListItem
                  button
                  //@ts-ignore
                  key={product._id}
                  onClick={() => {
                    handleProductClick(
                      //@ts-ignore
                      product._id
                    );
                    setShowSearch(!showSearch);
                    window.location.reload();
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      //@ts-ignore
                      src={
                        //@ts-ignore
                        product.image
                      }
                      alt={
                        //@ts-ignore
                        product.name
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    //@ts-ignore
                    primary={product.name}
                  />
                </ListItem>
              ))}
            </List>
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
                    <NavbarButton
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      HOME
                    </NavbarButton>

                    <NavbarButton
                      onClick={() => {
                        navigate("/about");
                      }}
                    >
                      ABOUT US
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => {
                        navigate("/shop");
                      }}
                    >
                      PRODUCTS
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => {
                        setTimeout(() => {
                          navigate("/");
                          const element =
                            document.getElementById("best-seller");
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "end",
                            });
                          }
                        }, 1000);
                      }}
                    >
                      SPECIALITY CAKES
                    </NavbarButton>
                    {/* <NavbarButton>FIND US</NavbarButton> */}
                    <NavbarButton
                      onClick={() => {
                        const element =
                          document.getElementById("footer-bakebuck");
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                          });
                        }
                      }}
                    >
                      CONTACT US
                    </NavbarButton>
                  </Box>
                </>
              )}
              <Box display="flex" alignItems="center">
                <IconButton color="inherit" onClick={handleSearchClick}>
                  <SearchIcon />
                  <Typography variant="button" color="#B28E5E"></Typography>
                </IconButton>

                <IconButton
                  color="inherit"
                  onClick={() => {
                    navigate("/shop");
                  }}
                >
                  <CartIcon value={cartitem.length} />
                </IconButton>

                <IconButton
                  onClick={() => {
                    setRightDrawerOpen(true);
                  }}
                >
                  {loggedIn ? <Person2Icon></Person2Icon> : <></>}
                </IconButton>
                {/* <IconButton
                  onClick={() => {
                    let navigate = useNavigate();
                    navigate("/shop");
                  }}
                >
                  <OrderButton variant="contained">ORDER ONLINE</OrderButton>



                </IconButton> */}

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="address-select-label">Branch</InputLabel>
                  <Select
                    labelId="address-select-label"
                    value={selectedAddress}
                    //@ts-ignore

                    label="Address"
                  >
                    {addresses.map((address) => (
                      <MenuItem
                        key={
                          //@ts-ignore
                          address?.restorantID
                        }
                        value={
                          //@ts-ignore
                          address?.restorantID
                        }
                        onClick={() => {
                          console.log(address);

                          //@ts-ignore
                          setSelectedAddress(address?.restorantID);
                        }}
                      >
                        {`${address.street} (${address.city})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* <Select
                  labelId="address-select-label"
                  value={selectedAddress}
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  onChange={(event) =>
                    setSelectedAddress(event.target.value as string)
                  }
                  label="Address"
                >
                  {addresses.map((address) => (
                    <MenuItem
                      key={address.street}
                      value={address.street}
                      onClick={() => {
                        setSelectedAddress(address.street);
                      }}
                    >
                      {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                    </MenuItem>
                  ))}
                </Select> */}

                {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="address-select-label">Branch</InputLabel>
                  <Select
                    labelId="address-select-label"
                    value={selectedAddress}
                    onChange={(event) =>
                      setSelectedAddress(event.target.value as string)
                    } // Set the selected value here
                    label="Address"
                  >
                    {addresses.map((address) => (
                      <MenuItem key={address.name} value={address.name}>
                        {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
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
              {
                name: "About Us",
                link: "about",
              },
              {
                name: "Products",
                link: "shop",
              },

              {
                name: "Contact Us",
                link: "contact",
              },

              // "ABOUT US",
              // "PRODUCTS",
              // "SPECIALITY CAKES",

              // "CONTACT US",
            ].map((text) => (
              <ListItem button key={text.name}>
                <ListItemText
                  primary={text.name}
                  onClick={() => {
                    if (text.link == "contact") {
                      const element =
                        document.getElementById("footer-bakebuck");
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "end",
                        });
                      }
                    } else {
                      navigate(text.link);
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={rightdrawerOpen}
        onClose={() => {
          toggleDrawer(false);
          setRightDrawerOpen(false);
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {[
              {
                id: "profile",
                name: "Profile",
                add: "/",
              },

              {
                id: "order",
                name: "Orders",
                add: "/",
              },
            ].map((text) => (
              <ListItem
                button
                //@ts-ignore
                key={text.id}
                onClick={() => {
                  //@ts-ignore
                  navigate(text?.id);
                }}
              >
                <ListItemText primary={text?.name} />
              </ListItem>
            ))}
            <ListItem
              button
              //@ts-ignore
              key="logout"
              onClick={() => {
                //@ts-ignore
                local_service.delete_eaccestoke();
                window.location.reload();

                // navigate("/");
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
