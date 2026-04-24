"use client";
import { useId } from "react";

interface RgcLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  primary?: string;
  ring?: string;
}

export default function RgcLogo({ size = 40, showText = true, className = "", primary = '#2563EB', ring = '#F59E0B' }: RgcLogoProps) {
  const uid = useId().replace(/:/g, '');
  const clipId = `rgc-clip-${uid}`;
  const orangeDark = '#D97706';

  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0, display: 'block' }}>
        <defs>
          <clipPath id={clipId}>
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>
        {/* Orange ring */}
        <circle cx="50" cy="50" r="49" fill={ring} />
        {/* Blue disc inside the ring */}
        <circle cx="50" cy="50" r="44" fill={primary} />
        <g clipPath={`url(#${clipId})`}>
          {/* Hex pattern */}
          <g fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6">
            <polygon points="50,22 60,28 60,40 50,46 40,40 40,28" />
            <polygon points="38,44 48,50 48,62 38,68 28,62 28,50" />
            <polygon points="62,44 72,50 72,62 62,68 52,62 52,50" />
            <polygon points="50,66 60,72 60,84 50,90 40,84 40,72" />
          </g>
          {/* Dice on the left */}
          <g transform="translate(20 46) rotate(-14)">
            <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#60A5FA" stroke={orangeDark} strokeWidth="1.2" />
            <circle cx="-4" cy="-4" r="1.2" fill="#fff" />
            <circle cx="4" cy="-4" r="1.2" fill="#fff" />
            <circle cx="0" cy="0" r="1.2" fill="#fff" />
            <circle cx="-4" cy="4" r="1.2" fill="#fff" />
            <circle cx="4" cy="4" r="1.2" fill="#fff" />
          </g>
          {/* Cards on the right */}
          <g transform="translate(76 48)">
            <g transform="rotate(12)">
              <rect x="-7" y="-10" width="14" height="20" rx="2" fill="#fff" stroke={orangeDark} strokeWidth="1" />
              <text x="0" y="2" fontFamily="serif" fontSize="10" fontWeight="700" textAnchor="middle" fill="#111">&#9827;</text>
            </g>
            <g transform="translate(-4 -1) rotate(-8)">
              <rect x="-7" y="-10" width="14" height="20" rx="2" fill="#fff" stroke={orangeDark} strokeWidth="1" />
              <text x="0" y="2" fontFamily="serif" fontSize="10" fontWeight="700" textAnchor="middle" fill="#DC2626">&#9829;</text>
            </g>
          </g>
          {/* Meeple - center, orange */}
          <g transform="translate(50 54)">
            <path
              d="M 0 -20 C -6 -20 -9 -15 -9 -11 C -9 -8.5 -8 -7 -7 -6 C -10 -5.5 -13 -4 -16 -2 C -20 0.5 -22 3.5 -22 6.5 C -22 8.5 -21 10 -18.5 10 L -11 10 L -11 22 C -11 24 -9.5 25 -7.5 25 L 7.5 25 C 9.5 25 11 24 11 22 L 11 10 L 18.5 10 C 21 10 22 8.5 22 6.5 C 22 3.5 20 0.5 16 -2 C 13 -4 10 -5.5 7 -6 C 8 -7 9 -8.5 9 -11 C 9 -15 6 -20 0 -20 Z"
              fill={ring}
              stroke={orangeDark}
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
      {showText && (
        <div style={{ textAlign: 'left', lineHeight: 1 }}>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f6efe4' }}>
            Real Gamers Club
          </div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, color: 'rgba(246,239,228,0.36)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>
            EST. 2025 · IRL ONLY
          </div>
        </div>
      )}
    </div>
  );
}
