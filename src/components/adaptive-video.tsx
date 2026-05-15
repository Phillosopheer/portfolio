"use client";

import { useEffect, useState } from "react";

type AdaptiveVideoProps = {
  src: string;
  className: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  hideOnMobile?: boolean;
};

export function AdaptiveVideo({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "none",
  hideOnMobile = false,
}: AdaptiveVideoProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const blockedOnMobile = hideOnMobile && mobileQuery.matches;
      setShouldRender(!blockedOnMobile && !reducedMotionQuery.matches);
    };

    update();
    mobileQuery.addEventListener("change", update);
    reducedMotionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      reducedMotionQuery.removeEventListener("change", update);
    };
  }, [hideOnMobile]);

  if (!shouldRender) {
    return null;
  }

  return (
    <video
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
