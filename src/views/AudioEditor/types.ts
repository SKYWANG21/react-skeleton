import type { RefObject } from "react";

/** 时间轴横向缩放：每秒对应的像素宽度 */
export const PX_PER_SEC = 50;

/** 混音器配置：BGM 起始偏移与两路音量 */
export interface MixerConfig {
  /** BGM 在视频时间轴上的起始秒数（负值 = 从 BGM 波形中间起播） */
  bgmOffset: number;
  /** BGM 音量 0~1 */
  bgmVolume: number;
  /** 视频原声音量 0~1 */
  videoVolume: number;
}

/** useAudioMixer 入参 */
export interface UseAudioMixerOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** 视频 blob URL，用于监听元数据加载 */
  videoUrl: string | null;
  bgmBlobUrl: string | null;
  bgmOffset: number;
  bgmVolume: number;
  videoVolume: number;
}

/** useAudioMixer 返回值 */
export interface UseAudioMixerReturn {
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  isPlaying: boolean;
  currentTime: number;
  videoDuration: number;
  bgmDuration: number;
  /** 视频元数据与 BGM 解码均就绪 */
  isReady: boolean;
}

/** BGM 时间轴拖动 hook 入参 */
export interface UseBgmTimelineDragOptions {
  pxPerSec: number;
  videoDuration: number;
  bgmDuration: number;
  bgmOffset: number;
  onOffsetChange: (offset: number) => void;
  disabled?: boolean;
}
