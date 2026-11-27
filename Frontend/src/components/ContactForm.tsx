"use client";

import { useState, type FormEvent } from "react";
import { AlertIcon, ArrowIcon, CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { useInView } from "./hooks";

type Fields = "name" | "email" | "message";

const RULES: Record<Fields, (v: string) => true | string> = {
  name: (v) => v.trim().length >= 2 || "Please enter your name (at least 2 characters).",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
  message: (v) => v.trim().length >= 10 || "Your message should be at least 10 characters.",
};

export function ContactForm() {
  const [formRef, seen] = useInView<HTMLFormElement>();
  const [values, setValues] = useState<Record<Fields, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const check = (f: Fields, v = values[f]) => {
    const res = RULES[f](v);
    setErrors((e) => ({ ...e, [f]: res === true ? undefined : res }));
    return res === true;
  };
  const onChange = (f: Fields, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (errors[f]) check(f, v);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
    if (honeypot) return;

    const valid = (Object.keys(RULES) as Fields[]).map((f) => check(f)).every(Boolean);
    if (!valid) {
      setStatus({ kind: "err", msg: "Please fix the highlighted fields and try again." });
      formRef.current?.querySelector<HTMLElement>(".invalid input, .invalid textarea")?.focus();
      return;
    }

    const data = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      setStatus({ kind: "ok", msg: `Thanks ${data.name.split(" ")[0]}! Your message was sent — I'll reply within 24–48 hours.` });
      setValues({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      const reason = err instanceof Error && err.message !== "Request failed" ? err.message + " " : "";
      setStatus({ kind: "err", msg: `${reason}Something went wrong sending your message. Please email me directly at ${SITE.email}.` });
    } finally {
      setLoading(false);
    }
  };

  const field = (f: Fields, label: string, id: string, input: "text" | "email" | "area", extra: Record<string, string> = {}) => (
    <div className={cn("field", errors[f] && "invalid")}>
      <label htmlFor={id}>{label}</label>
      {input === "area" ? (
        <textarea id={id} name={f} rows={5} required value={values[f]} aria-invalid={!!errors[f]} onChange={(e) => onChange(f, e.target.value)} onBlur={() => values[f] && check(f)} />
      ) : (
        <input id={id} name={f} type={input} required value={values[f]} aria-invalid={!!errors[f]} onChange={(e) => onChange(f, e.target.value)} onBlur={() => values[f] && check(f)} {...extra} />
      )}
      <span className="error" role="alert">{errors[f]}</span>
    </div>
  );

  return (
    <form ref={formRef} className={cn("form card reveal", seen && "in")} data-delay={1} id="contact-form" noValidate onSubmit={submit}>
        {field("name", "Name", "f-name", "text", { autoComplete: "name" })}
        {field("email", "Email", "f-email", "email", { autoComplete: "email", inputMode: "email" })}
        {field("message", "Message", "f-msg", "area")}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
        <div className={cn("alert alert-ok", status?.kind === "ok" && "show")} role="status" aria-live="polite">
          <CheckIcon />
          <span className="msg">{status?.kind === "ok" ? status.msg : ""}</span>
        </div>
        <div className={cn("alert alert-err", status?.kind === "err" && "show")} role="alert">
          <AlertIcon />
          <span className="msg">{status?.kind === "err" ? status.msg : ""}</span>
        </div>
        <button className={cn("btn btn-primary", loading && "loading")} type="submit" disabled={loading}>
          <span className="spinner" />
          Send message{" "}
          <span className="btn-arrow" style={{ display: "inline-flex" }}>
            <ArrowIcon />
          </span>
        </button>
    </form>
  );
}
