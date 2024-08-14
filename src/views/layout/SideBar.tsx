/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-05-07 17:29:16
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-08-14 17:00:41
 * @FilePath: \react-skeleton\src\views\layout\SideBar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
              <MenuItem key={it.path} onClick={() => nav(it.path)}>
                {it.title}
              </MenuItem>
            );
          })}
        </MenuList>
      </Paper>
    </div>
  );
}
