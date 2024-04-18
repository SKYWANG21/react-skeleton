import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("@/views/App")),
    children: [
      {
        path: "/first",
        Component: lazy(() => import("@/views/first")),
      },
      {
        path: "/second",
        Component: lazy(() => import("@/views/second")),
      },
    ],
  },
]);
export default routes;
