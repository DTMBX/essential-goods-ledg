/**
 * local-storage-kv.ts — Drop-in replacement for @github/spark
 *
 * Provides useKV (localStorage-backed reactive state), a minimal
 * window.spark shim (kv, user, llm) so the rest of the codebase
 * compiles without any Spark runtime.
 */

import { useState, useCallback, useEffect, useRef } from "react";

const KV_PREFIX = "essential-goods:";

/* ------------------------------------------------------------------ */
/*  useKV — localStorage-backed state hook                             */
/* ------------------------------------------------------------------ */
export function useKV<T>(
  key: string,
  initialValue: T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  const prefixedKey = `${KV_PREFIX}${key}`;

  const readStored = (): T => {
    try {
      const raw = localStorage.getItem(prefixedKey);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readStored);
  const valueRef = useRef(value);
  valueRef.current = value;

  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(valueRef.current)
          : updater;
      valueRef.current = next;
      setValue(next);
      try {
        localStorage.setItem(prefixedKey, JSON.stringify(next));
      } catch {
        /* quota exceeded — degrade silently */
      }
    },
    [prefixedKey],
  );

  /* Sync across tabs */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === prefixedKey && e.newValue !== null) {
        try {
          const parsed = JSON.parse(e.newValue) as T;
          valueRef.current = parsed;
          setValue(parsed);
        } catch {
          /* ignore malformed */
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [prefixedKey]);

  return [value, set];
}

/* ------------------------------------------------------------------ */
/*  window.spark shim                                                  */
/* ------------------------------------------------------------------ */
interface SparkKV {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<void>;
}

interface SparkShim {
  kv: SparkKV;
  user: () => Promise<{ login: string; avatarUrl: string }>;
  llm: (prompt: string) => Promise<string>;
}

const sparkShim: SparkShim = {
  kv: {
    async get(key: string) {
      try {
        const raw = localStorage.getItem(`${KV_PREFIX}${key}`);
        return raw !== null ? JSON.parse(raw) : undefined;
      } catch {
        return undefined;
      }
    },
    async set(key: string, value: unknown) {
      try {
        localStorage.setItem(`${KV_PREFIX}${key}`, JSON.stringify(value));
      } catch {
        /* quota exceeded */
      }
    },
  },
  async user() {
    return { login: "local-user", avatarUrl: "" };
  },
  async llm(_prompt: string) {
    return "LLM unavailable in standalone mode.";
  },
};

(window as unknown as Record<string, unknown>).spark = sparkShim;

export default sparkShim;
