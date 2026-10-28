import Link from "next/link";
import Logo from "@/components/logo";
import SettingsButton from "@/components/settings-button";

const NAV_LINKS = [
  { href: "/#features", label: "功能" },
  { href: "/#how", label: "使用流程" },
  { href: "/#faq", label: "常見問題" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SettingsButton />
          <Link
            href="/interview"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            開始練習
          </Link>
        </div>
      </div>
    </header>
  );
}
