import { Button } from "@material-ui/core";
import React, { useRef } from "react";
import SmoothSignature from "smooth-signature";

export default function Signature() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  let signature: null | SmoothSignature = null;
  useEffect(() => {
    signature = new SmoothSignature(canvas.current as HTMLCanvasElement, {
      width: 1000,
      height: 600,
      scale: 2,
      minWidth: 4,
      maxWidth: 10,
      color: "#1890ff",
      bgColor: "#efefef",
      openSmooth: true,
    });
  });

  const [src, setSrc] = useState("");

  function submit() {
    // signature && console.log(signature.toDataURL());
    signature && setSrc(signature.toDataURL());
  }

  return (
    <>
      <canvas id="canvas" ref={canvas}></canvas>
      <Button onClick={submit}>完成</Button>
      <img src={src} alt="" />
    </>
  );
}
