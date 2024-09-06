import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";

export default function () {
  const [msg, setMsg] = useState("");
  function change(e) {
    setMsg(e.target.value);
  }

  window.addEventListener("storage", (e) => {
    console.log(e);
  });

  const mapping: Record<number, <T>(data: T) => void> = {
    0: (data: number) => {
      console.log(data);
    },
    1: ({ arg1, arg2 }: { arg1: number; arg2: number }) => {
      arg1 + arg2;
    },
  };

  function pushMsg() {
    window.top?.postMessage(
      { msg, time: new Date().getUTCMinutes() },
      "http://localhost:3001"
    );
  }
  return (
    <>
      <Input type="text" value={msg} onChange={change} />
      <Button variant="contained" onClick={pushMsg}>
        推送
      </Button>
    </>
  );
}
