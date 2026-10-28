"use client";

import { useEffect, useRef, useState } from "react";
import {
  clearApiKey,
  getApiKey,
  maskApiKey,
  onOpenSettings,
  saveApiKey,
  useApiKey,
} from "@/lib/api-key";

export default function SettingsDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const savedKey = useApiKey();
  const [draft, setDraft] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(
    () =>
      onOpenSettings(() => {
        setDraft(getApiKey() ?? "");
        setShowKey(false);
        setMessage("");
        dialogRef.current?.showModal();
      }),
    [],
  );

  function close() {
    dialogRef.current?.close();
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const key = draft.trim();
    if (!key.startsWith("sk-")) {
      setMessage("API Key 應以 sk- 開頭，請確認是否複製完整。");
      return;
    }
    saveApiKey(key);
    close();
  }

  function remove() {
    clearApiKey();
    setDraft("");
    setMessage("已從這個瀏覽器移除 API Key。");
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        // 點擊背景關閉
        if (e.target === dialogRef.current) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={save} className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-black">設定</h2>
            <p className="mt-1 text-sm text-muted">使用你自己的 OpenAI API Key 進行模擬面試。</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="-mt-1 -mr-2 rounded-full p-2 text-muted hover:bg-paper hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <label htmlFor="api-key" className="mt-6 block text-sm font-medium">
          OpenAI API Key
        </label>
        <div className="mt-2 flex rounded-xl border border-line bg-paper focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <input
            id="api-key"
            type={showKey ? "text" : "password"}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setMessage("");
            }}
            placeholder="sk-..."
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="shrink-0 px-4 text-sm text-muted hover:text-ink"
          >
            {showKey ? "隱藏" : "顯示"}
          </button>
        </div>

        <p className="mt-2 text-xs text-muted">
          {savedKey ? (
            <>目前已儲存：<span className="font-mono">{maskApiKey(savedKey)}</span></>
          ) : (
            <>
              還沒有金鑰？到{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                OpenAI 平台
              </a>{" "}
              建立一組。
            </>
          )}
        </p>

        {message && <p className="mt-3 text-sm text-accent">{message}</p>}

        <div className="mt-5 rounded-xl bg-accent-soft p-4 text-xs leading-relaxed text-muted">
          <p className="font-medium text-ink">你的金鑰如何被使用</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>只儲存在這個瀏覽器的 localStorage，不會存到我們的伺服器。</li>
            <li>每次面試請求時傳送給伺服器，僅用來轉呼叫 OpenAI，用量會計入你的 OpenAI 帳戶。</li>
            <li>在共用電腦上使用後，記得按「移除」清除金鑰。</li>
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {savedKey ? (
            <button
              type="button"
              onClick={remove}
              className="text-sm text-red-600 hover:underline dark:text-red-400"
            >
              移除
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={close}
              className="rounded-full px-5 py-2.5 text-sm font-medium text-muted hover:text-ink"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!draft.trim()}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              儲存
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
