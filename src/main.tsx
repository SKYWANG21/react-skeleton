import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "uno.css";

import "./assets/index.css";
import routes from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={routes}></RouterProvider>
    </Suspense>
  </React.StrictMode>
);

window.addEventListener("message", function (e) {
  console.log("roger", e, e.data);
});
