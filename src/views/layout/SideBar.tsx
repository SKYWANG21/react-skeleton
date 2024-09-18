import React from "react";
import { Paper, MenuItem, MenuList } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { syncRoutes } from "@/router";
import { useNavigate } from "react-router-dom";

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
