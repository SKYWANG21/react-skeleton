import { Paper, MenuItem, MenuList } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

import { syncRoutes } from "@/router";

import SideBarTitle from "./SideBarTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
      width: "100%",
    },
  })
);

export default function MenuListComposition() {
  const classes = useStyles();
  const nav = useNavigate();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <SideBarTitle className="ml-1rem"></SideBarTitle>

          {syncRoutes.map((it) => {
            return (
              <MenuItem key={it.path} onClick={() => nav(it.path!)}>
                {it.meta?.label}
              </MenuItem>
            );
          })}
        </MenuList>
      </Paper>
    </div>
  );
}
