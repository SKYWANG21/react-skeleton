/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-07-17 17:53:19
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-08-14 17:02:14
 * @FilePath: \react-skeleton\src\router\syncRoute.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    path: "app/",
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
