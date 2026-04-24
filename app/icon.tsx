import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        background: '#F59E0B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          background: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 900, color: '#F59E0B' }}>RGC</span>
      </div>
    </div>,
    { ...size }
  );
}
