import type { PortfolioItem } from "@/lib/types";

type ActionButtonsProps = {
  actions?: PortfolioItem["actions"];
  labels: {
    demo: string;
    download: string;
  };
  compact?: boolean;
  readMoreLabel?: string;
  onReadMore?: () => void;
};

export function ActionButtons({
  actions,
  labels,
  compact = false,
  readMoreLabel,
  onReadMore,
}: ActionButtonsProps) {
  const liveAction = actions?.live;
  const downloadAction = actions?.download;

  if (!liveAction && !downloadAction && !onReadMore) {
    return null;
  }

  const baseClassName = compact
    ? "font-code inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-main)] transition hover:border-[rgba(0,229,255,0.35)] hover:text-[var(--accent-strong)]"
    : "font-code inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-main)] transition hover:border-[rgba(0,229,255,0.35)] hover:text-[var(--accent-strong)]";

  return (
    <div className="flex flex-wrap gap-3">
      {liveAction ? (
        <a
          className={`${baseClassName} group/live relative overflow-hidden border-[rgba(0,229,255,0.35)] bg-[linear-gradient(120deg,rgba(0,229,255,0.16),rgba(124,77,255,0.16))] shadow-[0_0_20px_rgba(0,229,255,0.16)] hover:shadow-[0_0_34px_rgba(0,229,255,0.35)]`}
          href={liveAction.href}
          target="_blank"
          rel="noreferrer"
        >
          <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] transition-transform duration-700 group-hover/live:translate-x-[120%]" />
          <span className="relative flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover/live:translate-x-0.5">
              {liveAction.label ?? labels.demo}
            </span>
            <span className="text-[10px] transition-transform duration-300 group-hover/live:translate-x-1">↗</span>
          </span>
        </a>
      ) : null}
      {downloadAction ? (
        <a
          className={`${baseClassName} group/download relative overflow-hidden border-[rgba(0,229,255,0.35)] bg-[linear-gradient(120deg,rgba(0,229,255,0.16),rgba(124,77,255,0.16))] shadow-[0_0_20px_rgba(0,229,255,0.16)] hover:shadow-[0_0_34px_rgba(0,229,255,0.35)]`}
          href={downloadAction.href}
          download
        >
          <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] transition-transform duration-700 group-hover/download:translate-x-[120%]" />
          <span className="relative flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover/download:translate-x-0.5">
              {downloadAction.label ?? labels.download}
            </span>
            <span className="text-[10px] transition-transform duration-300 group-hover/download:translate-x-1">↗</span>
          </span>
        </a>
      ) : null}
      {onReadMore ? (
        <button
          type="button"
          onClick={onReadMore}
          className={`${baseClassName} group/readmore relative overflow-hidden border-[rgba(0,229,255,0.35)] bg-[linear-gradient(120deg,rgba(0,229,255,0.16),rgba(124,77,255,0.16))] shadow-[0_0_20px_rgba(0,229,255,0.16)] hover:shadow-[0_0_34px_rgba(0,229,255,0.35)]`}
        >
          <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] transition-transform duration-700 group-hover/readmore:translate-x-[120%]" />
          <span className="relative flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover/readmore:translate-x-0.5">
              {readMoreLabel ?? "Read more"}
            </span>
            <span className="text-[10px] transition-transform duration-300 group-hover/readmore:translate-x-1">↗</span>
          </span>
        </button>
      ) : null}
    </div>
  );
}
