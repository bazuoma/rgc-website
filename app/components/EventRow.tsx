"use client";
import { useState } from 'react';
import { Theme } from './theme';
import { ArrowRight } from './Icons';
import { RgcEvent } from '../data/events';
import { useIsMobile } from '../hooks/useIsMobile';

const MONTHS_ARR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_ARR = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function MiniMap({ theme, venue, address, city, seed = 0 }: {
  theme: Theme;
  venue: string;
  address: string;
  city: string;
  seed?: number;
}) {
  const rng = (() => { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); })();
  const roads: { horiz: boolean; pos: number; thick: number }[] = [];
  for (let i = 0; i < 8; i++) {
    const horiz = rng() > 0.5;
    const pos = 10 + rng() * 140;
    const thick = rng() > 0.75 ? 3 : 1.4;
    roads.push({ horiz, pos, thick });
  }
  const query = encodeURIComponent(`${venue}, ${address}, ${city}`);
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${query}`}
      target="_blank" rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        borderRadius: 10, overflow: 'hidden', position: 'relative',
        border: `1px solid ${theme.lineStrong}`,
        background: 'linear-gradient(180deg, rgba(37,99,235,0.08), rgba(13,6,0,0.4))',
        minHeight: 140,
      }}
    >
      <svg viewBox="0 0 160 140" width="100%" height="140" preserveAspectRatio="none" style={{ display: 'block' }}>
        <rect width="160" height="140" fill="rgba(246,239,228,0.03)" />
        <ellipse cx="30" cy="100" rx="22" ry="14" fill="rgba(59,130,246,0.08)" />
        <ellipse cx="125" cy="28" rx="28" ry="16" fill="rgba(59,130,246,0.08)" />
        <path d="M0 118 Q 40 110 80 118 T 160 116 L 160 140 L 0 140 Z" fill="rgba(59,130,246,0.14)" />
        {roads.map((r, i) => (
          r.horiz
            ? <line key={i} x1="0" x2="160" y1={r.pos} y2={r.pos} stroke="rgba(246,239,228,0.18)" strokeWidth={r.thick} />
            : <line key={i} x1={r.pos} x2={r.pos} y1="0" y2="140" stroke="rgba(246,239,228,0.18)" strokeWidth={r.thick} />
        ))}
        <g transform="translate(80 70)">
          <circle r="14" fill="rgba(245,158,11,0.18)" />
          <circle r="8" fill={theme.orange} stroke="#0d0600" strokeWidth="1.5" />
          <circle r="2.5" fill="#0d0600" />
        </g>
      </svg>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 14px',
        background: 'linear-gradient(180deg, transparent, rgba(13,6,0,0.85))',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13, color: theme.ink, lineHeight: 1.2 }}>
            {address}
          </div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, color: theme.inkDim, marginTop: 2 }}>
            {city}
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 10px', borderRadius: 999,
          background: 'rgba(246,239,228,0.08)',
          border: `1px solid ${theme.lineStrong}`,
          fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, color: theme.ink,
          letterSpacing: '0.04em', whiteSpace: 'nowrap',
        }}>
          Open in Maps <ArrowRight size={11} color={theme.ink} />
        </div>
      </div>
    </a>
  );
}

export default function EventRow({ event, theme, idx = 0 }: {
  event: RgcEvent;
  theme: Theme;
  idx?: number;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const h = event.date.getHours();
  const m = event.date.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  const hh = ((h + 11) % 12) + 1;
  const timeStr = m === 0 ? `${hh}${ampm}` : `${hh}:${String(m).padStart(2, '0')}${ampm}`;

  return (
    <div style={{
      borderTop: idx === 0 ? `1px solid ${theme.line}` : 'none',
      borderBottom: `1px solid ${theme.line}`,
      position: 'relative',
    }}>
      {isMobile ? (
        /* ── Mobile collapsed row ── */
        <div
          onClick={() => setOpen((o) => !o)}
          style={{ padding: '18px 20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {/* Date */}
          <div style={{ fontFamily: 'Nunito, sans-serif' }}>
            <div style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: theme.orange, marginBottom: 2,
            }}>
              {DAYS_ARR[event.date.getDay()]}
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: theme.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {event.date.getDate()}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkDim, marginTop: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {MONTHS_ARR[event.date.getMonth()]} · {timeStr}
            </div>
          </div>

          {/* Venue */}
          <h3 style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 20, color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            {event.venue}
          </h3>

          {/* Address */}
          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: theme.inkDim, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1c2 0 3.5 1.5 3.5 3.5 0 2.5-3.5 6-3.5 6s-3.5-3.5-3.5-6C2.5 2.5 4 1 6 1z"/>
              <circle cx="6" cy="4.5" r="1.2"/>
            </svg>
            {event.address}, {event.city}
          </div>

          {/* Partiful RSVP button — mobile */}
          {event.partifulUrl && (
            <a
              href={event.partifulUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                alignSelf: 'flex-start',
                background: theme.orange, color: '#0d0600',
                borderRadius: 999, padding: '10px 20px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13,
                letterSpacing: '0.02em', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 7,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              I&apos;m in <ArrowRight size={13} color="#0d0600" w={2.4} />
            </a>
          )}
        </div>
      ) : (
        /* ── Desktop collapsed row ── */
        <div
          onClick={() => setOpen((o) => !o)}
          style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 28, padding: '24px 28px', alignItems: 'center', cursor: 'pointer' }}
        >
          {/* Date stamp */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Nunito, sans-serif' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.orange, marginBottom: 4 }}>
              {DAYS_ARR[event.date.getDay()]}
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: theme.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {event.date.getDate()}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: theme.inkDim, marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {MONTHS_ARR[event.date.getMonth()]} · {timeStr}
            </div>
          </div>

          {/* Venue + address */}
          <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 24, color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  {event.venue}
                </h3>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: theme.inkDim, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1c2 0 3.5 1.5 3.5 3.5 0 2.5-3.5 6-3.5 6s-3.5-3.5-3.5-6C2.5 2.5 4 1 6 1z"/><circle cx="6" cy="4.5" r="1.2"/></svg>
                  {event.address}, {event.city}
                </span>
              </div>
            </div>
            {event.partifulUrl && (
              <a
                href={event.partifulUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  flexShrink: 0,
                  background: theme.orange, color: '#0d0600',
                  border: 'none', borderRadius: 999, padding: '10px 20px',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13,
                  letterSpacing: '0.02em', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                I&apos;m in <ArrowRight size={13} color="#0d0600" w={2.4} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Expandable map + host note */}
      {open && (
        isMobile ? (
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 10, border: `1px solid ${theme.line}`, background: 'rgba(246,239,228,0.02)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Where</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: theme.ink }}>{event.venue}</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: theme.inkDim, lineHeight: 1.45 }}>{event.address}<br />{event.city}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999, background: theme.blue, color: '#fff', textDecoration: 'none', fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800 }}>Directions <ArrowRight size={12} color="#fff" /></a>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}&travelmode=transit`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999, background: 'transparent', color: theme.ink, textDecoration: 'none', border: `1px solid ${theme.lineStrong}`, fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700 }}>Transit</a>
              </div>
            </div>
            <MiniMap theme={theme} venue={event.venue} address={event.address} city={event.city} seed={(event.id?.length ?? 0) + (event.address?.length ?? 0)} />
            <div style={{ padding: 16, borderRadius: 10, border: `1px solid ${theme.line}`, background: 'rgba(246,239,228,0.02)', fontFamily: 'Nunito, sans-serif' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Note from the host</div>
              <div style={{ fontSize: 13, color: theme.inkDim, marginTop: 8, lineHeight: 1.5 }}>{event.note}</div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 28px 28px', display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 28 }}>
            <div />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'stretch' }}>
              <div style={{ padding: 16, borderRadius: 10, border: `1px solid ${theme.line}`, background: 'rgba(246,239,228,0.02)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Where</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: theme.ink }}>{event.venue}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: theme.inkDim, lineHeight: 1.45 }}>{event.address}<br />{event.city}</div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999, background: theme.blue, color: '#fff', textDecoration: 'none', fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800 }}>Directions <ArrowRight size={12} color="#fff" /></a>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}&travelmode=transit`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999, background: 'transparent', color: theme.ink, textDecoration: 'none', border: `1px solid ${theme.lineStrong}`, fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700 }}>Transit</a>
                </div>
              </div>
              <MiniMap theme={theme} venue={event.venue} address={event.address} city={event.city} seed={(event.id?.length ?? 0) + (event.address?.length ?? 0)} />
            </div>
            <div style={{ padding: 16, borderRadius: 10, border: `1px solid ${theme.line}`, background: 'rgba(246,239,228,0.02)', minWidth: 220, maxWidth: 260, fontFamily: 'Nunito, sans-serif' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Note from the host</div>
              <div style={{ fontSize: 13, color: theme.inkDim, marginTop: 8, lineHeight: 1.5 }}>{event.note}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
