"use client";

import { useEffect, useRef, useState } from "react";
import { TypewriterLogo } from "@/components/typewriter-logo";
import type { SiteDictionary } from "@/content/site";
import type { Locale, SiteProfile } from "@/lib/types";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  profile: SiteProfile;
};

export function SiteHeader({ locale, profile }: SiteHeaderProps) {
  const contactSectionRef = useRef<HTMLDivElement | null>(null);
  const languageLogos = [
    { name: "HTML", src: "/chem shesaxeb/html.png" },
    { name: "CSS", src: "/chem shesaxeb/css.png" },
    { name: "JS", src: "/chem shesaxeb/js.png" },
    { name: "React", src: "/chem shesaxeb/react.png" },
    { name: "Angular", src: "/chem shesaxeb/angular.png" },
    { name: "NodeJS", src: "/chem shesaxeb/nodejs.png" },
    { name: "PHP", src: "/chem shesaxeb/php.png" },
    { name: "Python", src: "/chem shesaxeb/python.png" },
    { name: "Java", src: "/chem shesaxeb/java.png" },
    { name: "Kotlin", src: "/chem shesaxeb/kotlin.png" },
    { name: "SQL", src: "/chem shesaxeb/sql.png" },
    { name: "C#", src: "/chem shesaxeb/c%23.png" },
    { name: "C++", src: "/chem shesaxeb/c%2B%2B.png" },
  ];
  const securityTools = [
    { name: "Burp Suite", src: "/usafrtxoeba/Burp%20Suite.png" },
    { name: "Metasploit", src: "/usafrtxoeba/Metasploit.png" },
    { name: "Nmap", src: "/usafrtxoeba/Nmap.png" },
    { name: "OWASP ZAP", src: "/usafrtxoeba/OWASP%20ZAP.png" },
    { name: "SQLMap", src: "/usafrtxoeba/Sqlmap_logo.png" },
    { name: "WPScan", src: "/usafrtxoeba/WPScan.png" },
    { name: "Wireshark", src: "/usafrtxoeba/Wireshark.png" },
    { name: "Dirsearch", src: "/usafrtxoeba/dirsearch-logo.svg" },
    { name: "Nikto", src: "/usafrtxoeba/nikto-logo.svg" },
    { name: "Shtormi", src: "/usafrtxoeba/shtormi.ico" },
  ];
  const links = [
    { label: locale === "ka" ? "ჩემ შესახებ" : "About Me", type: "profile" as const },
    { label: locale === "ka" ? "პროექტები" : "Projects", type: "anchor" as const, href: `/${locale}#categories`, guide: true },
    { label: locale === "ka" ? "დამიკავშირდით" : "Contact Me", type: "contact" as const },
  ];
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [openContactsOnModalOpen, setOpenContactsOnModalOpen] = useState(false);

  const modalCopy = locale === "ka" ? {
    title: "ჩემს შესახებ",
    socialLabel: "საკონტაქტო",
    securityOfferTitle: "ვებგვერდის უსაფრთხოების სკანირება",
    securityOfferBody: 'გსურთ იცოდეთ, რამდენად დაცულია თქვენი საიტი რეალური საფრთხეებისგან? მე ვიყენებ ინდუსტრიის წამყვან ინსტრუმენტებს თქვენი ვებგვერდის "გამძლეობის" შესამოწმებლად.',
    pricingTitle: "სერვისები და ფასები",
    pricingIntro: "ქვემოთ მოცემულია ძირითადი მიმართულებები და საორიენტაციო ტარიფები.",
    pricingGroups: [
      { title: "ვებ-დეველოპმენტი", items: [
        { name: "Landing Page", price: "400 - 800 ₾", details: "სრული დიზაინი და მობილურზე მორგება." },
        { name: "ბიზნეს საიტი", price: "1,000 - 2,500 ₾", details: "Full-Stack ფუნქციონალი და მართვის პანელი." }
      ]},
      { title: "უსაფრთხოება", items: [
        { name: "აუდიტი", price: "300 - 600 ₾", details: "სისუსტეების შემოწმება და რეკომენდაციები." },
        { name: "სრული დაცვა", price: "1,500 ₾-დან", details: "სტრეს-ტესტირება (SHTORMI) და გასწორება." }
      ]}
    ],
    pricingNote: "ფასები საორიენტაციოა. ვმუშაობ პირდაპირ, შუამავლების გარეშე.",
    securityNoteTitle: "SHTORMI - ჩემი საავტორო Stress Testing პროგრამა",
    securityNote: "SHTORMI თავიდან ბოლომდე ჩემი შექმნილია, იდეიდან ბოლო ხაზის კოდამდე. მისი მიზანია წინასწარ დავინახოთ რისკები და თავიდან ავიცილოთ გათიშვები მაშინ, როცა საიტზე ბევრი მომხმარებელი შედის.",
    openLabel: "გახსნა",
    close: "დახურვა",
  } : { /* English copy simplified for brevity */
    title: "About me", socialLabel: "Contacts", close: "Close", openLabel: "Open", securityOfferTitle: "Security Scanning", securityNoteTitle: "SHTORMI", pricingTitle: "Services",
    pricingGroups: [], pricingIntro: "", securityOfferBody: "", securityNote: "", pricingNote: ""
  };

  useEffect(() => {
    if (!isProfileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsProfileOpen(false); };
    document.body.classList.add("profile-modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("profile-modal-open");
      window.removeEventListener("keydown", onKeyDown);
      setTimeout(() => { document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach(v => { if (v.paused) v.play().catch(() => {}); }); }, 50);
    };
  }, [isProfileOpen]);

  const handleContactOpen = (href: string) => {
    if (href.startsWith("mailto:")) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(href.replace("mailto:", ""))}`, "_blank");
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <header className="landing-header">
      <div className="shell">
        <div className="flex flex-col gap-5 py-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-start gap-3">
            <TypewriterLogo href={`/${locale}`} word={locale === "ka" ? "დეველოპერი" : "Developer"} />
            <button type="button" onClick={() => setIsProfileOpen(true)} className="group cursor-pointer">
              <div className="h-28 w-28 overflow-hidden rounded-full border border-white/25 bg-white/5 p-1 shadow-lg transition-all group-hover:scale-105 group-hover:border-[#15ef8d]/70">
                <img src={profile.avatar} alt="Profile" className="h-full w-full rounded-full object-cover" />
              </div>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex gap-4">
              {links.map(l => (
                <button key={l.label} onClick={() => l.type === "anchor" ? (document.getElementById("categories")?.scrollIntoView({behavior:"smooth"}), window.history.pushState({},"",l.href)) : setIsProfileOpen(true)} className="font-display font-semibold text-white hover:text-[#15ef8d]">
                  {l.label}
                </button>
              ))}
            </nav>
            <button onClick={() => window.dispatchEvent(new Event("portfolio-music-toggle"))} className="rounded-xl border border-white/30 p-2">
              <img src={isMusicPlaying ? "/icon/pause-static.svg" : "/icon/play-static.svg"} className="h-5 w-5" alt="Music" />
            </button>
          </div>
        </div>
      </div>

      <div className={`profile-modal-backdrop${isProfileOpen ? " is-open" : ""}`} onClick={() => setIsProfileOpen(false)}>
        <section className="profile-modal-scroll profile-modal-shell mx-auto my-3 max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0b0d11] p-5 shadow-2xl sm:my-6 sm:max-h-[90vh] sm:p-6" onClick={e => e.stopPropagation()}>
          <div className="mb-5 flex items-start justify-between">
            <h2 className="font-display text-xl font-semibold text-white">{modalCopy.title}</h2>
            <button onClick={() => setIsProfileOpen(false)} className="rounded-lg border border-white/20 px-3 py-1 text-sm text-white hover:border-[#15ef8d]">{modalCopy.close}</button>
          </div>
          <div className="space-y-6">
            <img src={profile.avatar} className="mx-auto h-48 w-48 rounded-xl object-cover border border-white/10" alt="" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">{profile.name}</p>
              <p className="text-[#15ef8d]">{profile.role[locale]}</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">{profile.bio[locale]}</p>
            
            <div className="profile-modal-surface rounded-xl p-4 border border-white/5">
              <p className="text-center font-display font-bold text-[#15ef8d] mb-4">ტექნოლოგიები</p>
              <div className="flex flex-wrap justify-center gap-2">
                {languageLogos.map(l => (
                  <div key={l.name} className="profile-modal-card p-2 rounded-lg border border-white/5 w-20 text-center">
                    <img src={l.src} className="h-10 w-10 mx-auto object-contain" alt="" />
                    <p className="text-[10px] mt-1 text-gray-400">{l.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-modal-surface rounded-xl p-4 border border-white/5">
              <p className="text-center font-display font-bold text-[#15ef8d] mb-4">{modalCopy.securityOfferTitle}</p>
              <div className="grid grid-cols-4 gap-2">
                {securityTools.map(t => (
                  <div key={t.name} className="profile-modal-card p-2 rounded-lg border border-white/5 text-center">
                    <img src={t.src} className="h-8 w-8 mx-auto object-contain" alt="" />
                    <p className="text-[9px] mt-1 text-gray-400">{t.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-white/5">
                <p className="text-center text-xs font-bold text-[#15ef8d] mb-2 uppercase tracking-wider">{modalCopy.securityNoteTitle}</p>
                <p className="text-xs leading-relaxed text-gray-300 whitespace-pre-line">{modalCopy.securityNote}</p>
              </div>
            </div>

            <div className="profile-modal-highlight rounded-xl p-5 border border-[#15ef8d]/20">
              <p className="text-center font-display font-bold text-[#15ef8d] mb-4">სერვისები</p>
              <div className="space-y-3">
                {modalCopy.pricingGroups.map(g => (
                  <div key={g.title}>
                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase">{g.title}</p>
                    <div className="space-y-2">
                      {g.items.map(i => (
                        <div key={i.name} className="profile-modal-card p-3 rounded-lg border border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-bold text-white">{i.name}</p>
                            <p className="text-[10px] text-gray-400">{i.details}</p>
                          </div>
                          <p className="text-sm font-bold text-[#ff4d6d]">{i.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-modal-surface rounded-xl p-4 border border-white/5">
              <p className="font-bold text-white mb-3">კონტაქტი</p>
              <div className="space-y-2">
                {profile.links.map(l => (
                  <button key={l.label} onClick={() => handleContactOpen(l.href)} className="profile-modal-card w-full p-3 rounded-lg border border-white/5 flex justify-between items-center hover:border-[#15ef8d]/50">
                    <span className="text-sm text-gray-300 uppercase">{l.label}</span>
                    <span className="text-[10px] font-bold text-[#15ef8d] uppercase">გახსნა</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
