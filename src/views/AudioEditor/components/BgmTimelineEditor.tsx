import WaveSurfer from "wavesurfer.js";
import React, { useEffect, useRef } from "react";

import { PX_PER_SEC } from "../types";
import { useBgmTimelineDrag } from "../hooks";
import { buildTimelineTicks, formatTime, getBgmOffsetRange } from "../utils";

interface BgmTimelineEditorProps {
  /** BGM blob URL，供 WaveSurfer 渲染波形 */
  bgmBlobUrl: string | null;
  videoDuration: number;
  bgmDuration: number;
  /** BGM 在视频时间轴上的起始秒数（可为负，表示从 BGM 中间起播） */
  bgmOffset: number;
  /** 当前播放头位置（秒） */
  currentTime: number;
  pxPerSec?: number;
  disabled?: boolean;
  onOffsetChange: (offset: number) => void;
}

/**
 * BGM 时间轴编辑器：
 * - 标尺按视频时长绘制，左侧预留负偏移区域
 * - 可横向拖动的 WaveSurfer 波形块；负偏移时视频 0 秒对应 BGM 波形内较后位置
 */
export default function BgmTimelineEditor({
  bgmBlobUrl,
  videoDuration,
  bgmDuration,
  bgmOffset,
  currentTime,
  pxPerSec = PX_PER_SEC,
  disabled = false,
  onOffsetChange,
}: BgmTimelineEditorProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const offsetRange = getBgmOffsetRange(videoDuration, bgmDuration);
  /** 时间轴 0 点在容器内的像素偏移（左侧为负偏移预留区） */
  const originPx = -offsetRange.min * pxPerSec;
  const trackWidthPx = Math.max(videoDuration * pxPerSec, pxPerSec);
  const totalWidthPx = originPx + trackWidthPx;
  const bgmBlockLeftPx = originPx + bgmOffset * pxPerSec;
  const bgmBlockWidthPx = Math.max(bgmDuration * pxPerSec, pxPerSec);
  const playheadLeftPx = originPx + currentTime * pxPerSec;
  const ticks = buildTimelineTicks(videoDuration);

  const dragHandlers = useBgmTimelineDrag({
    pxPerSec,
    videoDuration,
    bgmDuration,
    bgmOffset,
    onOffsetChange,
    disabled,
  });

  useEffect(() => {
    const container = waveformRef.current;
    if (!container || !bgmBlobUrl) {
      return;
    }

    const ws = WaveSurfer.create({
      container,
      url: bgmBlobUrl,
      height: 80,
      waveColor: "#4f46e5",
      progressColor: "#818cf8",
      interact: false,
      dragToSeek: false,
      cursorWidth: 0,
    });

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
      wavesurferRef.current = null;
    };
  }, [bgmBlobUrl]);

  if (disabled || !bgmBlobUrl || videoDuration <= 0) {
    return (
      <section className="w-full">
        <p className="text-gray-400 text-sm text-center py-8 border border-gray-200 rounded bg-gray-50">
          请先上传视频和 BGM 以编辑时间轴
        </p>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-2">
      <p className="text-sm text-gray-600">
        拖动 BGM 波形块对齐起播位置。负偏移表示视频开始时 BGM 已从波形中间播放（当前偏移：
        {formatTime(bgmOffset)}）
      </p>

      <div className="w-full overflow-x-auto border border-gray-200 rounded bg-gray-50 p-2">
        <div
          className="relative"
          style={{ width: totalWidthPx, minHeight: 120 }}
        >
          {/* 视频 0 秒基准线 */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-400 pointer-events-none z-10"
            style={{ left: originPx }}
          />

          {/* 视频时长标尺 */}
          <div className="relative h-6 border-b border-gray-300 mb-1">
            {ticks.map((tick) => (
              <span
                key={tick}
                className="absolute text-xs text-gray-500 -translate-x-1/2"
                style={{ left: originPx + tick * pxPerSec }}
              >
                {formatTime(tick)}
              </span>
            ))}
          </div>

          {/* 播放头 */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none z-10"
            style={{ left: playheadLeftPx }}
          />

          {/* 可拖动的 BGM 波形块 */}
          <div
            className="absolute top-8 h-20 bg-indigo-50 border border-indigo-200 rounded overflow-hidden cursor-grab active:cursor-grabbing select-none z-20"
            style={{
              left: bgmBlockLeftPx,
              width: bgmBlockWidthPx,
            }}
            onPointerDown={dragHandlers.onPointerDown}
            onPointerMove={dragHandlers.onPointerMove}
            onPointerUp={dragHandlers.onPointerUp}
            onPointerCancel={dragHandlers.onPointerUp}
          >
            <div ref={waveformRef} className="w-full h-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
