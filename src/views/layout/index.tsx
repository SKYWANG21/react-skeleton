import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { Grid } from "@material-ui/core";

export default function home() {
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
