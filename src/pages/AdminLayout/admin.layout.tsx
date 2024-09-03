import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import Loader from "@/components/loader/loader";
import { loaderState, TotlalState } from "@/states/state";
import { useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import { Box } from "@mui/material";
import customStyle from "@/style/custom.style";

const AdminPageLayout = () => {
  let [loader, setLoader] = useRecoilState(loaderState);

  // let [cartitme,se]

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [loader]);

  return (
    <>
      <div>
        <Box
          sx={{ backgroundColor: customStyle.colors.TeaTimeBackgroudnColor }}
        >
          <Sidebar />
          <Outlet />
        </Box>

        {/* Rest of your app */}
        {/* <Footer /> */}
        <Loader openloader={loader}></Loader>
      </div>
    </>
  );
};

export { AdminPageLayout };
