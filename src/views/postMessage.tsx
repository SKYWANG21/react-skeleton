import { Button, Input } from "@material-ui/core";
import { time } from "console";
import React, { useState } from "react";

export default function PostMessage() {
  const [msg, setMsg] = useState("");
  function change(e) {
    setMsg(e.target.value);
  }
  function pushMsg() {
    console.log(window, window.top);
    window.top?.postMessage(
      { msg, time: new Date().getUTCMinutes() },
      "http://192.168.1.64:3001"
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
