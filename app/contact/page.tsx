"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '../components/theme';
import { ArrowRight, CheckIcon } from '../components/Icons';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/useIsMobile';

const topics = ['General', 'A night I attended', 'Report something', 'Press / partnerships'];

export default function ContactPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: '', email: '', topic: 'General', msg: '' });
  const [sent, setSent] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const ok = form.name.trim().length > 0 && validEmail && form.msg.trim().length >= 10;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok) return;
    setSent(true);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 11, fontWeight: 800, color: theme.inkFaint,
    letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(246,239,228,0.04)',
    border: `1.5px solid ${theme.lineStrong}`,
    borderRadius: 10, padding: '12px 14px',
    fontFamily: 'Nunito, sans-serif', fontSize: 15,
    color: theme.ink, outline: 'none',
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: isMobile ? '48px 20px 32px' : '72px 40px 48px', borderBottom: `1px solid ${theme.line}` }}>
        <div style={{
          fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
          color: theme.orange, letterSpacing: '0.18em', textTransform: 'uppercase',
          marginBottom: 20,
        }}>Talk to us</div>
        <h1 style={{
          margin: 0,
          fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
          fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.9,
          letterSpacing: '-0.03em', color: theme.ink,
        }}>
          Say hello.<br />
          <span style={{ color: theme.inkDim }}>Or say something&apos;s wrong.</span>
        </h1>
      </section>

      {/* Two-column layout */}
      <section style={{
        padding: isMobile ? '40px 20px 60px' : '56px 40px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr',
        gap: 56,
        alignItems: 'flex-start',
      }}>
        {/* Left: info */}
        <div style={{ position: isMobile ? 'static' : 'sticky', top: 120, fontFamily: 'Nunito, sans-serif' }}>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: theme.inkDim, maxWidth: 380 }}>
            A human reads every message. We usually reply within a day or two — faster if it&apos;s
            about something going sideways at a game night.
          </div>
          <div style={{ marginTop: 32, display: 'grid', gap: 18 }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: theme.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Email</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.ink, marginTop: 4 }}>
                hello@realgamers.club
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: theme.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Reports &amp; safety</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.ink, marginTop: 4 }}>
                trust@realgamers.club
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: theme.inkFaint,
                letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Socials</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.ink, marginTop: 4 }}>
                <a
                  href="https://instagram.com/realgamers.club"
                  target="_blank" rel="noreferrer"
                  style={{ color: theme.ink, textDecoration: 'none' }}
                >@realgamers.club</a>
                <span style={{ color: theme.inkFaint, margin: '0 8px' }}>·</span>
                <span style={{ color: theme.inkDim, fontSize: 13 }}>IG · TikTok</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={submit} style={{
          padding: 36, borderRadius: 20,
          border: `1px solid ${theme.lineStrong}`,
          background: 'rgba(246,239,228,0.025)',
          maxWidth: 620,
        }}>
          {sent ? (
            <div style={{ fontFamily: 'Nunito, sans-serif', padding: '24px 0' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 14px', borderRadius: 999,
                background: 'rgba(245,158,11,0.15)', marginBottom: 20,
              }}>
                <CheckIcon size={13} color={theme.orange} />
                <span style={{
                  fontSize: 12, fontWeight: 800, color: theme.orange,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>Message in</span>
              </div>
              <h2 style={{
                margin: 0, fontSize: 36, fontWeight: 900, color: theme.ink,
                letterSpacing: '-0.02em',
              }}>
                Got it, {form.name.split(' ')[0] || 'friend'}.
              </h2>
              <p style={{
                marginTop: 12, fontSize: 16, color: theme.inkDim, lineHeight: 1.55, maxWidth: 460,
              }}>
                We&apos;ll reply to{' '}
                <span style={{ color: theme.ink, fontWeight: 700 }}>{form.email}</span>{' '}
                within a day or two. If it&apos;s urgent, you can also DM us on Instagram.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => router.push('/events')}
                  style={{
                    background: theme.orange, color: '#0d0600',
                    border: 'none', borderRadius: 999, padding: '12px 20px',
                    fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 13,
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}
                >
                  Browse upcoming nights <ArrowRight size={13} color="#0d0600" w={2.4} />
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  style={{
                    background: 'transparent', color: theme.ink,
                    border: `1.5px solid ${theme.lineStrong}`, borderRadius: 999, padding: '12px 20px',
                    fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Back home
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    placeholder="First &amp; last"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="you@somewhere.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>What&apos;s this about?</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {topics.map((t) => {
                    const active = form.topic === t;
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setForm((f) => ({ ...f, topic: t }))}
                        style={{
                          background: active ? theme.orange : 'transparent',
                          color: active ? '#0d0600' : theme.ink,
                          border: `1.5px solid ${active ? theme.orange : theme.lineStrong}`,
                          borderRadius: 999, padding: '8px 14px',
                          fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
                          letterSpacing: '0.02em', cursor: 'pointer',
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  rows={6}
                  placeholder="What's on your mind?"
                  value={form.msg}
                  onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 } as React.CSSProperties}
                />
              </div>

              <button
                type="submit"
                disabled={!ok}
                style={{
                  background: theme.orange, color: '#0d0600',
                  border: 'none', borderRadius: 999, padding: '14px 24px',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 14,
                  letterSpacing: '0.04em', cursor: ok ? 'pointer' : 'not-allowed',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  opacity: ok ? 1 : 0.5,
                }}
              >
                Send it <ArrowRight size={14} color="#0d0600" w={2.4} />
              </button>
            </>
          )}
        </form>
      </section>

      <Footer />
    </div>
  );
}
