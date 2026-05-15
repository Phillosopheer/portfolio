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
    {
      label: locale === "ka" ? "ჩემ შესახებ" : "About Me",
      type: "profile" as const,
    },
    {
      label: locale === "ka" ? "პროექტები" : "Projects",
      type: "anchor" as const,
      href: `/${locale}#categories`,
      guide: true,
    },
    {
      label: locale === "ka" ? "დამიკავშირდით" : "Contact Me",
      type: "contact" as const,
    },
  ];
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [openContactsOnModalOpen, setOpenContactsOnModalOpen] = useState(false);

  const modalCopy =
    locale === "ka"
      ? {
          title: "ჩემს შესახებ",
          socialLabel: "საკონტაქტო",
          securityOfferTitle: "ვებგვერდის უსაფრთხოების სკანირება",
          securityOfferBody:
            'გსურთ იცოდეთ, რამდენად დაცულია თქვენი საიტი რეალური საფრთხეებისგან? მე ვიყენებ ინდუსტრიის წამყვან ინსტრუმენტებს თქვენი ვებგვერდის "გამძლეობის" შესამოწმებლად. სკანირების შედეგად გამოვავლენ ყველა სუსტ წერტილს და დაგეხმარებით მათ აღმოფხვრაში, რათა თქვენი და თქვენი მომხმარებლების მონაცემები ყოველთვის უსაფრთხოდ იყოს.',
          pricingTitle: "სერვისები და ფასები",
          pricingIntro:
            "ქვემოთ მოცემულია ძირითადი მიმართულებები და საორიენტაციო ტარიფები. თითოეული პაკეტი აღწერს რას იღებს კლიენტი რეალურად, რომ წინასწარ იყოს მკაფიო მოლოდინი.",
          pricingGroups: [
            {
              title: "ვებ-დეველოპმენტი (Web Development)",
              items: [
                {
                  name: "Landing Page (ერთგვერდიანი საიტი)",
                  price: "400 - 800 ₾",
                  details:
                    "მოიცავს სრულ დიზაინს, მობილურზე მორგებას და ძირითად ტექნიკურ გამართვას.",
                },
                {
                  name: "ბიზნეს საიტი (მრავალგვერდიანი)",
                  price: "1,000 - 2,500 ₾",
                  details:
                    "მოიცავს Full-Stack ფუნქციონალს, მართვის პანელს (Admin Panel) და საკონტაქტო ფორმებს.",
                },
                {
                  name: "ონლაინ მაღაზია (E-commerce)",
                  price: "3,000 ₾-დან",
                  details:
                    "მოიცავს პროდუქტების კატალოგს, კალათას და ქართული გადახდების ინტეგრაციას (TBC, BOG).",
                },
              ],
            },
            {
              title: "პროგრამები და მობილური აპლიკაციები",
              items: [
                {
                  name: "Android აპლიკაცია",
                  price: "1,500 - 4,000 ₾",
                  details:
                    "საბოლოო ფასი დამოკიდებულია ფუნქციების რაოდენობასა და დიზაინის სირთულეზე.",
                },
                {
                  name: "Desktop პროგრამა (Windows)",
                  price: "1,200 - 3,000 ₾",
                  details:
                    "ინდივიდუალური პროგრამული ხელსაწყოები თქვენი ბიზნესის ყოველდღიური რუტინის გასამარტივებლად და ავტომატიზაციისთვის.",
                },
              ],
            },
            {
              title: "საიტების შემოწმება",
              items: [
                {
                  name: "საიტის უსაფრთხოების აუდიტი",
                  price: "300 - 600 ₾",
                  details:
                    "მოიცავს სისუსტეების შემოწმებას (SQLMap, Nikto, WPScan) და პრაქტიკულ რეკომენდაციებს.",
                },
                {
                  name: "კომპლექსური დაცვა (Full Security)",
                  price: "1,500 ₾-დან",
                  details:
                    "სრული შემოწმება, სტრეს-ტესტირება (SHTORMI) და აღმოჩენილი პრობლემების გასწორება.",
                },
              ],
            },
          ],
          pricingNote:
            "ყველა პროექტი უნიკალურია და საბოლოო ღირებულება განისაზღვრება სამუშაოს მოცულობით. ზემოთ მოცემული ფასები საორიენტაციოა. ვმუშაობ პირდაპირ, შუამავლების გარეშე, ამიტომ გთავაზობ მაღალი ხარისხის მომსახურებას უფრო მისაღებ ფასად.",
          securityNoteTitle: "SHTORMI - ჩემი საავტორო Stress Testing პროგრამა",
          securityNote:
            "SHTORMI თავიდან ბოლომდე ჩემი შექმნილია, იდეიდან ბოლო ხაზის კოდამდე. მისი შექმნის მთავარი მიზეზი იყო მქონოდა საკუთარი, ზუსტად მორგებული პროგრამა, რომელიც მაჩვენებდა რამდენად გამძლეა ვებგვერდი რეალურ დატვირთვასა და კრიტიკულ სიტუაციებში.\n\nეს არის Windows-ის დესქტოპ პროგრამა, აწყობილი Python-ზე, ასინქრონული არქიტექტურით. მუშაობისას იყენებს თანამედროვე მიდგომებს, აგროვებს ანალიტიკას და ტესტის ბოლოს მაძლევს დეტალურ ანგარიშს, რათა ზუსტად გამოჩნდეს სად აქვს სისტემას სუსტი წერტილები და როგორ უნდა გამყარდეს.\n\nპროგრამა გათვლილია ძალიან მაღალი დატვირთვის სიმულაციაზე, ამიტომ მის გამოყენებას სჭირდება ძლიერი კომპიუტერი და საკმარისი რესურსი. ჩემთვის ეს მხოლოდ ძალის დემონსტრაცია არ არის - მისი მიზანია წინასწარ დავინახოთ რისკები და თავიდან ავიცილოთ გათიშვები მაშინ, როცა საიტზე ბევრი მომხმარებელი შედის.\n\nმნიშვნელოვანია: როგორც ამ პროგრამის ავტორი, მკაცრად ვიცავ ეთიკის ნორმებს. SHTORMI-ს ვიყენებ მხოლოდ იმ შემთხვევაში, თუ მაქვს მფლობელის ოფიციალური ნებართვა და მხოლოდ ლეგალური ტესტირების ფარგლებში.",
          openLabel: "გახსნა",
          close: "დახურვა",
        }
      : {
          title: "About me",
          socialLabel: "Contacts",
          securityOfferTitle: "Website Security Scanning",
          securityOfferBody:
            "I offer website security scanning with professional tools. The process checks for known weaknesses, misconfigurations, and practical risk exposure.",
          pricingTitle: "Services and Pricing",
          pricingIntro:
            "The cards below show the main services and estimated budgets with clear scope.",
          pricingGroups: [
            {
              title: "Web Development",
              items: [
                {
                  name: "Landing Page",
                  price: "400 - 800 GEL",
                  details:
                    "Includes complete design, responsive adaptation, and core technical setup.",
                },
                {
                  name: "Business Website",
                  price: "1,000 - 2,500 GEL",
                  details:
                    "Includes full-stack functionality, admin panel, and contact forms.",
                },
                {
                  name: "E-commerce Store",
                  price: "From 3,000 GEL",
                  details:
                    "Includes product catalog, cart flow, and local payment integration (TBC, BOG).",
                },
              ],
            },
            {
              title: "Software and Mobile Apps",
              items: [
                {
                  name: "Android App",
                  price: "1,500 - 4,000 GEL",
                  details:
                    "Final cost depends on feature scope and design complexity.",
                },
                {
                  name: "Desktop App (Windows)",
                  price: "1,200 - 3,000 GEL",
                  details:
                    "Custom software solutions for business automation and workflows.",
                },
              ],
            },
            {
              title: "Website Security Checks",
              items: [
                {
                  name: "Security Audit",
                  price: "300 - 600 GEL",
                  details:
                    "Vulnerability checks (SQLMap, Nikto, WPScan) with practical recommendations.",
                },
                {
                  name: "Full Security",
                  price: "From 1,500 GEL",
                  details:
                    "Full checkup, stress testing (SHTORMI), and remediation of discovered issues.",
                },
              ],
            },
          ],
          pricingNote:
            "Every project is unique, so final pricing depends on scope. These rates are indicative.",
          securityNoteTitle: "SHTORMI - My Custom Stress Testing Program",
          securityNote:
            "SHTORMI is entirely my own creation, from the initial idea to the final line of code. The main reason I built it was to have a fully tailored tool that shows how resilient a website is under real load and in critical situations.\n\nIt is a Windows desktop program built with Python and an asynchronous architecture. In operation, it uses modern techniques, collects analytics, and gives me a detailed report at the end of each test so it is clear where a system has weak points and how it should be reinforced.\n\nThe program is designed to simulate very high load, so using it requires a powerful computer and sufficient resources. For me, this is not just a display of technical power. Its purpose is to detect risks in advance and prevent outages when many users access the website.\n\nImportant: as the author of this program, I strictly follow ethical standards. I use SHTORMI only with official owner permission and only within legal testing boundaries.",
          openLabel: "Open",
          close: "Close",
        };

  useEffect(() => {
    if (!isProfileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("profile-modal-open");

    // პირდაპირ ვმალავთ ფონის ვიდეოს Android compositing გლიჩის თავიდან ასაცილებლად
    // ყველა ვიდეოს დამალვა — background + category cards
    const bgEl = document.querySelector(".app-background") as HTMLElement | null;
    if (bgEl) {
      bgEl.style.display = "none";
      bgEl.style.visibility = "hidden";
      bgEl.style.opacity = "0";
    }
    const allVideos = Array.from(document.querySelectorAll("video")) as HTMLVideoElement[];
    allVideos.forEach((v) => {
      v.pause();
      v.style.display = "none";
    });

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("profile-modal-open");

      if (bgEl) {
        bgEl.style.display = "";
        bgEl.style.visibility = "";
        bgEl.style.opacity = "";
      }
      allVideos.forEach((v) => {
        v.style.display = "";
        v.play().catch(() => {});
      });

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isProfileOpen]);

  useEffect(() => {
    if (!isProfileOpen || !openContactsOnModalOpen) {
      return;
    }

    const timerId = window.setTimeout(() => {
      contactSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenContactsOnModalOpen(false);
    }, 140);

    return () => window.clearTimeout(timerId);
  }, [isProfileOpen, openContactsOnModalOpen]);

  useEffect(() => {
    const handleMusicState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isPlaying?: boolean }>;
      setIsMusicPlaying(Boolean(customEvent.detail?.isPlaying));
    };

    window.addEventListener("portfolio-music-state", handleMusicState as EventListener);
    window.dispatchEvent(new Event("portfolio-music-request-state"));

    return () => {
      window.removeEventListener("portfolio-music-state", handleMusicState as EventListener);
    };
  }, []);

  const getContactIcon = (label: string) => {
    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel.includes("mail")) {
      return <img src="/icon/gmail.png" alt="Email" className="h-6 w-6 object-contain contrast-125 brightness-110" />;
    }

    if (normalizedLabel.includes("face")) {
      return <img src="/icon/facbook.png" alt="Facebook" className="h-6 w-6 object-contain contrast-125 brightness-110" />;
    }

    if (normalizedLabel.includes("ტელეფონი") || normalizedLabel.includes("phone") || normalizedLabel.includes("call")) {
      return <img src="/icon/call.png" alt="Phone" className="h-6 w-6 object-contain contrast-125 brightness-110" />;
    }

    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M6 3h3l1.3 3.2-1.8 2.2a15.3 15.3 0 0 0 7.1 7.1l2.2-1.8L21 15v3c0 1.1-.9 2-2 2C10.7 20 4 13.3 4 5c0-1.1.9-2 2-2Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  };

  const resolveContactHref = (href: string) => {
    if (href.startsWith("mailto:")) {
      const email = href.replace("mailto:", "").trim();
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    }
    return href;
  };

  const isExternalLink = (href: string) => href.startsWith("http");

  const handleContactOpen = (href: string) => {
    const finalHref = resolveContactHref(href);
    if (isExternalLink(finalHref)) {
      window.open(finalHref, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = finalHref;
  };

  return (
    <header className="landing-header">
      <div className="shell">
        <div className="flex flex-col gap-5 py-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-start gap-3">
            <TypewriterLogo
              href={`/${locale}`}
              word={locale === "ka" ? "დეველოპერი" : "Developer"}
            />
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="group flex cursor-pointer flex-col items-start gap-2 text-left"
              aria-haspopup="dialog"
              aria-expanded={isProfileOpen}
              aria-controls="profile-modal"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/25 bg-white/5 p-1 shadow-[0_18px_34px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out group-hover:scale-[1.07] group-hover:border-[#15ef8d]/70 group-hover:shadow-[0_24px_46px_rgba(21,239,141,0.3)]">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-1 lg:gap-7">
            <nav className="flex flex-wrap items-center gap-4 sm:gap-5 lg:gap-6">
              {links.map((item) =>
                item.type === "profile" ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setIsProfileOpen(true)}
                    className="font-display relative cursor-pointer text-base font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:text-[#15ef8d] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#15ef8d] after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {item.label}
                  </button>
                ) : item.type === "contact" ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(true);
                      setOpenContactsOnModalOpen(true);
                    }}
                    className="font-display relative cursor-pointer text-base font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:text-[#15ef8d] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#15ef8d] after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    className="font-display relative text-base font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:text-[#15ef8d] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#15ef8d] after:transition-all after:duration-200 hover:after:w-full"
                    href={"href" in item ? item.href : "#"}
                    onClick={(event) => {
                      if ("guide" in item && item.guide) {
                        const section = document.getElementById("categories");
                        if (section) {
                          event.preventDefault();
                          section.scrollIntoView({ behavior: "smooth", block: "start" });
                          
                          // Force restart animation on every click
                          const cards = section.querySelectorAll(".category-card");
                          cards.forEach((card) => {
                            (card as HTMLElement).style.animation = "none";
                            void (card as HTMLElement).offsetWidth; // trigger reflow
                            (card as HTMLElement).style.animation = "";
                            card.classList.remove("animate-wave");
                            void (card as HTMLElement).offsetWidth;
                            card.classList.add("animate-wave");
                          });
                          
                          window.history.pushState({}, "", item.href);
                        }
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>
            <div className="flex items-center gap-1 rounded-xl border border-white/30 p-1">
              {(["ka", "en"] as const).map((lang) => (
                <a
                  key={lang}
                  href={`/${lang}`}
                  className={`font-display rounded-lg px-3 py-1 text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                    locale === lang
                      ? "bg-[#15ef8d] text-[#041109]"
                      : "text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] hover:text-white"
                  }`}
                >
                  {lang}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("portfolio-music-toggle"))}
              className="ml-2 rounded-xl border border-white/30 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:border-[#15ef8d]/70 hover:text-[#15ef8d]"
              aria-label={isMusicPlaying ? (locale === "ka" ? "დაპაუზება" : "Pause music") : locale === "ka" ? "ჩართვა" : "Play music"}
            >
              <img
                src={isMusicPlaying ? "/icon/pause-static.svg" : "/icon/play-static.svg"}
                alt=""
                aria-hidden="true"
                className="block h-5 w-5 scale-[1.35] transform-gpu contrast-150 brightness-125 saturate-150 drop-shadow-[0_0_3px_rgba(67,245,255,0.85)]"
              />
            </button>

          </div>
        </div>
      </div>
      {isProfileOpen ? (
        <div
          className="fixed inset-0 z-50 overflow-hidden isolate bg-black p-3 overscroll-contain md:bg-black/70 md:p-4 md:backdrop-blur-sm"
          role="presentation"
          onClick={() => setIsProfileOpen(false)}
        >
          <section
            id="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="profile-modal-scroll profile-modal-shell mx-auto my-3 max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0b0d11] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:my-6 sm:max-h-[90vh] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2
                id="profile-modal-title"
                className="font-display text-xl font-semibold tracking-wide text-[var(--text-main)]"
              >
                {modalCopy.title}
              </h2>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-lg border border-white/20 px-3 py-1 text-sm text-[var(--text-muted)] transition-all duration-200 hover:border-[#15ef8d]/60 hover:text-[#15ef8d]"
              >
                {modalCopy.close}
              </button>
            </div>
            <div className="space-y-5">
              <div className="mx-auto w-fit overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-56 w-56 object-cover"
                />
              </div>
              <div className="space-y-4 text-sm leading-7 text-[var(--text-muted)]">
                <div className="text-center">
                  <p className="text-lg font-semibold tracking-wide text-[var(--text-main)]">{profile.name}</p>
                  <p className="text-sm text-[#15ef8d] drop-shadow-[0_0_10px_rgba(21,239,141,0.4)] animate-[pulse_2.2s_ease-in-out_infinite]">
                    {profile.role[locale]}
                  </p>
                </div>
                <p>{profile.bio[locale]}</p>
                <div className="profile-modal-surface rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="mb-4 text-center font-display text-lg font-semibold tracking-wide text-[#15ef8d] drop-shadow-[0_0_10px_rgba(21,239,141,0.45)] animate-[pulse_2.2s_ease-in-out_infinite]">
                    {locale === "ka" ? "პროგრამული ენები" : "Programming Languages"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {languageLogos.map((logo) => (
                      <div
                        key={logo.name}
                        className="profile-modal-card group w-[104px] rounded-xl border border-white/10 bg-black/20 px-3 py-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:border-[#15ef8d]/55 hover:bg-[#15ef8d]/8 hover:shadow-[0_14px_26px_rgba(21,239,141,0.2)]"
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="mx-auto h-14 w-14 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                        />
                        <p className="mt-2 text-center text-xs font-sans font-semibold tracking-wide text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-main)]">
                          {logo.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="profile-modal-surface rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-center font-display text-lg font-semibold tracking-wide text-[#15ef8d] drop-shadow-[0_0_10px_rgba(21,239,141,0.45)] animate-[pulse_2.2s_ease-in-out_infinite]">
                    {modalCopy.securityOfferTitle}
                  </h3>
                  <p className="mt-2 text-center text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                    {modalCopy.securityOfferBody}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {securityTools.map((tool) => (
                      <div
                        key={tool.name}
                        className="profile-modal-card group rounded-xl border border-white/10 bg-black/20 px-3 py-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:border-[#15ef8d]/55 hover:bg-[#15ef8d]/8 hover:shadow-[0_14px_26px_rgba(21,239,141,0.2)]"
                      >
                        <div className="flex h-20 items-center justify-center">
                          <img
                            src={tool.src}
                            alt={tool.name}
                            className="h-16 w-16 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                          />
                        </div>
                        <p className="mt-1 text-center text-sm font-sans font-semibold tracking-wide text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text-main)]">
                          {tool.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-white/12 bg-[rgba(10,14,20,0.92)] px-5 py-5 text-left shadow-[0_18px_38px_rgba(0,0,0,0.34)]">
                    <p className="mb-3 text-center font-display text-base font-bold uppercase tracking-[0.16em] text-[#15ef8d] drop-shadow-[0_0_10px_rgba(21,239,141,0.28)] animate-[pulse_2.2s_ease-in-out_infinite]">
                      {modalCopy.securityNoteTitle}
                    </p>
                    <p className="whitespace-pre-line text-[15px] font-medium leading-8 text-[#eef2f7] [text-shadow:0_1px_6px_rgba(0,0,0,0.38)] sm:text-[16px]">
                    {modalCopy.securityNote}
                    </p>
                  </div>
                </div>
                <div className="profile-modal-highlight relative overflow-hidden rounded-xl border border-[#15ef8d]/20 bg-[linear-gradient(180deg,rgba(21,239,141,0.08),rgba(255,255,255,0.02))] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.28)] animate-[fade-up_480ms_ease-out]">
                  <h3 className="text-center font-display text-lg font-semibold tracking-wide text-[#15ef8d] drop-shadow-[0_0_10px_rgba(21,239,141,0.45)] animate-[pulse_2.2s_ease-in-out_infinite]">
                    {modalCopy.pricingTitle}
                  </h3>
                  <p className="mt-2 text-center text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                    {modalCopy.pricingIntro}
                  </p>
                  <div className="mt-4 space-y-4">
                    {modalCopy.pricingGroups.map((group) => (
                      <div
                        key={group.title}
                        className="profile-modal-card rounded-xl border border-white/10 bg-[rgba(6,10,16,0.65)] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#15ef8d]/45 hover:shadow-[0_14px_28px_rgba(21,239,141,0.14)]"
                      >
                        <p className="font-display text-sm font-semibold tracking-wide text-[#15ef8d] sm:text-base">
                          {group.title}
                        </p>
                        <div className="mt-3 space-y-3">
                          {group.items.map((item) => (
                            <div
                              key={`${group.title}-${item.name}`}
                            className="profile-modal-card rounded-lg border border-white/10 bg-[rgba(8,12,18,0.82)] px-3 py-3 transition-all duration-300 hover:border-[#15ef8d]/35 hover:bg-[rgba(10,17,26,0.88)]"
                            >
                              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-semibold text-[var(--text-main)] sm:text-base">{item.name}</p>
                                <p className="text-sm font-bold text-[#ff4d6d] drop-shadow-[0_0_8px_rgba(255,77,109,0.35)]">{item.price}</p>
                              </div>
                              <p className="mt-1 text-xs leading-6 text-[var(--text-muted)] sm:text-sm">
                                {item.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 rounded-lg border border-[#15ef8d]/25 bg-[#15ef8d]/8 px-3 py-3 text-sm leading-7 text-[var(--text-main)]">
                    {modalCopy.pricingNote}
                  </p>
                </div>
                <div
                  ref={contactSectionRef}
                  className="profile-modal-surface rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="mb-2 font-semibold text-[var(--text-main)]">{modalCopy.socialLabel}</p>
                  <div className="space-y-2">
                    {profile.links.map((item) => (
                      (() => {
                        const isPhoneLink = item.href.startsWith("tel:");
                        const contactLabel = isPhoneLink ? profile.phone : item.label;
                        return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => handleContactOpen(item.href)}
                        className="profile-modal-card flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-left text-base text-[var(--text-muted)] transition-all duration-200 hover:border-[#15ef8d]/50 hover:text-[var(--text-main)]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[#15ef8d]">{getContactIcon(item.label)}</span>
                          <span className="font-medium tracking-wide uppercase">{contactLabel}</span>
                        </span>
                        <span className="text-xs font-bold tracking-widest text-[#15ef8d] uppercase font-display">
                          {modalCopy.openLabel}
                        </span>
                      </button>
                        );
                      })()
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </header>
  );
}
