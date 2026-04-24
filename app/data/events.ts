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
  { id: 'apr-26', date: new Date(2026, 3, 26, 19, 0), venue: 'Brewport', city: 'El Segundo, CA', address: '500 Main St', games: ['Catan', 'Codenames', 'Splendor'], type: 'Board games', capacity: 24, rsvp: 17, note: 'House IPA is on tap. Bring your own meeple.' },
  { id: 'may-03', date: new Date(2026, 4, 3, 18, 30), venue: '33 Taps', city: 'Culver City, CA', address: '3725 Main St', games: ['Smash Bros.', 'Mario Kart', 'Jackbox'], type: 'Video games', capacity: 32, rsvp: 28, note: 'Projector + two TVs. Tournament bracket optional.' },
  { id: 'may-10', date: new Date(2026, 4, 10, 19, 0), venue: 'Brewport', city: 'El Segundo, CA', address: '500 Main St', games: ['Wingspan', 'Azul', 'Ticket to Ride'], type: 'Board games', capacity: 24, rsvp: 9, note: 'Lighter rules night — easy to jump in.' },
  { id: 'may-17', date: new Date(2026, 4, 17, 18, 0), venue: 'The Bungalow', city: 'Santa Monica, CA', address: '101 Wilshire Blvd', games: ['Poker', 'Codenames', 'Uno'], type: 'Card games', capacity: 20, rsvp: 14, note: 'Cash-light poker. $5 buy-in for fun, not stakes.' },
  { id: 'may-24', date: new Date(2026, 4, 24, 19, 30), venue: '33 Taps', city: 'Culver City, CA', address: '3725 Main St', games: ['Rocket League', 'Smash Bros.'], type: 'Video games', capacity: 28, rsvp: 22, note: '2v2 Rocket League league night. Solo queuers welcome.' },
  { id: 'may-31', date: new Date(2026, 4, 31, 18, 30), venue: 'Brewport', city: 'El Segundo, CA', address: '500 Main St', games: ['Terraforming Mars', 'Scythe', '7 Wonders'], type: 'Board games', capacity: 20, rsvp: 11, note: 'Heavy games night. Expect 2–3 hour sessions.' },
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
