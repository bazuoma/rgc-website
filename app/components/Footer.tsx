"use client";

import { useRouter } from 'next/navigation';
import RgcLogo from "./RgcLogo";
import { theme } from "./theme";

export default function Footer() {
  const router = useRouter();
  const linkStyle: React.CSSProperties = {
    color: theme.inkDim, textDecoration: 'none', cursor: 'pointer',
    fontFamily: 'Nunito, sans-serif', fontWeight: 600,
    transition: 'color .15s',
  };
  const iconStyle: React.CSSProperties = {
    width: 34, height: 34, borderRadius: 999,
    border: `1px solid ${theme.lineStrong}`,
    display: 'grid', placeItems: 'center',
    color: theme.inkDim, textDecoration: 'none',
    transition: 'color .15s, border-color .15s, background .15s',
    background: 'rgba(246,239,228,0.02)',
  };

  return (
    <footer style={{
      padding: '56px 40px 40px',
      borderTop: `1px solid ${theme.line}`,
      marginTop: 80,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 40, flexWrap: 'wrap',
      color: theme.inkDim, fontFamily: 'Nunito, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <RgcLogo size={32} primary={theme.blueDeep} ring={theme.orange} showText={false} />
        <div>
          <div style={{
            fontWeight: 900, fontSize: 14, color: theme.ink,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Real Gamers Club</div>
          <div style={{ fontSize: 12, marginTop: 2 }}>realgamers.club · where real gamers unite</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <a
          href="https://instagram.com/realgamers.club"
          target="_blank" rel="noreferrer"
          aria-label="Instagram @realgamers.club"
          title="@realgamers.club on Instagram"
          style={iconStyle}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </a>
        <a
          href="https://tiktok.com/@realgamers.club"
          target="_blank" rel="noreferrer"
          aria-label="TikTok @realgamers.club"
          title="@realgamers.club on TikTok"
          style={iconStyle}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 7.8a6.3 6.3 0 0 1-3.7-1.2v7.1a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V3h2.6a3.7 3.7 0 0 0 3.8 3.2z" />
          </svg>
        </a>
        <span style={{ fontSize: 12, color: theme.inkFaint, fontFamily: 'Nunito, sans-serif' }}>@realgamers.club</span>
      </div>
      <div style={{ display: 'flex', gap: 28, fontSize: 13 }}>
        <span style={{ ...linkStyle, cursor: 'pointer' }} onClick={() => router.push('/conduct')}>Code of conduct</span>
        <span style={{ ...linkStyle, cursor: 'pointer' }} onClick={() => router.push('/contact')}>Contact</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.inkFaint }}>
        © 2026 · No bots. No logins. Just people.
      </div>
    </footer>
  );
}
