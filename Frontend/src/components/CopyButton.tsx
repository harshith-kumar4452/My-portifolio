"use client";

import { useToast } from "./Providers";

export function CopyButton({ value }: { value: string }) {
  const toast = useToast();
  return (
    <button
      className="copy-btn"
      type="button"
      data-copy={value}
      aria-label="Copy email address"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          toast("Copied to clipboard ✓");
        } catch {
          toast("Couldn't copy — please copy it manually");
        }
      }}
    >
      Copy
    </button>
  );
}
