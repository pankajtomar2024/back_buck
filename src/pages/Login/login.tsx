import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  Divider,
  Snackbar,
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../../assets/images/bake_buck.jpg"; // Adjust the path as necessary
import AuthService from "../../services/auth.service";
import { LoginResponse, Loginreq } from "@/types/auth.type";
import { useNavigate } from "react-router-dom";
// import { BranchService } from "@/services/branch.service";
import { LocalStorageService } from "@/helpers/local-storage-service";
import { Roles } from "@/contants/global.enum";
import { useRecoilState } from "recoil";
// import { role, sidbarSelectionState } from "@/states/state";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import customStyle from "@/style/custom.style";
import { CartItemsState, EmailState } from "@/states/state";

const theme = createTheme({
  palette: {
    primary: {
      main: customStyle.colors.OurProductBackgroundColor, // Light blue background
    },
    secondary: {
      main: "#FFFFFF", // White color for box
    },
    text: {
      primary: customStyle.colors.buttonBorderMainPage, // Light blue for text
    },
    success: {
      main: "#008000", // Green button
    },
  },
});

const LoginPage: React.FC = () => {
  //   let branch_service = new BranchService();
  let local_service = new LocalStorageService();
  let auht_service = new AuthService();
  const [email, setEmail] = useRecoilState(EmailState);
  const [password, setPassword] = useState("");
  const [branches, setBranches] = useState([]);
  // const[]
  // const selectedBranch = useRef('')
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [cartitems, setCartItems] = useRecoilState(CartItemsState);
  const [loader, setLoading] = useState(false);

  //@ts-ignore
  //   const [apirole, setapirole] = useRecoilState(role); //@ts-ignore
  //   const [selectedSidebar, setselectedSidebar] =
  // useRecoilState(sidbarSelectionState);

  // const [branch, setBranch] = useState([])

  useEffect(() => {
    let access_token = local_service.get_accesstoken();

    // if (access_token != null) {
    //   navigate("/dashboard");
    // }
    //   branch_service
    //     .getAllBranches()
    //     .then((data) => {
    //       console.log(data);
    //       setBranches(data.branches as any);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }, []);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    console.log(event);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    let service = new AuthService();

    let data: Loginreq = {
      //@ts-ignore
      email: email,
      password: password,
      //@ts-ignore
      branchId: selectedBranch,
    };

    auht_service
      .adminLogin({
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.success == true) {
          console.log(data);
          local_service.set_accesstoken(data.token);
          if (cartitems.length > 0) {
            navigate("/cart/exit");

            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            navigate("/");
          }

          console.log(data);
          setLoading(false);
          // setOpen(true);
        }
      });
    // navigate("/admin/products");
    // service
    //   .login(data, selectedRole)
    //   .then((data: LoginResponse) => {
    //     if (data.success == true) {
    //       setLoading(false);

    //       switch (data.role) {
    //         case "student":
    //           navigate("/learning");
    //           setselectedSidebar("Learning");

    //           break;
    //         case "tutor":
    //           navigate("/schedule");
    //           setselectedSidebar("schedule");
    //           break;
    //         case "branch-owner":
    //           setselectedSidebar("Dashboard");
    //           navigate("/dashboard");

    //           break;
    //         default:
    //           setselectedSidebar("Dashboard");
    //           navigate("/dashboard");
    //       }
    //       // navigate('/dashboard')
    //       setOpen(false);
    //       setapirole(data?.role);
    //     }
    //   })
    //   .catch((e: any) => {
    //     console.log(e);
    //     setLoading(false);
    //     setOpen(true);
    //   });

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Branch:", branches);
    // You can add code here to handle the form submission, such as making an API call.
  };

  // const handleChange = (event: any) => {
  //   selectedBranch.current = event.target.value
  //   console.log(selectedBranch.current) // Optional: To verify the value in the console
  // }

  const handleChange = (event: any) => {
    setSelectedBranch(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "130vh",
          height: "50%",
          bgcolor: "primary.main",
          p: 4,
        }}
      >
        {/* <Typography variant="h3" align="center" gutterBottom color="text.primary" sx={{ mb: 4 }}>
          LMS PORTAL
        </Typography> */}

        <Box
          sx={{
            // display: 'flex',
            bgcolor: "secondary.main",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,

            width: { xs: "90%", sm: "70%", md: "50%", lg: "70%" },
            maxWidth: 1600,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="100"
            gutterBottom
            // color="#005388"
            color={customStyle.colors.buttonBorderMainPage}
          >
            <strong> Sign In</strong>
          </Typography>

          <Box
            sx={{
              display: "flex",
              bgcolor: "secondary.main",
              // p: 4,
              // borderRadius: 2,
              // boxShadow: 3,
              width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
              // maxWidth: 1200,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flex: 1,
                pr: { md: 4 },
              }}
            >
              {/* <Typography
                variant="h4"
                align="left"
                fontWeight="10px"
                color={customStyle.colors.buttonBorderMainPage}
                // sx={{
                //   // color: 'blue',
                //   color: "rgb(102, 193, 252)",
                // }}
              >
                Sign in
              </Typography> */}
              <FormControl fullWidth margin="normal" variant="outlined">
                {/* <InputLabel id="branch-label">Branch</InputLabel> */}
                {/* <TextField
                  fullWidth
                  label="Role"
                  select
                  variant="outlined"
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  {Roles.map((role, index) => (
                    <MenuItem
                      key={index}
                      sx={{ color: "grey" }}
                      value={role as any}
                    >
                      {role.toLocaleUpperCase() as any}
                    </MenuItem>
                  ))}
                </TextField> */}
              </FormControl>
              {/* <TextField fullWidth margin="normal" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Typography align="left" sx={{ mt: 1 }}>
                <a
                  href="/reset-password"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Forgot Password?
                </a>
              </Typography> */}

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  display:
                    selectedRole.split(" ").join("") != "branch-owner"
                      ? "none"
                      : "block",
                }}
              >
                {/* <InputLabel id="branch-label">Branch</InputLabel> */}
                <TextField
                  fullWidth
                  label="Branch"
                  select
                  variant="outlined"
                  sx={{
                    display:
                      selectedRole.split(" ").join("") != "branch-owner"
                        ? "none"
                        : "block",
                  }}
                  value={selectedBranch}
                  onChange={handleChange}
                >
                  {branches.map((branch, index) => (
                    //@ts-ignore
                    <MenuItem
                      key={index}
                      //@ts-ignore
                      value={branch._id}
                      sx={{ color: "grey" }}
                    >
                      {
                        //@ts-ignore
                        branch.name.toLocaleUpperCase()
                      }
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                // color="success"
                sx={{ mt: 2 }}
                disabled={!(email.length > 0) && !(password.length > 0)}
                //@ts-ignore
                sx={{ color: "", mt: 4 }}
              >
                Sign in
              </Button>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                bgcolor: "primary.main",
                width: 2,
                marginLeft: "10px",
                display: { xs: "none", md: "block" },
              }}
            />
            <Box
              sx={{
                flex: 1,

                alignItems: "center",
                justifyContent: "center",
                display: { xs: "none", md: "flex" },
                pl: { md: 4 },
              }}
            >
              <img
                src={Logo}
                alt="Learning Academy"
                style={{ width: "100%", maxWidth: 300, height: "auto" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        //   sx={{backgroundColor:"red"}}
        message="We Can't Verify Your Identity"
        //   action={action}
      />

      <Backdrop style={{ color: "#fff", zIndex: 1300 }} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
};

export default LoginPage;
