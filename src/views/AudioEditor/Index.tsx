/**
 * AudioEditor 页面入口
 *
 * 功能流程：上传视频 → 上传 BGM → 拖动 BGM 时间轴 → 调节音量 → 实时预览混音
 *
 * 架构说明：
 * - 媒体文件以 File + blob URL 暂存于浏览器内存
 * - VideoPreview 负责画面；useAudioMixer 负责 Web Audio 混音与同步
 * - BgmTimelineEditor 用 WaveSurfer 展示波形，外层拖动控制 bgmOffset
 */
import React, { useCallback, useEffect, useRef, useState } from "react";

import BgmTimelineEditor from "./components/BgmTimelineEditor";
import MediaUploadSection from "./components/MediaUploadSection";
import PlaybackControls from "./components/PlaybackControls";
import VideoPreview from "./components/VideoPreview";
import VolumeControls from "./components/VolumeControls";
import { useAudioMixer, useObjectUrl } from "./hooks";
import { clampBgmOffset } from "./utils";

export default function AudioEditor() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [bgmFile, setBgmFile] = useState<File | null>(null);
  const [bgmOffset, setBgmOffset] = useState(0);
  const [bgmVolume, setBgmVolume] = useState(0.8);
  const [videoVolume, setVideoVolume] = useState(1);

  const videoUrl = useObjectUrl(videoFile);
  const bgmUrl = useObjectUrl(bgmFile);

  const mixer = useAudioMixer({
    videoRef,
    videoUrl,
    bgmBlobUrl: bgmUrl,
    bgmOffset,
    bgmVolume,
    videoVolume,
  });

  /**
   * 视频或 BGM 时长变化后，重新 clamp BGM 偏移，避免 BGM 块超出视频末尾。
   */
  useEffect(() => {
    if (mixer.videoDuration <= 0 || mixer.bgmDuration <= 0) {
      return;
    }
    setBgmOffset((prev) =>
      clampBgmOffset(prev, mixer.videoDuration, mixer.bgmDuration),
    );
  }, [mixer.videoDuration, mixer.bgmDuration]);

  /** 选择新视频时重置 BGM 偏移 */
  const handleVideoSelect = useCallback((file: File) => {
    setVideoFile(file);
    setBgmOffset(0);
  }, []);

  /** 选择新 BGM 时重置 BGM 偏移 */
  const handleBgmSelect = useCallback((file: File) => {
    setBgmFile(file);
    setBgmOffset(0);
  }, []);

  /** 更新 BGM 在时间轴上的起始位置（播放中由 useAudioMixer 内 effect 自动重建音源） */
  const handleBgmOffsetChange = useCallback((offset: number) => {
    setBgmOffset(offset);
  }, []);

  const timelineDisabled =
    !videoUrl || !bgmUrl || mixer.videoDuration <= 0 || mixer.bgmDuration <= 0;

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <header>
        <h1 className="text-xl font-semibold mb-1">视频 BGM 编辑器</h1>
        <p className="text-sm text-gray-500">
          上传视频与背景音乐，拖动波形对齐起播点（可拖至 0 点左侧实现负偏移），调节音量后实时预览。
        </p>
      </header>

      <MediaUploadSection
        videoFileName={videoFile?.name ?? null}
        bgmFileName={bgmFile?.name ?? null}
        onVideoSelect={handleVideoSelect}
        onBgmSelect={handleBgmSelect}
      />

      <VideoPreview ref={videoRef} src={videoUrl} />

      <BgmTimelineEditor
        bgmBlobUrl={bgmUrl}
        videoDuration={mixer.videoDuration}
        bgmDuration={mixer.bgmDuration}
        bgmOffset={bgmOffset}
        currentTime={mixer.currentTime}
        disabled={timelineDisabled}
        onOffsetChange={handleBgmOffsetChange}
      />

      <VolumeControls
        videoVolume={videoVolume}
        bgmVolume={bgmVolume}
        disabled={!mixer.isReady}
        onVideoVolumeChange={setVideoVolume}
        onBgmVolumeChange={setBgmVolume}
      />

      <PlaybackControls
        isPlaying={mixer.isPlaying}
        currentTime={mixer.currentTime}
        duration={mixer.videoDuration}
        isReady={mixer.isReady}
        onPlay={mixer.play}
        onPause={mixer.pause}
        onSeek={mixer.seek}
      />
    </div>
  );
}
