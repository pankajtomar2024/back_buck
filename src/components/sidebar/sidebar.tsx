import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import customStyle from "@/style/custom.style";

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false); // Initially closed on all screens
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  let navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setOpen(false); // Close sidebar when a menu is selected (optional)
  };
  useEffect(() => {
    setSelectedMenu("Products");
  }, []);
  return (
    <Box display="flex">
      <Box
        sx={{
          width: open ? 240 : 0,
          transition: "width 0.3s",
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          height: "100vh",
          position: "fixed",
          zIndex: 1300,
        }}
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem
            button
            selected={selectedMenu === "Products"}
            onClick={() => {
              navigate("products");
              handleMenuClick("Products");
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          {/* <ListItem
            button
            selected={selectedMenu === "Categories"}
            onClick={() => {
              handleMenuClick("Categories");
            }}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem> */}
          <ListItem
            button
            selected={selectedMenu === "Branches"}
            onClick={() => {
              navigate("branches");
              handleMenuClick("Branches");
            }}
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Branch" />
          </ListItem>

          <ListItem
            button
            selected={selectedMenu === "Order"}
            onClick={() => {
              navigate("orders");
              handleMenuClick("Order");
            }}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Order" />
          </ListItem>
        </List>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: open ? "240px" : "0px",
          transition: "margin-left 0.3s",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
          sx={{ mt: 2, ml: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box p={3}>
          <h1
            style={{
              color: customStyle.colors.buttonBorderMainPage,
              fontFamily: customStyle.fontstyle.headerFontFamily,
            }}
          >
            {selectedMenu || "Select a Menu"}
          </h1>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
