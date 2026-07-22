"use client";

import { useRouter } from 'next/navigation';
import { theme } from './components/theme';
import EventRow from './components/EventRow';
import { ArrowRight } from './components/Icons';
import { RGC_EVENTS, fmtDate } from './data/events';
import Footer from './components/Footer';
import { useIsMobile } from './hooks/useIsMobile';

export default function HomePage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const nextEvent = RGC_EVENTS[0];

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ padding: isMobile ? '60px 20px 48px' : '88px 40px 72px', position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32,
          fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.orange,
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: 4,
            background: theme.orange,
            boxShadow: `0 0 0 4px ${theme.orange}22`,
            animation: 'rgcPulse 2s ease-in-out infinite',
          }} />
          Next night · {fmtDate(nextEvent.date, 'stamp')} · {nextEvent.venue}
        </div>
        <h1 style={{
          margin: 0,
          fontFamily: 'Nunito, sans-serif',
          fontWeight: theme.headingWeight,
          fontSize: 'clamp(64px, 9vw, 148px)',
          lineHeight: 0.88, letterSpacing: '-0.04em',
          color: theme.ink,
        }}>
          Where <span style={{ color: theme.orange, fontStyle: 'italic' }}>real</span><br />
          gamers unite.
        </h1>
        <p style={{
          maxWidth: 620, marginTop: 36,
          fontFamily: 'Nunito, sans-serif', fontSize: 19, lineHeight: 1.5,
          color: theme.inkDim, fontWeight: 500,
        }}>
          Real Gamers Club is a social community built around a simple idea: the best connections
          happen face to face. We host game nights at bars across LA — board games, card games,
          tabletop strategy — but the games are just the excuse. The real point is the people
          around the table.
        </p>
        <div style={{
          display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : undefined,
        }}>
          <button onClick={() => router.push('/signup')} style={{
            background: theme.orange, color: '#0d0600',
            border: 'none', borderRadius: 999, padding: '16px 28px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 15,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            letterSpacing: '0.01em',
          }}>
            Join the club <ArrowRight size={16} color="#0d0600" w={2.4} />
          </button>
          <button onClick={() => router.push('/events')} style={{
            background: 'transparent', color: theme.ink,
            border: `1.5px solid ${theme.lineStrong}`, borderRadius: 999, padding: '16px 28px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15,
            cursor: 'pointer',
          }}>
            See upcoming nights
          </button>
        </div>
      </section>

      {/* ── Game Testing Callout ── */}
      <section style={{ padding: isMobile ? '0 20px 48px' : '0 40px 64px' }}>
        <div style={{
          padding: isMobile ? '28px 24px' : '36px 44px',
          borderRadius: 16,
          border: `1px solid ${theme.lineStrong}`,
          background: 'rgba(30,58,138,0.12)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 28,
        }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
              color: theme.blue, letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: 10,
            }}>For game publishers & designers</div>
            <h2 style={{
              margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 900,
              fontSize: isMobile ? 22 : 26, color: theme.ink,
              letterSpacing: '-0.015em', lineHeight: 1.2,
            }}>
              Got a game that needs real players to test it?
            </h2>
            <p style={{
              margin: '10px 0 0', fontFamily: 'Nunito, sans-serif', fontSize: 15,
              color: theme.inkDim, lineHeight: 1.55, fontWeight: 500,
            }}>
              We host structured game nights with engaged, honest players across LA.
              If you&apos;re developing a board game or card game, we&apos;ll put it on the table
              and give you the kind of feedback you can only get from a real room.
            </p>
          </div>
          <a
            href="/contact?topic=Game+testing"
            style={{
              flexShrink: 0,
              background: 'transparent', color: theme.ink,
              border: `1.5px solid ${theme.lineStrong}`, borderRadius: 999,
              padding: '12px 22px',
              fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13,
              letterSpacing: '0.02em', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Get in touch <ArrowRight size={13} color={theme.ink} w={2.2} />
          </a>
        </div>
      </section>

      {/* ── Upcoming Preview ── */}
      <section style={{ padding: isMobile ? '40px 20px 16px' : '48px 40px 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 32, gap: 20, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
              color: theme.orange, letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: 12,
            }}>Upcoming nights</div>
            <h2 style={{
              margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
              fontSize: 'clamp(36px, 4vw, 56px)', color: theme.ink,
              letterSpacing: '-0.025em', lineHeight: 1,
            }}>Grab a seat.</h2>
          </div>
          <button onClick={() => router.push('/events')} style={{
            background: 'transparent', color: theme.ink,
            border: `1.5px solid ${theme.lineStrong}`, borderRadius: 999, padding: '12px 20px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            See all {RGC_EVENTS.length} <ArrowRight size={13} color={theme.ink} />
          </button>
        </div>
        <div>
          {RGC_EVENTS.slice(0, 3).map((e, i) => (
            <EventRow key={e.id} event={e} idx={i} theme={theme} />
          ))}
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section style={{
        margin: isMobile ? '48px 20px 0' : '64px 40px 0',
        padding: isMobile ? '40px 24px' : '72px 48px',
        borderRadius: 24,
        border: `1px solid ${theme.lineStrong}`,
        background: `radial-gradient(1200px 400px at 20% 0%, ${theme.blue}22, transparent), radial-gradient(800px 400px at 90% 100%, ${theme.orange}22, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 32, flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div>
          <h2 style={{
            margin: 0, fontFamily: 'Nunito, sans-serif', fontWeight: 900,
            fontSize: 'clamp(32px, 4vw, 56px)', color: theme.ink,
            letterSpacing: '-0.025em', lineHeight: 1, maxWidth: 640,
          }}>
            The best friendships start at a table.
          </h2>
          <p style={{
            marginTop: 18, fontFamily: 'Nunito, sans-serif', fontSize: 16,
            color: theme.inkDim, maxWidth: 520, lineHeight: 1.5,
          }}>
            We host game nights across LA for people who want real community — not another group chat.
            Drop your email and we&apos;ll let you know when the next night is. No spam. Ever.
          </p>
        </div>
        <button onClick={() => router.push('/signup')} style={{
          background: theme.orange, color: '#0d0600',
          border: 'none', borderRadius: 999, padding: '18px 32px',
          fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 16,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
          flexShrink: 0,
        }}>
          Get on the list <ArrowRight size={16} color="#0d0600" w={2.4} />
        </button>
      </section>

      <Footer />
    </div>
  );
}
