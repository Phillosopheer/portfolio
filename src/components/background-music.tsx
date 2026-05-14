"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function BackgroundMusic() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isHomeRoute = pathname === "/ka" || pathname === "/en";
  const isGeorgianLocale = pathname === "/ka" || pathname.startsWith("/ka/");
  const welcomeCopy = isGeorgianLocale
    ? {
        title: "კეთილი იყოს თქვენი მობრძანება",
        body: "შეგიძლია დაათვალიერო ნამუშევრები, გახსნა დეტალები და პირდაპირ დამიკავშირდე პროექტზე.",
        action: "დაწყება",
      }
    : {
        title: "Welcome",
        body: "Explore projects, open full case details, and contact me directly for your next build.",
        action: "Start",
      };
  const audioRef = useRef<HTMLAudioElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(!isAdminRoute && isHomeRoute);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const emitMusicState = (nextIsPlaying: boolean) => {
    window.dispatchEvent(
      new CustomEvent("portfolio-music-state", {
        detail: { isPlaying: nextIsPlaying },
      }),
    );
  };

  useEffect(() => {
    if (isAdminRoute) {
      setIsWelcomeOpen(false);
      return;
    }

    setIsWelcomeOpen(isHomeRoute);
  }, [isAdminRoute, isHomeRoute]);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    if (isWelcomeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isWelcomeOpen, isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const ensureAudioReady = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return false;
    }

    if (isAudioReady) {
      return true;
    }

    try {
      const response = await fetch("/api/music-stream", { cache: "no-store" });
      if (!response.ok) {
        return false;
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      objectUrlRef.current = objectUrl;
      audio.src = objectUrl;
      audio.load();
      setIsAudioReady(true);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const handleToggle = async () => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      const ready = await ensureAudioReady();
      if (!ready) {
        setIsPlaying(false);
        emitMusicState(false);
        return;
      }

      if (audio.paused) {
        try {
          await audio.play();
          setIsPlaying(true);
          emitMusicState(true);
        } catch {
          setIsPlaying(false);
          emitMusicState(false);
        }
      } else {
        audio.pause();
        setIsPlaying(false);
        emitMusicState(false);
      }
    };

    const handleStateRequest = () => {
      emitMusicState(isPlaying);
    };

    window.addEventListener("portfolio-music-toggle", handleToggle);
    window.addEventListener("portfolio-music-request-state", handleStateRequest);

    return () => {
      window.removeEventListener("portfolio-music-toggle", handleToggle);
      window.removeEventListener("portfolio-music-request-state", handleStateRequest);
    };
  }, [isPlaying]);

  const handleCloseWelcome = () => {
    setIsWelcomeOpen(false);

    void (async () => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      const ready = await ensureAudioReady();
      if (!ready) {
        setIsPlaying(false);
        emitMusicState(false);
        return;
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          emitMusicState(true);
        })
        .catch(() => {
          setIsPlaying(false);
          emitMusicState(false);
          // Ignore if browser still blocks playback.
        });
    })();
  };

  return (
    <>
      {isWelcomeOpen && isHomeRoute ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_34px_100px_rgba(0,0,0,0.72)]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/misalmeba.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,26,20,0.22)_0%,rgba(2,4,7,0.78)_58%,rgba(2,4,7,0.9)_100%)]" />
            <div className="relative z-10 px-7 py-10 text-center sm:px-10 sm:py-12">
              <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {welcomeCopy.title}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#d3dbe4] sm:text-[1.02rem]">
                {welcomeCopy.body}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCloseWelcome();
              }}
              className="relative z-50 mx-auto mb-9 block touch-manipulation rounded-xl border border-[#15ef8d]/60 bg-[rgba(10,30,20,0.5)] px-9 py-3 text-base font-semibold text-[#b8ffe0] shadow-[0_12px_36px_rgba(21,239,141,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 hover:border-[#15ef8d] hover:bg-[#15ef8d]/18 hover:text-[#e8fff4]"
            >
              {welcomeCopy.action}
            </button>
          </div>
        </div>
      ) : null}
      <audio ref={audioRef} loop preload="none" />
    </>
  );
}
