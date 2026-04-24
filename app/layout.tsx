import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Real Gamers Club – Where Real Gamers Unite",
  description: "In-person board game, card game, and video game nights in Los Angeles. No logins. No leaderboards. Just good nights.",
  metadataBase: new URL('https://realgamers.club'),
  openGraph: {
    title: 'Real Gamers Club – Where Real Gamers Unite',
    description: 'In-person game nights in LA. Real tables, real people.',
    url: 'https://realgamers.club',
    siteName: 'Real Gamers Club',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Gamers Club',
    description: 'In-person game nights in LA. Real tables, real people.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: "#0b0f1e", margin: 0, padding: 0 }}>
        <Navbar />
        <main className="rgc-main">
          {children}
        </main>
      </body>
    </html>
  );
}
