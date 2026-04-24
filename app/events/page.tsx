"use client";

import { useState } from "react";
import Link from "next/link";

const upcomingEvents = [
  {
    id: 1,
    title: "Strategy Night",
    date:  "May 3, 2026",
    time:  "6:00 PM – 10:00 PM",
    location: "The Game Loft, 123 Main St, Downtown",
    games: ["Catan", "Ticket to Ride", "Pandemic", "Terraforming Mars"],
    spots: 8, totalSpots: 20,
    color: "#8b5cf6",
    host: "Admin Marcus",
    description: "Break out the euros and settle some disputes. Heavy strategy games, light snacks, maximum brain power.",
    rsvpd: false,
  },
  {
    id: 2,
    title: "Card Game Clash",
    date:  "May 17, 2026",
    time:  "7:00 PM – 11:00 PM",
    location: "Brew & Board, 456 Oak Ave, Midtown",
    games: ["Magic: The Gathering", "Exploding Kittens", "UNO Flip", "Sushi Go"],
    spots: 12, totalSpots: 24,
    color: "#3b82f6",
    host: "Admin Priya",
    description: "From casual UNO chaos to serious MTG duels. All levels welcome. Bring your deck or use house cards.",
    rsvpd: true,
  },
  {
    id: 3,
    title: "Console Wars",
    date:  "May 31, 2026",
    time:  "5:00 PM – 11:00 PM",
    location: "GameZone Hub, 789 Game Blvd, Eastside",
    games: ["Super Smash Bros Ultimate", "Mario Kart 8 Deluxe", "Rocket League", "Fall Guys"],
    spots: 16, totalSpots: 32,
    color: "#7c3aed",
    host: "Admin DeShawn",
    description: "Our flagship console event. 4 setups, round-robin brackets, prizes for top finishers. Come ready to compete.",
    rsvpd: false,
  },
  {
    id: 4,
    title: "Tabletop RPG Night",
    date:  "June 14, 2026",
    time:  "6:00 PM – midnight",
    location: "The Game Loft, 123 Main St, Downtown",
    games: ["Dungeons & Dragons", "Pathfinder 2e", "Blades in the Dark"],
    spots: 6, totalSpots: 12,
    color: "#93c5fd",
    host: "Admin Layla",
    description: "Grab your dice and your character sheet. One-shot adventures for new and experienced players alike.",
    rsvpd: false,
  },
];

const pastEvents = [
  { id: 101, title: "April Board Game Bonanza", date: "Apr 5, 2026",  attendees: 22, topWinner: "xXGamerXx",    games: ["Wingspan", "Azul", "Codenames"] },
  { id: 102, title: "March Madness Card Night", date: "Mar 22, 2026", attendees: 18, topWinner: "D3ShawnGames", games: ["Poker", "Magic: The Gathering", "Phase 10"] },
  { id: 103, title: "February Fighting Fest",   date: "Feb 15, 2026", attendees: 30, topWinner: "PixelPriya",   games: ["Street Fighter 6", "Tekken 8", "Mortal Kombat 1"] },
];

export default function EventsPage() {
  const [rsvpStates, setRsvpStates] = useState<Record<number, boolean>>(
    Object.fromEntries(upcomingEvents.map((e) => [e.id, e.rsvpd]))
  );

  const toggleRsvp = (id: number) =>
    setRsvpStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-grid py-12 px-6" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="badge-blue mb-3 inline-block" style={{ letterSpacing: "0.15em" }}>SCHEDULE</span>
          <h1 className="font-black text-5xl text-white mb-3">
            Game Night <span className="gradient-text-blue">Events</span>
          </h1>
          <p className="text-slate-400 max-w-xl font-sans">
            Real events, real people, real competition. RSVP to save your spot — capacity is limited.
          </p>
        </div>

        {/* Upcoming */}
        <section className="mb-16">
          <h2 className="font-extrabold text-sm mb-6" style={{ color: "#3b82f6", letterSpacing: "0.2em" }}>UPCOMING GAME NIGHTS</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => {
              const isRsvpd = rsvpStates[event.id];
              const filled  = event.totalSpots - event.spots;
              const pct     = Math.round((filled / event.totalSpots) * 100);

              return (
                <div
                  key={event.id}
                  className="card-gaming p-6 cursor-pointer"
                  style={{
                    borderColor: isRsvpd ? `${event.color}60` : "#1e1e35",
                    boxShadow:   isRsvpd ? `0 0 20px ${event.color}15` : "none",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Date block */}
                    <div className="flex-shrink-0 text-center p-4 rounded-xl min-w-[80px]"
                      style={{ backgroundColor: `${event.color}15`, border: `1px solid ${event.color}30` }}>
                      <div className="font-black text-lg leading-none" style={{ color: event.color, fontFamily: "'Nunito', sans-serif" }}>
                        {event.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div className="font-extrabold text-xs text-slate-400">{event.date.split(" ")[0].toUpperCase()}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-black text-2xl text-white">{event.title}</h3>
                          <div className="font-sans text-xs text-slate-500 mt-0.5">Hosted by {event.host}</div>
                        </div>
                        {isRsvpd && <span className="badge-blue" style={{ fontSize: "0.75rem" }}>YOU&apos;RE IN</span>}
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-4 font-sans">{event.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {[
                          { icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: event.time },
                          { icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z", text: event.location },
                        ].map(({ icon, text }) => (
                          <div key={text} className="flex items-center gap-2 text-slate-400 text-sm font-sans">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                            </svg>
                            {text}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.games.map((g) => <span key={g} className="badge-blue">{g}</span>)}
                      </div>

                      {/* Capacity */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-xs text-slate-500" style={{ letterSpacing: "0.1em" }}>CAPACITY</span>
                          <span className="font-bold text-xs font-sans" style={{ color: event.color }}>{filled}/{event.totalSpots} registered</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${event.color}, ${event.color}90)` }} />
                        </div>
                        <div className="font-sans text-xs text-slate-600 mt-1">{event.spots} spots remaining</div>
                      </div>

                      <button
                        onClick={() => toggleRsvp(event.id)}
                        className={`font-sans font-extrabold text-sm px-8 py-3 rounded-lg cursor-pointer ${isRsvpd ? "btn-secondary" : "btn-primary text-white"}`}
                        style={isRsvpd ? { borderColor: event.color, color: event.color } : {}}
                      >
                        {isRsvpd ? "Cancel RSVP" : "RSVP Now →"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="font-extrabold text-sm mb-6" style={{ color: "#8b5cf6", letterSpacing: "0.2em" }}>PAST EVENTS</h2>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="card-gaming p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-white font-sans">{event.title}</h3>
                    <span className="badge-purple">{event.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.games.map((g) => <span key={g} className="text-slate-500 font-sans text-xs">{g}</span>)}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>{event.attendees}</div>
                    <div className="font-sans text-xs text-slate-500">attended</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold font-sans" style={{ color: "#8b5cf6" }}>{event.topWinner}</div>
                    <div className="font-sans text-xs text-slate-500">top winner</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 font-sans text-sm mb-4">Not a member yet?</p>
            <Link href="/signup" className="btn-primary text-white font-sans font-extrabold px-8 py-3 rounded-xl inline-block">Join to RSVP Events</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
