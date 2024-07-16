/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-05-07 17:29:16
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-07-11 16:04:00
 * @FilePath: \react-skeleton\src\views\layout\SideBar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Paper, MenuItem, MenuList } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import routes from "@/router";

console.log(routes);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  })
);

export default function MenuListComposition() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          {/* {routes.map(it => {
            return
          })} */}
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
