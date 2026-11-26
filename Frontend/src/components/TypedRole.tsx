"use client";

import { useEffect, useState } from "react";
import { reducedMotion } from "@/lib/cn";

/** Typewriter that cycles through `words`. */
export function TypedRole({ words }: { words: string[] }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (reducedMotion()) {
      const id = setTimeout(() => setText(words[0]), 0);
      return () => clearTimeout(id);
    }
    let w = 0, i = 0, del = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let d = del ? 35 : 70;
      if (!del && i === word.length) { del = true; d = 1700; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 70);
    return () => clearTimeout(id);
  }, [words]);

  return <span className="typed">{text}</span>;
}
