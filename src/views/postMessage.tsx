/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-07-16 14:26:52
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-07-17 17:46:08
 * @FilePath: \react-skeleton\src\views\postMessage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Input } from "@material-ui/core";
import { time } from "console";
import React, { useState } from "react";

export default function () {
  const [msg, setMsg] = useState("");
  function change(e) {
    setMsg(e.target.value);
  }
  function pushMsg() {
    console.log(window, window.top);
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
