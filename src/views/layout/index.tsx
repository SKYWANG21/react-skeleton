import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function home() {
  return (
    <>
      <SideBar></SideBar>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
}
