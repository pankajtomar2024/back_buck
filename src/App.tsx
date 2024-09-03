import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dahboard";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "@/style/main";
import HomePage from "./pages/HomePage";
import EShopLayout from "./pages/Shopping";
import AddUser from "./pages/UserCreate/AddUser";
import { RecoilRoot, useRecoilState } from "recoil";
import ExitCartPage from "./pages/ExitCart";
import AboutUs from "./pages/About";
import ProductPage from "./components/productCard/product";
import Order from "./pages/Orders/order";
import LoginPage from "./pages/Login/login";
import { AdminPageLayout } from "./pages/AdminLayout/admin.layout";
import AdminMainPage from "./pages/AdminProduct/admin.product";
import BranchList from "./pages/Branches/branch";
import OrderPageAdmin from "./pages/AdminOrder/orderPage";
import Profile from "./pages/UserProfile/user.profile";
import NotFoundPage from "404notfoundpage";
function App() {
  return (
    <>
      <h1> I am here </h1>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<DashboardPage />}
                // outlet={<DashboardPageLayout />}
              >
                <Route path="/" element={<HomePage />}></Route>


{/*                 <Route path="admin/product" element={<LoginPage />}></Route>
                <Route path="shop" element={<EShopLayout />}></Route>
                <Route path="user/add" element={<AddUser />}></Route>
                <Route path="cart/exit" element={<ExitCartPage />}></Route>
                <Route path="about" element={<AboutUs />}></Route>
                <Route path="product/:id" element={<ProductPage />}></Route>
                <Route path="order" element={<Order />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="login" element={<LoginPage />}></Route> */}
              </Route>

{/*               <Route path="admin/login" element={<LoginPage />}></Route>

              <Route path="/admin" element={<AdminPageLayout />}>
                <Route path="products" element={<AdminMainPage />}></Route>
                <Route path="branches" element={<BranchList />}></Route>
                <Route path="orders" element={<OrderPageAdmin />}></Route>
              </Route> */}

              
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
