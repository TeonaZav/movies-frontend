import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { MoviesProvider } from "./context/MoviesContext";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <AuthProvider>
      <ModalProvider>
        <MoviesProvider>
          <App />
        </MoviesProvider>
      </ModalProvider>
    </AuthProvider>
  </HashRouter>
);
