import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Harshith Kumar — home">
      <span className="logo-mark">HK</span>
      <span className="logo-text">Harshith Kumar</span>
    </Link>
  );
}
