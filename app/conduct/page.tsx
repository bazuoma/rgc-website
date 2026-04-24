"use client";

import { useRouter } from 'next/navigation';
import { theme } from '../components/theme';
import { ArrowRight } from '../components/Icons';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/useIsMobile';

const rules = [
  {
    n: '01',
    t: 'Phones face down.',
    b: 'When the game starts, phones go face-down on the table. Emergencies happen — step away from the table for those. Texts can wait an hour.',
  },
  {
    n: '02',
    t: "Teach, don't tower.",
    b: "If you know the game, teach it with patience. New players are the whole point. Nobody gets to be the rules-lawyer who ruins the night.",
  },
  {
    n: '03',
    t: "Everyone's real.",
    b: "Real names. Real faces. No slurs, no harassment, no hitting on people across the table. This is a club, not a bar scene.",
  },
  {
    n: '04',
    t: 'Lose gracefully, win quietly.',
    b: "Nobody likes a gloater. Nobody likes a flipper. If the game breaks bad, finish it, shake hands, reshuffle.",
  },
  {
    n: '05',
    t: 'Drink your water.',
    b: "Long nights at the table + one beer = two beers tomorrow morning. Hosts keep a pitcher out. Use it.",
  },
  {
    n: '06',
    t: 'Show up when you RSVP.',
    b: "A no-show is a missing seat someone else wanted. Can't make it? Cancel as early as you can — we hold no grudge, but ghost twice and the reminders stop arriving.",
  },
];

export default function ConductPage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: isMobile ? '48px 20px 32px' : '72px 40px 40px', borderBottom: `1px solid ${theme.line}` }}>
        <div style={{
          fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
          color: theme.orange, letterSpacing: '0.18em', textTransform: 'uppercase',
          marginBottom: 20,
        }}>House rules</div>
        <h1 style={{
          margin: 0, maxWidth: 1000,
          fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
          fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.9,
          letterSpacing: '-0.03em', color: theme.ink,
        }}>
          Six rules.<br />
          <span style={{ color: theme.inkDim }}>That&apos;s the whole code.</span>
        </h1>
        <p style={{
          marginTop: 24, maxWidth: 620,
          fontFamily: 'Nunito, sans-serif', fontSize: 17, lineHeight: 1.55,
          color: theme.inkDim,
        }}>
          We don&apos;t run a forum. We don&apos;t mediate drama in DMs. If you&apos;re going to sit at an RGC
          table, here&apos;s what we ask of you and what you can ask back from everyone else there.
        </p>
      </section>

      {/* Rules list */}
      <section style={{ padding: isMobile ? '32px 20px 32px' : '56px 40px 56px', maxWidth: 1100 }}>
        <div style={{ display: 'grid', gap: 18 }}>
          {rules.map((r) => (
            <div key={r.n} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '48px 1fr' : '90px 1fr',
              gap: 32,
              padding: '24px 0',
              borderTop: `1px solid ${theme.line}`,
              fontFamily: 'Nunito, sans-serif',
            }}>
              <div style={{
                fontSize: isMobile ? 22 : 28,
                fontWeight: 900, color: theme.orange,
                letterSpacing: '-0.02em', lineHeight: 1,
              }}>{r.n}</div>
              <div>
                <h3 style={{
                  margin: 0, fontSize: 24, fontWeight: 900, color: theme.ink,
                  letterSpacing: '-0.015em', lineHeight: 1.15,
                }}>{r.t}</h3>
                <p style={{
                  margin: '8px 0 0', fontSize: 15, lineHeight: 1.55,
                  color: theme.inkDim, fontWeight: 500, maxWidth: 680,
                }}>{r.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: isMobile ? '16px 20px 60px' : '32px 40px 80px' }}>
        <div style={{
          padding: '28px 32px', borderRadius: 14,
          border: `1px solid ${theme.lineStrong}`,
          background: 'rgba(245,158,11,0.05)',
          fontFamily: 'Nunito, sans-serif',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{
              fontSize: 11, fontWeight: 800, color: theme.orange,
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6,
            }}>Something off at a night?</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: theme.ink, lineHeight: 1.35 }}>
              Tell us. We read every message, and we don&apos;t keep problem players on the list.
            </div>
          </div>
          <button
            onClick={() => router.push('/contact')}
            style={{
              background: theme.orange, color: '#0d0600',
              border: 'none', borderRadius: 999, padding: '12px 20px',
              fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13,
              letterSpacing: '0.04em', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            Contact us <ArrowRight size={13} color="#0d0600" w={2.4} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
