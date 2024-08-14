/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-04-18 22:05:24
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-08-14 16:26:05
 * @FilePath: \react-skeleton\src\router\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FunctionComponent, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { syncRoutes, SyncRoute } from "./syncRoute";

function createRoute(data: SyncRoute[]) {
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
