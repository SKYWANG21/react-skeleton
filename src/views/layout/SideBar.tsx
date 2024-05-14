import React from 'react';
import {
  Paper, MenuItem, MenuList
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import routes from '@/router';

console.log(routes)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function MenuListComposition() {
  const classes = useStyles();
  console.log(classes)
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
