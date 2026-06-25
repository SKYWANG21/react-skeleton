import React, { forwardRef } from "react";

interface VideoPreviewProps {
  /** 视频 blob URL，为空时显示占位 */
  src: string | null;
}

/**
 * 视频预览区：画面由 element 渲染，原声走原生 audio 输出（volume 由混音器控制）。
 */
const VideoPreview = forwardRef<HTMLVideoElement, VideoPreviewProps>(
  function VideoPreview({ src }, ref) {
    return (
      <section className="w-full max-w-3xl">
        <div className="w-full aspect-video bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {src ? (
            <video
              key={src}
              ref={ref}
              src={src}
              className="w-full h-full object-contain bg-black"
              playsInline
            />
          ) : (
            <p className="text-gray-400 text-sm">请先上传视频</p>
          )}
        </div>
      </section>
    );
  },
);

export default VideoPreview;
