"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RgcLogo from "./RgcLogo";
import { theme } from "./theme";
import { ArrowRight } from "./Icons";

const items = [
  { id: 'landing', label: 'Home', href: '/' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'signup', label: 'Join', href: '/signup' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 40px',
      borderBottom: `1px solid ${theme.line}`,
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
      background: `${theme.bg}cc`,
      backdropFilter: 'blur(12px)',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <RgcLogo size={36} primary={theme.blueDeep} ring={theme.orange} />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.id}
              href={it.href}
              style={{
                background: 'transparent',
                color: active ? theme.ink : theme.inkDim,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: active ? 800 : 600,
                fontSize: 14,
                padding: '10px 14px',
                letterSpacing: '0.02em',
                position: 'relative',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {it.label}
              {active && (
                <span style={{
                  position: 'absolute', left: 14, right: 14, bottom: 4, height: 2,
                  background: theme.orange, borderRadius: 2,
                }} />
              )}
            </Link>
          );
        })}
        <Link
          href="/signup"
          style={{
            marginLeft: 10,
            background: theme.orange, color: '#0d0600',
            border: 'none', borderRadius: 999, padding: '10px 18px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13,
            letterSpacing: '0.02em',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            textDecoration: 'none',
          }}
        >
          Join the club <ArrowRight size={14} color="#0d0600" w={2.4} />
        </Link>
      </div>
    </nav>
  );
}
