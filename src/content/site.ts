import type { Locale, ProjectCategory } from "@/lib/types";

export const siteProfile = {
  name: "ნოდარ ქებაძე",
  avatar: "/prifile.jpg",
  role: {
    ka: "Full-Stack Developer და Software Engineer",
    en: "Full-Stack Developer and Software Engineer",
  },
  location: {
    ka: "თბილისი, საქართველო",
    en: "Tbilisi, Georgia",
  },
  bio: {
    ka: "მე ვარ ნოდარ ქებაძე, დამოუკიდებელი დეველოპერი, რომელიც თანამედროვე ვებგვერდებს, კომპიუტერულ პროგრამებსა და Android აპლიკაციებს ქმნის. ჩემი სამუშაო სტილი სრულიად ინდივიდუალურია: ვმუშაობ დისტანციურად, ყოველგვარი შუამავლებისა და კომპანიების გარეშე, რაც ნიშნავს პირდაპირ კომუნიკაციას დამკვეთსა და შემსრულებელს შორის. თქვენ მიკვეთავთ იდეას, მე კი მას რეალურ, გამართულ ციფრულ პროდუქტად ვაქცევ, სადაც აქცენტი ყოველთვის მკაფიო დიზაინსა და კოდის სუფთა სტრუქტურაზეა. ეს მიდგომა საშუალებას მაძლევს, თითოეულ პროექტს მაქსიმალური ყურადღება დავუთმო და მივიღო შედეგი, რომელიც ზუსტად შეესაბამება თქვენს მოთხოვნებს.",
    en: "I am Nodar Kebadze, an independent developer who builds modern websites, desktop software, and Android applications. My working style is fully individual: I work remotely, without any intermediaries or agencies, which means direct communication between the client and the developer. You share the idea, and I turn it into a real, reliable digital product, with a consistent focus on clear design and clean code structure. This approach allows me to give maximum attention to each project and deliver a result that matches your requirements exactly.",
  },
  email: "nodoqbeadze21@gmail.com",
  phone: "511 25 06 55",
  availability: {
    ka: "ღია ვარ freelance, portfolio და product ტიპის პროექტებზე.",
    en: "Available for freelance, portfolio, and product-focused projects.",
  },
  links: [
    {
      label: "Gmail",
      href: "mailto:nodoqbeadze21@gmail.com",
      description: {
        ka: "სწრაფი პირდაპირი კომუნიკაცია ახალ პროექტზე.",
        en: "Direct and fast communication for a new project.",
      },
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61583986255288",
      description: {
        ka: "ჩემი ოფიციალური Facebook პროფილი.",
        en: "My official Facebook profile.",
      },
    },
    {
      label: "Phone",
      href: "tel:511250655",
      description: {
        ka: "დამირეკე პირდაპირ ნომერზე.",
        en: "Call me directly.",
      },
    },
  ],
  stats: [
    {
      value: "03",
      label: {
        ka: "ძირითადი მიმართულება",
        en: "Core tracks",
      },
    },
    {
      value: "02",
      label: {
        ka: "აქტიური ენა",
        en: "Active languages",
      },
    },
    {
      value: "24/7",
      label: {
        ka: "ონლაინ პრეზენტაცია",
        en: "Always-on showcase",
      },
    },
  ],
} as const;

export const categoryCopy: Record<
  ProjectCategory,
  Record<Locale, { label: string; description: string }>
> = {
  web: {
    ka: {
      label: "ვებსაიტი",
      description:
        "აქ იქნება შენი შექმნილი საიტები, live demo-ები და კლიენტისთვის მარტივად სანახავი შედეგები.",
    },
    en: {
      label: "Websites",
      description:
        "This section contains your websites, live demos, and clean client-facing presentation.",
    },
  },
  software: {
    ka: {
      label: "პროგრამები",
      description:
        "აქ იქნება desktop პროგრამები, utilities და download ბმულები, რომ კლიენტმა პირდაპირ გამოსცადოს build.",
    },
    en: {
      label: "Software",
      description:
        "This section contains desktop tools, utilities, and download links so the visitor can test the build directly.",
    },
  },
  android: {
    ka: {
      label: "Android აპები",
      description:
        "აქ იქნება Android აპები, screenshots და APK/download ბმულები უფრო სუფთა mobile-focused პრეზენტაციით.",
    },
    en: {
      label: "Android apps",
      description:
        "This section contains Android apps, screenshots, and APK/download links with a cleaner mobile-focused presentation.",
    },
  },
};

