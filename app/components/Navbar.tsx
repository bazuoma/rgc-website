"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RGCLogo from "./RGCLogo";

const navLinks = [
  { href: "/",       label: "Home" },
  { href: "/events", label: "Events" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(10,10,15,0.92)",
        borderColor: "#1e1e35",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <RGCLogo size={38} />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg font-sans font-bold text-sm transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: active ? "#2563eb18" : "transparent",
                  border:          active ? "1px solid #2563eb" : "1px solid transparent",
                  color:           active ? "#fff" : "#94a3b8",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ffffff08";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/signup"
          className="btn-primary text-white font-sans font-extrabold text-sm px-5 py-2 rounded-lg"
        >
          Join the Club
        </Link>
      </div>
    </nav>
  );
}
