import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Country, State, City } from "country-state-city";
import axios from "axios"; // Import Axios or your preferred HTTP client
import AuthService from "@/services/auth.service";
import {
  loaderState,
  SnackBarMessageState,
  SnackBarSevertyState,
  SnackBarState,
} from "@/states/state";
import { useRecoilState } from "recoil";

const Profile = () => {
  let [Snackbaropen, setSnackbarOpen] = useRecoilState(SnackBarState);
  let [snackBarType, setsnackBarType] = useRecoilState(SnackBarSevertyState);
  let [snackBarMessage, setsnackBarMessage] =
    useRecoilState(SnackBarMessageState);

  const sampleUserData = {
    status: true,
    message: "User fetched successfully",
    user: [
      {
        address: [
          {
            street: "gk-20,jakr roald",
            city: "Amroli",
            state: "Gujarat",
            postalCode: "21892",
            country: "India",
          },
        ],
        _id: "66c70600220ba5d17e0fecca",
        name: "Kalika",
        email: "kalka@gmail.com",
        role: "customer",
        contactNumber: "9323232321",
        orders: [],
      },
    ],
  };

  const [userData, setUserData] = useState<any>(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    addressType: "Home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [selectedCountry, setSelectedCountry] = useState("IND");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loader, setLoader] = useRecoilState(loaderState);

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    contactNumber: false,
  });
  let auth_service = new AuthService();

  useEffect(() => {
    auth_service.getUser().then((data) => {
      if (data.status == true) {
        auth_service.getAddress().then((auth_data) => {
          if (auth_data.success) {
            let new_data = data?.user;
            new_data.address = auth_data.address;
            setUserData(data?.user);
          }
          // console.log(data);
        });
      }
    });

    // const user = sampleUserData.user[0];
    // setUserData(user);
  }, []);

  const handleAddressChange = (e: any) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    if (userData) {
      let new_Data = { ...newAddress };
      new_Data.city = selectedCity;
      new_Data.state = selectedState;

      setNewAddress(new_Data);

      // console.log()
      const updatedUserData = {
        ...userData,
        address: [...userData.address, newAddress],
      };

      console.log(selectedState, selectedCity);
      setUserData(updatedUserData);

      auth_service.addAddress(new_Data);

      setLoader(true);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

      setNewAddress({
        name: "",
        addressType: "Home",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      });

      // auth_service
    }
  };

  const handleProfileChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfileData = async () => {
    try {
      auth_service
        .profileEdit(userData)
        .then((data) => {
          if (data.status == true) {
            setSnackbarOpen(true);
            setsnackBarType("success");
            setsnackBarMessage(data.message);
          } else {
            setSnackbarOpen(true);
            setsnackBarType("error");
            setsnackBarMessage(data?.message);
          }
        })
        .catch(
          (
            //@ts-ignore

            err

            //@ts-ignore
          ) => {
            setSnackbarOpen(true);
            setsnackBarType("error");
            setsnackBarMessage("Somethig Went Wrong");
          }
        );
      // const response = await axios.post(
      //   "https://api.example.com/update-profile",
      //   userData
      // );
      // console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleEdit = (field: string) => {
    if (
      ////@ts-ignore
      //@ts-ignore
      isEditing[field]
    ) {
      saveProfileData(); // Call save function when exiting edit mode
    }
    setIsEditing({
      ...isEditing,
      //@ts-ignore
      [field]: !isEditing[field],
    });
  };

  const handleCountryChange = (e: any) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e: any) => {
    setSelectedCity(e.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {userData && (
        <>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                fullWidth
                value={userData.name}
                onChange={handleProfileChange}
                name="name"
                InputProps={{
                  readOnly: !isEditing.name,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleEdit("name")}>
                        {isEditing.name ? <SaveIcon /> : <EditIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                disabled={true}
                value={userData.email}
                onChange={handleProfileChange}
                name="email"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Number"
                fullWidth
                value={userData.contactNumber}
                onChange={handleProfileChange}
                name="contactNumber"
                InputProps={{
                  readOnly: !isEditing.contactNumber,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleEdit("contactNumber")}>
                        {isEditing.contactNumber ? <SaveIcon /> : <EditIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
            Addresses
          </Typography>
          <Grid container spacing={2}>
            {userData.address &&
              userData.address.map((addr: any, index: number) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1">
                        <strong>Street:</strong> {addr.street}
                      </Typography>
                      <Typography variant="body1">
                        <strong>City:</strong> {addr.city}
                      </Typography>
                      <Typography variant="body1">
                        <strong>State:</strong> {addr.state}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Postal Code:</strong> {addr.postalCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Country:</strong> {addr.country}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Add New Address
          </Typography>
          <Box component="form" sx={{ marginBottom: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Street Name"
                  required
                  fullWidth
                  name="name"
                  value={newAddress.name}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  label="Address Type"
                  fullWidth
                  name="addressType"
                  value={newAddress.addressType}
                  onChange={handleAddressChange}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Street"
                  fullWidth
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  label="Country"
                  fullWidth
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  {Country.getAllCountries().map((country) => (
                    <MenuItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  label="State"
                  fullWidth
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={!selectedCountry}
                >
                  {State.getStatesOfCountry(selectedCountry).map((state) => (
                    <MenuItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  label="City"
                  fullWidth
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedState}
                >
                  {City.getCitiesOfState(selectedCountry, selectedState).map(
                    (city) => (
                      <MenuItem key={city.name} value={city.name}>
                        {city.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postal Code"
                  required
                  fullWidth
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleAddressChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleAddAddress}
            >
              Add Address
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
