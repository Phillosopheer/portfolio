"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("პაროლი არასწორია");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="shell pt-10">
      <section className="panel mx-auto max-w-lg px-6 py-7 sm:px-8">
        <p className="eyebrow">Admin / Login</p>
        <h1 className="mt-4 font-display text-4xl text-[var(--text-main)]">ადმინ პანელი</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          შეიყვანე ადმინის პაროლი, რომ მართო პროფილი და ნამუშევრები.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <span className="text-sm text-[var(--text-muted)]">პაროლი</span>
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-[var(--text-main)] outline-none focus:border-[#15ef8d]"
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "იტვირთება..." : "შესვლა"}
          </button>
        </form>
      </section>
    </main>
  );
}
