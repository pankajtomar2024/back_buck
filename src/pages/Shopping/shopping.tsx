import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "@/style/custom.style";

const categories = [
  { name: "Category 1", image: "https://via.placeholder.com/40", id: "cat1" },
  { name: "Category 2", image: "https://via.placeholder.com/40", id: "cat2" },
  { name: "Category 3", image: "https://via.placeholder.com/40", id: "cat3" },
];

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    category: "Category 1",
    image: "https://via.placeholder.com/150",
    description: "Description for Product 1",
  },

  {
    id: 5,
    name: "Product 2",
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
  const [cartItems, setCartItems] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleScrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu on selection
  };

  const addToCart = (product: { id: number; name: string; price: number }) => {
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
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888" },
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
          {categories.map((category) => (
            <ListItem
              button
              key={category.id}
              onClick={() => handleScrollToCategory(category.id)}
              selected={selectedCategory === category.id}
            >
              <Avatar src={category.image} sx={{ mr: 2 }} />
              <Typography variant="body2">
                <strong> {category.name}</strong>
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Products Section */}
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          p: 1,
          "&::-webkit-scrollbar": { width: "2px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: customStyle.colors.TeaTimeBackgroudnColor,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {categories.map((category) => (
            <div key={category.id} id={category.id}>
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
                  {category.name}
                </Typography>
              </Divider>
              <Grid container spacing={2}>
                {products
                  .filter((product) => product.category === category.name)
                  .map((product) => (
                    <Grid item xs={12} md={6} key={product.id}>
                      <Card
                        sx={{
                          display: "flex",
                          mb: 2,
                          flexDirection: { xs: "column", md: "row" },
                          boxShadow: "0px 4px 8px 0px rgba(128, 0, 128, 0.5)", // Purple shadow
                        }}
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
                            onClick={() => addToCart({ ...product })}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                        <CardContent
                          sx={{
                            flex: "1 0 auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6">{product.name}</Typography>
                          <Typography variant="body2">
                            ${product.price}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {product.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
          ))}
        </Box>
      </Grid>

      {/* Cart Section */}
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          display: { xs: "none", md: "block" },
          width: "100%",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          p: 1,
          borderLeft: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          "&::-webkit-scrollbar": { width: "20px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888" },
        }}
      >
        <Typography
          variant="h6"
          textAlign="left"
          color={customStyle.colors.buttonBorderMainPage}
          fontFamily="Overlock"
        >
          Cart
        </Typography>
        <List
          sx={{
            alignItems: "left",
            paddingLeft: "0px",
          }}
        >
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                paddingLeft: "0px",
              }}
            >
              <Typography
                //@ts-ignore
                variant="body3"
              >
                <strong>
                  {item.name} <br></br> ${item.price}
                </strong>
                <br></br>
                <small>
                  {item.price} X{item.quantity}
                </small>
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", ml: "0" }}>
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
          ))}
        </List>
        <Typography
          variant="h6"
          sx={{ mt: 2, color: customStyle.colors.buttonBorderMainPage }}
        >
          Subtotal: ${calculateSubtotal()}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          //   fullWidth
          sx={{ mt: 2 }}
        >
          Checkout
        </Button>
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
          Total Items: {cartItems.length}, Total Amount: ${calculateSubtotal()}
        </Typography>
      </Box>

      {/* Snackbar for smaller screens */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`Total Items: ${
          cartItems.length
        }, Total Amount: $${calculateSubtotal()}`}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => alert("Proceed to Checkout")}
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
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                onClick={() => handleScrollToCategory(category.id)}
                selected={selectedCategory === category.id}
              >
                <Avatar src={category.image} sx={{ mr: 2 }} />
                <Typography variant="body1">{category.name}</Typography>
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
    </Grid>
  );
}
