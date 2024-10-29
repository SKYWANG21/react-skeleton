import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

import cssModel from "./login.module.css";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderColor: "#fff",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderColor: "#fff",
    },
  },
});

function Form() {
  const classes = useStyles();
  const formList = [
    {
      name: "用户名",
      key: "username",
    },
    {
      name: "密码",
      key: "password",
      type: "password",
    },
  ];
  const formData = {
    username: "administrator",
    password: "123456",
  };
  const [form, setForm] = useReducer(setFormData, formData);

  function setFormData(
    state: typeof formData,
    action: { key: string; value: string }
  ) {
    return {
      ...state,
      [action.key]: action.value,
    };
  }
  const nav = useNavigate();

  return (
    <>
      {formList.map((it) => (
        <div className="m-1rem">
          <TextField
            className={classes.root}
            key={it.key}
            label={it.name}
            value={form[it.key]}
            type={it.type || "text"}
            onChange={(e) => {
              setForm({ key: it.key, value: e.target.value });
            }}
          />
        </div>
      ))}
      <div className="flex justify-center" onClick={() => nav("/app")}>
        <div className={cssModel.button} data-text="Awesome">
          <span className={cssModel.actualText}>&nbsp;LOGIN&nbsp;</span>
          <span aria-hidden="true" className={cssModel.frontText}>
            &nbsp;LOGIN&nbsp;
          </span>
        </div>
      </div>
    </>
  );
}

export function WaveCard({ children }) {
  return (
    <>
      <div
        className={`${cssModel.card} ${cssModel.playing} w-30rem h-20rem flex items-center justify-center`}
      >
        <div className={cssModel.image}></div>

        <div className={cssModel.wave}></div>
        <div className={cssModel.wave}></div>
        <div className={cssModel.wave}></div>

        <div className={cssModel.infotop}>
          <div className={cssModel.name}>{children}</div>
        </div>
      </div>
    </>
  );
}

function Bg({ children }) {
  return (
    <>
      <div className={cssModel.bg}>{children}</div>
    </>
  );
}

export default function Login() {
  return (
    <>
      <Bg>
        <WaveCard>
          <Form></Form>
        </WaveCard>
      </Bg>
    </>
  );
}
