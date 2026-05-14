import type { PortfolioItem } from "@/lib/types";

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "signal-commerce",
    category: "web",
    featured: true,
    order: 1,
    year: 2026,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    cover: "/work/signal-commerce.svg",
    gallery: ["/work/signal-commerce.svg", "/work/signal-dashboard.svg"],
    actions: {
      live: {
        href: "https://github.com/yourusername/signal-commerce-demo",
      },
    },
    translations: {
      ka: {
        title: "Signal Commerce",
        tagline: "პრემიუმ პროდუქტის landing და conversion-focused storefront.",
        summary:
          "ვებპროექტი, რომელიც აერთიანებს მკვეთრ ბრენდინგს, პროდუქტების პრეზენტაციას და სწრაფ demo-გაყვანის სტრუქტურას.",
        intro:
          "ეს ქეისი წარმოადგენს იმ ტიპის პროექტს, სადაც ვიზუალური პრეზენტაცია და ტექნიკური სისწრაფე ერთდროულად მნიშვნელოვანია.",
        role: "UI architecture, responsive frontend, content structuring",
        highlights: [
          "ბილინგვალური პროდუქტის მესიჯინგი",
          "CTA-ებზე ორიენტირებული hero და sections",
          "Vercel-ready landing performance",
        ],
        sections: {
          challenge: {
            title: "ამოცანა",
            body:
              "მიზანი იყო ისეთი storefront-ის შექმნა, რომელიც ერთდროულად გამოიყურება პრემიუმად და ამასთან სწრაფად გადასცემს პროდუქტის ღირებულებას კლიენტს.",
          },
          solution: {
            title: "გადაწყვეტა",
            body:
              "სტრუქტურა აგებულია ძლიერი hero ბლოკით, პროდუქტის story-driven sections-ით და reusable cards-ით, რათა მოგვიანებით ახალი პროდუქტებიც მარტივად დაემატოს.",
          },
          result: {
            title: "შედეგი",
            body:
              "საბოლოო ინტერფეისი მზად არის როგორც public demo-სთვის, ასევე მომავალში რეალური e-commerce ან CMS ინტეგრაციისთვის.",
          },
          extra: {
            title: "დამატებითი შენიშვნა",
            body:
              "ეს item ამჟამად აჩვენებს demo action-ს. მოგვიანებით შესაძლებელია იგივე მოდელში checkout ან admin integration-ის დამატება.",
          },
        },
      },
      en: {
        title: "Signal Commerce",
        tagline: "A premium product landing and conversion-focused storefront.",
        summary:
          "A web case study that combines strong branding, product presentation, and a structure built for fast demo delivery.",
        intro:
          "This project represents the kind of work where visual direction and technical speed need to land at the same time.",
        role: "UI architecture, responsive frontend, content structuring",
        highlights: [
          "Bilingual product messaging",
          "CTA-driven hero and content sections",
          "Vercel-ready landing performance",
        ],
        sections: {
          challenge: {
            title: "Challenge",
            body:
              "The goal was to shape a storefront that feels premium while still communicating value and product clarity immediately.",
          },
          solution: {
            title: "Solution",
            body:
              "The page uses a strong hero, story-led product sections, and reusable cards so new product lines can be added later without breaking the design language.",
          },
          result: {
            title: "Result",
            body:
              "The final interface is ready both as a public demo and as a base for future commerce or CMS integrations.",
          },
          extra: {
            title: "Extra note",
            body:
              "This item currently exposes a demo action. The same model can be extended with checkout or admin integrations later.",
          },
        },
      },
    },
  },
  {
    slug: "aurora-control",
    category: "software",
    featured: true,
    order: 2,
    year: 2026,
    stack: ["Electron", "React", "SQLite", "Node.js"],
    cover: "/work/aurora-control.svg",
    gallery: ["/work/aurora-control.svg", "/work/aurora-terminal.svg"],
    actions: {
      download: {
        href: "https://github.com/yourusername/aurora-control/releases/latest",
      },
    },
    translations: {
      ka: {
        title: "Aurora Control",
        tagline: "Desktop utility შიდა პროცესების მართვისთვის.",
        summary:
          "პროგრამა, რომელიც აერთიანებს ინსტრუმენტების launcher-ს, პროცესების მონიტორინგს და სწრაფ ოპერაციულ workflow-ს ერთ desktop ინტერფეისში.",
        intro:
          "ეს ქეისი გამოყოფილია იმ მომხმარებლისთვის, რომელსაც უნდა გადმოწეროს build და უშუალოდ შეამოწმოს პროგრამის მუშაობა.",
        role: "Desktop UX, component system, local persistence",
        highlights: [
          "Download-first პრეზენტაციის მოდელი",
          "სქელი dashboard ვიზუალი",
          "შიდა ხელსაწყოების შეკვრა ერთ panel-ში",
        ],
        sections: {
          challenge: {
            title: "ამოცანა",
            body:
              "საჭირო იყო ისეთი desktop tool, რომელიც მრავალი utility-ს მართვას ერთ ცენტრში მოუყრიდა თავს და მომხმარებელს სწრაფი კონტროლი ექნებოდა.",
          },
          solution: {
            title: "გადაწყვეტა",
            body:
              "ინტერფეისი ავაწყე modular card-ებით, live status ზოლებით და download-oriented documentation-ით, რათა მომხმარებელს ინსტალაციამდეც ჰქონდეს ნათელი მოლოდინი.",
          },
          result: {
            title: "შედეგი",
            body:
              "პროექტი გამოდგება როგორც client showcase-თვის, ასევე internal operations tool-ის საწყის მაგალითად.",
          },
          extra: {
            title: "დამატებითი შენიშვნა",
            body:
              "ამ item-ზე მხოლოდ download action ჩანს, რადგან მთავარი მიზანი არის build-ის გადმოწერა და პირდაპირი ტესტირება.",
          },
        },
      },
      en: {
        title: "Aurora Control",
        tagline: "A desktop utility for internal operations and tool management.",
        summary:
          "A software case study that brings launchers, process monitoring, and fast operational workflow into one desktop interface.",
        intro:
          "This case is designed for the visitor who wants to download the build and inspect the behavior directly.",
        role: "Desktop UX, component system, local persistence",
        highlights: [
          "Download-first presentation model",
          "Bold dashboard visual system",
          "Multiple internal utilities wrapped into one panel",
        ],
        sections: {
          challenge: {
            title: "Challenge",
            body:
              "The product needed to centralize several operational utilities in one desktop control layer while keeping the interface fast to scan.",
          },
          solution: {
            title: "Solution",
            body:
              "The UI is built from modular cards, live status rails, and download-oriented documentation so the user understands the value before installing.",
          },
          result: {
            title: "Result",
            body:
              "The project works as both a client showcase and an example of how an internal operations tool can be packaged.",
          },
          extra: {
            title: "Extra note",
            body:
              "Only the download action is shown here because the primary goal is to hand off a testable build.",
          },
        },
      },
    },
  },
  {
    slug: "atlas-mobile",
    category: "android",
    featured: true,
    order: 3,
    year: 2025,
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "Material 3"],
    cover: "/work/atlas-mobile.svg",
    gallery: ["/work/atlas-mobile.svg", "/work/atlas-ui.svg"],
    actions: {
      download: {
        href: "https://github.com/yourusername/atlas-mobile/releases/latest",
      },
    },
    translations: {
      ka: {
        title: "Atlas Mobile",
        tagline: "Android აპი სწრაფი task flow-სა და field usage-სთვის.",
        summary:
          "მობილური აპის ქეისი, რომელიც შექმნილია სწრაფი მოქმედებებისთვის, მკაფიო ეკრანებით და მარტივი onboarding-სთვის.",
        intro:
          "Android მიმართულებისთვის აქცენტი კეთდება screenshots-ზე, workflow-ის ახსნაზე და download-ით ტესტირებაზე.",
        role: "Mobile UI, screen flows, UX prioritization",
        highlights: [
          "APK-ready showcase page",
          "სუფთა screen hierarchy",
          "მარტივი onboarding და task focus",
        ],
        sections: {
          challenge: {
            title: "ამოცანა",
            body:
              "უნდა შემექმნა Android აპის პრეზენტაცია, სადაც მომხმარებელი დემოს გარეშეც მიხვდებოდა ეკრანების ლოგიკას და საჭიროების შემთხვევაში APK-ს გადმოწერდა.",
          },
          solution: {
            title: "გადაწყვეტა",
            body:
              "ვიზუალური აქცენტი გადავიტანე cover screen-ზე, UI previews-ზე და მოკლე, შედეგზე ორიენტირებულ ტექსტებზე, რათა სწრაფად გამოჩნდეს app flow.",
          },
          result: {
            title: "შედეგი",
            body:
              "საბოლოოდ მივიღეთ Android case page, რომელიც ერთდროულად გამოიყურება ტექნიკურად სერიოზულად და მარტივად აღსაქმელად.",
          },
          extra: {
            title: "დამატებითი შენიშვნა",
            body:
              "თუ მომავალში live preview ან store listing გაჩნდება, იგივე action model-ით მისი დამატებაც შესაძლებელი იქნება.",
          },
        },
      },
      en: {
        title: "Atlas Mobile",
        tagline: "An Android app designed for fast task flow and field usage.",
        summary:
          "A mobile app case study focused on fast actions, clear screens, and friction-light onboarding.",
        intro:
          "For the Android track, the emphasis is on screenshots, concise workflow explanation, and build download testing.",
        role: "Mobile UI, screen flows, UX prioritization",
        highlights: [
          "APK-ready showcase page",
          "Clean screen hierarchy",
          "Light onboarding with strong task focus",
        ],
        sections: {
          challenge: {
            title: "Challenge",
            body:
              "The portfolio needed a mobile presentation where a visitor could understand the interface logic even before installing the APK.",
          },
          solution: {
            title: "Solution",
            body:
              "The page leans on a strong cover screen, UI previews, and short result-oriented text so the app flow becomes clear fast.",
          },
          result: {
            title: "Result",
            body:
              "The final Android case page feels technical and polished while still being easy to scan.",
          },
          extra: {
            title: "Extra note",
            body:
              "If a live preview or store listing exists later, it can be added into the same action model without restructuring the page.",
          },
        },
      },
    },
  },
  {
    slug: "quiet-ops",
    category: "software",
    featured: false,
    order: 4,
    year: 2026,
    stack: ["Python", "PySide", "SQLite", "Automation"],
    cover: "/work/quiet-ops.svg",
    gallery: ["/work/quiet-ops.svg", "/work/aurora-terminal.svg"],
    translations: {
      ka: {
        title: "Quiet Ops",
        tagline: "შიდა automation პანელი კონტროლირებული workflow-სთვის.",
        summary:
          "შიდა პროგრამის მაგალითი, რომელიც აჩვენებს როგორ შეიძლება tool-oriented software-ს დაპრეზენტირება მაშინაც კი, როცა საჯარო download ან demo ჯერ არ არსებობს.",
        intro:
          "ეს ჩანაწერი მნიშვნელოვანია, რადგან portfolio სისტემამ უნდა იმუშაოს incomplete public access-ს შემთხვევაშიც.",
        role: "Automation design, internal tooling, operator flows",
        highlights: [
          "No-public-action სცენარის ტესტი",
          "Internal tool positioning",
          "Case-first storytelling",
        ],
        sections: {
          challenge: {
            title: "ამოცანა",
            body:
              "საჭირო იყო ისეთი სტრუქტურა, რომელიც იმუშავებს მაშინაც, როცა პროდუქტი შიდა მოხმარებისთვისაა და საჯარო ბმულები არ იდება.",
          },
          solution: {
            title: "გადაწყვეტა",
            body:
              "ინფორმაციული ქეისის გვერდი აქცენტს აკეთებს პრობლემაზე, არქიტექტურაზე და workflow-ზე, ხოლო action ბლოკი ავტომატურად იშლება.",
          },
          result: {
            title: "შედეგი",
            body:
              "ამის შედეგად portfolio რჩება სუფთა და არ აჩვენებს ცარიელ ღილაკებს იქ, სადაც საჯარო resource არ არსებობს.",
          },
        },
      },
      en: {
        title: "Quiet Ops",
        tagline: "An internal automation panel for controlled operations.",
        summary:
          "An internal-software example that shows how to present a tool-oriented product even when no public demo or download exists yet.",
        intro:
          "This entry matters because the portfolio system must still work when public access is intentionally unavailable.",
        role: "Automation design, internal tooling, operator flows",
        highlights: [
          "No-public-action scenario coverage",
          "Internal tool positioning",
          "Case-first storytelling",
        ],
        sections: {
          challenge: {
            title: "Challenge",
            body:
              "The portfolio needed a structure that still makes sense when the product is internal-only and no public links should be shown.",
          },
          solution: {
            title: "Solution",
            body:
              "The case page emphasizes the problem, architecture, and workflow, while the action block automatically disappears.",
          },
          result: {
            title: "Result",
            body:
              "The outcome keeps the portfolio clean and avoids empty buttons when no public resource exists.",
          },
        },
      },
    },
  },
];
