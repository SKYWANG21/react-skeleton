import React, { FunctionComponent, lazy } from "react";

const setTitles = (Components: FunctionComponent, meta?) => {
  return () => <Components {...meta}></Components>;
};

export class SyncRoute {
  path: string;
  Component: any;
  children?: SyncRoute[] = [];
  title?: string;
}

export const syncRoutes: SyncRoute[] = [
  {
    path: "app",
    Component: lazy(() => import("@/views/App")),

    title: "app",
  },
  {
    path: "html2xml",
    Component: lazy(() => import("@/views/html2xml")),
    title: "html2xml",
  },
  {
    path: "postMessage",
    Component: lazy(() => import("@/views/postMessage")),
    title: "postMessage",
  },
  {
    path: "charts",
    Component: lazy(() => import("@/views/charts")),
    title: "charts",
  },
];
