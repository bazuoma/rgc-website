"use client";

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import RgcLogo from "./RgcLogo";
import { theme } from "./theme";
import { ArrowRight } from "./Icons";
import { useIsMobile } from "../hooks/useIsMobile";

const items = [
  { id: 'landing', label: 'Home', href: '/' },
  { id: 'events', label: 'Events', href: '/events' },
  { id: 'signup', label: 'Join', href: '/signup' },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={theme.ink} strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <line x1="5" y1="5" x2="17" y2="17" />
          <line x1="17" y1="5" x2="5" y2="17" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="19" y2="7" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="15" x2="19" y2="15" />
        </>
      )}
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '16px 20px' : '22px 40px',
        borderBottom: `1px solid ${theme.line}`,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
        background: `${theme.bg}cc`,
        backdropFilter: 'blur(12px)',
        minHeight: isMobile ? 68 : 80,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <RgcLogo size={36} primary={theme.blueDeep} ring={theme.orange} />
        </Link>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        ) : (
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
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 19,
          background: `${theme.bg}f0`,
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.line}`,
          padding: '8px 0 16px',
        }}>
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.id}
                href={it.href}
                onClick={closeMenu}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: active ? 800 : 600,
                  fontSize: 18,
                  color: active ? theme.ink : theme.inkDim,
                  textDecoration: 'none',
                  borderLeft: active ? `3px solid ${theme.orange}` : '3px solid transparent',
                  letterSpacing: '0.01em',
                }}
              >
                {it.label}
              </Link>
            );
          })}
          <div style={{ padding: '12px 24px 0' }}>
            <Link
              href="/signup"
              onClick={closeMenu}
              style={{
                display: 'block', textAlign: 'center',
                background: theme.orange, color: '#0d0600',
                border: 'none', borderRadius: 999, padding: '14px 20px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15,
                letterSpacing: '0.02em', textDecoration: 'none',
              }}
            >
              Join the club
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
