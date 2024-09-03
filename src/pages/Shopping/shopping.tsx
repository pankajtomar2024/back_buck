import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Divider,
  Avatar,
  Modal,
  Fab,
  Snackbar,
  TextField,
  CircularProgress,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "@/style/custom.style";
import OTPInput from "@/components/otpinput/otp";
import { NonVeg, Veg } from "@/assets/images";
import Rating from "@mui/material/Rating";
import { useRecoilState } from "recoil";
import {
  ActivationTokenState,
  CartItemsState,
  CategoryListState,
  EmailState,
  ProductListState,
  SnackBarMessageState,
  SnackBarSevertyState,
  SnackBarState,
  TotlalState,
} from "@/states/state";
import ShopService from "@/services/shop.service";
import { Category, Product, ProductListResponse } from "@/types/shop.type";
import AuthService from "@/services/auth.service";

import { useNavigate, useParams } from "react-router-dom";
import { Description } from "@mui/icons-material";
import { LocalStorageService } from "@/helpers/local-storage-service";

const categories = [
  { name: "Category 1", image: "https://via.placeholder.com/40", id: "cat1" },
  { name: "Category 2", image: "https://via.placeholder.com/40", id: "cat2" },
  { name: "Category 3", image: "https://via.placeholder.com/40", id: "cat3" },
];

const products = [
  {
    id: 1,
    name: "Eggless Fresh Cream Pineapple Cake [1/2kg]",
    price: 10,
    veg: true,
    category: "Category 1",
    image: "https://via.placeholder.com/150",
    description: "Description for Product 1 sfasfsafsa safsaf",
  },

  {
    id: 5,
    name: "Product 2",
    veg: false,
    price: 10,
    category: "Category 2",
    image: "https://via.placeholder.com/150",
    description: "Description for Product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20,
    category: "Category 2",
    image: "https://via.placeholder.com/150",
    description: "Description for Product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: 30,
    category: "Category 3",
    image: "https://via.placeholder.com/150",
    description: "Description for Product 3",
  },
];

