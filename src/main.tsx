import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import AuthMiddleware from "./middleware/AuthMiddleware.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
