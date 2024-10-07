import React, { FunctionComponent, lazy } from "react";

import { AppRouteObject } from "#/router";

const _setTitles = (Components: FunctionComponent, meta?) => {
  return () => <Components {...meta}></Components>;
};

export const syncRoutes: AppRouteObject[] = [
  {
    path: "app",
    Component: lazy(() => import("@/views/App")),
    meta: { label: "app" },
  },
  {
    path: "html2xml",
    Component: lazy(() => import("@/views/html2xml")),
    meta: { label: "html2xml" },
  },
  {
    path: "postMessage",
    Component: lazy(() => import("@/views/postMessage")),
    meta: { label: "postMessage" },
  },
  {
    path: "charts",
    Component: lazy(() => import("@/views/charts")),
    meta: { label: "charts" },
  },
  {
    path: "screenRecord",
    Component: lazy(() => import("@/views/CaptureScreenRecord")),
    meta: { label: "screenRecord" },
  },
];
