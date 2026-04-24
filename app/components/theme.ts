export const theme = {
  bg: '#0b0f1e',
  bgWarm: '#0d1224',
  ink: '#f6efe4',
  inkDim: 'rgba(246,239,228,0.66)',
  inkFaint: 'rgba(246,239,228,0.36)',
  line: 'rgba(246,239,228,0.12)',
  lineStrong: 'rgba(246,239,228,0.22)',
  blue: '#3B82F6',
  blueDeep: '#2563EB',
  orange: '#F59E0B',
  orangeDeep: '#D97706',
  headingWeight: 900 as const,
  primary: '#F59E0B',
  secondary: '#3B82F6',
} as const;

export type Theme = typeof theme;
