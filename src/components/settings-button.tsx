"use client";

import { openSettings, useApiKey } from "@/lib/api-key";

export default function SettingsButton() {
  const apiKey = useApiKey();
  return (
    <button
      type="button"
      onClick={openSettings}
      aria-label={apiKey ? "設定（已設定 API Key）" : "設定（尚未設定 API Key）"}
      title="設定"
      className="relative rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 4.5a4.5 4.5 0 0 0-4.3 5.8L4 16.5V20h3.5v-2h2v-2h2l1.2-1.2a4.5 4.5 0 1 0 1.8-10.3z" />
        <circle cx="15.5" cy="8.5" r="1" />
      </svg>
      <span
        className={`absolute top-1.5 right-1.5 h-2 w-2 rounded-full ring-2 ring-paper ${
          apiKey ? "bg-accent" : "bg-highlight"
        }`}
      />
    </button>
  );
}
