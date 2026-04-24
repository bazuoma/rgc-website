import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Real Gamers Club – Where Real Gamers Unite';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: '#0b0f1e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 96px',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Blue gradient top-left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 600,
          height: 400,
          background:
            'radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.18), transparent 70%)',
          display: 'flex',
        }}
      />
      {/* Orange gradient bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 600,
          height: 400,
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(245,158,11,0.15), transparent 70%)',
          display: 'flex',
        }}
      />

      {/* Logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            background: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B' }}>RGC</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#f6efe4',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Real Gamers Club
          </span>
          <span
            style={{
              fontSize: 14,
              color: 'rgba(246,239,228,0.4)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            EST. 2025 · IRL ONLY
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 16,
            fontWeight: 800,
            color: '#F59E0B',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: '#F59E0B',
              display: 'flex',
            }}
          />
          In-person game nights · Los Angeles
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#f6efe4',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            display: 'flex',
          }}
        >
          Where{' '}
          <span style={{ color: '#F59E0B', fontStyle: 'italic', margin: '0 16px' }}>real</span>{' '}
          gamers unite.
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            background: 'rgba(245,158,11,0.12)',
            border: '1.5px solid rgba(245,158,11,0.4)',
            borderRadius: 999,
            padding: '10px 22px',
            fontSize: 18,
            fontWeight: 800,
            color: '#F59E0B',
            display: 'flex',
          }}
        >
          realgamers.club
        </div>
        <div
          style={{
            background: '#F59E0B',
            borderRadius: 999,
            padding: '10px 24px',
            fontSize: 16,
            fontWeight: 900,
            color: '#0b0f1e',
            display: 'flex',
          }}
        >
          Join the club →
        </div>
      </div>
    </div>,
    { ...size }
  );
}
