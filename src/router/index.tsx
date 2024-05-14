import { title } from "process";
import React, { ComponentType, FunctionComponent, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const setTitles = (Components: FunctionComponent, meta) => {
  return () => <Components {...meta}></Components>
}

const routes = createBrowserRouter([
  {
    path: "/",
    Component: setTitles(lazy(() => import("@/views/layout")), { title: '首页' }),
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