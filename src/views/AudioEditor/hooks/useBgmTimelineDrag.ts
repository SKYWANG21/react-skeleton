import React, { useCallback, useRef } from "react";

import type { UseBgmTimelineDragOptions } from "../types";
import { clampBgmOffset } from "../utils";

/**
 * 处理 BGM 波形块在时间轴上的 pointer 拖动：
 * 将水平位移换算为秒，并 clamp 到合法 offset 范围。
 */
export function useBgmTimelineDrag({
  pxPerSec,
  videoDuration,
  bgmDuration,
  bgmOffset,
  onOffsetChange,
  disabled = false,
}: UseBgmTimelineDragOptions) {
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }
      draggingRef.current = true;
      startXRef.current = event.clientX;
      startOffsetRef.current = bgmOffset;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [bgmOffset, disabled],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!draggingRef.current) {
        return;
      }
      const deltaPx = event.clientX - startXRef.current;
      const deltaSec = deltaPx / pxPerSec;
      const nextOffset = clampBgmOffset(
        startOffsetRef.current + deltaSec,
        videoDuration,
        bgmDuration,
      );
      onOffsetChange(nextOffset);
    },
    [pxPerSec, videoDuration, bgmDuration, onOffsetChange],
  );

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
