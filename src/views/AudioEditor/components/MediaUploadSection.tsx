import { Button } from "@material-ui/core";
import React, { useRef } from "react";

interface MediaUploadSectionProps {
  /** 当前已选视频文件名，未选则为 null */
  videoFileName: string | null;
  /** 当前已选 BGM 文件名，未选则为 null */
  bgmFileName: string | null;
  onVideoSelect: (file: File) => void;
  onBgmSelect: (file: File) => void;
}

/**
 * 媒体上传区：分别选择视频与 BGM 文件。
 * 文件仅暂存于内存（由父组件持有 File 并生成 blob URL），不上传服务器。
 */
export default function MediaUploadSection({
  videoFileName,
  bgmFileName,
  onVideoSelect,
  onBgmSelect,
}: MediaUploadSectionProps) {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const bgmInputRef = useRef<HTMLInputElement>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onVideoSelect(file);
    }
    event.target.value = "";
  };

  const handleBgmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onBgmSelect(file);
    }
    event.target.value = "";
  };

  return (
    <section className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => videoInputRef.current?.click()}
        >
          上传视频
        </Button>
        <span className="text-sm text-gray-600">
          {videoFileName ?? "未选择视频"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={bgmInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleBgmChange}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => bgmInputRef.current?.click()}
        >
          上传 BGM
        </Button>
        <span className="text-sm text-gray-600">
          {bgmFileName ?? "未选择 BGM"}
        </span>
      </div>
    </section>
  );
}
