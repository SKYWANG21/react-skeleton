import { Typography } from "@material-ui/core";
import React from "react";

import RangeSlider from "./RangeSlider";

interface VolumeControlsProps {
  videoVolume: number;
  bgmVolume: number;
  onVideoVolumeChange: (value: number) => void;
  onBgmVolumeChange: (value: number) => void;
  disabled?: boolean;
}

/**
 * 音量控制：分别调节视频原声与 BGM 在混音器 GainNode 上的增益。
 */
export default function VolumeControls({
  videoVolume,
  bgmVolume,
  onVideoVolumeChange,
  onBgmVolumeChange,
  disabled = false,
}: VolumeControlsProps) {
  return (
    <section className="flex flex-col gap-4 max-w-md">
      <div className="flex items-center gap-4">
        <Typography className="w-20 shrink-0" variant="body2">
          原声音量
        </Typography>
        <RangeSlider
          value={videoVolume}
          min={0}
          max={1}
          step={0.01}
          disabled={disabled}
          onChange={onVideoVolumeChange}
          aria-label="原声音量"
        />
        <Typography className="w-10 text-right" variant="body2">
          {Math.round(videoVolume * 100)}%
        </Typography>
      </div>

      <div className="flex items-center gap-4">
        <Typography className="w-20 shrink-0" variant="body2">
          BGM 音量
        </Typography>
        <RangeSlider
          value={bgmVolume}
          min={0}
          max={1}
          step={0.01}
          disabled={disabled}
          onChange={onBgmVolumeChange}
          aria-label="BGM 音量"
        />
        <Typography className="w-10 text-right" variant="body2">
          {Math.round(bgmVolume * 100)}%
        </Typography>
      </div>
    </section>
  );
}
