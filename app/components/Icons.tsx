"use client";

export function ArrowRight({ size = 16, color = 'currentColor', w = 2 }: { size?: number; color?: string; w?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function CheckIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

export function DiceIcon({ size = 18, pips = 5, color = 'currentColor' }: { size?: number; pips?: number; color?: string }) {
  const positions: Record<number, [number, number][]> = {
    1: [[12, 12]],
    2: [[7, 7], [17, 17]],
    3: [[6, 6], [12, 12], [18, 18]],
    4: [[7, 7], [17, 7], [7, 17], [17, 17]],
    5: [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]],
    6: [[7, 6], [17, 6], [7, 12], [17, 12], [7, 18], [17, 18]],
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.8" />
      {(positions[pips] || positions[5]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill={color} />
      ))}
    </svg>
  );
}

export function MeepleIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2c-2 0-3.4 1.6-3.4 3.6 0 1 .3 1.7.7 2.3-.7.1-1.6.4-2.7 1-2 1.1-2.6 2.4-2.6 3.6 0 .9.6 1.5 1.6 1.5h2.2v6.4c0 1 .6 1.6 1.6 1.6h5.2c1 0 1.6-.6 1.6-1.6V14h2.2c1 0 1.6-.6 1.6-1.5 0-1.2-.6-2.5-2.6-3.6-1.1-.6-2-.9-2.7-1 .4-.6.7-1.3.7-2.3C15.4 3.6 14 2 12 2z" />
    </svg>
  );
}

export function MailIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
