export type Locale = "ka" | "en";

export type ProjectCategory = "web" | "software" | "android";

export type PortfolioItemAction = {
  href: string;
  label?: string;
};

export type PortfolioItemTranslationSection = {
  title: string;
  body: string;
};

export type PortfolioItemTranslation = {
  title: string;
  tagline: string;
  summary: string;
  intro: string;
  role: string;
  highlights: string[];
  sections: {
    challenge: PortfolioItemTranslationSection;
    solution: PortfolioItemTranslationSection;
    result: PortfolioItemTranslationSection;
    extra?: PortfolioItemTranslationSection;
  };
};

export type PortfolioItem = {
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  year: number;
  stack: string[];
  cover: string;
  gallery: string[];
  actions?: {
    live?: PortfolioItemAction;
    download?: PortfolioItemAction;
  };
  translations: Record<Locale, PortfolioItemTranslation>;
};

export type LocalizedText = Record<Locale, string>;

export type SiteProfileLink = {
  label: string;
  href: string;
  description: LocalizedText;
};

export type SiteProfileStat = {
  value: string;
  label: LocalizedText;
};

export type SiteProfile = {
  name: string;
  avatar: string;
  role: LocalizedText;
  location: LocalizedText;
  bio: LocalizedText;
  email: string;
  phone: string;
  availability: LocalizedText;
  links: SiteProfileLink[];
  stats: SiteProfileStat[];
};

export type SiteSettings = {
  maintenanceMode: boolean;
};

