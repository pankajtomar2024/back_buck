import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Card,
  CardContent,
  Rating,
  Chip,
  CardActionArea,
} from "@mui/material";
import {
  CartItemsState,
  loaderState,
  SelectedBranchState,
  TotlalState,
} from "@/states/state";
import AuthService from "@/services/auth.service";
import { Address, AddressListResponse, UserResponse } from "@/types/auth.type";
import { LocalStorageService } from "@/helpers/local-storage-service";
import { NonVeg, Veg } from "@/assets/images";
import customStyle from "@/style/custom.style";
import { useNavigate } from "react-router-dom";
import ENVIORMENT from "@/envioronments/environment.developement.json";

import DeliveryIcon from "@mui/icons-material/LocalShipping"; // Example icon for Delivery
import PickupIcon from "@mui/icons-material/Store"; // Example icon for Pickup
import TakeawayIcon from "@mui/icons-material/Fastfood"; // Example icon for Takeaway

// import { BakeBuck } from "../../assets/images/bake_buck.jpg";

import Razorpay from "razorpay"; // Import Razorpay
import { Email } from "@mui/icons-material";
import { User } from "@/types/auth.type";

const ExitCartPage = () => {
  const options = [
    {
      id: "H",
      label: "Delivery",
      icon: <DeliveryIcon style={{ fontSize: 50 }} />,
    },
    {
      id: "D",
      label: "DineIn",
      icon: <PickupIcon style={{ fontSize: 50 }} />,
    },
    {
      id: "P",
      label: "Takeaway",
      icon: <TakeawayIcon style={{ fontSize: 50 }} />,
    },
  ];

  let auth_service = new AuthService();
  const [cartItems, setCartItems] = useRecoilState<
    {
      id: number;
      name: string;
      price: number;
      image_url: string;
      quantity: number;
      description: string;
    }[]
  >(CartItemsState as any);
  const [selectedRest, setSelectedRest] = useRecoilState(SelectedBranchState);
  let [sum, settotalsum] = useRecoilState(TotlalState);
  const myState = useRecoilValue(CartItemsState);

  const [selectedOption, setSelectedOption] = useState<string | null>("D");

  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption != "H") {
      auth_service.getAllBranches().then((data) => {
        if (data.success == true) {
          let alldata = data.branch.map((e) => e.address);

          if (selectedAddress != "H") {
            setAddress(alldata as any);
          } else {
            auth_service.getAddress().then((data) => {
              setAddress(data?.address);
              console.log(data);
            });
          }
          console.log(alldata);
        }
        console.log(data);
      });
    } else {
      auth_service.getAddress().then((data) => {
        setAddress(data?.address);
        console.log(data);
      });
    }
  }, [selectedOption]);
  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    console.log("State changed in ComponentB:", myState);
  }, [myState]);

  useEffect(() => {
    console.log("I am changed in the ", cartItems);
  }, [cartItems]);

  const [addresses, setAddress] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [userdata, setUserData] = useState<User | null>(null);
  const [loader, setLoader] = useState(loaderState);
  let local_service = new LocalStorageService();
  let navigate = useNavigate();

  useEffect(() => {
    auth_service.getAddress().then((data) => {
      setAddress(data?.address);
      console.log(data);
    });

    auth_service.getUser().then((data) => {
      if (data.status == true) {
        setUserData(data?.user);

        // console.log(data);
      }
    });
  }, []);

  const handleAddressChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedAddress(event.target.value as string);
  };

  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    console.log("The USer Data", userdata);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await auth_service.getOrdersToken({
      amount: String(Number(sum) * 100),
      currency: "INR",
      reciept: "receipt_order_74394",
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.order;

    const options = {
      key: ENVIORMENT.RAZORPAY_API_KEYID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: userdata?.name,
      description: "Test Transaction",
      image: {},
      order_id: order_id,
      handler: async function (
        //@ts-ignore
        response
        //@ts-ignore
      ) {
        console.log("Payment Response", res);
        console.log(response);
        let payload = placeorder();

        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          ...payload,
          restId: selectedRest,
        };

        const result = await auth_service
          .successOrderResponse(data)
          .then(
            (
              //@ts-ignore
              pay_data
            ) => {
              navigate("/order");
              local_service.set("CartItem", []);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          )
          .catch(
            (
              //@ts-ignore
              err
            ) => {
              window.location.reload();
            }
          );
      },
      prefill: {
        name: userdata?.name,
        email: userdata?.email,
        contact: "9528369493",
      },
      notes: {
        address: `Transaction  of ${amount} for Cakes`,
      },
      theme: {
        color: customStyle.colors.FrontPagebackgroundColor,
      },
    };

    const paymentObject =
      //@ts-ignore
      new window.Razorpay(options);
    paymentObject.open();
  }

  const placeorder = () => {
    try {
      let cartData: Array<any> = [];
      for (let item of cartItems) {
        let data = {
          productId: item.id,
          price: item.price,
          quantity: item.quantity,
          sku: "BBB-Strawberry-004",
        };
        cartData.push(data);
      }

      let payload = {
        cartData: cartData,
        payment_method: "Online",
        addressId: selectedAddress,
        ordertype: selectedOption,
      };

      return payload;
    } catch {
      (err: any) => {
        console.log(err);
      };
    }
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      cartItems,
      addressId: selectedAddress,
    };

    await displayRazorpay();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{
          color: customStyle.colors.buttonBorderMainPage,
          fontFamily: "OverLock",
          mb: 2,
        }}
      >
        Cart Items
      </Typography>

      <Grid container spacing={2}>
        {cartItems.map((product) => {
          return (
            <Grid item xs={12} md={12} key={product.id}>
              <Card
                sx={{
                  display: "flex",
                  mb: 2,
                  flexDirection: { xs: "column", md: "row" },
                  boxShadow: "0px 4px 8px 0px",
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
                    src={product.image_url}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20%",
                    }}
                  />
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
                      src={
                        //@ts-ignore
                        product.veg ? Veg : NonVeg
                      }
                      alt={
                        //@ts-ignore
                        product.veg ? "Veg" : "Non-Veg"
                      }
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
                      value={
                        //@ts-ignore
                        //@ts-ignore
                        product.ratings?.averageRating
                      }
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <p>{product.name}</p>
                  </Box>
                  <Typography variant="body2">
                    ₹{product.price} X {product.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {selectedOption == "H" ? (
        <>
          <Typography
            variant="h4"
            sx={{
              color: customStyle.colors.buttonBorderMainPage,
              fontFamily: "OverLock",
              mb: 2,
              mt: 2,
            }}
            gutterBottom
          >
            Select{" "}
            {
              //@ts-ignore
              selectedOption != "Delivery" ? "Branch Address" : "Address"
            }
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="address-select-label">Address</InputLabel>
            <Select
              labelId="address-select-label"
              value={selectedAddress}
              //@ts-ignore
              onChange={handleAddressChange}
              label="Address"
            >
              {addresses.map((address) => (
                <MenuItem key={address._id} value={address._id}>
                  {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <></>
      )}

      <Grid container spacing={2} mt={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={4} key={option.id}>
            <Card>
              <CardActionArea onClick={() => handleSelect(option.id)}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor:
                      selectedOption === option.id
                        ? "lightblue"
                        : "transparent",
                    borderRadius: 2,
                  }}
                >
                  {option.icon}
                  <Typography variant="h6">{option.label}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={handleSubmit}
        disabled={!selectedAddress && selectedOption == "H"}
      >
        Pay ₹{sum}
      </Button>
    </Box>
  );
};

export default ExitCartPage;
