import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-4">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-[var(--text-main)] sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          {body}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