export default function EShopLayout() {
  const [tempToken, settempToken] = useRecoilState(ActivationTokenState);
  let shop_service = new ShopService();
  // const [cartItems, setCartItems] = useState<
  //   { id: number; name: string; price: number; quantity: number }[]
  // >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [cartItems, setCartItems] = useRecoilState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
      image_url?: string;
      description?: string;
    }[]
  >(CartItemsState as any);

  const [productList, setProuductList] = useRecoilState<Array<Product>>(
    ProductListState as any
  );

  const [categoryList, setCategoryList] = useRecoilState<Array<Category>>(
    CategoryListState as any
  );
  const [email, setEmail] = useRecoilState(EmailState);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [open, setOpen] = useState(false);

  // const [email, setEmail] = useState("");
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [sum, settotalsum] = useRecoilState(TotlalState);

  let [Snackbaropen, setSnackbarOpen] = useRecoilState(SnackBarState);
  let [snackBarType, setsnackBarType] = useRecoilState(SnackBarSevertyState);
  let [snackBarMessage, setsnackBarMessage] =
    useRecoilState(SnackBarMessageState);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  // const handleOpen = (product: any) => setSelectedProduct(product);
  // const handleClose = () => setSelectedProduct(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCloseOtpModal = () => setOpenOtpModal(false);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };
  let auth_service = new AuthService();
  let local_service = new LocalStorageService();
  let navigate = useNavigate();

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      console.log(otp);
      // await axios.post('/your-otp-verification-endpoint', { email, otp });
      setLoading(false);
      handleCloseOtpModal();
      setOpenOtpModal(true);
      console.log(tempToken);

      auth_service
        .submitOtp(
          {
            otp: otp,
          },

          tempToken
        )
        .then((data) => {
          if (data.status == true) {
            setSnackbarOpen(true);
            setsnackBarType("success");
            setsnackBarMessage(data.message);
            navigate("/user/add");
          } else {
            setSnackbarOpen(true);
            setsnackBarType("error");
            setsnackBarMessage(data.message);
          }
        })
        .catch(
          (
            //@ts-check
            err
          ) => {
            console.log(err);
          }
        );
      // alert("OTP Verified");
      // navigate("/user/add");
      // local_service.de();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = await auth_service.verfiyEamil(email);

      if (data.isUserExist == false) {
        settempToken(data?.data?.token);
        // local_service.set_accesstoken(data?.data?.token);
        // data?.data?.token;

        setOpenOtpModal(true);
      } else {
        navigate("/login");
      }
      setLoading(false);
      handleClose();
      setOpenOtpModal(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    shop_service
      .ProductList()
      .then((data) => {
        console.log(data);
        if (data.status == true) {
          //@ts-ignore
          setProuductList(data?.product as any);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    shop_service
      .CategoryList()
      .then((data) => {
        console.log(data);
        if (data.status == true) {
          //@ts-ignore
          setCategoryList(data?.category as any);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("CartItemnschanged", cartItems);
  }, [cartItems]);
  const handleScrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    setIsMenuOpen(false); // Close menu on selection
  };

  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    quantity: number;

    image_url: string;
    description: string;
  }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    if (window.innerWidth < 960) {
      setIsSnackbarOpen(true); // Open Snackbar on smaller screens
    }
    setSelectedProduct(false);
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const calculateSubtotal = () => {
    let data = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    //@ts-ignore
    settotalsum(data);
    return data;
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Grid container>
      {/* Categories Sidebar */}
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          //   p: 1,
          borderRight: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "red" },
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          color={customStyle.colors.buttonBorderMainPage}
          fontFamily="OverLock"
        >
          Categories
        </Typography>
        <List>
          {categoryList?.map((category) => (
            <ListItem
              button
              key={category._id}
              onClick={() => handleScrollToCategory(category._id)}
              selected={selectedCategory === category._id}
            >
              {/* {JSON.stringify(category)} */}
              <Avatar src={category.image} sx={{ mr: 2 }} />
              <Typography variant="body2">
                <strong> {category.title}</strong>
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Products Section */}
      <Grid
        item
        xs={12}
        md={7.75}
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          p: 1,
          "&::-webkit-scrollbar": { width: "2px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: customStyle.colors.NavbarUpperColor,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {categoryList?.map((category) => (
            <div key={category._id} id={category._id}>
              <Divider
                sx={{
                  mb: 2,
                  textAlign: "center",
                  justifyContent: "center",
                  borderBottomWidth: 5,
                }}
              >
                {" "}
                <Typography
                  variant="h6"
                  textAlign="center"
                  justifyContent="center"
                  //   marginBottom="29px"
                  color={customStyle.colors.buttonBorderMainPage}
                  sx={{ mt: 4, fontFamily: "Overlock" }}
                >
                  {category.title}
                </Typography>
              </Divider>
              <Grid container spacing={2}>
                {productList
                  .filter((product) => product?.category?._id === category?._id)
                  .map((product) => {
                    const truncatedDescription = product.description
                      .split(" ")
                      .slice(0, 5)
                      .join(" ");
                    const isTruncated =
                      product.description.split(" ").length > 5;

                    return (
                      <Grid item xs={12} md={6} key={product._id}>
                        <Card
                          sx={{
                            display: "flex",
                            mb: 2,
                            flexDirection: { xs: "column", md: "row" },
                            boxShadow: "0px 4px 8px 0px",
                          }}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Box
                            sx={{
                              width: { xs: "150px", md: "150px" },
                              height: "auto",
                            }}
                            p={3}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "20%",
                              }}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                mt: 1,
                                width: "100%",
                                margin: "0px",
                                marginLeft: "0px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent the modal from opening when clicking the button
                                let productObj = {
                                  id: product._id,
                                  // name: product.name,
                                  // price: product.price,
                                  image_url: product.image,
                                  // quantity: product.quantity,
                                  // description: product.description,
                                  ...product,
                                };
                                addToCart(productObj as any);
                                setSelectedProduct(false);
                              }}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                          <CardContent
                            sx={{
                              flex: "1 ",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Chip label="BestSeller " variant="outlined" />
                              <img
                                width="30px"
                                height="32px"
                                src={product.veg ? Veg : NonVeg}
                                alt={product.veg ? "Veg" : "Non-Veg"}
                              />
                            </Box>
                            <Box
                              sx={{
                                textAlign: "left",
                                lineHeight: "1",
                                color: "grey",
                              }}
                              mt={2}
                            >
                              <Rating
                                name="read-only"
                                value={product.ratings.averageRating}
                                precision={0.5}
                                readOnly
                              />
                              <br />
                              <small>{product.ratings.numberOfReviews}K</small>
                            </Box>
                            <Box sx={{ width: "100%" }}>
                              <p>{product.name}</p>
                            </Box>
                            <Typography variant="body2">
                              ₹{product.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {truncatedDescription}...
                              {/* {isTruncated && (
                                // <Button
                                //   size="small"
                                //   onClick={(e) => {
                                //     e.stopPropagation();
                                //     handleOpen(product);
                                //   }}
                                // >
                                //   Read More
                                // </Button>
                              )} */}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          ))}
        </Box>
      </Grid>

      {/* {Selecte product} */}

      <>
        {selectedProduct && (
          <Modal
            open={!!selectedProduct}
            onClose={() => {
              setSelectedProduct(false);
              handleClose();
            }}
          >
            <Box
              sx={{
                width: "80%",
                margin: "auto",
                mt: 5,
                p: 0.3,
                bgcolor: customStyle.colors.NavbarUpperColor,
                borderRadius: 2,
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5">{selectedProduct.name}</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {selectedProduct.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Price: ₹{selectedProduct.price}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={selectedProduct?.ratings?.averageRating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {selectedProduct?.ratings?.numberOfReviews}K Reviews
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 1,
                      width: "100%",
                      margin: "0px",
                      marginLeft: "0px",
                    }}
                    onClick={(e) => {
                      setSelectedProduct(false);
                      e.stopPropagation(); // Prevent the modal from opening when clicking the button
                      let productObj = {
                        id: selectedProduct._id,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        image_url: selectedProduct.image,
                        quantity: selectedProduct.quantity,
                        description: selectedProduct.description,
                      };
                      addToCart(productObj as any);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
                <Box
                  p={1}
                  sx={{
                    flex: "0 0 50%",
                    display: "flex",

                    justifyContent: "center",
                  }}
                >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    height="100px"
                    width="400px"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Card>
            </Box>
          </Modal>
        )}
      </>

      {/* Cart Section */}
      <Grid
        item
        xs={12}
        md={2.25}
        sx={{
          display: { xs: "none", md: "block" },
          width: "100%",

          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          p: 1,
          borderLeft: "1px solid #ccc",
          paddingLeft: "0px",
          backgroundColor: "#f9f9f9",
          "&::-webkit-scrollbar": { width: "20px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: customStyle.colors.NavbarUpperColor,
          },
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          color={customStyle.colors.buttonBorderMainPage}
          fontFamily="Overlock"
        >
          Your Cart
        </Typography>

        {cartItems.length == 0 ? (
          <>
            <Box
              alignItems="center"
              sx={{
                textAlign: "center",
                AlignItems: "center",
              }}
            >
              <RemoveShoppingCartIcon
                style={{
                  width: 60,
                  height: 60,
                  margin: "auto",
                }}
              ></RemoveShoppingCartIcon>
              <Typography textAlign="center"> No Items In Cart</Typography>
            </Box>
          </>
        ) : (
          <>
            <List
              sx={{
                alignItems: "left",
                paddingLeft: "0px",
              }}
            >
              {cartItems.map((item) => (
                <div>
                  <ListItem
                    key={item.id}
                    sx={{
                      paddingLeft: "10px",

                      backgroundColor: "white",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "13px" }}>{item.name}</p>
                      {/* <p>
                    {" "}
                    <small>
                      {item.price} X{item.quantity}
                    </small>
                  </p> */}
                    </div>

                    {/* <Typography
                //@ts-ignore
                >
                  {item.name} <br></br> ${item.price}
                  <br></br>
                  <small>
                    {item.price} X{item.quantity}
                  </small>
                </Typography> */}
                  </ListItem>

                  <ListItem sx={{ padding: "0px" }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", ml: "0" }}
                    >
                      <IconButton onClick={() => decreaseQuantity(item.id)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{item.quantity}</Typography>
                      <IconButton onClick={() => increaseQuantity(item.id)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        //@ts-ignore

                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: 0.5 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                </div>
              ))}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                alignItems: "center",
                paddingLeft: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: customStyle.colors.buttonBorderMainPage,
                  fontFamily: customStyle.fontstyle.headerFontFamily,
                }}
              >
                Subtotal
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: customStyle.colors.buttonBorderMainPage,
                  fontFamily: customStyle.fontstyle.headerFontFamily,
                }}
              >
                ₹{calculateSubtotal()}
              </Typography>
            </Box>

            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                //   fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  let token = local_service.get_accesstoken();
                  if (token) {
                    navigate("/cart/exit");
                  }

                  handleOpen();
                }}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </Grid>

      {/* Permanent Box showing cart summary on larger screens */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: 90,
          right: 100,
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="body1">
          Total Items: {cartItems.length}, Total Amount: ₹{calculateSubtotal()}
        </Typography>
      </Box>

      {/* Snackbar for smaller screens */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`Total Items: ${
          cartItems.length
        }, Total Amount: ₹${calculateSubtotal()}`}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              let token = local_service.get_accesstoken();
              if (token) {
                navigate("/cart/exit");
              }

              handleOpen();
            }}
          >
            Checkout
          </Button>
        }
        sx={{ mb: 6 }} // Adjust position above the menu button
      />

      {/* Mobile Categories Menu */}
      <Fab
        color="primary"
        aria-label="menu"
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => setIsMenuOpen(true)}
      >
        <MenuIcon />
      </Fab>
      <Modal open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Box
          sx={{ width: 250, height: "100%", bgcolor: "background.paper", p: 2 }}
        >
          <Typography variant="h6">Categories</Typography>
          <List>
            {categoryList?.map((category) => (
              <ListItem
                button
                key={category._id}
                onClick={() => handleScrollToCategory(category._id)}
                selected={selectedCategory === category._id}
              >
                <Avatar src={category.image} sx={{ mr: 2 }} />
                <Typography variant="body1">{category.title}</Typography>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => setIsMenuOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="email-modal-title"
        aria-describedby="email-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="email-modal-title" variant="h6" component="h2">
            Enter your email
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Proceed"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* OTP Modal */}
      <Modal
        open={openOtpModal}
        onClose={handleCloseOtpModal}
        aria-labelledby="otp-modal-title"
        aria-describedby="otp-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="otp-modal-title" variant="h6" component="h2" mb={2}>
            Enter OTP
          </Typography>
          {/* <TextField
            fullWidth
            margin="normal"
            label="6-digit OTP"
            name="otp"
            type="text"
            value={otp}
            onChange={handleOtpChange}
          /> */}
          <OTPInput
            //@ts-ignore
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={4}
          />
          {/* <span>Resend</span> */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOtpSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}
