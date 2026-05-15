"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

type ClientLinkButtonProps = {
  href: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  download?: boolean;
  newTab?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isDirectProtocolHref(href: string) {
  return href.startsWith("mailto:") || href.startsWith("tel:");
}

export function ClientLinkButton({
  href,
  className,
  children,
  ariaLabel,
  download = false,
  newTab = false,
  onClick,
}: ClientLinkButtonProps) {
  const router = useRouter();

  const navigate = (event?: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event as MouseEvent<HTMLButtonElement>);
    if (event?.defaultPrevented) {
      return;
    }

    if (download) {
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = "";
      anchor.rel = "noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      return;
    }

    if (isDirectProtocolHref(href)) {
      window.location.href = href;
      return;
    }

    if (isExternalHref(href)) {
      if (newTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.assign(href);
      }
      return;
    }

    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate();
    }
  };

  return (
    <button
      type="button"
      onClick={navigate}
      onKeyDown={handleKeyDown}
      className={`appearance-none border-0 bg-transparent p-0 text-left ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
