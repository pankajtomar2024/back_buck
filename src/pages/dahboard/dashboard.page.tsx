import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";

const DashboardPageLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        {/* Rest of your app */}
        <Footer />
      </div>
    </>
  );
};

export { DashboardPageLayout };
