"use client";

import Link from "next/link";
import RGCLogo from "./components/RGCLogo";

const stats = [
  { label: "Active Members",    value: "1,247",  color: "#2563eb" },
  { label: "Game Nights Hosted",value: "312",    color: "#f59e0b" },
  { label: "Games Played",      value: "4,891",  color: "#3b82f6" },
  { label: "Total Wins Tracked",value: "18,430", color: "#60a5fa" },
];

const features = [
  {
    title: "Epic Game Nights",
    desc:  "Monthly in-person gatherings where members compete across dozens of board games, card games, and video games.",
    color: "#2563eb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
      </svg>
    ),
  },
  {
    title: "Real Community",
    desc:  "Meet fellow gamers in your city. Build lasting friendships beyond the screen with people who share your passion.",
    color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Win Tracking & Leaderboards",
    desc:  "Every win counts. Track your performance across game nights and climb the RGC leaderboard to earn Elite status.",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    ),
  },
  {
    title: "Member-Voted Games",
    desc:  "You decide what gets played. Vote on upcoming game selections and shape the game night experience for everyone.",
    color: "#60a5fa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 1 8.835-2.535m0 0A23.74 23.74 0 0 1 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m-1.394-9.52a24.004 24.004 0 0 0-4.572 3.267M13.5 15.84a24.004 24.004 0 0 0 4.572 3.267" />
      </svg>
    ),
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Strategy Night",
    date:  "May 3, 2026",
    time:  "6:00 PM",
    location: "The Game Loft, Downtown",
    games: ["Catan", "Ticket to Ride", "Pandemic"],
    spots: 8,
    color: "#2563eb",
  },
  {
    id: 2,
    title: "Card Game Clash",
    date:  "May 17, 2026",
    time:  "7:00 PM",
    location: "Brew & Board, Midtown",
    games: ["Magic: The Gathering", "Exploding Kittens", "UNO Flip"],
    spots: 12,
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "Console Wars",
    date:  "May 31, 2026",
    time:  "5:00 PM",
    location: "GameZone Hub, Eastside",
    games: ["Super Smash Bros", "Mario Kart 8", "Rocket League"],
    spots: 16,
    color: "#3b82f6",
  },
];

