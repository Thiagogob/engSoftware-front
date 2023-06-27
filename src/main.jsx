import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import Globals from "./styles/globals";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Globals />
    <AppRoutes />
  </React.StrictMode>
);
