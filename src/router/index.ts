import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("@/views/layout")),
  },
  {
    path: "/app",
    Component: lazy(() => import("@/views/App")),
    children: [
      {
        path: "/app/first",
        Component: lazy(() => import("@/views/first")),
      },
      {
        path: "/app/second",
        Component: lazy(() => import("@/views/second")),
      },
    ],
  },
]);
export default routes;