import { useEffect } from "react";

export function AutoplayAudio() {
  useEffect(() => {
    const audio = new Audio("/alszahang.mp3");
    audio.preload = "auto";

    const timeout = window.setTimeout(() => {
      void audio.play().catch(() => {
        // Some browsers block autoplay until the user interacts.
      });
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}
