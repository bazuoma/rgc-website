"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '../components/theme';
import { ArrowRight, CheckIcon } from '../components/Icons';
import Footer from '../components/Footer';
import { useIsMobile } from '../hooks/useIsMobile';

const interests = ['Board games', 'Card games', 'Video games', 'Teaching new players', 'Bringing a game'];

export default function SignupPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: '', email: '', city: '', interests: [] as string[] });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors: Record<string, string> = {};
  if (!form.name.trim()) errors.name = 'We need something to call you.';
  if (!form.email.trim()) errors.email = "An email. We promise we'll behave.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'That email looks off.';

  const canSubmit = Object.keys(errors).length === 0;

  const toggleInterest = (i: string) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i],
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, city: true });
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(246,239,228,0.04)',
    border: `1.5px solid ${hasError ? '#ef4444' : theme.lineStrong}`,
    borderRadius: 10,
    padding: '16px 18px',
    fontFamily: 'Nunito, sans-serif', fontSize: 16,
    color: theme.ink,
    outline: 'none',
    transition: 'border-color .15s, background .15s',
    boxSizing: 'border-box',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
    color: theme.inkFaint, letterSpacing: '0.14em', textTransform: 'uppercase',
    marginBottom: 10,
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
        <section style={{
          minHeight: 'calc(100vh - 120px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40,
        }}>
          <div style={{ maxWidth: 560, textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 40,
              background: theme.orange,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 32px',
            }}>
              <CheckIcon size={36} color="#0d0600" />
            </div>
            <h1 style={{
              margin: 0,
              fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
              fontSize: 'clamp(40px, 5vw, 64px)',
              letterSpacing: '-0.025em', lineHeight: 1, color: theme.ink,
            }}>
              You&apos;re in, {form.name.split(' ')[0]}.
            </h1>
            <p style={{
              marginTop: 20,
              fontFamily: 'Nunito, sans-serif', fontSize: 17, lineHeight: 1.55,
              color: theme.inkDim,
            }}>
              We&apos;ll send you a note when the next night near {form.city || 'you'} goes up. No newsletter spam — just game nights.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => router.push('/events')} style={{
                background: theme.orange, color: '#0d0600',
                border: 'none', borderRadius: 999, padding: '14px 24px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 14,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Browse upcoming nights <ArrowRight size={14} color="#0d0600" w={2.4} />
              </button>
              <button onClick={() => router.push('/')} style={{
                background: 'transparent', color: theme.ink,
                border: `1.5px solid ${theme.lineStrong}`, borderRadius: 999, padding: '14px 24px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>
                Back home
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
      <section style={{ padding: isMobile ? '40px 20px 60px' : '64px 40px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
          gap: 64, alignItems: 'flex-start',
        }}>
          {/* Left: pitch — hidden on mobile */}
          {!isMobile && (
            <div style={{ position: 'sticky', top: 120 }}>
              <div style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
                color: theme.orange, letterSpacing: '0.18em', textTransform: 'uppercase',
                marginBottom: 20,
              }}>Join the club</div>
              <h1 style={{
                margin: 0,
                fontFamily: 'Nunito, sans-serif', fontWeight: theme.headingWeight,
                fontSize: 'clamp(44px, 6vw, 88px)',
                lineHeight: 0.9, letterSpacing: '-0.03em', color: theme.ink,
              }}>
                Find your <span style={{ color: theme.orange, fontStyle: 'italic' }}>people</span>.<br />
                <span style={{ color: theme.inkDim }}>Roll some dice.</span>
              </h1>
              <p style={{
                marginTop: 24, maxWidth: 440,
                fontFamily: 'Nunito, sans-serif', fontSize: 17, lineHeight: 1.55,
                color: theme.inkDim,
              }}>
                Real gamers, real tables, real laughs. Leave your week at the door, crack open a game,
                and walk out with a few new friends who actually remember your name.
              </p>
              <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { h: 'Meet your neighbors, for real', s: 'Not mutuals. Not matchmaking. Actual humans across the table.' },
                  { h: 'Unplug for a few hours', s: 'Phones face-down. Brains on. Stress off.' },
                  { h: 'Find your regular crew', s: "Show up twice and you'll know half the room." },
                ].map(t => (
                  <div key={t.h} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 12, background: 'rgba(245,158,11,0.16)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 2,
                    }}>
                      <CheckIcon size={12} color={theme.orange} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: theme.ink, fontWeight: 800, lineHeight: 1.3 }}>
                        {t.h}
                      </div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: theme.inkDim, fontWeight: 500, marginTop: 3, lineHeight: 1.45 }}>
                        {t.s}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right: form */}
          <form onSubmit={onSubmit} style={{
            padding: 36, borderRadius: 20,
            border: `1px solid ${theme.lineStrong}`,
            background: 'rgba(246,239,228,0.02)',
          }}>
            {isMobile && (
              <div style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 800,
                color: theme.orange, letterSpacing: '0.18em', textTransform: 'uppercase',
                marginBottom: 20,
              }}>Join the club</div>
            )}
            <div style={{ display: 'grid', gap: 24 }}>
              <div>
                <label style={labelStyle}>Your name</label>
                <input
                  type="text"
                  placeholder="What should we put on the name tag?"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  style={fieldStyle(!!(touched.name && errors.name))}
                />
                {touched.name && errors.name && (
                  <div style={{ marginTop: 8, fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#ef4444', fontWeight: 600 }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  placeholder="you@somewhere.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  style={fieldStyle(!!(touched.email && errors.email))}
                />
                {touched.email && errors.email && (
                  <div style={{ marginTop: 8, fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#ef4444', fontWeight: 600 }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  City <span style={{ color: theme.inkFaint, fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}>— optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Los Angeles, Oakland, Brooklyn…"
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  style={fieldStyle(false)}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  What you&apos;re into <span style={{ color: theme.inkFaint, fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}>— pick any</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {interests.map(i => {
                    const on = form.interests.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        style={{
                          background: on ? theme.blue : 'transparent',
                          color: on ? '#fff' : theme.ink,
                          border: `1.5px solid ${on ? theme.blue : theme.lineStrong}`,
                          borderRadius: 999,
                          padding: '10px 16px',
                          fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
                          cursor: 'pointer', transition: 'all .15s',
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        {on && <CheckIcon size={12} color="#fff" />}
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit && Object.keys(touched).length > 0}
                style={{
                  background: theme.orange, color: '#0d0600',
                  border: 'none', borderRadius: 999, padding: '18px 28px',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 15,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 8, letterSpacing: '0.01em',
                  opacity: 1,
                }}
              >
                Put me on the list <ArrowRight size={16} color="#0d0600" w={2.4} />
              </button>
              <div style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 12,
                color: theme.inkFaint, textAlign: 'center', lineHeight: 1.5,
              }}>
                By signing up you agree to be emailed about game nights.<br />
                That&apos;s it. That&apos;s the fine print.
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
