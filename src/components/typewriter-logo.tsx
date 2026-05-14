"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TYPE_SPEED = 100;
const PAUSE = 2200;
const ERASE_SPEED = 60;

type TypewriterLogoProps = {
  href: string;
  word: string;
};

export function TypewriterLogo({ href, word }: TypewriterLogoProps) {
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!erasing && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), TYPE_SPEED);
    } else if (!erasing && displayed.length === word.length) {
      timeout = setTimeout(() => setErasing(true), PAUSE);
    } else if (erasing && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), ERASE_SPEED);
    } else if (erasing && displayed.length === 0) {
      setErasing(false);
    }

    return () => clearTimeout(timeout);
  }, [displayed, erasing, word]);

  return (
    <Link
      href={href}
      className="text-[2rem] font-semibold tracking-tight text-[#eef2f7] [text-shadow:0_0_8px_rgba(21,239,141,0.28),0_0_16px_rgba(75,233,255,0.18)] transition-[text-shadow,color] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(21,239,141,0.42),0_0_24px_rgba(75,233,255,0.24)]"
    >
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.8rem",
          background: "#15ef8d",
          marginLeft: "2px",
          verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
        }}
      />
    </Link>
  );
}
