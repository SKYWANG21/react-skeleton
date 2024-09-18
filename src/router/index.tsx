import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { syncRoutes } from "./syncRoute";
import { AppRouteObject } from "#/router";

function createRoute(data: AppRouteObject[]) {
  return [
    {
      path: "/",
      Component: lazy(() => import("@/views/layout")),
      title: "首页",
      children: data.map((it) => {
        return {
          path: it.path,
          Component: it.Component,
          children: it.children ? createRoute(it.children) : [],
        };
      }),
    },
  ];
}

const routes = createBrowserRouter(createRoute(syncRoutes));
export default routes;

export * from "./syncRoute";
