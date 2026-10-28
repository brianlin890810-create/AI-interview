"use client";

import { useEffect, useRef, useState } from "react";
import {
  API_KEY_HEADER,
  TOTAL_QUESTIONS,
  type Evaluation,
  type InterviewResponse,
  type Turn,
} from "@/lib/interview";
import { getApiKey, openSettings, useApiKey } from "@/lib/api-key";

type Stage = "setup" | "interview" | "result";

const STAGE_LABELS: { key: Stage; label: string }[] = [
  { key: "setup", label: "職缺描述" },
  { key: "interview", label: "面試作答" },
  { key: "result", label: "評分結果" },
];

function StageIndicator({ stage }: { stage: Stage }) {
  const current = STAGE_LABELS.findIndex((s) => s.key === stage);
  return (
    <ol className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
      {STAGE_LABELS.map((s, i) => (
        <li key={s.key} className="flex items-center gap-2 sm:gap-3">
          <span
            className={`flex items-center gap-2 ${i <= current ? "text-ink" : "text-muted"}`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                i < current
                  ? "bg-accent text-accent-ink"
                  : i === current
                    ? "bg-ink text-paper"
                    : "border border-line"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </span>
            <span className={i === current ? "" : "hidden sm:inline"}>{s.label}</span>
          </span>
          {i < STAGE_LABELS.length - 1 && <span className="h-px w-4 bg-line sm:w-8" />}
        </li>
      ))}
    </ol>
  );
}

function scoreTone(score: number, max: number) {
  const ratio = score / max;
  if (ratio >= 0.8) return "表現優秀";
  if (ratio >= 0.6) return "表現不錯";
  if (ratio >= 0.4) return "還有進步空間";
  return "需要加強準備";
}

export default function InterviewPage() {
  const [stage, setStage] = useState<Stage>("setup");
  const [jobDescription, setJobDescription] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyError, setKeyError] = useState(false);
  const apiKey = useApiKey();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage === "interview") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [turns, loading, stage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  async function send(nextTurns: Turn[]) {
    setLoading(true);
    setError("");
    setKeyError(false);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [API_KEY_HEADER]: getApiKey() ?? "",
        },
        body: JSON.stringify({ jobDescription, turns: nextTurns }),
      });
      const data: InterviewResponse = await res.json();
      if (data.type === "error") {
        setError(data.error);
        setKeyError(res.status === 401);
      } else if (data.type === "evaluation") {
        setEvaluation(data.evaluation);
        setStage("result");
      } else {
        setTurns([
          ...nextTurns,
          { role: "assistant", kind: data.type, content: data.content },
        ]);
        setQuestionNumber(data.questionNumber);
      }
    } catch {
      setError("無法連線到伺服器，請確認網路後再試。");
    } finally {
      setLoading(false);
    }
  }

  function start() {
    if (!apiKey) {
      openSettings();
      return;
    }
    if (!jobDescription.trim() || loading) return;
    setStage("interview");
    setTurns([]);
    send([]);
  }

  function submitAnswer() {
    if (!answer.trim() || loading) return;
    const nextTurns: Turn[] = [...turns, { role: "user", content: answer.trim() }];
    setTurns(nextTurns);
    setAnswer("");
    send(nextTurns);
  }

  function restart() {
    setStage("setup");
    setTurns([]);
    setQuestionNumber(0);
    setAnswer("");
    setEvaluation(null);
    setError("");
    setKeyError(false);
  }

  const awaitingAnswer =
    turns.length > 0 && turns[turns.length - 1].role === "assistant";

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 flex justify-center">
        <StageIndicator stage={stage} />
      </div>

      {stage === "setup" && (
        <section>
          <h1 className="text-center font-serif text-3xl font-black sm:text-4xl">
            你想應徵什麼職位？
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-muted">
            貼上職缺描述，面試官會依此提出 {TOTAL_QUESTIONS} 道題目，並視你的回答追問。
          </p>
          {!apiKey && (
            <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-highlight/50 bg-highlight/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">先設定你的 OpenAI API Key</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  金鑰只會存在你的瀏覽器中，面試用量會計入你自己的 OpenAI 帳戶。
                </p>
              </div>
              <button
                onClick={openSettings}
                className="shrink-0 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:opacity-85 sm:self-auto"
              >
                前往設定
              </button>
            </div>
          )}
          <div
            className={`${apiKey ? "mt-10" : "mt-4"} rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6`}
          >
            <label htmlFor="jd" className="text-sm font-medium">
              職缺描述
            </label>
            <textarea
              id="jd"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              maxLength={5000}
              placeholder={"例如：\n前端工程師\n・熟悉 React、TypeScript\n・負責電商網站效能優化與元件設計\n・具備跨部門溝通能力"}
              className="mt-3 w-full resize-y rounded-xl border border-line bg-paper p-4 leading-relaxed placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted">{jobDescription.length} / 5000</span>
              <button
                onClick={start}
                disabled={!jobDescription.trim()}
                className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                開始面試 →
              </button>
            </div>
          </div>
        </section>
      )}

      {stage === "interview" && (
        <section className="flex flex-1 flex-col">
          <div className="flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4">
            <div>
              <p className="text-xs text-muted">目前進度</p>
              <p className="mt-0.5 font-medium">
                {questionNumber > 0
                  ? `第 ${questionNumber} / ${TOTAL_QUESTIONS} 題`
                  : "準備題目中"}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="hidden gap-1.5 sm:flex" aria-hidden="true">
                {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-8 rounded-full ${
                      i < questionNumber ? "bg-accent" : "bg-line"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={restart}
                disabled={loading}
                className="text-sm text-muted hover:text-ink disabled:opacity-50"
              >
                重新開始
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {turns.map((turn, i) =>
              turn.role === "assistant" ? (
                <div key={i} className="flex max-w-[88%] gap-3 self-start">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-ink">
                    AI
                  </span>
                  <div className="rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3 leading-relaxed">
                    {turn.kind === "followup" && (
                      <span className="mb-1 block text-xs font-medium text-accent">追問</span>
                    )}
                    <p className="whitespace-pre-wrap">{turn.content}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-ink px-4 py-3 leading-relaxed text-paper"
                >
                  <p className="whitespace-pre-wrap">{turn.content}</p>
                </div>
              ),
            )}
            {loading && (
              <div className="flex gap-3 self-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-ink">
                  AI
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-4">
                  <span className="sr-only">面試官思考中</span>
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-2 w-2 animate-bounce rounded-full bg-muted"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              <span>{error}</span>
              <div className="flex shrink-0 gap-4">
                {keyError && (
                  <button onClick={openSettings} className="font-medium hover:underline">
                    開啟設定
                  </button>
                )}
                <button onClick={() => send(turns)} className="font-medium hover:underline">
                  重試
                </button>
              </div>
            </div>
          )}

          {awaitingAnswer && !loading && (
            <div className="sticky bottom-4 mt-8 rounded-2xl border border-line bg-surface p-3 shadow-lg shadow-black/5">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    submitAnswer();
                  }
                }}
                rows={4}
                maxLength={3000}
                autoFocus
                placeholder="輸入你的回答……"
                className="w-full resize-none bg-transparent p-2 leading-relaxed placeholder:text-muted/70 focus:outline-none"
              />
              <div className="flex items-center justify-between gap-4 px-2 pt-1">
                <span className="text-xs text-muted">Ctrl + Enter 送出</span>
                <button
                  onClick={submitAnswer}
                  disabled={!answer.trim()}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  送出回答
                </button>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </section>
      )}

      {stage === "result" && evaluation && (
        <section className="flex flex-col gap-8">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-center text-paper sm:px-10">
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
            <p className="relative text-sm opacity-70">總分</p>
            <p className="relative mt-2 font-serif text-7xl font-black">
              {evaluation.totalScore}
              <span className="text-3xl opacity-50"> / {evaluation.maxScore}</span>
            </p>
            <p className="relative mt-3 inline-block rounded-full bg-highlight px-3 py-1 text-sm font-medium text-[#1b1a17]">
              {scoreTone(evaluation.totalScore, evaluation.maxScore)}
            </p>
            {evaluation.summary && (
              <p className="relative mx-auto mt-6 max-w-xl text-left leading-relaxed opacity-85">
                {evaluation.summary}
              </p>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl font-black">逐題評分</h2>
            <div className="mt-4 flex flex-col gap-4">
              {evaluation.questions.map((q, i) => (
                <div key={i} className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium leading-relaxed">
                      <span className="mr-2 text-accent">Q{i + 1}</span>
                      {q.question}
                    </p>
                    <span className="shrink-0 font-serif text-2xl font-black text-accent">
                      {q.score}
                      <span className="text-sm text-muted"> /10</span>
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${q.score * 10}%` }}
                    />
                  </div>
                  {q.comment && (
                    <p className="mt-3 leading-relaxed text-muted">{q.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {evaluation.suggestions.length > 0 && (
            <div className="rounded-2xl border border-line bg-accent-soft p-6">
              <h2 className="font-serif text-2xl font-black">改善建議</h2>
              <ol className="mt-4 space-y-3">
                {evaluation.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-ink">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <button
            onClick={restart}
            className="self-center rounded-full bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-transform hover:-translate-y-0.5"
          >
            再練習一次 →
          </button>
        </section>
      )}
    </main>
  );
}
