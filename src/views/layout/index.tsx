import { Grid } from "@material-ui/core";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AuthGard from "@/router/AuthGard";

import SideBar from "./SideBar";

export function Home() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <SideBar></SideBar>
        </Grid>
        <Grid item xs={10} style={{ padding: "2rem" }}>
          <Suspense>
            <Outlet></Outlet>
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}

export default function Layout() {
  return (
    <>
      <AuthGard>
        <Home></Home>
      </AuthGard>
    </>
  );
}
