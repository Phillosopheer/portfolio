"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { PortfolioItem, ProjectCategory, SiteProfile, SiteSettings } from "@/lib/types";

type AdminDashboardProps = {
  initialProfile: SiteProfile;
  initialSettings: SiteSettings;
  initialWorks: PortfolioItem[];
};

type NewWorkState = {
  category: ProjectCategory;
  title: string;
  summary: string;
  cover: string;
  downloadUrl: string;
  liveUrl: string;
};

const emptyWork: NewWorkState = {
  category: "web",
  title: "",
  summary: "",
  cover: "",
  downloadUrl: "",
  liveUrl: "",
};

export function AdminDashboard({
  initialProfile,
  initialSettings,
  initialWorks,
}: AdminDashboardProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<SiteProfile>(initialProfile);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [works, setWorks] = useState<PortfolioItem[]>(initialWorks);
  const [newWork, setNewWork] = useState<NewWorkState>(emptyWork);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const sortedWorks = useMemo(
    () => [...works].sort((a, b) => a.order - b.order),
    [works],
  );

  const saveProfile = async () => {
    setStatus("ინახება...");
    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      setStatus("პროფილის შენახვა ვერ მოხერხდა");
      return;
    }

    setStatus("პროფილი წარმატებით შეინახა");
    router.refresh();
  };

  const saveSettings = async () => {
    setStatus("პარამეტრები ინახება...");
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      setStatus("პარამეტრების შენახვა ვერ მოხერხდა");
      return;
    }

    setStatus("პარამეტრები წარმატებით შეინახა");
    router.refresh();
  };

  const fillWorkForm = (work: PortfolioItem) => {
    setNewWork({
      category: work.category,
      title: work.translations.ka.title,
      summary: work.translations.ka.summary,
      cover: work.cover,
      downloadUrl: work.actions?.download?.href ?? "",
      liveUrl: work.actions?.live?.href ?? "",
    });
  };

  const addWork = async () => {
    setStatus("ნაშრომი ემატება...");
    const response = await fetch("/api/admin/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: newWork.category,
        titleKa: newWork.title,
        titleEn: newWork.title,
        summaryKa: newWork.summary,
        summaryEn: newWork.summary,
        cover: newWork.cover,
        downloadUrl: newWork.downloadUrl,
        liveUrl: newWork.liveUrl,
      }),
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(errorBody.error ?? "ნაშრომის დამატება ვერ მოხერხდა");
      return;
    }

    const refreshedWorks = await fetch("/api/admin/work").then((res) => res.json()) as PortfolioItem[];
    setWorks(refreshedWorks);
    setNewWork(emptyWork);
    setStatus("ნაშრომი წარმატებით დაემატა");
    router.refresh();
  };

  const updateWork = async () => {
    if (!editingSlug) {
      return;
    }

    setStatus("ნაშრომი ინახება...");
    const response = await fetch(`/api/admin/work/${editingSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: newWork.category,
        titleKa: newWork.title,
        titleEn: newWork.title,
        summaryKa: newWork.summary,
        summaryEn: newWork.summary,
        cover: newWork.cover,
        downloadUrl: newWork.downloadUrl,
        liveUrl: newWork.liveUrl,
      }),
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(errorBody.error ?? "ნაშრომის განახლება ვერ მოხერხდა");
      return;
    }

    const refreshedWorks = await fetch("/api/admin/work").then((res) => res.json()) as PortfolioItem[];
    setWorks(refreshedWorks);
    setNewWork(emptyWork);
    setEditingSlug(null);
    setStatus("ნაშრომი წარმატებით განახლდა");
    router.refresh();
  };

  const removeWork = async (slug: string) => {
    const confirmed = window.confirm("ნამდვილად წავშალო ეს ნაშრომი?");
    if (!confirmed) {
      return;
    }

    setStatus("იშლება...");
    const response = await fetch(`/api/admin/work/${slug}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus("წაშლა ვერ მოხერხდა");
      return;
    }

    setWorks((current) => current.filter((item) => item.slug !== slug));
    setStatus("ნაშრომი წაიშალა");
    router.refresh();
  };

  const uploadFile = async (file: File | null, target: "profile" | "cover" | "download") => {
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("ფაილი იტვირთება...");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    setUploading(false);

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(errorBody.error ?? "ატვირთვა ვერ მოხერხდა");
      return;
    }

    const payload = (await response.json()) as { url: string; downloadUrl?: string };
    if (target === "profile") {
      setProfile((current) => ({ ...current, avatar: payload.url }));
    } else if (target === "cover") {
      setNewWork((current) => ({ ...current, cover: payload.url }));
    } else {
      setNewWork((current) => ({ ...current, downloadUrl: payload.downloadUrl ?? payload.url }));
    }
    setStatus(`ატვირთულია: ${payload.url}`);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const updateProfileLink = (
    index: number,
    field: "label" | "href" | "descriptionKa" | "descriptionEn",
    value: string,
  ) => {
    setProfile((current) => {
      const nextLinks = [...current.links];
      const target = nextLinks[index];
      if (!target) {
        return current;
      }

      if (field === "label" || field === "href") {
        nextLinks[index] = { ...target, [field]: value };
      } else if (field === "descriptionKa") {
        nextLinks[index] = {
          ...target,
          description: { ...target.description, ka: value },
        };
      } else {
        nextLinks[index] = {
          ...target,
          description: { ...target.description, en: value },
        };
      }

      return { ...current, links: nextLinks };
    });
  };

  const addProfileLink = (preset?: "phone" | "facebook" | "other") => {
    const presetLink =
      preset === "phone"
        ? {
            label: "ტელეფონი",
            href: "tel:",
            description: {
              ka: "დამატებითი საკონტაქტო ნომერი",
              en: "Additional phone number",
            },
          }
        : preset === "facebook"
          ? {
              label: "Facebook",
              href: "https://facebook.com/",
              description: {
                ka: "ჩემი Facebook გვერდი",
                en: "My Facebook page",
              },
            }
          : {
              label: "New",
              href: "https://",
              description: {
                ka: "ახალი სოციალური ბმული",
                en: "New social link",
              },
            };

    setProfile((current) => ({
      ...current,
      links: [
        ...current.links,
        presetLink,
      ],
    }));
  };

  const removeProfileLink = (index: number) => {
    setProfile((current) => ({
      ...current,
      links: current.links.filter((_, linkIndex) => linkIndex !== index),
    }));
  };

  return (
    <main className="shell space-y-6 pt-6">
      <section className="panel flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="eyebrow">ადმინის პანელი</p>
          <h1 className="mt-2 font-display text-3xl text-[var(--text-main)]">კონტენტის მართვა</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            მარტივი რეჟიმი: ჯერ ატვირთე ფოტო, მერე შეავსე სახელი/აღწერა და დააჭირე შენახვას.
          </p>
        </div>
        <button type="button" onClick={logout} className="outline-button">
          გამოსვლა
        </button>
      </section>

      <section className="panel space-y-4 px-6 py-6">
        <h2 className="font-display text-2xl text-[var(--text-main)]">საიტის რეჟიმი</h2>
        <p className="text-sm text-[var(--text-muted)]">
          დროებითი დახურვა ჩართე მაშინ, როცა საიტზე მუშაობ მიმდინარეობს. სტუმრები დაინახავენ
          დახურულ გვერდს და შენს საკონტაქტო ნომერს.
        </p>
        <label className="flex items-center justify-between rounded-xl border border-white/15 bg-black/30 px-4 py-3">
          <span className="text-sm text-[var(--text-main)]">Maintenance Mode</span>
          <button
            type="button"
            onClick={() =>
              setSettings((current) => ({
                ...current,
                maintenanceMode: !current.maintenanceMode,
              }))
            }
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              settings.maintenanceMode
                ? "border-[#15ef8d]/70 bg-[#15ef8d]/15 text-[#15ef8d]"
                : "border-white/20 text-[var(--text-muted)] hover:border-white/40"
            }`}
          >
            {settings.maintenanceMode ? "ჩართულია" : "გამორთულია"}
          </button>
        </label>
        <button type="button" onClick={saveSettings} className="primary-button">
          რეჟიმის შენახვა
        </button>
      </section>

      <section className="panel space-y-4 px-6 py-6">
        <h2 className="font-display text-2xl text-[var(--text-main)]">პროფილი</h2>
        <p className="text-sm text-[var(--text-muted)]">
          აქ ცვლი შენს პირად ინფორმაციას, რომელიც მთავარ საიტზე ჩანს.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-[var(--text-muted)]">სახელი</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მაგ: ნოდარ ქებაძე"
              value={profile.name}
              onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">პროფესია ქართულად</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მაგ: Frontend დეველოპერი"
              value={profile.role.ka}
              onChange={(event) =>
                setProfile((current) => ({ ...current, role: { ...current.role, ka: event.target.value } }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">პროფესია ინგლისურად</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="Example: Frontend Developer"
              value={profile.role.en}
              onChange={(event) =>
                setProfile((current) => ({ ...current, role: { ...current.role, en: event.target.value } }))
              }
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">შენ შესახებ ქართულად</span>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მოკლედ აღწერე რას აკეთებ..."
              value={profile.bio.ka}
              onChange={(event) =>
                setProfile((current) => ({ ...current, bio: { ...current.bio, ka: event.target.value } }))
              }
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">შენ შესახებ ინგლისურად</span>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="Short description in English..."
              value={profile.bio.en}
              onChange={(event) =>
                setProfile((current) => ({ ...current, bio: { ...current.bio, en: event.target.value } }))
              }
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="outline-button cursor-pointer">
            პროფილის ფოტოს ატვირთვა
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => uploadFile(event.target.files?.[0] ?? null, "profile")}
            />
          </label>
          <button type="button" onClick={saveProfile} className="primary-button">
            პროფილის შენახვა
          </button>
        </div>
        <div className="space-y-4 rounded-xl border border-white/10 bg-black/25 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-[var(--text-main)]">
              სოციალური ქსელები
            </h3>
            <button type="button" onClick={() => addProfileLink("other")} className="outline-button">
              ახალი ბმული
            </button>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            აქედან ცვლი Facebook, Email, ტელეფონი ან სხვა სოციალური ბმულებს. შეგიძლია დაამატო რამდენიც გინდა.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addProfileLink("phone")}
              className="rounded-lg border border-white/20 px-3 py-2 text-sm text-[var(--text-main)] transition hover:border-[#15ef8d]/60 hover:text-[#15ef8d]"
            >
              + ტელეფონი
            </button>
            <button
              type="button"
              onClick={() => addProfileLink("facebook")}
              className="rounded-lg border border-white/20 px-3 py-2 text-sm text-[var(--text-main)] transition hover:border-[#15ef8d]/60 hover:text-[#15ef8d]"
            >
              + Facebook
            </button>
            <button
              type="button"
              onClick={() => addProfileLink("other")}
              className="rounded-lg border border-white/20 px-3 py-2 text-sm text-[var(--text-main)] transition hover:border-[#15ef8d]/60 hover:text-[#15ef8d]"
            >
              + სხვა
            </button>
          </div>
          <div className="space-y-3">
            {profile.links.map((link, index) => (
              <div
                key={`${link.label}-${index}`}
                className="rounded-xl border border-white/10 bg-black/35 p-3"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs text-[var(--text-muted)]">სახელი</span>
                    <input
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm"
                      value={link.label}
                      onChange={(event) =>
                        updateProfileLink(index, "label", event.target.value)
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs text-[var(--text-muted)]">ბმული</span>
                    <input
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm"
                      value={link.href}
                      onChange={(event) =>
                        updateProfileLink(index, "href", event.target.value)
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs text-[var(--text-muted)]">აღწერა ქართულად</span>
                    <input
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm"
                      value={link.description.ka}
                      onChange={(event) =>
                        updateProfileLink(index, "descriptionKa", event.target.value)
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs text-[var(--text-muted)]">აღწერა ინგლისურად</span>
                    <input
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm"
                      value={link.description.en}
                      onChange={(event) =>
                        updateProfileLink(index, "descriptionEn", event.target.value)
                      }
                    />
                  </label>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => removeProfileLink(index)}
                    className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    წაშლა
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel space-y-4 px-6 py-6">
        <h2 className="font-display text-2xl text-[var(--text-main)]">
          {editingSlug ? "ნაშრომის რედაქტირება" : "ახალი ნაშრომის დამატება"}
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-[var(--text-muted)]">
            1) კატეგორია
          </span>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-[var(--text-muted)]">
            2) Web ლინკი
          </span>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-[var(--text-muted)]">
            3) გადმოსაწერი ლინკი
          </span>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-[var(--text-muted)]">
            4) სათაური
          </span>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-[var(--text-muted)]">
            5) ფოტო
          </span>
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-[var(--text-muted)]">
            6) აღწერა
          </span>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-[var(--text-muted)]">
          მარტივი რეჟიმი: შეავსე ეს ველები, აირჩიე კატეგორია და ნაშრომი ზუსტად იმ კატეგორიაში დაემატება.
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-[var(--text-muted)]">კატეგორია</span>
            <select
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              value={newWork.category}
              onChange={(event) =>
                setNewWork((current) => ({
                  ...current,
                  category: event.target.value as ProjectCategory,
                }))
              }
            >
              <option value="web">Web</option>
              <option value="software">პროგრამები</option>
              <option value="android">Android</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">Web ლინკი</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მაგ: https://your-demo-site.com"
              value={newWork.liveUrl}
              onChange={(event) => setNewWork((current) => ({ ...current, liveUrl: event.target.value }))}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">გადმოსაწერი ლინკი</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მაგ: https://github.com/.../releases/latest"
              value={newWork.downloadUrl}
              onChange={(event) => setNewWork((current) => ({ ...current, downloadUrl: event.target.value }))}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-[var(--text-muted)]">სათაური</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მაგ: ჩემი ვებსაიტი"
              value={newWork.title}
              onChange={(event) => setNewWork((current) => ({ ...current, title: event.target.value }))}
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-[var(--text-muted)]">აღწერა</span>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm"
              placeholder="მოკლე აღწერა..."
              value={newWork.summary}
              onChange={(event) => setNewWork((current) => ({ ...current, summary: event.target.value }))}
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="outline-button cursor-pointer">
            ფოტოს ატვირთვა
            <input
              type="file"
              className="hidden"
              onChange={(event) => uploadFile(event.target.files?.[0] ?? null, "cover")}
            />
          </label>
          <label className="outline-button cursor-pointer">
            ZIP ფაილის ატვირთვა
            <input
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              className="hidden"
              onChange={(event) => uploadFile(event.target.files?.[0] ?? null, "download")}
            />
          </label>
          <button
            type="button"
            onClick={editingSlug ? updateWork : addWork}
            className="primary-button"
          >
            {editingSlug ? "ცვლილების შენახვა" : "ნაშრომის დამატება"}
          </button>
          {editingSlug ? (
            <button
              type="button"
              onClick={() => {
                setEditingSlug(null);
                setNewWork(emptyWork);
                setStatus("რედაქტირება გაუქმდა");
              }}
              className="outline-button"
            >
              გაუქმება
            </button>
          ) : null}
        </div>
      </section>

      <section className="panel space-y-4 px-6 py-6">
        <h2 className="font-display text-2xl text-[var(--text-main)]">ნაშრომები</h2>
        <div className="space-y-3">
          {sortedWorks.map((work) => (
            <article
              key={work.slug}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--text-main)]">{work.translations.ka.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {work.slug} • {work.category} • {work.year}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      fillWorkForm(work);
                      setEditingSlug(work.slug);
                      setStatus(`რედაქტირება: ${work.translations.ka.title}`);
                    }}
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm text-[var(--text-main)] transition hover:border-[#15ef8d]/60 hover:text-[#15ef8d]"
                  >
                    რედაქტირება
                  </button>
                  <button
                    type="button"
                    onClick={() => removeWork(work.slug)}
                    className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    წაშლა
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="pb-8 text-sm text-[var(--text-muted)]">
        {uploading ? "ატვირთვა მიმდინარეობს..." : status}
      </div>
    </main>
  );
}
