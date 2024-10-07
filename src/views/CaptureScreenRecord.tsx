import { Button } from "@material-ui/core";
import React from "react";
import RecordRTC from "recordrtc";

export default function CaptureScreenRecord() {
  let recorder;
  let streamInstance;
  function start() {
    return new Promise((res) => {
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
            displaySurface: "monitor",
          },
        })
        .then((stream) => {
          recorder = RecordRTC(stream, { type: "video" });
          recorder.startRecording();
          streamInstance = stream;
          res({ recorder, stream });
        });
    });
  }
  function stop() {
    return new Promise((_res) => {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "screenshoot.mp4";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        const tracks = streamInstance.getTracks();
        tracks.forEach((it) => it.stop);
      });
    });
  }
  return (
    <>
      <div className="w-full">
        <Button onClick={start}>开始录屏</Button>
        <Button onClick={stop}>结束录屏</Button>

        <Button>下载</Button>
      </div>
    </>
  );
}
