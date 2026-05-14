import type { SiteDictionary } from "@/content/site";
import type { Locale } from "@/lib/types";

type SiteFooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteFooter(props: SiteFooterProps) {
  void props;
  return null;
}
