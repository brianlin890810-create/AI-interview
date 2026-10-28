import Link from "next/link";

const FEATURES = [
  {
    title: "依職缺量身出題",
    body: "貼上職缺描述，AI 會抓出職位需要的技能與情境，提出技術與行為面向兼具的問題，不是通用題庫。",
    icon: (
      <path d="M7 4h7l4 4v12H7zM14 4v4h4M10 12h5M10 15.5h5" />
    ),
  },
  {
    title: "像真人一樣追問",
    body: "回答太籠統、少了具體例子？面試官會針對你的回答追問一次，逼你把經驗講清楚。",
    icon: (
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4.2A2.5 2.5 0 0 1 5 12.5zM9.5 9.5h5" />
    ),
  },
  {
    title: "逐題評分",
    body: "每一題都有 1 到 10 分與具體評語，清楚看到哪題表現亮眼、哪題還需要加強。",
    icon: (
      <path d="M5 19V11M10 19V6M15 19v-5M20 19V9M3.5 19h18" />
    ),
  },
  {
    title: "可執行的改善建議",
    body: "結束後整理出整體總結與 3 到 5 條改善建議，告訴你下一次該怎麼回答得更好。",
    icon: (
      <path d="M12 3.5l2.4 5 5.4.6-4 3.7 1.1 5.4L12 15.5l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z" />
    ),
  },
];

const STEPS = [
  {
    title: "貼上職缺描述",
    body: "從求職網站複製職缺內容，越完整，題目越貼近實際面試。",
  },
  {
    title: "回答三道題目",
    body: "用打字的方式作答，面試官會視情況追問，就像一場真正的面試。",
  },
  {
    title: "拿到評分與建議",
    body: "三題結束後立即看到總分、逐題評語與具體的改善方向。",
  },
];

const FAQS = [
  {
    q: "一次面試有幾題？",
    a: "每次 3 道主問題，每題最多追問 1 次，大約 10 到 15 分鐘就能完成一輪。",
  },
  {
    q: "可以練習哪些職位？",
    a: "任何職位都可以。工程、設計、行銷、業務……只要貼上職缺描述，題目就會依照該職位調整。",
  },
  {
    q: "需要自己的 OpenAI API Key 嗎？",
    a: "需要。點右上角的鑰匙圖示輸入你的 API Key，金鑰只會存在你的瀏覽器中，每次面試時用來呼叫 OpenAI，用量會計入你自己的 OpenAI 帳戶。",
  },
  {
    q: "我的回答會被保存嗎？",
    a: "不會。對話只保留在你的瀏覽器分頁中，關掉或重新開始就會清除。回答會傳送給 AI 服務以產生題目與評分。",
  },
  {
    q: "AI 的評分準確嗎？",
    a: "評分與建議由 AI 產生，適合作為練習時的參考方向，實際面試結果仍取決於面試官與公司需求。",
  },
];

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/interview"
      className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-transform hover:-translate-y-0.5"
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rotate-2 rounded-3xl bg-accent-soft" />
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-xl shadow-black/5 sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-sm font-medium">模擬面試進行中</span>
          </div>
          <span className="rounded-full bg-paper px-3 py-1 text-xs text-muted">第 2 / 3 題</span>
        </div>
        <div className="space-y-3 pt-5 text-sm leading-relaxed">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-paper px-4 py-3">
            請分享一次你優化網站效能的經驗，你是如何找出瓶頸的？
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-paper">
            我用 Lighthouse 追蹤指標，再用 code splitting 把首頁載入時間從 4 秒降到 1.5 秒。
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-paper px-4 py-3">
            <span className="mb-1 block text-xs font-medium text-accent">追問</span>
            你怎麼決定哪些模組要拆分？過程中遇過什麼取捨？
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-xl border border-line p-4">
          <div className="font-serif text-3xl font-black text-accent">8</div>
          <div className="text-xs leading-relaxed text-muted">
            <span className="block font-medium text-ink">第 1 題評語</span>
            有具體數據佐證成果，建議補充團隊協作的角色。
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
            AI 模擬面試・依職缺出題
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight font-black sm:text-5xl lg:text-6xl">
            下一場面試，
            <br />
            先在這裡
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">練過一次</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-highlight/60 sm:h-4" />
            </span>
            。
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            貼上你想應徵的職缺描述，AI 面試官會為你量身出題、針對回答追問，
            結束後給你逐題評分與具體的改善建議。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryButton>免費開始模擬面試</PrimaryButton>
            <Link href="#how" className="px-2 py-3 font-medium text-muted hover:text-ink">
              看看怎麼運作
            </Link>
          </div>
        </div>
        <HeroPreview />
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-16 border-t border-line bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <p className="text-sm font-medium text-accent">功能</p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-snug font-black sm:text-4xl">
            不只是出題，而是一場完整的面試演練
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-accent/40"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10 rounded-xl bg-accent-soft p-2 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {f.icon}
                </svg>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-16 border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <p className="text-sm font-medium text-accent">使用流程</p>
          <h2 className="mt-3 font-serif text-3xl font-black sm:text-4xl">三個步驟，十分鐘完成</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-6">
                <span className="font-serif text-5xl font-black text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 border-t border-line bg-surface">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:py-24">
          <div>
            <p className="text-sm font-medium text-accent">常見問題</p>
            <h2 className="mt-3 font-serif text-3xl font-black sm:text-4xl">你可能想知道</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-xl text-muted transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-paper sm:px-12">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-highlight/20 blur-3xl" />
            <h2 className="relative font-serif text-3xl font-black sm:text-4xl">準備好了嗎？</h2>
            <p className="relative mx-auto mt-4 max-w-lg leading-relaxed opacity-75">
              現在就來一場模擬面試，把緊張留在練習裡。
            </p>
            <div className="relative mt-8">
              <PrimaryButton>開始模擬面試</PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
