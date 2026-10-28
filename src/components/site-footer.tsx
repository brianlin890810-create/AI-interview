import Link from "next/link";
import Logo from "@/components/logo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            依照你想應徵的職缺出題、追問、評分。把緊張留在練習裡，把自信帶進面試間。
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium">產品</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/#features" className="hover:text-ink">功能</Link></li>
            <li><Link href="/#how" className="hover:text-ink">使用流程</Link></li>
            <li><Link href="/interview" className="hover:text-ink">開始練習</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">支援</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/#faq" className="hover:text-ink">常見問題</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          © 2026 AI 面試模擬器。AI 產生的回饋僅供練習參考。
        </p>
      </div>
    </footer>
  );
}
