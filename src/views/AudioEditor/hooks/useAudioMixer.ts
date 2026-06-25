import type { UseAudioMixerOptions, UseAudioMixerReturn } from "../types";

/**
 * 前端混音器：
 * - 视频原声：HTMLVideoElement 原生输出，通过 video.volume 调节
 * - BGM：Web Audio AudioBufferSourceNode → bgmGain → destination
 *
 * 视频不走 createMediaElementSource，避免 MediaElement 只能绑定一次及 muted 路由问题。
 */
export function useAudioMixer({
  videoRef,
  videoUrl,
  bgmBlobUrl,
  bgmOffset,
  bgmVolume,
  videoVolume,
}: UseAudioMixerOptions): UseAudioMixerReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgmGainRef = useRef<GainNode | null>(null);
  const bgmBufferRef = useRef<AudioBuffer | null>(null);
  const bgmSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const bgmStartedRef = useRef(false);
  const isPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [bgmDuration, setBgmDuration] = useState(0);
  const [bgmDecoded, setBgmDecoded] = useState(false);
  const [videoMetaReady, setVideoMetaReady] = useState(false);

  const applyVideoVolume = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = false;
    video.volume = videoVolume;
  }, [videoRef, videoVolume]);

  /** 停止并释放当前 BGM BufferSource */
  const stopBgm = useCallback(() => {
    const source = bgmSourceRef.current;
    if (source) {
      try {
        source.stop();
      } catch {
        // 已停止或未启动时会抛错，可忽略
      }
      source.disconnect();
      bgmSourceRef.current = null;
    }
    bgmStartedRef.current = false;
  }, []);

  /** 取消 rAF 同步循环 */
  const cancelSyncLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  /** 懒初始化 BGM 用 AudioContext（须在用户手势后 resume） */
  const ensureBgmContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      bgmGainRef.current = null;
    }

    const ctx = audioContextRef.current;

    if (!bgmGainRef.current) {
      bgmGainRef.current = ctx.createGain();
      bgmGainRef.current.gain.value = bgmVolume;
      bgmGainRef.current.connect(ctx.destination);
    }

    return ctx;
  }, [bgmVolume]);

  /** 从当前视频时刻启动 BGM（elapsed = videoTime - bgmOffset，支持负偏移） */
  const startBgmAt = useCallback(
    (videoTime: number) => {
      const ctx = audioContextRef.current;
      const buffer = bgmBufferRef.current;
      const bgmGain = bgmGainRef.current;
      if (!ctx || !buffer || !bgmGain) {
        return;
      }

      stopBgm();

      const elapsed = videoTime - bgmOffset;
      if (elapsed < 0 || elapsed >= buffer.duration) {
        return;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(bgmGain);
      source.onended = () => {
        if (bgmSourceRef.current === source) {
          bgmSourceRef.current = null;
          bgmStartedRef.current = false;
        }
      };
      source.start(ctx.currentTime, elapsed);
      bgmSourceRef.current = source;
      bgmStartedRef.current = true;
    },
    [bgmOffset, stopBgm],
  );

  /** 是否应在当前视频时刻播放 BGM */
  const shouldPlayBgmAt = useCallback(
    (videoTime: number) => {
      const buffer = bgmBufferRef.current;
      if (!buffer) {
        return false;
      }
      const elapsed = videoTime - bgmOffset;
      return elapsed >= 0 && elapsed < buffer.duration;
    },
    [bgmOffset],
  );

  /** rAF 循环：同步 currentTime，并在跨越 bgmOffset 时触发 BGM 启动 */
  const syncTick = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.paused) {
      return;
    }

    const time = video.currentTime;
    setCurrentTime(time);

    if (!bgmStartedRef.current && shouldPlayBgmAt(time)) {
      startBgmAt(time);
    }

    if (bgmStartedRef.current && bgmBufferRef.current) {
      const elapsed = time - bgmOffset;
      if (elapsed >= bgmBufferRef.current.duration) {
        stopBgm();
      }
    }

    rafRef.current = requestAnimationFrame(syncTick);
  }, [videoRef, bgmOffset, shouldPlayBgmAt, startBgmAt, stopBgm]);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !videoMetaReady) {
      return;
    }

    applyVideoVolume();

    if (bgmDecoded) {
      const ctx = ensureBgmContext();
      await ctx.resume();
    }

    await video.play();

    isPlayingRef.current = true;
    setIsPlaying(true);

    if (bgmDecoded && shouldPlayBgmAt(video.currentTime)) {
      startBgmAt(video.currentTime);
    }

    cancelSyncLoop();
    rafRef.current = requestAnimationFrame(syncTick);
  }, [
    videoRef,
    videoMetaReady,
    bgmDecoded,
    applyVideoVolume,
    ensureBgmContext,
    shouldPlayBgmAt,
    startBgmAt,
    syncTick,
    cancelSyncLoop,
    bgmOffset,
  ]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setCurrentTime(video.currentTime);
    }

    stopBgm();
    cancelSyncLoop();
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, [videoRef, stopBgm, cancelSyncLoop]);

  const seek = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      const maxTime = videoDuration || video.duration || 0;
      const clamped = Math.max(0, Math.min(time, maxTime));
      video.currentTime = clamped;
      setCurrentTime(clamped);

      stopBgm();
      if (isPlayingRef.current && bgmDecoded && shouldPlayBgmAt(clamped)) {
        startBgmAt(clamped);
      }
    },
    [
      videoRef,
      videoDuration,
      bgmDecoded,
      shouldPlayBgmAt,
      stopBgm,
      startBgmAt,
    ],
  );

  useEffect(() => {
    applyVideoVolume();
  }, [applyVideoVolume, videoUrl]);

  useEffect(() => {
    if (bgmGainRef.current) {
      bgmGainRef.current.gain.value = bgmVolume;
    }
  }, [bgmVolume]);

  // 解码 BGM 为 AudioBuffer
  useEffect(() => {
    if (!bgmBlobUrl) {
      bgmBufferRef.current = null;
      setBgmDuration(0);
      setBgmDecoded(false);
      return;
    }

    let cancelled = false;

    const decodeBgm = async () => {
      const tempCtx = new AudioContext();
      try {
        const response = await fetch(bgmBlobUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await tempCtx.decodeAudioData(arrayBuffer);
        if (!cancelled) {
          bgmBufferRef.current = buffer;
          setBgmDuration(buffer.duration);
          setBgmDecoded(true);
        }
      } catch (error) {
        console.error("[useAudioMixer] BGM 解码失败:", error);
        if (!cancelled) {
          bgmBufferRef.current = null;
          setBgmDuration(0);
          setBgmDecoded(false);
        }
      } finally {
        await tempCtx.close();
      }
    };

    decodeBgm();

    return () => {
      cancelled = true;
    };
  }, [bgmBlobUrl]);

  // 监听视频元数据
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) {
      setVideoDuration(0);
      setVideoMetaReady(false);
      return;
    }

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      setVideoMetaReady(Number.isFinite(video.duration) && video.duration > 0);
      applyVideoVolume();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef, videoUrl, applyVideoVolume]);

  // BGM 偏移变化时重建 BGM 源
  useEffect(() => {
    if (!isPlayingRef.current) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }
    stopBgm();
    if (bgmDecoded && shouldPlayBgmAt(video.currentTime)) {
      startBgmAt(video.currentTime);
    }
  }, [bgmOffset, videoRef, bgmDecoded, shouldPlayBgmAt, stopBgm, startBgmAt]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleEnded = () => {
      stopBgm();
      cancelSyncLoop();
      isPlayingRef.current = false;
      setIsPlaying(false);
      setCurrentTime(video.duration);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoRef, videoUrl, stopBgm, cancelSyncLoop]);

  useEffect(() => {
    return () => {
      stopBgm();
      cancelSyncLoop();
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
      bgmGainRef.current = null;
    };
  }, [stopBgm, cancelSyncLoop]);

  const isReady = Boolean(
    videoUrl && bgmBlobUrl && videoMetaReady && bgmDecoded,
  );

  return {
    play,
    pause,
    seek,
    isPlaying,
    currentTime,
    videoDuration,
    bgmDuration,
    isReady,
  };
}