export const siteCopy = {
  ka: {
    brandTag: "Portfolio Site",
    nav: {
      home: "მთავარი",
      work: "ნამუშევრები",
      about: "ჩემზე",
      contact: "კონტაქტი",
    },
    localeSwitcher: {
      label: "Language",
      ka: "KA",
      en: "EN",
    },
    common: {
      featured: "Featured",
      viewAll: "ყველა ნამუშევარი",
      viewDetails: "შიგნით შესვლა",
      readMore: "ვრცლად",
      demo: "გადადი ვებსაიტზე",
      download: "გადმოწერე",
      allFilters: "ყველა",
      stack: "ტექნოლოგიები",
      year: "წელი",
      role: "როლი",
      gallery: "გალერეა",
      challenge: "ამოცანა",
      solution: "გადაწყვეტა",
      result: "შედეგი",
      extra: "დამატებითი შენიშვნა",
      backToWork: "ნამუშევრებში დაბრუნება",
      related: "მსგავსი მიმართულება",
      actionIntro: "ქვემოთ ჩანს მხოლოდ ის მოქმედებები, რომლებიც ამ ნამუშევარს რეალურად აქვს.",
      noActions: "ამ პროექტს ჯერ საჯარო demo ან download link არ აქვს.",
      homeAnchor: "პორტფოლიო სივრცე",
    },
    home: {
      eyebrow: "პორტფოლიო",
      title: "აირჩიე სასურველი სექცია",
      description:
        "მთავარ გვერდზე დატოვებულია მხოლოდ სამი ძირითადი მიმართულება. დააკლიკე სექციას და გადახვალ მის შიდა გვერდზე, სადაც შესაბამისი ნამუშევრები იქნება დახვეწილად განლაგებული.",
      primaryCta: "ყველა ნამუშევარი",
      secondaryCta: "კონტაქტი",
      featuredTitle: "სამი მთავარი სექცია",
      featuredText:
        "ვებსაიტები, პროგრამები და Android აპები გამოტანილია ცალკე bento ბარათებად, რომ მთავარი გვერდი დარჩეს სუფთა და მკაფიო.",
      categoriesTitle: "სექციები",
      categoriesText:
        "თითო სექცია გაჩვენებს მხოლოდ შესაბამის ნამუშევრებს და აღარ ტვირთავს მთავარ გვერდს ზედმეტი კონტენტით.",
      aboutTitle: "რატომ არის ეს სტრუქტურა ძლიერი",
      aboutText:
        "ბილინგვალური routes, ცალკე project pages, GitHub-ready links და Vercel-ready deployment ამ პროექტს რეალურ სამუშაო ბაზად აქცევს.",
      contactTitle: "გაქვს იდეა ან პროექტი?",
      contactText:
        "შეუკვეთე ვებსაიტი, პროგრამა ან Android აპი. საჭიროების მიხედვით ნაჩვენები იქნება demo ან download ბმული.",
    },
    work: {
      title: "ყველა ნამუშევარი",
      description:
        "გაფილტრე მიმართულებების მიხედვით და გახსენი თითო ქეისის სრული გვერდი.",
      emptyTitle: "ამ სექციაში ჯერ არაფერი დევს",
      emptyText:
        "დაამატე ახალი item content ფაილში და ის აქ ავტომატურად გამოჩნდება.",
      categoryTitlePrefix: "სექცია",
      categoryDescriptionPrefix: "აქ ჩანს მხოლოდ ამ მიმართულების ნამუშევრები:",
    },
    about: {
      title: "საიტი აწყობილია ზრდისთვის",
      intro:
        "ეს პორტფოლიო არის საწყისი ბაზა, სადაც შეგიძლია დაამატო ახალი ქეისი რამდენიმე ფაილის რედაქტირებით და მთლიანად შეინარჩუნო ვიზუალური და ინფორმაციული სტრუქტურა.",
      pillars: [
        {
          title: "მკაფიო პრეზენტაცია",
          body:
            "მთავარი გვერდი სწრაფად აჩვენებს სამ ძირითად მიმართულებას და აღარ ტვირთავს ვიზუალს ზედმეტი ტექსტით.",
        },
        {
          title: "დეტალური ქეისები",
          body:
            "თითო ნამუშევარს აქვს თავისი გვერდი, სადაც ჩანს stack, gallery და კონკრეტული შედეგები.",
        },
        {
          title: "გაფართოებადი სისტემა",
          body:
            "GitHub-ზე კოდის შენახვა და Vercel-ზე deploy ნიშნავს, რომ ახალი ვერსიის გამოქვეყნება სწრაფად მოხდება.",
        },
      ],
      workflowTitle: "როგორ ემატება ახალი ნამუშევარი",
      workflow: [
        "1. დაამატე ახალი item `src/content/portfolio.ts`-ში.",
        "2. ჩასვი cover და gallery asset-ები `public/work/`-ში.",
        "3. საჭიროების შემთხვევაში მიუთითე `live` ან `download` ბმული.",
        "4. გადაამოწმე `GUIDE.md` და განაახლე პროგრესი.",
      ],
    },
    contact: {
      title: "მზად ვარ შემდეგი პროექტისთვის",
      intro:
        "თუ გჭირდება ვებსაიტი, პროგრამა ან Android build, შეგიძლია დამიკავშირდე ქვემოთ მოცემული არხებიდან.",
      noteTitle: "რას უნდა ელოდო",
      note:
        "პირველ ვერსიაში საკონტაქტო ფორმა განზრახ არ დავამატე. აქ არის სწრაფი, პირდაპირი ბმულები GitHub-ზე, email-ზე და პროფესიულ პროფილებზე.",
      availabilityTitle: "ხელმისაწვდომობა",
      availability:
        "ახალ პროექტებზე პასუხის გასაცემად მზად ვარ მოკლე დროის ფარგლებში.",
      responseTitle: "საუკეთესო ფორმატი",
      response:
        "მომწერე კონკრეტულად რა გჭირდება და რა უნდა ნახოს ან გადმოწეროს კლიენტმა.",
    },
    footer: {
      blurb: "Powered by Next.js, GitHub, and Vercel.",
    },
    notFound: {
      title: "გვერდი ვერ მოიძებნა",
      description: "მისამართი არასწორია ან კონტენტი ჯერ არ დამატებულა.",
      action: "მთავარ გვერდზე დაბრუნება",
    },
  },
  en: {
    brandTag: "Portfolio Site",
    nav: {
      home: "Home",
      work: "Work",
      about: "About",
      contact: "Contact",
    },
    localeSwitcher: {
      label: "Language",
      ka: "KA",
      en: "EN",
    },
    common: {
      featured: "Featured",
      viewAll: "View all work",
      viewDetails: "Open section",
      readMore: "Read more",
      demo: "Visit website",
      download: "Download",
      allFilters: "All",
      stack: "Stack",
      year: "Year",
      role: "Role",
      gallery: "Gallery",
      challenge: "Challenge",
      solution: "Solution",
      result: "Result",
      extra: "Extra note",
      backToWork: "Back to work",
      related: "Related direction",
      actionIntro: "Only the actions available for this item are rendered below.",
      noActions: "This project does not expose a public demo or download link yet.",
      homeAnchor: "Portfolio space",
    },
    home: {
      eyebrow: "Portfolio",
      title: "Choose the section you want to open",
      description:
        "The homepage now keeps only three core directions. Click a section to open its inner page, where the relevant work is arranged in a cleaner way.",
      primaryCta: "View all work",
      secondaryCta: "Contact",
      featuredTitle: "Three main sections",
      featuredText:
        "Websites, software, and Android apps are presented as separate bento cards so the homepage stays clean and clear.",
      categoriesTitle: "Sections",
      categoriesText:
        "Each section focuses only on the matching work instead of overcrowding the homepage.",
      aboutTitle: "Why this structure works",
      aboutText:
        "Bilingual routes, dedicated project pages, GitHub-ready links, and Vercel-ready deployment turn this into a practical production base.",
      contactTitle: "Need a project built?",
      contactText:
        "Order a website, software tool, or Android app. A demo or download appears only when it exists.",
    },
    work: {
      title: "All work",
      description:
        "Filter by direction and open the full page for each case study.",
      emptyTitle: "Nothing is published in this section yet",
      emptyText:
        "Add a new item to the content file and it will appear here automatically.",
      categoryTitlePrefix: "Section",
      categoryDescriptionPrefix: "Only work from this direction is shown here:",
    },
    about: {
      title: "Built for growth",
      intro:
        "This portfolio is a base system. You can add a new case study by editing a few files while keeping the visual language and structure consistent.",
      pillars: [
        {
          title: "Clear presentation",
          body:
            "The homepage now focuses only on the three main directions and keeps the visual rhythm clean.",
        },
        {
          title: "Detailed case studies",
          body:
            "Every piece of work gets its own page with stack, gallery, and outcome-driven explanations.",
        },
        {
          title: "Expandable workflow",
          body:
            "Keeping the code on GitHub and deploying with Vercel makes future publishing fast and predictable.",
        },
      ],
      workflowTitle: "How a new project is added",
      workflow: [
        "1. Add a new item in `src/content/portfolio.ts`.",
        "2. Drop cover and gallery assets inside `public/work/`.",
        "3. Add `live` or `download` links when they exist.",
        "4. Update `GUIDE.md` to keep the progress log current.",
      ],
    },
    contact: {
      title: "Ready for the next project",
      intro:
        "If you need a website, a desktop tool, or an Android build, use the links below to reach out.",
      noteTitle: "What to expect",
      note:
        "The first version intentionally skips a contact form. The focus is direct links to GitHub, email, and professional profiles.",
      availabilityTitle: "Availability",
      availability:
        "I am available to respond to new opportunities in a short turnaround window.",
      responseTitle: "Best message format",
      response:
        "Send what you need and what the client should be able to see or download.",
    },
    footer: {
      blurb: "Powered by Next.js, GitHub, and Vercel.",
    },
    notFound: {
      title: "Page not found",
      description: "The address is invalid or the content has not been published yet.",
      action: "Return home",
    },
  },
} as const;

export type SiteDictionary = (typeof siteCopy)[Locale];

export function getDictionary(locale: Locale): SiteDictionary {
  return siteCopy[locale];
}
