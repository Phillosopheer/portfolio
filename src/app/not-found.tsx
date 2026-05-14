import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-screen items-center justify-center py-10">
      <div className="panel max-w-2xl space-y-5 px-8 py-10 text-center">
        <p className="eyebrow">404 / Not Found</p>
        <h1 className="font-display text-4xl text-[var(--text-main)] sm:text-5xl">
          გვერდი ვერ მოიძებნა / Page not found
        </h1>
        <p className="text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          მისამართი არასწორია ან კონტენტი ჯერ არ დამატებულა. The route is
          invalid or the content has not been published yet.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-[var(--accent)] bg-[rgba(93,242,255,0.1)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-main)] transition hover:bg-[rgba(93,242,255,0.18)]"
          href="/ka"
        >
          მთავარ გვერდზე დაბრუნება
        </Link>
      </div>
    </div>
  );
}
