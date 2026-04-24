"use client";

import { useState } from "react";
import Link from "next/link";

const upcomingEvents = [
  {
    id: 1,
    date:  "May 3, 2026",
    time:  "6:00 PM – 10:00 PM",
    location: "The Game Loft, 123 Main St, Downtown",
    games: ["Catan", "Ticket to Ride", "Pandemic", "Terraforming Mars"],
    spots: 8, totalSpots: 20,
    color: "#2563eb",
    rsvpd: false,
  },
  {
    id: 2,
    date:  "May 17, 2026",
    time:  "7:00 PM – 11:00 PM",
    location: "Brew & Board, 456 Oak Ave, Midtown",
    games: ["Magic: The Gathering", "Exploding Kittens", "UNO Flip", "Sushi Go"],
    spots: 12, totalSpots: 24,
    color: "#f59e0b",
    rsvpd: true,
  },
  {
    id: 3,
    date:  "May 31, 2026",
    time:  "5:00 PM – 11:00 PM",
    location: "GameZone Hub, 789 Game Blvd, Eastside",
    games: ["Super Smash Bros Ultimate", "Mario Kart 8 Deluxe", "Rocket League", "Fall Guys"],
    spots: 16, totalSpots: 32,
    color: "#3b82f6",
    rsvpd: false,
  },
  {
    id: 4,
    date:  "June 14, 2026",
    time:  "6:00 PM – midnight",
    location: "The Game Loft, 123 Main St, Downtown",
    games: ["Dungeons & Dragons", "Pathfinder 2e", "Blades in the Dark"],
    spots: 6, totalSpots: 12,
    color: "#60a5fa",
    rsvpd: false,
  },
];

const pastEvents = [
  { id: 101, date: "Apr 5, 2026",  location: "The Game Loft, Downtown",   attendees: 22, games: ["Wingspan", "Azul", "Codenames"] },
  { id: 102, date: "Mar 22, 2026", location: "Brew & Board, Midtown",     attendees: 18, games: ["Poker", "Magic: The Gathering", "Phase 10"] },
  { id: 103, date: "Feb 15, 2026", location: "GameZone Hub, Eastside",    attendees: 30, games: ["Street Fighter 6", "Tekken 8", "Mortal Kombat 1"] },
];

export default function EventsPage() {
  const [rsvpStates, setRsvpStates] = useState<Record<number, boolean>>(
    Object.fromEntries(upcomingEvents.map((e) => [e.id, e.rsvpd]))
  );

  const toggleRsvp = (id: number) =>
    setRsvpStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-grid py-12 px-6" style={{ backgroundColor: "#0d0600" }}>
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
          <h2 className="font-extrabold text-sm mb-6" style={{ color: "#f59e0b", letterSpacing: "0.2em" }}>UPCOMING GAME NIGHTS</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => {
              const isRsvpd = rsvpStates[event.id];
              const filled  = event.totalSpots - event.spots;
              const pct     = Math.round((filled / event.totalSpots) * 100);

              return (
                <div
                  key={event.id}
                  className="card-gaming p-6"
                  style={{
                    borderColor: isRsvpd ? `${event.color}60` : "#2e1800",
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
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        {/* Location as primary heading */}
                        <div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={event.color} strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <h3 className="font-black text-xl text-white">{event.location}</h3>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 ml-6 text-slate-400 text-sm font-sans">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            {event.time}
                          </div>
                        </div>
                        {isRsvpd && <span className="badge-blue" style={{ fontSize: "0.75rem" }}>YOU&apos;RE IN</span>}
                      </div>

                      {/* Games */}
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
          <h2 className="font-extrabold text-sm mb-6" style={{ color: "#2563eb", letterSpacing: "0.2em" }}>PAST EVENTS</h2>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="card-gaming p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f59e0b" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <h3 className="font-bold text-white font-sans">{event.location}</h3>
                    <span className="badge-orange">{event.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-6">
                    {event.games.map((g) => <span key={g} className="text-slate-500 font-sans text-xs">{g}</span>)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>{event.attendees}</div>
                  <div className="font-sans text-xs text-slate-500">attended</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 font-sans text-sm mb-4">Not on the list yet?</p>
            <Link href="/signup" className="btn-primary text-white font-sans font-extrabold px-8 py-3 rounded-xl inline-block">Join to RSVP Events</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
