import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./router";
import "./assets/index.css";
import { RouterProvider } from "react-router-dom";
import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>
);
