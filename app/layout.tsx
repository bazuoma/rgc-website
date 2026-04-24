import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Real Gamers Club – Where Real Gamers Unite",
  description: "A social club for gamers who want to meet for game nights, compete, and build community.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: "#0d0600", margin: 0, padding: 0 }}>
        <Navbar />
        <main style={{ paddingTop: 80 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