const testimonials = [
  { name: "Marcus T.",  handle: "@xXGamerXx",    text: "RGC changed my social life. Met some of my best friends at these game nights. The leaderboard competition is INTENSE.", wins: 47 },
  { name: "Priya K.",   handle: "@PixelPriya",    text: "Finally a gaming club that actually shows up. Every month, solid event, great people, and the win tracking makes it even more fun.", wins: 31 },
  { name: "DeShawn M.", handle: "@D3ShawnGames",  text: "The voting system for games is genius. I lobbied for Wingspan and it made the lineup. Community actually listens!", wins: 62 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-grid" style={{ backgroundColor: "#0a0a0f" }}>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, #2563eb14 0%, transparent 70%)" }} />
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #2563eb08 0%, transparent 70%)", animation: "float 6s ease-in-out infinite" }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #f59e0b08 0%, transparent 70%)", animation: "float 8s ease-in-out infinite reverse" }} />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8" style={{ animation: "float 3s ease-in-out infinite" }}>
            <RGCLogo size={110} showText={false} />
          </div>
          <span className="badge-blue mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}>EST. 2024 · REAL GAMERS ONLY</span>
          <h1 className="font-sans font-black text-5xl md:text-7xl mb-4 leading-tight">
            <span className="gradient-text neon-text-blue">WHERE REAL</span>
            <br />
            <span className="text-white">GAMERS UNITE</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Join the premier social gaming club. Monthly game nights, tracked wins, community voting, and a crew that actually shows up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="btn-primary text-white font-sans font-extrabold text-base px-8 py-4 rounded-xl">
              Join the Club — It&apos;s Free
            </Link>
            <Link href="/events" className="btn-secondary font-sans font-bold text-base px-8 py-4 rounded-xl">
              View Upcoming Events
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-2 text-slate-500 text-sm font-sans">
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "#2563eb", boxShadow: "0 0 8px #2563eb" }} />
            <span>1,247 members active this month</span>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y py-8" style={{ borderColor: "#1c1f35", backgroundColor: "#0d0d18" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-black text-3xl md:text-4xl mb-1" style={{ color: s.color, textShadow: `0 0 20px ${s.color}60`, fontFamily: "'Nunito', sans-serif" }}>
                {s.value}
              </div>
              <div className="text-slate-500 text-sm font-sans">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-blue mb-3 inline-block" style={{ letterSpacing: "0.15em" }}>WHY JOIN</span>
            <h2 className="font-black text-4xl md:text-5xl text-white mb-4">Built for <span className="gradient-text">Real Gamers</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto font-sans">Not just a Discord server. An actual club with real events, real competition, real community.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-gaming p-6 cursor-pointer" style={{ borderColor: `${f.color}30` }}>
                <div className="mb-4 p-3 rounded-lg inline-block" style={{ backgroundColor: `${f.color}15`, color: f.color }}>{f.icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0d0d18" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="badge-orange mb-2 inline-block" style={{ letterSpacing: "0.15em" }}>UPCOMING</span>
              <h2 className="font-black text-4xl text-white">Next <span className="gradient-text-blue">Game Nights</span></h2>
            </div>
            <Link href="/events" className="btn-secondary font-sans font-bold text-sm px-5 py-2.5 rounded-lg hidden md:block cursor-pointer">See All Events →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card-gaming p-6 cursor-pointer" style={{ borderColor: `${event.color}30` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-sans font-bold text-xs mb-1" style={{ color: event.color }}>{event.date} · {event.time}</div>
                    <h3 className="font-black text-white text-xl">{event.title}</h3>
                  </div>
                  <span className="badge-blue">{event.spots} spots</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 font-sans">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {event.location}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {event.games.map((g) => <span key={g} className="badge-blue">{g}</span>)}
                </div>
                <Link href="/signup" className="w-full text-center btn-primary text-white font-sans font-extrabold text-sm px-4 py-2.5 rounded-lg block">RSVP Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-orange mb-3 inline-block" style={{ letterSpacing: "0.15em" }}>COMMUNITY</span>
            <h2 className="font-black text-4xl text-white">The <span className="gradient-text">RGC Crew</span> Speaks</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-gaming p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm" style={{ background: "linear-gradient(135deg, #2563eb, #f59e0b)", color: "white" }}>{t.name[0]}</div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="font-sans text-xs" style={{ color: "#3b82f6" }}>{t.handle}</div>
                  </div>
                  <div className="ml-auto"><span className="badge-blue">{t.wins} wins</span></div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-sans">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#f59e0b" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0d0d18" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-gaming p-12 relative overflow-hidden" style={{ borderColor: "#2563eb40", boxShadow: "0 0 60px #2563eb10" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, #2563eb08 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <RGCLogo size={72} showText={false} className="justify-center mb-6" />
              <h2 className="font-black text-4xl text-white mb-4">Ready to <span className="gradient-text">Level Up</span>?</h2>
              <p className="text-slate-400 mb-8 font-sans">Join 1,247 gamers who already found their crew. Sign up for free and get the next game night in your inbox.</p>
              <Link href="/signup" className="btn-primary text-white font-sans font-extrabold text-lg px-10 py-4 rounded-xl inline-block">
                Join Real Gamers Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12 px-6" style={{ borderColor: "#1c1f35" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <RGCLogo size={40} className="mb-4" />
              <p className="text-slate-500 text-sm leading-relaxed font-sans">The social club for people who take fun seriously.</p>
            </div>
            <div>
              <h4 className="font-extrabold text-sm mb-3" style={{ color: "#2563eb", letterSpacing: "0.15em" }}>NAVIGATE</h4>
              {[["Home", "/"], ["Events", "/events"], ["Join", "/signup"]].map(([l, h]) => (
                <Link key={l} href={h} className="block text-slate-500 hover:text-white text-sm mb-2 transition-colors cursor-pointer font-sans">{l}</Link>
              ))}
            </div>
            <div>
              <h4 className="font-extrabold text-sm mb-3" style={{ color: "#f59e0b", letterSpacing: "0.15em" }}>COMMUNITY</h4>
              {["Game Nights", "Events Calendar", "Newsletter", "Contact Us"].map((l) => (
                <div key={l} className="text-slate-500 text-sm mb-2 font-sans">{l}</div>
              ))}
            </div>
            <div>
              <h4 className="font-extrabold text-sm mb-3" style={{ color: "#3b82f6", letterSpacing: "0.15em" }}>CONNECT</h4>
              {["Discord Server", "Twitter/X", "Instagram", "Contact Us"].map((l) => (
                <div key={l} className="text-slate-500 text-sm mb-2 cursor-pointer hover:text-white transition-colors font-sans">{l}</div>
              ))}
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "#1c1f35" }}>
            <p className="text-slate-600 text-xs font-sans">© 2026 Real Gamers Club. All rights reserved.</p>
            <p className="text-slate-600 text-xs font-sans">Made with passion for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
