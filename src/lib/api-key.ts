"use client";

import { useSyncExternalStore } from "react";

// BYOK：使用者自己的 OpenAI API Key 只存在瀏覽器的 localStorage

const STORAGE_KEY = "openai-api-key";
const CHANGE_EVENT = "api-key-change";
const OPEN_SETTINGS_EVENT = "open-settings";

export function getApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveApiKey(key: string) {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {
    // 無痕模式或封鎖網站資料時寫入會失敗，此時金鑰只在這次分頁中無法保存
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearApiKey() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function useApiKey(): string | null {
  return useSyncExternalStore(subscribe, getApiKey, () => null);
}

export function maskApiKey(key: string): string {
  if (key.length <= 10) return "••••••••";
  return `${key.slice(0, 5)}••••••••${key.slice(-4)}`;
}

export function openSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenSettings(callback: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, callback);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, callback);
}
