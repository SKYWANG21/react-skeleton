import { Button, Typography } from "@material-ui/core";
import React from "react";

import RangeSlider from "./RangeSlider";
import { formatTime } from "../utils";

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isReady: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
}

/**
 * 播放控制条：播放/暂停、进度 seek、时间显示。
 * 首次播放需在 click 回调内触发，以满足 AudioContext autoplay 策略。
 */
export default function PlaybackControls({
  isPlaying,
  currentTime,
  duration,
  isReady,
  onPlay,
  onPause,
  onSeek,
}: PlaybackControlsProps) {
  const handleToggle = () => {
    if (isPlaying) {
      onPause();
    } else {
      void onPlay();
    }
  };

  return (
    <section className="flex flex-col gap-2 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button
          variant="contained"
          color="primary"
          disabled={!isReady}
          onClick={handleToggle}
        >
          {isPlaying ? "暂停" : "播放"}
        </Button>
        <Typography variant="body2" className="tabular-nums">
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
      </div>

      <RangeSlider
        value={Math.min(currentTime, duration || 0)}
        min={0}
        max={duration || 0}
        step={0.01}
        disabled={!isReady || duration <= 0}
        onChange={onSeek}
        aria-label="播放进度"
      />
    </section>
  );
}
