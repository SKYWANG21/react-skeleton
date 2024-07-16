/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-04-18 22:05:24
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-07-16 15:05:28
 * @FilePath: \react-skeleton\src\main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import routes from "./router";
import "./assets/index.css";
import { RouterProvider } from "react-router-dom";
import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={routes}></RouterProvider>
    </Suspense>
  </React.StrictMode>
);

window.addEventListener(
  "message",
  function (e) {
    console.log("roger", e, e.data);
  }
  // false
);
