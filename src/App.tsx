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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<DashboardPage />}
              // outlet={<DashboardPageLayout />}
            >
              <Route path="/" element={<HomePage />}></Route>
              <Route path="shop" element={<EShopLayout />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
