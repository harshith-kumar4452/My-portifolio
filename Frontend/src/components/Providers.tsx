"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** `ready` flips to true once the intro loader has finished, so reveal animations play after it. */
const ReadyCtx = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({ ready: false, setReady: () => {} });
export const useReady = () => useContext(ReadyCtx);

const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const toast = useCallback((m: string) => {
    setMsg(m);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2400);
  }, []);

  return (
    <ReadyCtx.Provider value={{ ready, setReady }}>
      <ToastCtx.Provider value={toast}>
        {children}
        <div className={cn("toast", show && "show")} role="status" aria-live="polite">
          {msg}
        </div>
      </ToastCtx.Provider>
    </ReadyCtx.Provider>
  );
}
