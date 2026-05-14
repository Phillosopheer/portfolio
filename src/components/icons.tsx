import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    />
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 3 4.2 6 4.2 9S14.8 18 12 21c-2.8-3-4.2-6-4.2-9S9.2 6 12 3Z" />
    </BaseIcon>
  );
}

export function GearCodeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m8 8-3 4 3 4" />
      <path d="m16 8 3 4-3 4" />
      <path d="m10.5 19.2-.8 1.5m4.6-17.4-.8 1.5m6.1 6.4 1.7.3m-18.6 0 1.7-.3m2.5 7.3-1.2 1.2m11.6-11.6 1.2-1.2m0 12.8-1.2-1.2m-11.6-11.6-1.2-1.2" />
      <circle cx="12" cy="12" r="2.5" />
    </BaseIcon>
  );
}

export function AndroidIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 9h8a2 2 0 0 1 2 2v5.2A2.8 2.8 0 0 1 15.2 19H8.8A2.8 2.8 0 0 1 6 16.2V11a2 2 0 0 1 2-2Z" />
      <path d="m9 6 1.2 2M15 6l-1.2 2" />
      <path d="M9.5 4.5 8.2 6M14.5 4.5 15.8 6" />
      <circle cx="10" cy="12" r=".7" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12" r=".7" fill="currentColor" stroke="none" />
      <path d="M8.8 19v1.8M15.2 19v1.8M6 11H4.8M19.2 11H18" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m5 7 7 5 7-5" />
    </BaseIcon>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 18c-4 1.2-4-2-5.5-2.4" />
      <path d="M15 18v-3.1c0-1 .3-1.8.8-2.4-2.6-.3-5.3-1.3-5.3-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 3 1.1a10.1 10.1 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.8 1.1 3 0 4.3-2.7 5.3-5.3 5.6.5.6.8 1.4.8 2.4V18" />
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />
    </BaseIcon>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10v6M8 8h.01M12 16v-3.5a2.5 2.5 0 0 1 5 0V16M12 13h5" />
    </BaseIcon>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m21 4-3.8 15.2c-.2.8-.8 1-1.5.6l-4.1-3-2.1 2c-.2.2-.3.3-.7.3l.3-4.2L17 8.2c.4-.3-.1-.5-.5-.2L7 14 3 12.8c-.8-.2-.8-.8.2-1.2L19.4 5c.8-.3 1.5.2 1.3 1Z" />
    </BaseIcon>
  );
}
