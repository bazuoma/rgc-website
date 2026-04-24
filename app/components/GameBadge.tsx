"use client";
import { Theme } from './theme';

export default function GameBadge({ name, theme, size = 'md' }: { name: string; theme: Theme; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? { pad: '4px 9px', fs: 11 } : { pad: '6px 11px', fs: 12 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: sz.pad,
      border: `1px solid ${theme.lineStrong}`,
      borderRadius: 999,
      fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: sz.fs,
      color: theme.ink, letterSpacing: '0.01em',
      background: 'rgba(246,239,228,0.03)',
      whiteSpace: 'nowrap',
    }}>
      {name}
    </span>
  );
}
