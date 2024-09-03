import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import Loader from "@/components/loader/loader";
import {
  loaderState,
  SnackBarMessageState,
  SnackBarSevertyState,
  SnackBarState,
  TotlalState,
} from "@/states/state";
import { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";

const DashboardPageLayout = () => {
  let [loader, setLoader] = useRecoilState(loaderState);
  let [open, setOpen] = useRecoilState(SnackBarState);
  let [snackBarType, setsnackBarType] = useRecoilState(SnackBarSevertyState);
  let [snackBarMessage, setsnackBarMessage] =
    useRecoilState(SnackBarMessageState);

  // let [cartitme,se]

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [loader]);

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <div>
        <Navbar />
        <Outlet />

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            //@ts-ignore
            severity={snackBarType} //@tsignore
            // sx={{ bgcolor: "#1976d2", color: "#fff" }}
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>

        {/* Rest of our app */}
        <Footer />
        <Loader openloader={loader}></Loader>
      </div>
    </>
  );
};

export { DashboardPageLayout };
