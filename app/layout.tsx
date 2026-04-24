import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Real Gamers Club – Where Real Gamers Unite",
  description: "A social club for gamers who want to meet for game nights, compete, and build community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: "#0a0a0f" }}>
        <Navbar />
        <main className="pt-[64px]">
          {children}
        </main>
      </body>
    </html>
  );
}
