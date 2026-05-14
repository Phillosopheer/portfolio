"use client";

import { useEffect, useState, type ReactNode } from "react";

const GUIDE_EVENT = "portfolio-categories-guide";

export function CategoryGuideTrigger({ children }: { children: ReactNode }) {
  const [guideKey, setGuideKey] = useState(0);

  useEffect(() => {
    const runGuideAnimation = () => {
      const section = document.getElementById("categories");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      
      // Update state to force a full re-render of children
      // which guarantees CSS animations will restart.
      setGuideKey(prev => prev + 1);
    };

    if (window.location.hash === "#categories") {
      runGuideAnimation();
    }

    window.addEventListener(GUIDE_EVENT, runGuideAnimation);
    return () => {
      window.removeEventListener(GUIDE_EVENT, runGuideAnimation);
    };
  }, []);

  return (
    <div key={guideKey} className="guide-wrapper">
      {children}
    </div>
  );
}
