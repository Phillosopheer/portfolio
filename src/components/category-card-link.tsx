"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent, ReactNode } from "react";

type CategoryCardLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export function CategoryCardLink({ href, className, children }: CategoryCardLinkProps) {
  const router = useRouter();

  const navigate = () => {
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
      className={className}
      aria-label="Open category"
    >
      {children}
    </button>
  );
}
