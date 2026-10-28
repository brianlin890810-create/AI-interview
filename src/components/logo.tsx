import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="AI 面試模擬器 首頁">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="9" className="fill-accent" />
        <path
          d="M9 11.5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4.5L11 23v-3.6a3 3 0 0 1-2-2.9z"
          className="fill-accent-ink"
        />
        <circle cx="23.5" cy="9" r="3" className="fill-highlight" />
      </svg>
      <span className="font-serif text-lg font-black tracking-wide">面試模擬器</span>
    </Link>
  );
}
