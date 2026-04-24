"use client";

import { useId } from "react";

interface RGCLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function RGCLogo({ size = 48, showText = true, className = "" }: RGCLogoProps) {
  const uid = useId().replace(/:/g, "");
  const topId = `t${uid}`;
  const botId = `b${uid}`;
  const hexClipId = `hc${uid}`;

  // Pre-compute flat-top hexagon points around a center
  const hexPoints = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (i * 60 * Math.PI) / 180;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top arc: large CW arc from left→right via top of circle r=82 */}
          <path id={topId} d="M 18,100 A 82,82 0 1,1 182,100" />
          {/* Bottom arc: small CCW arc from left→right via bottom of circle r=80 */}
          <path id={botId} d="M 20,100 A 80,80 0 0,0 180,100" />
          {/* Clip hex pattern to inner circle */}
          <clipPath id={hexClipId}>
            <circle cx="100" cy="100" r="67" />
          </clipPath>
        </defs>

        {/* ── Main blue background (outer ring removed — starts here) ── */}
        <circle cx="100" cy="100" r="92" fill="#2563EB" />
        {/* Subtle inner highlight ring */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.45" />

        {/* ── Orange accent ring ── */}
        <circle cx="100" cy="100" r="76" fill="none" stroke="#F59E0B" strokeWidth="7" />

        {/* ── Inner dark-blue content circle ── */}
        <circle cx="100" cy="100" r="68" fill="#1D4ED8" />

        {/* ── Hexagon grid pattern ── */}
        <g clipPath={`url(#${hexClipId})`} opacity="0.22">
          {([
            [100, 54], [122, 54], [78, 54],
            [111, 73], [89, 73], [133, 73], [67, 73],
            [100, 92], [122, 92], [78, 92], [144, 92], [56, 92],
            [111, 111], [89, 111], [133, 111], [67, 111],
            [100, 130], [122, 130], [78, 130],
            [111, 149], [89, 149],
          ] as [number, number][]).map(([cx, cy], i) => (
            <polygon key={i} points={hexPoints(cx, cy, 11)} fill="none" stroke="white" strokeWidth="1" />
          ))}
        </g>

        {/* ── Playing cards — right side, fanned ── */}
        {([16, 8, 0, -9] as number[]).map((angle, i) => (
          <rect
            key={i}
            x="112" y="63"
            width="28" height="38"
            rx="3"
            fill="white"
            stroke="#d1d5db"
            strokeWidth="0.5"
            transform={`rotate(${angle},126,82)`}
          />
        ))}
        {/* Suit symbols on front card (angle -9°) */}
        <g transform="rotate(-9,126,82)">
          <text x="115" y="73"  fontSize="9" fill="#111827" fontFamily="serif" fontWeight="bold">♠</text>
          <text x="128" y="97"  fontSize="9" fill="#dc2626" fontFamily="serif" fontWeight="bold">♥</text>
          <text x="115" y="97"  fontSize="9" fill="#111827" fontFamily="serif" fontWeight="bold">♣</text>
          <text x="126" y="73"  fontSize="6" fill="#dc2626" fontFamily="serif">♦</text>
        </g>

        {/* ── Dice — left side, 3-D isometric look ── */}
        <g transform="rotate(-13,70,98)">
          {/* Front face */}
          <rect x="52" y="83" width="32" height="32" rx="5" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
          {/* Top face */}
          <polygon points="52,83 61,74 93,74 84,83" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Right face */}
          <polygon points="84,83 93,74 93,106 84,115" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* 5 dots on front */}
          <circle cx="61" cy="91"  r="2.8" fill="white" />
          <circle cx="75" cy="91"  r="2.8" fill="white" />
          <circle cx="68" cy="99"  r="2.8" fill="white" />
          <circle cx="61" cy="107" r="2.8" fill="white" />
          <circle cx="75" cy="107" r="2.8" fill="white" />
          {/* 1 dot on top */}
          <circle cx="77" cy="79"  r="2.2" fill="white" opacity="0.85" />
        </g>

        {/* ── Meeple — center, now blue (same blue as removed outer ring: #1565C0) ── */}
        {/* Head */}
        <circle cx="100" cy="69" r="14" fill="#1565C0" stroke="#0D3B8E" strokeWidth="2" />
        {/* Body: shoulders → arms → waist → legs */}
        <path
          d="
            M 91,83
            L 73,91
            Q 66,97 70,103
            L 81,103
            L 79,112
            L 76,134
            L 91,134
            L 93,118
            Q 96,115 100,115
            Q 104,115 107,118
            L 109,134
            L 124,134
            L 121,112
            L 119,103
            L 130,103
            Q 134,97 127,91
            L 109,83
            Z
          "
          fill="#1565C0"
          stroke="#0D3B8E"
          strokeWidth="2"
        />

        {/* ── Orange accent dashes at base of orange ring ── */}
        <path d="M 36,136 A 76,76 0 0,0 50,155" fill="none" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
        <path d="M 164,136 A 76,76 0 0,1 150,155" fill="none" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />

        {/* ── Stars ── */}
        <text x="68"  y="167" fontSize="13" fill="white" textAnchor="middle" dominantBaseline="middle">★</text>
        <text x="132" y="167" fontSize="13" fill="white" textAnchor="middle" dominantBaseline="middle">★</text>

        {/* ── Small hex corner decorations ── */}
        {([
          [48, 170], [58, 176],
          [152, 170], [142, 176],
        ] as [number, number][]).map(([cx, cy], i) => (
          <polygon key={i} points={hexPoints(cx, cy, 6)} fill="none" stroke="white" strokeWidth="1" opacity="0.35" />
        ))}

        {/* ── Arc text: REAL GAMERS (top) ── */}
        <text
          fill="white"
          fontSize="18"
          fontWeight="900"
          fontFamily="'Arial Black', 'Arial Bold', Arial, sans-serif"
          letterSpacing="2"
        >
          <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
            REAL GAMERS
          </textPath>
        </text>

        {/* ── Arc text: CLUB (bottom) ── */}
        <text
          fill="white"
          fontSize="19"
          fontWeight="900"
          fontFamily="'Arial Black', 'Arial Bold', Arial, sans-serif"
          letterSpacing="6"
        >
          <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
            CLUB
          </textPath>
        </text>
      </svg>

      {showText && (
        <div>
          <div
            className="font-black text-xl leading-none gradient-text"
            style={{ letterSpacing: "0.08em", fontFamily: "'Nunito', sans-serif" }}
          >
            REAL GAMERS
          </div>
          <div
            className="font-extrabold text-xs leading-none"
            style={{ color: "#f59e0b", letterSpacing: "0.35em", fontFamily: "'Nunito', sans-serif" }}
          >
            CLUB
          </div>
        </div>
      )}
    </div>
  );
}
