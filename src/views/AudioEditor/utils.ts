/**
 * 将秒数格式化为 m:ss，负值带负号（用于 BGM 负偏移显示）。
 */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }
  const sign = seconds < 0 ? "-" : "";
  const abs = Math.abs(seconds);
  const minutes = Math.floor(abs / 60);
  const secs = Math.floor(abs % 60);
  return `${sign}${minutes}:${secs.toString().padStart(2, "0")}`;
}

/** BGM 偏移合法区间 */
export interface BgmOffsetRange {
  min: number;
  max: number;
}

/**
 * 计算 BGM 在时间轴上的可拖动范围：
 * - min 为负：允许 BGM 从波形中间起播（视频 0 秒时 BGM 已播放 |min| 秒）
 * - max 为正：BGM 在视频时间轴上的最晚起始点
 */
export function getBgmOffsetRange(
  videoDuration: number,
  bgmDuration: number,
): BgmOffsetRange {
  if (!Number.isFinite(videoDuration) || videoDuration <= 0) {
    return { min: 0, max: 0 };
  }
  if (!Number.isFinite(bgmDuration) || bgmDuration <= 0) {
    return { min: 0, max: 0 };
  }
  const min = -bgmDuration;
  const max =
    bgmDuration >= videoDuration
      ? videoDuration
      : videoDuration - bgmDuration;
  return { min, max };
}

/**
 * 将 BGM 偏移限制在合法区间（支持负偏移）。
 */
export function clampBgmOffset(
  offset: number,
  videoDuration: number,
  bgmDuration: number,
): number {
  const { min, max } = getBgmOffsetRange(videoDuration, bgmDuration);
  if (max <= 0 && min >= 0) {
    return 0;
  }
  return Math.min(Math.max(min, offset), max);
}

/**
 * 根据视频时长生成时间轴刻度标签（约 5~8 个刻度）。
 */
export function buildTimelineTicks(duration: number): number[] {
  if (!Number.isFinite(duration) || duration <= 0) {
    return [0];
  }
  const tickCount = Math.min(8, Math.max(2, Math.ceil(duration / 10)));
  const step = duration / tickCount;
  return Array.from({ length: tickCount + 1 }, (_, i) =>
    Math.min(duration, i * step),
  );
}
