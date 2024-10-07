import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";

export default function PostMessage() {
  const [msg, setMsg] = useState("");
  function change(e) {
    setMsg(e.target.value);
  }

  window.addEventListener("storage", (e) => {
    console.log(e);
  });

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
