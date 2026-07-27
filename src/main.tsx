import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./m3styles/light.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import AuthMiddleware from "./middleware/AuthMiddleware.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import Layout from "./components/Overlay/Layout.tsx";
import CreatePage from "./pages/CreatePage/CreatePage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<AuthMiddleware />}>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path={"/create"} element={<CreatePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
