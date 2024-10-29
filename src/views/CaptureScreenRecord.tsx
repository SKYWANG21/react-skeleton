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
        <p>
          兄弟，我希望这是你最后一次分享这种视频给我，人生有很多种选择，不一定要走这条路。我们作为新时代青年，虽位卑，但不应忧忘国。当以家国强盛为己任当前美西方虎视眈眈意图侵我中华，我等青年面临前所未有之挑战，此等关键时刻!同志，你不思报国也罢怎可助纣为虐,意图侵蚀我中华男儿之志望君悔过之!
        </p>
      </div>
    </>
  );
}
