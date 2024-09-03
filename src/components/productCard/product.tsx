import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ShopService from "@/services/shop.service";
import { Product } from "@/types/shop.type";
import { useRecoilState } from "recoil";
import { CartItemsState, ProductListState } from "@/states/state";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] =
    //@ts-ignore

    useState<Product>({});

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
  };

  // const product = {
  //   ratings: {
  //     averageRating: 2,
  //     numberOfReviews: 4,
  //   },
  //   veg: false,
  //   _id: "66b9b56a12c6e8e04c97ce43",
  //   name: "Chocolate Cake",
  //   description: "Lorem Ipsum Dolores Main",
  //   price: 250,
  //   ingredients: "Flour, Sugar, Cocoa, Eggs, Butter",
  //   stock: 10,
  //   category: {
  //     image:
  //       "https://static8.depositphotos.com/1203063/895/i/950/depositphotos_8957532-stock-photo-chocolate-cacke.jpg",
  //     _id: "66b9f968195b7af2d2d33347",
  //     title: "Cake",
  //     createdAt: "2024-08-12T12:00:40.791Z",
  //     updatedAt: "2024-08-12T12:00:40.798Z",
  //     __v: 0,
  //   },
  // };

  let shop_service = new ShopService();
  useEffect(() => {
    console.log(id);
    if (id) {
      shop_service.getProduct(id).then((data) => {
        //@ts-ignore
        setProduct(data?.data);
        // console.log(data.data);
      });
    }
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
      <Card
        sx={{
          display: "flex",
          maxWidth: 800,
          boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.2)",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={product?.image}
          alt={product?.name}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component="div" variant="h4">
                {product.name}
              </Typography>
              <Chip
                label={product.veg ? "Veg" : "Includes Egg"}
                color={product.veg ? "success" : "error"}
              />
            </Box>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
              Price: ₹ {product.price}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Ingredients: {product.ingredients}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Stock:{" "}
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Rating value={product?.ratings?.averageRating} readOnly />
              <Typography variant="body2" color="textSecondary">
                {product?.ratings?.numberOfReviews} Reviews
              </Typography>
            </Box>
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
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductPage;
