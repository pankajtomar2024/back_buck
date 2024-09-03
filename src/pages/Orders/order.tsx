import ShopService from "@/services/shop.service";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  let shop_service = new ShopService();

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchOrders = async () => {
      shop_service.getOrders().then((data) => {
        console.log(data.order as any);
        setOrders(data.order as any);
      });
      // Replace this with an actual API call
      const response = {
        success: true,
        message: "Order list fetched successfully",
        length: 19,
        order: [
          {
            _id: "66bcea4c480d0a9e1e64fe5a",
            userId: "66bc8ba8b1bb9d801fa576fa",
            cartData: [
              {
                productId: {
                  name: "Strawberry Cake Flavour",
                  price: 500,
                  image:
                    "https://imgcdn.floweraura.com/chocolate-bliss-heart-cake-9797530ca-A_0.jpg",
                },
                quantity: 2,
                _id: "66bcea4c480d0a9e1e64fe5b",
              },
              {
                productId: {
                  name: "Chocolate Cake",
                  price: 750,
                  image:
                    "https://imgcdn.floweraura.com/chocolate-cake-9797530ca-A_1.jpg",
                },
                quantity: 1,
                _id: "66bcea4c480d0a9e1e64fe5c",
              },
            ],
            orderId: "ODID-147-2507520-6839388",
            payment_method: "Credit Card",
            status: "Pending",
            addressId: {
              name: "Pankaj address",
              street: "123 Main St",
              city: "Springfield",
              state: "IL",
              postalCode: "62704",
              country: "INDIA",
            },
            ordertype: "PAID",
            total_price: 1250,
            createdAt: "2024-08-14T17:33:00.251Z",
            updatedAt: "2024-08-14T17:33:00.251Z",
          },
          // Add more orders here as needed
        ],
      };
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Previous Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          //@ts-ignore
          <Grid item xs={12} key={order._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID:{" "}
                  {
                    //@ts-ignore

                    order.orderId
                  }
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Status:{" "}
                  {
                    //@ts-ignore
                    order.status
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Payment Method:{" "}
                  {
                    //@ts-ignore
                    order.payment_method
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Total Price: ₹
                  {
                    //@ts-ignore
                    order.grandTotal
                  }
                </Typography>
                <Grid container spacing={2}>
                  {
                    //@ts-ignore
                    order.cartData.map((item) => (
                      <Grid item xs={12} sm={6} md={4} key={item._id}>
                        <Card variant="outlined">
                          <CardContent>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Avatar
                                  variant="square"
                                  src={item.productId.image}
                                  sx={{ width: 56, height: 56 }}
                                />
                              </Grid>
                              <Grid item xs>
                                <Typography variant="body1">
                                  {item.productId.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Quantity: {item.quantity}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Price: ₹{item.productId.price}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrdersPage;
