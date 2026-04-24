"use client";
import { useState, useEffect, useRef } from 'react';
import { Theme } from './theme';
import GameBadge from './GameBadge';
import { ArrowRight, CheckIcon, MailIcon } from './Icons';
import { RgcEvent } from '../data/events';
import { useIsMobile } from '../hooks/useIsMobile';

const MONTHS_ARR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_ARR = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function RsvpButton({ event, state, onToggle, theme, compact = false }: {
  event: RgcEvent;
  state: 'going' | undefined;
  onToggle: (id: string) => void;
  theme: Theme;
  compact?: boolean;
}) {
  const going = state === 'going';
  const full = event.rsvp >= event.capacity && !going;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [justConfirmed, setJustConfirmed] = useState<{ email: string } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canSubmit = form.name.trim().length > 0 && validEmail;

  useEffect(() => {
    if (!open && !justConfirmed) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      const inPop = popRef.current && popRef.current.contains(target);
      const inConfirm = confirmRef.current && confirmRef.current.contains(target);
      const inBtn = btnRef.current && btnRef.current.contains(target);
      if (!inPop && !inConfirm && !inBtn) {
        setOpen(false);
        setJustConfirmed(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setJustConfirmed(null); }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open, justConfirmed]);

  // Auto-dismiss the confirmation callout after 8s.
  useEffect(() => {
    if (!justConfirmed) return;
    const t = setTimeout(() => setJustConfirmed(null), 8000);
    return () => clearTimeout(t);
  }, [justConfirmed]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (full) return;
    if (going) { onToggle(event.id); setJustConfirmed(null); return; }
    setOpen((o) => !o);
  };

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!canSubmit) return;
    onToggle(event.id);
    setOpen(false);
    setJustConfirmed({ email: form.email });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={btnRef}
        onClick={handleClick}
        disabled={full}
        style={{
          background: going ? theme.orange : open ? 'rgba(246,239,228,0.08)' : 'transparent',
          color: going ? '#0d0600' : theme.ink,
          border: `1.5px solid ${going ? theme.orange : theme.lineStrong}`,
          borderRadius: 999,
          padding: compact ? '7px 14px' : '10px 18px',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: going ? 800 : 700,
          fontSize: compact ? 12 : 13,
          letterSpacing: '0.02em',
          cursor: full ? 'not-allowed' : 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 7,
          opacity: full ? 0.45 : 1,
          transition: 'background .18s, color .18s, border-color .18s, transform .12s',
          whiteSpace: 'nowrap',
        }}
      >
        {going ? (<><CheckIcon size={13} color="#0d0600" /> You&apos;re in</>)
          : full ? (<>Full</>)
          : (<>I&apos;m in <ArrowRight size={13} color={theme.ink} w={2.4} /></>)}
      </button>
      {open && !going && !full && (
        <form
          ref={popRef}
          onSubmit={confirm}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 'calc(100% + 10px)',
            left: isMobile ? 0 : 'auto',
            right: isMobile ? 'auto' : 0,
            zIndex: 40,
            width: isMobile ? 'min(290px, calc(100vw - 40px))' : 300,
            padding: 18, borderRadius: 14,
            background: 'rgba(20,10,2,0.98)',
            border: `1px solid ${theme.lineStrong}`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            fontFamily: 'Nunito, sans-serif',
            textAlign: 'left',
          }}
        >
          <div style={{
            fontSize: 11, fontWeight: 800, color: theme.orange,
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4,
          }}>Saving your seat</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: theme.ink, marginBottom: 14 }}>
            {event.venue} · {MONTHS_ARR[event.date.getMonth()]} {event.date.getDate()}
          </div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Name</label>
          <input
            autoFocus
            type="text"
            placeholder="First & last"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(246,239,228,0.04)',
              border: `1.5px solid ${touched.name && !form.name.trim() ? '#ef4444' : theme.lineStrong}`,
              borderRadius: 8, padding: '10px 12px',
              fontFamily: 'Nunito, sans-serif', fontSize: 14,
              color: theme.ink, outline: 'none', marginBottom: 10,
            }}
          />
          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Email</label>
          <input
            type="email"
            placeholder="you@somewhere.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(246,239,228,0.04)',
              border: `1.5px solid ${touched.email && !validEmail ? '#ef4444' : theme.lineStrong}`,
              borderRadius: 8, padding: '10px 12px',
              fontFamily: 'Nunito, sans-serif', fontSize: 14,
              color: theme.ink, outline: 'none', marginBottom: 14,
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%', background: theme.orange, color: '#0d0600',
              border: 'none', borderRadius: 999, padding: '11px 16px',
              fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: canSubmit ? 1 : 0.5,
            }}
          >
            Lock it in <ArrowRight size={13} color="#0d0600" w={2.4} />
          </button>
          <div style={{ fontSize: 11, color: theme.inkFaint, textAlign: 'center', marginTop: 10, lineHeight: 1.4 }}>
            We&apos;ll send a confirmation link — click it to lock your seat.
          </div>
        </form>
      )}
      {justConfirmed && going && (
        <div
          ref={confirmRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 40,
            width: 320, padding: 16, borderRadius: 14,
            background: 'rgba(20,10,2,0.98)',
            border: `1px solid ${theme.orange}`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            fontFamily: 'Nunito, sans-serif',
            textAlign: 'left',
            animation: 'rgcConfirmIn .28s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              flexShrink: 0, width: 32, height: 32, borderRadius: 999,
              background: theme.orange, display: 'grid', placeItems: 'center',
            }}>
              <MailIcon size={15} color="#0d0600" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 10, fontWeight: 800, color: theme.orange,
                letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3,
              }}>Almost in</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: theme.ink, lineHeight: 1.3, marginBottom: 6 }}>
                Check your email to confirm.
              </div>
              <div style={{ fontSize: 12, color: theme.inkDim, lineHeight: 1.45 }}>
                We sent a link to <span style={{ color: theme.ink, fontWeight: 700, wordBreak: 'break-all' }}>{justConfirmed.email}</span>. Your seat isn&apos;t locked until you click it.
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setJustConfirmed(null); }}
                style={{
                  marginTop: 10, background: 'transparent', border: 'none',
                  color: theme.inkFaint, fontFamily: 'Nunito, sans-serif',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer', padding: 0,
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniMap({ theme, venue, address, city, seed = 0 }: {
  theme: Theme;
  venue: string;
  address: string;
  city: string;
  seed?: number;
}) {
  // Deterministic pseudo-random roads from a seed, so each venue looks different.
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
        {/* park blobs */}
        <ellipse cx="30" cy="100" rx="22" ry="14" fill="rgba(59,130,246,0.08)" />
        <ellipse cx="125" cy="28" rx="28" ry="16" fill="rgba(59,130,246,0.08)" />
        {/* water strip */}
        <path d="M0 118 Q 40 110 80 118 T 160 116 L 160 140 L 0 140 Z" fill="rgba(59,130,246,0.14)" />
        {/* roads */}
        {roads.map((r, i) => (
          r.horiz
            ? <line key={i} x1="0" x2="160" y1={r.pos} y2={r.pos} stroke="rgba(246,239,228,0.18)" strokeWidth={r.thick} />
            : <line key={i} x1={r.pos} x2={r.pos} y1="0" y2="140" stroke="rgba(246,239,228,0.18)" strokeWidth={r.thick} />
        ))}
        {/* pin */}
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

export default function EventRow({ event, rsvpState, onToggle, theme, idx = 0 }: {
  event: RgcEvent;
  rsvpState: 'going' | undefined;
  onToggle: (id: string) => void;
  theme: Theme;
  idx?: number;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const filled = Math.min(1, (event.rsvp + (rsvpState === 'going' ? 1 : 0)) / event.capacity);
  const spotsLeft = event.capacity - event.rsvp - (rsvpState === 'going' ? 1 : 0);
  const typeColor = event.type === 'Video games' ? theme.blue
    : event.type === 'Card games' ? theme.orange
    : theme.orange;

  const h = event.date.getHours();
  const m = event.date.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  const hh = ((h + 11) % 12) + 1;
  const timeStr = m === 0 ? `${hh}${ampm}` : `${hh}:${String(m).padStart(2, '0')}${ampm}`;

  return (
    <div
      style={{
        borderTop: idx === 0 ? `1px solid ${theme.line}` : 'none',
        borderBottom: `1px solid ${theme.line}`,
        background: rsvpState === 'going' ? 'rgba(245,158,11,0.05)' : 'transparent',
        transition: 'background .2s',
        position: 'relative',
      }}
    >
      {isMobile ? (
        /* ── Mobile collapsed row ── */
        <div
          onClick={() => setOpen((o) => !o)}
          style={{ padding: '18px 20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {/* Row 1: date info + RSVP button */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ fontFamily: 'Nunito, sans-serif' }}>
              <div style={{
                fontSize: 11, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: typeColor, marginBottom: 2,
              }}>
                {DAYS_ARR[event.date.getDay()]}
              </div>
              <div style={{
                fontSize: 34, fontWeight: 900, color: theme.ink, lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {event.date.getDate()}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: theme.inkDim, marginTop: 3,
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                {MONTHS_ARR[event.date.getMonth()]}
                {' · '}
                {timeStr}
              </div>
            </div>
            <RsvpButton event={event} state={rsvpState} onToggle={onToggle} theme={theme} />
          </div>

          {/* Row 2: venue name */}
          <h3 style={{
            margin: 0,
            fontFamily: 'Nunito, sans-serif', fontWeight: 900,
            fontSize: 20, color: theme.ink, letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}>
            {event.venue}
          </h3>

          {/* Row 3: address */}
          <div style={{
            fontFamily: 'Nunito, sans-serif', fontSize: 13,
            color: theme.inkDim, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1c2 0 3.5 1.5 3.5 3.5 0 2.5-3.5 6-3.5 6s-3.5-3.5-3.5-6C2.5 2.5 4 1 6 1z"/>
              <circle cx="6" cy="4.5" r="1.2"/>
            </svg>
            {event.address}, {event.city}
          </div>

          {/* Row 4: Playing label + game badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
              color: theme.inkFaint, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Playing</span>
            {event.games.map((g) => (
              <GameBadge key={g} name={g} theme={theme} size="sm" />
            ))}
          </div>

          {/* Row 5: spots bar + count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <div style={{
              position: 'relative', width: 72, height: 4, borderRadius: 2,
              background: theme.line, overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, width: `${filled * 100}%`,
                background: spotsLeft <= 3 ? theme.orange : theme.blue,
                transition: 'width .3s',
              }} />
            </div>
            <span style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 11, color: theme.inkDim,
              fontWeight: 700, fontVariantNumeric: 'tabular-nums',
            }}>
              {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
            </span>
          </div>
        </div>
      ) : (
        /* ── Desktop collapsed row ── */
        <div
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'grid',
            gridTemplateColumns: '110px 1fr auto',
            gap: 28,
            padding: '24px 28px',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {/* Date stamp */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            fontFamily: 'Nunito, sans-serif',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: typeColor, marginBottom: 4,
            }}>
              {DAYS_ARR[event.date.getDay()]}
            </div>
            <div style={{
              fontSize: 34, fontWeight: 900, color: theme.ink, lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              {event.date.getDate()}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700, color: theme.inkDim, marginTop: 4,
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              {MONTHS_ARR[event.date.getMonth()]}
              {' · '}
              {timeStr}
            </div>
          </div>

          {/* Main content: location-first, then games */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
              <h3 style={{
                margin: 0,
                fontFamily: 'Nunito, sans-serif', fontWeight: 900,
                fontSize: 24, color: theme.ink, letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}>
                {event.venue}
              </h3>
              <span style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 14,
                color: theme.inkDim, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1c2 0 3.5 1.5 3.5 3.5 0 2.5-3.5 6-3.5 6s-3.5-3.5-3.5-6C2.5 2.5 4 1 6 1z"/><circle cx="6" cy="4.5" r="1.2"/></svg>
                {event.address}, {event.city}
              </span>
            </div>
            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12,
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
                color: theme.inkFaint, letterSpacing: '0.12em', textTransform: 'uppercase',
                marginRight: 4,
              }}>Playing</span>
              {event.games.map((g) => (
                <GameBadge key={g} name={g} theme={theme} size="sm" />
              ))}
            </div>
          </div>

          {/* RSVP cluster */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <RsvpButton event={event} state={rsvpState} onToggle={onToggle} theme={theme} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'Nunito, sans-serif', fontSize: 11, color: theme.inkDim,
              letterSpacing: '0.02em',
            }}>
              <div style={{
                position: 'relative', width: 72, height: 4, borderRadius: 2,
                background: theme.line, overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, width: `${filled * 100}%`,
                  background: spotsLeft <= 3 ? theme.orange : theme.blue,
                  transition: 'width .3s',
                }} />
              </div>
              <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Expandable address + map preview */}
      {open && (
        isMobile ? (
          /* ── Mobile expanded section ── */
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Where card */}
            <div style={{
              padding: 16, borderRadius: 10,
              border: `1px solid ${theme.line}`,
              background: 'rgba(246,239,228,0.02)',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
                color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Where</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: theme.ink }}>
                {event.venue}
              </div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: theme.inkDim, lineHeight: 1.45 }}>
                {event.address}<br />
                {event.city}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}`}
                  target="_blank" rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 12px', borderRadius: 999,
                    background: theme.blue, color: '#fff', textDecoration: 'none',
                    fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
                  }}
                >Directions <ArrowRight size={12} color="#fff" /></a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}&travelmode=transit`}
                  target="_blank" rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 12px', borderRadius: 999,
                    background: 'transparent', color: theme.ink, textDecoration: 'none',
                    border: `1px solid ${theme.lineStrong}`,
                    fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700,
                  }}
                >Transit</a>
              </div>
            </div>
            {/* MiniMap */}
            <MiniMap
              theme={theme}
              venue={event.venue}
              address={event.address}
              city={event.city}
              seed={(event.id?.length ?? 0) + (event.address?.length ?? 0)}
            />
            {/* Note from host */}
            <div style={{
              padding: 16, borderRadius: 10,
              border: `1px solid ${theme.line}`,
              background: 'rgba(246,239,228,0.02)',
              fontFamily: 'Nunito, sans-serif',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: theme.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Note from the host</div>
              <div style={{ fontSize: 13, color: theme.inkDim, marginTop: 8, lineHeight: 1.5 }}>
                {event.note}
              </div>
            </div>
          </div>
        ) : (
          /* ── Desktop expanded section ── */
          <div style={{
            padding: '0 28px 28px',
            display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 28,
          }}>
            <div />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'stretch' }}>
              <div style={{
                padding: 16, borderRadius: 10,
                border: `1px solid ${theme.line}`,
                background: 'rgba(246,239,228,0.02)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
                  color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>Where</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: theme.ink }}>
                  {event.venue}
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: theme.inkDim, lineHeight: 1.45 }}>
                  {event.address}<br />
                  {event.city}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}`}
                    target="_blank" rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 12px', borderRadius: 999,
                      background: theme.blue, color: '#fff', textDecoration: 'none',
                      fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
                    }}
                  >Directions <ArrowRight size={12} color="#fff" /></a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue + ', ' + event.address + ', ' + event.city)}&travelmode=transit`}
                    target="_blank" rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 12px', borderRadius: 999,
                      background: 'transparent', color: theme.ink, textDecoration: 'none',
                      border: `1px solid ${theme.lineStrong}`,
                      fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700,
                    }}
                  >Transit</a>
                </div>
              </div>
              <MiniMap
                theme={theme}
                venue={event.venue}
                address={event.address}
                city={event.city}
                seed={(event.id?.length ?? 0) + (event.address?.length ?? 0)}
              />
            </div>
            <div style={{
              padding: 16, borderRadius: 10,
              border: `1px solid ${theme.line}`,
              background: 'rgba(246,239,228,0.02)',
              minWidth: 220, maxWidth: 260,
              fontFamily: 'Nunito, sans-serif',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: theme.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Note from the host</div>
              <div style={{ fontSize: 13, color: theme.inkDim, marginTop: 8, lineHeight: 1.5 }}>
                {event.note}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
