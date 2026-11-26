"use client";

import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "./hooks";

type Props = {
  as?: ElementType;
  className?: string;
  /** Base class applied before reveal; pass `false` to only toggle `in`. */
  base?: string | false;
  delay?: 0 | 1 | 2 | 3;
  children?: ReactNode;
} & Record<string, unknown>;

/** Scroll-reveal wrapper: adds `.in` once the element enters the viewport. */
export function InView({ as: Tag = "div", className, base = "reveal", delay, children, ...rest }: Props) {
  const [ref, seen] = useInView<HTMLElement>();
  const T = Tag as ElementType;
  return (
    <T ref={ref} className={cn(base, className, seen && "in")} data-delay={delay} {...rest}>
      {children}
    </T>
  );
}

/** Scroll-reveal internal link (renders next/link on the client side). */
export function InViewLink({ href, className, base = "reveal", delay, children }: { href: string; className?: string; base?: string | false; delay?: 0 | 1 | 2 | 3; children?: ReactNode }) {
  const [ref, seen] = useInView<HTMLAnchorElement>();
  return (
    <Link ref={ref} href={href} className={cn(base, className, seen && "in")} data-delay={delay}>
      {children}
    </Link>
  );
}
