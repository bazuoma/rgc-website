"use client";

import { useState } from 'react';
import { theme } from '../components/theme';
import EventRow from '../components/EventRow';
import { ArrowRight } from '../components/Icons';
import { RGC_EVENTS, RGC_PAST_EVENTS, fmtDate } from '../data/events';
import Footer from '../components/Footer';

function FilterChip({ active, children, onClick, accent }: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? (accent || theme.ink) : 'transparent',
        color: active ? '#0d0600' : theme.inkDim,
        border: `1px solid ${active ? (accent || theme.ink) : theme.lineStrong}`,
        borderRadius: 999,
        padding: '8px 14px',
        fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12,
        cursor: 'pointer', letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  );
}

export default function EventsPage() {
  const [city, setCity] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('date');
  const [rsvp, setRsvp] = useState<Record<string, 'going' | undefined>>({});

  const onRsvp = (id: string) => setRsvp(prev => ({ ...prev, [id]: prev[id] === 'going' ? undefined : 'going' }));

  const cities = ['All', ...Array.from(new Set(RGC_EVENTS.map(e => e.city)))];
  const types = ['All', 'Board games', 'Card games', 'Video games'];

  const filtered = RGC_EVENTS
    .filter(e => city === 'All' || e.city === city)
    .filter(e => type === 'All' || e.type === type)
    .sort((a, b) => {
      if (sort === 'date') return a.date.getTime() - b.date.getTime();
      if (sort === 'open') return (b.capacity - b.rsvp) - (a.capacity - a.rsvp);
      return 0;
    });

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>

      {/* Page header */}
      <section style={{ padding: '64px 40px 40px', borderBottom: `1px solid ${theme.line}` }}>
        <div style={{
          fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
          color: theme.orange, letterSpacing: '0.18em', textTransform: 'uppercase',
          marginBottom: 20,
        }}>Upcoming nights</div>
        <h1 style={{
          margin: 0,
          fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
          fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.9,
          letterSpacing: '-0.03em', color: theme.ink,
        }}>
          Tap In.<br />
          <span style={{ color: theme.inkDim }}>Go Win.</span>
        </h1>
      </section>

      {/* Filters */}
      <section style={{
        padding: '24px 40px', display: 'flex', gap: 16, flexWrap: 'wrap',
        alignItems: 'center', borderBottom: `1px solid ${theme.line}`,
        position: 'sticky', top: 80,
        background: `${theme.bg}ee`, backdropFilter: 'blur(12px)', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.12em', textTransform: 'uppercase' }}>City</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {cities.map(c => (
              <FilterChip key={c} active={city === c} onClick={() => setCity(c)}>
                {c === 'All' ? 'All cities' : c.split(',')[0]}
              </FilterChip>
            ))}
          </div>
        </div>
        <div style={{ width: 1, height: 24, background: theme.line }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Type</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {types.map(t => {
              const accent = t === 'Video games' ? theme.blue : t === 'Card games' ? theme.orange : t === 'Board games' ? theme.orange : undefined;
              return (
                <FilterChip key={t} active={type === t} onClick={() => setType(t)} accent={accent}>
                  {t}
                </FilterChip>
              );
            })}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, color: theme.inkFaint, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Sort</span>
          <FilterChip active={sort === 'date'} onClick={() => setSort('date')}>Soonest</FilterChip>
          <FilterChip active={sort === 'open'} onClick={() => setSort('open')}>Most seats open</FilterChip>
        </div>
      </section>

      {/* Upcoming list */}
      <section style={{ padding: '8px 40px 56px' }}>
        {filtered.length === 0 && (
          <div style={{
            padding: '80px 0', textAlign: 'center',
            fontFamily: 'Nunito, sans-serif', fontSize: 18, color: theme.inkDim,
          }}>
            Nothing matches those filters. Try another city or type.
          </div>
        )}
        {filtered.map((e, i) => (
          <EventRow key={e.id} event={e} idx={i} rsvpState={rsvp[e.id]} onToggle={onRsvp} theme={theme} />
        ))}
      </section>

      {/* Past events */}
      <section style={{ padding: '48px 40px 32px', borderTop: `1px solid ${theme.line}` }}>
        <div style={{
          fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
          color: theme.inkFaint, letterSpacing: '0.18em', textTransform: 'uppercase',
          marginBottom: 20,
        }}>Previously</div>
        <h2 style={{
          margin: 0,
          fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
          fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1,
          letterSpacing: '-0.025em', color: theme.ink,
        }}>Past nights.</h2>
        <div style={{ marginTop: 28 }}>
          {RGC_PAST_EVENTS.map((e, i) => (
            <div key={e.id} style={{
              display: 'grid', gridTemplateColumns: '100px 1fr auto',
              gap: 24, padding: '18px 0',
              borderTop: i === 0 ? `1px solid ${theme.line}` : 'none',
              borderBottom: `1px solid ${theme.line}`,
              alignItems: 'center', opacity: 0.7,
            }}>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: theme.inkDim, fontWeight: 700 }}>
                {fmtDate(e.date, 'stamp')}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 18, color: theme.ink }}>
                  {e.venue}
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: theme.inkDim }}>
                  {e.city} · played {e.games.join(', ')}
                </div>
              </div>
              <div style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700,
                color: theme.inkDim, letterSpacing: '0.04em',
              }}>
                {e.attended} showed up
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '48px 40px', textAlign: 'center', borderTop: `1px solid ${theme.line}` }}>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: theme.inkFaint, marginBottom: 16 }}>
          Not on the list?
        </div>
        <a
          href="/signup"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: theme.orange, color: '#0d0600',
            border: 'none', borderRadius: 999, padding: '14px 24px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 14,
            textDecoration: 'none', cursor: 'pointer',
          }}
        >
          Join the club <ArrowRight size={14} color="#0d0600" w={2.4} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
