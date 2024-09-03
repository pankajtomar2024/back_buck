import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { State, City } from "country-state-city";

import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AuthService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "@/helpers/local-storage-service";
import { useRecoilState } from "recoil";
import {
  EmailState,
  loaderState,
  SnackBarMessageState,
  SnackBarSevertyState,
  SnackBarState,
} from "@/states/state";

export default function AddUser() {
  // window.location.reload();
  let navigate = useNavigate();
  let auth_service = new AuthService();
  let local_service = new LocalStorageService();
  let [email, setEmail] = useRecoilState(EmailState);
  let [loader, setLoader] = useRecoilState(loaderState);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: email,
      password: "",
      number: "",
      address: {
        street: "",
        state: null,
        city: "",
        postalCode: "",
      },
    },
    onSubmit: (values) => {
      const dataToSubmit = {
        ...values,
        address: {
          ...values.address,
          state:
            //@ts-ignore
            states.find((s) => s.isoCode === values.address.state)?.name || "",
          //@ts-ignore
          city: cities.find((c) => c.name === values.address.city)?.name || "",
          country: "India",
        },
      };
      console.log(JSON.stringify(dataToSubmit, null, 2));
      dataToSubmit.email = email;
      auth_service
        .createUser(dataToSubmit)
        .then((data) => {
          setLoader(true);
          setSnackbarOpen(true);
          if (data.success == true) {
            local_service.set_user(data.customer);
            local_service.set_accesstoken(data.customer.token);
            setsnackBarType("success");
            setsnackBarMessage("User Created Succesfully");
            navigate("/cart/exit");
            window.location.reload();
          } else {
            setsnackBarType("error");
            setsnackBarMessage("User Created Succesfully");
            navigate("/");
            // navigate("/cart/exit");
            // window.location.reload();
          }
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      // Replace this with your API call
    },
  });
  let [Snackbaropen, setSnackbarOpen] = useRecoilState(SnackBarState);
  let [snackBarType, setsnackBarType] = useRecoilState(SnackBarSevertyState);
  let [snackBarMessage, setsnackBarMessage] =
    useRecoilState(SnackBarMessageState);

  const [states, setStates] = useState(State.getStatesOfCountry("IN"));
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let token = local_service.get_accesstoken();
    if (token) {
      navigate("/");
    }
  }, []);
  const handleStateChange = (
    //@ts-ignore
    event
    //@ts-ignore
  ) => {
    //@ts-ignore
    const selectedState = event.target.value;
    formik.setFieldValue("address.state", selectedState);
    //@ts-ignore
    setCities(City.getCitiesOfState("IN", selectedState));
    formik.setFieldValue("address.city", "");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              margin="normal"
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              disabled={true}
              onChange={formik.handleChange}
              margin="normal"
            />
          </Grid>

          {/* Password Field */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              margin="normal"
            />
          </Grid>

          {/* Phone Number Field */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Phone Number"
              required
              name="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              margin="normal"
              inputProps={{
                maxLength: 10, // Indian phone numbers are 10 digits long
              }}
              helperText="Enter a valid 10-digit Indian phone number"
              //@ts-ignore

              error={
                //@ts-ignore
                formik.touched.number &&
                (!/^[6-9]\d{9}$/.test(formik.values.number) ||
                  formik.errors.number)
              }
            />
          </Grid>

          {/* Street Address Field */}
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              label="Street"
              name="address.street"
              value={formik.values.address.street}
              onChange={formik.handleChange}
              margin="normal"
            />
          </Grid>

          {/* State Select */}
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>State</InputLabel>
              <Select
                label="State"
                required
                name="address.state"
                value={formik.values.address.state}
                onChange={handleStateChange}
              >
                {states.map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* City Select */}
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel required>City</InputLabel>
              <Select
                required
                label="City"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                disabled={!formik.values.address.state}
              >
                {cities.map((city) => (
                  <MenuItem
                    //@ts-ignore
                    key={city.name}
                    //@ts-ignore
                    value={city.name}
                  >
                    {
                      //@ts-ignore
                      city.name
                    }
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Postal Code Field */}
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Postal Code"
              name="address.postalCode"
              value={formik.values.address.postalCode}
              onChange={formik.handleChange}
              margin="normal"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>

      <Backdrop style={{ color: "#fff", zIndex: 1300 }} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
