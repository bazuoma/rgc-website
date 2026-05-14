export interface RgcEvent {
  id: string;
  date: Date;
  venue: string;
  city: string;
  address: string;
  games: string[];
  type: string;
  capacity: number;
  rsvp: number;
  note: string;
  partifulUrl?: string;
}

export interface RgcPastEvent {
  id: string;
  date: Date;
  venue: string;
  city: string;
  games: string[];
  attended: number;
}

export const RGC_EVENTS: RgcEvent[] = [
  { id: 'may-27', date: new Date(2026, 4, 27, 19, 0), venue: 'Five Point Five Brewing', city: 'El Segundo, CA', address: '137 Nevada St', games: ['Catan', 'Codenames', 'Ticket to Ride'], type: 'Board games', capacity: 24, rsvp: 0, note: 'Our first official night. Come early, grab a pint, meet the crew.', partifulUrl: 'https://partiful.com/e/YsWbiWl4J3eV6ertEaXt?c=NW32BHrP' },
];

export const RGC_PAST_EVENTS: RgcPastEvent[] = [
  { id: 'apr-19', date: new Date(2026, 3, 19, 19, 0), venue: 'Brewport', city: 'El Segundo, CA', games: ['Catan', 'Wingspan'], attended: 22 },
  { id: 'apr-12', date: new Date(2026, 3, 12, 18, 30), venue: '33 Taps', city: 'Culver City, CA', games: ['Smash Bros.', 'Mario Kart'], attended: 26 },
  { id: 'apr-05', date: new Date(2026, 3, 5, 19, 0), venue: 'The Bungalow', city: 'Santa Monica, CA', games: ['Poker', 'Codenames'], attended: 18 },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export function fmtDate(d: Date, style: 'full' | 'short' | 'stamp' = 'full'): string {
  if (style === 'short') return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
  if (style === 'stamp') return `${DAYS[d.getDay()]} · ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  const hh = ((h + 11) % 12) + 1;
  const mm = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()} · ${hh}${mm}${ampm}`;
}

export function countdownTo(d: Date): { days: number; hours: number; mins: number } | null {
  const ms = d.getTime() - new Date().getTime();
  if (ms < 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    mins: Math.floor((ms % 3600000) / 60000),
  };
}

export function fmtTime(d: Date): string {
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  const hh = ((h + 11) % 12) + 1;
  return m === 0 ? `${hh}${ampm}` : `${hh}:${String(m).padStart(2, '0')}${ampm}`;
}

export const MONTHS_ARR = MONTHS;
export const DAYS_ARR = DAYS;
