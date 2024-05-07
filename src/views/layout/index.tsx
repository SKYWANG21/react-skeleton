import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function home() {
  return (
    <>
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
}
