"use client";

import { useState } from "react";
import RGCLogo from "../components/RGCLogo";

const initialEvents = [
  { id: 1, title: "Strategy Night",  date: "2026-05-03", time: "18:00", location: "The Game Loft, 123 Main St, Downtown", games: ["Catan", "Ticket to Ride", "Pandemic"], spots: 20, rsvps: 12, published: true },
  { id: 2, title: "Card Game Clash", date: "2026-05-17", time: "19:00", location: "Brew & Board, 456 Oak Ave, Midtown",   games: ["Magic: The Gathering", "Exploding Kittens", "UNO Flip"], spots: 24, rsvps: 12, published: true },
  { id: 3, title: "Console Wars",    date: "2026-05-31", time: "17:00", location: "GameZone Hub, 789 Game Blvd, Eastside", games: ["Super Smash Bros Ultimate", "Mario Kart 8 Deluxe", "Rocket League"], spots: 32, rsvps: 16, published: true },
];

const memberRows = [
  { username: "D3ShawnGames",   tier: "Elite",     wins: 62, attended: 18, lastSeen: "Apr 5, 2026" },
  { username: "NightOwlNadia",  tier: "Elite",     wins: 58, attended: 16, lastSeen: "Apr 5, 2026" },
  { username: "xXGamerXx",     tier: "Pro Gamer", wins: 47, attended: 14, lastSeen: "Apr 5, 2026" },
  { username: "PixelPriya",    tier: "Pro Gamer", wins: 31, attended: 12, lastSeen: "Mar 22, 2026" },
  { username: "BoardBoss_Ray", tier: "Pro Gamer", wins: 29, attended: 11, lastSeen: "Mar 22, 2026" },
  { username: "CriticalHit_Sam", tier: "Free",    wins: 27, attended:  9, lastSeen: "Feb 15, 2026" },
];

const allVoteOptions      = ["Wingspan", "Gloomhaven", "Twilight Imperium", "Cascadia", "Spirit Island", "Arkham Horror", "Viticulture"];
const defaultActiveVotes  = ["Wingspan", "Gloomhaven", "Twilight Imperium", "Cascadia", "Spirit Island"];

const tierColors: Record<string, string> = {
  Elite:      "#3b82f6",
  "Pro Gamer":"#8b5cf6",
  Free:       "#64748b",
};

const tabs = [
  { key: "events",  label: "Manage Events",  color: "#8b5cf6" },
  { key: "create",  label: "Create Event",   color: "#3b82f6" },
  { key: "votes",   label: "Vote Options",   color: "#7c3aed" },
  { key: "members", label: "Member Stats",   color: "#93c5fd" },
] as const;
type Tab = typeof tabs[number]["key"];

export default function AdminPage() {
  const [authed,       setAuthed]       = useState(false);
  const [pin,          setPin]          = useState("");
  const [pinError,     setPinError]     = useState(false);
  const [events,       setEvents]       = useState(initialEvents);
  const [voteList,     setVoteList]     = useState(defaultActiveVotes);
  const [tab,          setTab]          = useState<Tab>("events");
  const [editingGames, setEditingGames] = useState<Record<number, string>>({});
  const [newEvent,     setNewEvent]     = useState({ title: "", date: "", time: "", location: "", games: "", spots: "20" });
  const [createOk,     setCreateOk]     = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") { setAuthed(true); setPinError(false); }
    else setPinError(true);
  };

  const togglePublish = (id: number) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, published: !e.published } : e)));

  const saveGames = (id: number) => {
    const games = (editingGames[id] || "").split(",").map((g) => g.trim()).filter(Boolean);
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, games } : e)));
    setEditingGames((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const games = newEvent.games.split(",").map((g) => g.trim()).filter(Boolean);
    setEvents((prev) => [...prev, { id: Date.now(), ...newEvent, games, spots: parseInt(newEvent.spots), rsvps: 0, published: false }]);
    setNewEvent({ title: "", date: "", time: "", location: "", games: "", spots: "20" });
    setCreateOk(true);
    setTimeout(() => setCreateOk(false), 3000);
    setTab("events");
  };

  const inputStyle = {
    backgroundColor: "#0a0a0f",
    border: "1px solid #1e1e35",
    color: "#e2e8f0",
  };
  const focusBlue  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = "#8b5cf6");
  const blurGray   = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = "#1e1e35");

  /* ── PIN screen ── */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-grid" style={{ backgroundColor: "#0a0a0f" }}>
        <div className="card-gaming p-10 max-w-sm w-full" style={{ borderColor: "#8b5cf640" }}>
          <RGCLogo size={52} showText={false} className="justify-center mb-6" />
          <h1 className="font-black text-2xl text-white text-center mb-2">Admin Access</h1>
          <p className="text-slate-500 text-sm text-center font-sans mb-8">Enter your admin PIN to continue</p>
          <form onSubmit={handleAuth}>
            <div className="mb-4">
              <label htmlFor="pin" className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>ADMIN PIN</label>
              <input
                id="pin" type="password" placeholder="••••" value={pin} maxLength={6}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg font-sans text-lg text-center text-white placeholder-slate-600 outline-none"
                style={{ ...inputStyle, borderColor: pinError ? "#ef4444" : "#1e1e35" }}
              />
              {pinError && <p className="text-red-400 font-sans text-xs mt-2 text-center">Invalid PIN. Try: 1234</p>}
            </div>
            <button type="submit" className="btn-primary w-full text-white font-sans font-extrabold py-3 rounded-lg">Access Admin Panel</button>
          </form>
          <p className="text-slate-600 font-sans text-xs text-center mt-4">Demo PIN: 1234</p>
        </div>
      </div>
    );
  }

  /* ── Main panel ── */
  return (
    <div className="min-h-screen bg-grid py-10 px-6" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <RGCLogo size={44} showText={false} />
            <div>
              <h1 className="font-black text-2xl text-white">Admin Panel</h1>
              <p className="font-sans text-xs text-slate-500">Real Gamers Club · Full Control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-blue">Logged In</span>
            <button onClick={() => setAuthed(false)} className="btn-secondary font-sans font-bold text-xs px-3 py-1.5 rounded-lg cursor-pointer">Log Out</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="font-sans font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: tab === t.key ? `${t.color}20` : "transparent",
                border:          `1px solid ${tab === t.key ? t.color : "#1e1e35"}`,
                color:           tab === t.key ? t.color : "#64748b",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Events tab ── */}
        {tab === "events" && (
          <div className="space-y-5">
            <h2 className="font-extrabold text-sm" style={{ color: "#8b5cf6", letterSpacing: "0.2em" }}>ALL EVENTS</h2>
            {events.map((event) => (
              <div key={event.id} className="card-gaming p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-white text-lg">{event.title}</h3>
                      <span className={event.published ? "badge-blue" : "badge-purple"}>{event.published ? "PUBLISHED" : "DRAFT"}</span>
                    </div>
                    <div className="font-sans text-xs text-slate-500 mb-3">{event.date} · {event.time} · {event.location}</div>

                    {/* Games edit */}
                    <div className="mb-3">
                      <label className="font-extrabold text-xs text-slate-400 block mb-1" style={{ letterSpacing: "0.1em" }}>GAMES LINEUP</label>
                      {editingGames[event.id] !== undefined ? (
                        <div className="flex gap-2">
                          <input type="text" value={editingGames[event.id]}
                            onChange={(e) => setEditingGames((p) => ({ ...p, [event.id]: e.target.value }))}
                            className="flex-1 px-3 py-2 rounded-lg font-sans text-xs text-white outline-none"
                            style={{ ...inputStyle, borderColor: "#8b5cf6" }} />
                          <button onClick={() => saveGames(event.id)} className="btn-primary text-white font-sans text-xs px-3 py-2 rounded-lg cursor-pointer">Save</button>
                          <button onClick={() => setEditingGames((p) => { const n = { ...p }; delete n[event.id]; return n; })}
                            className="btn-secondary font-sans text-xs px-3 py-2 rounded-lg cursor-pointer">Cancel</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          {event.games.map((g) => <span key={g} className="badge-blue">{g}</span>)}
                          <button onClick={() => setEditingGames((p) => ({ ...p, [event.id]: event.games.join(", ") }))}
                            className="font-sans font-bold text-xs cursor-pointer transition-colors hover:text-white" style={{ color: "#8b5cf6" }}>
                            + Edit
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Capacity */}
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-extrabold text-xs text-slate-500" style={{ letterSpacing: "0.1em" }}>RSVPS</div>
                        <div className="font-black text-white font-sans">{event.rsvps} / {event.spots}</div>
                      </div>
                      <div className="flex-1">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${Math.round((event.rsvps / event.spots) * 100)}%`, background: "linear-gradient(90deg, #8b5cf6, #3b82f6)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => togglePublish(event.id)}
                    className={`font-sans font-bold text-xs px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 min-w-[120px] ${event.published ? "btn-secondary" : "btn-blue text-white"}`}
                    style={event.published ? { borderColor: "#ef4444", color: "#ef4444" } : {}}>
                    {event.published ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Create tab ── */}
        {tab === "create" && (
          <div>
            <h2 className="font-extrabold text-sm mb-6" style={{ color: "#3b82f6", letterSpacing: "0.2em" }}>CREATE NEW EVENT</h2>
            {createOk && (
              <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: "#3b82f615", border: "1px solid #3b82f640" }}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#3b82f6" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="font-sans text-sm" style={{ color: "#93c5fd" }}>Event created! Switch to &quot;Manage Events&quot; to publish it.</span>
              </div>
            )}
            <form onSubmit={handleCreate} className="card-gaming p-8 max-w-2xl">
              <div className="space-y-5">
                {([
                  { id: "title",    label: "EVENT TITLE *",                         placeholder: "e.g. Epic Strategy Night",        key: "title" },
                  { id: "location", label: "LOCATION *",                             placeholder: "Venue name, address",             key: "location" },
                  { id: "games",    label: "GAMES LINEUP (comma-separated) *",       placeholder: "Catan, Ticket to Ride, Pandemic", key: "games" },
                ] as { id: string; label: string; placeholder: string; key: keyof typeof newEvent }[]).map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>{f.label}</label>
                    <input id={f.id} type="text" required placeholder={f.placeholder}
                      value={newEvent[f.key]}
                      onChange={(e) => setNewEvent({ ...newEvent, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg font-sans text-sm text-white placeholder-slate-600 outline-none"
                      style={inputStyle} onFocus={focusBlue} onBlur={blurGray} />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  {([
                    { id: "date",  label: "DATE *",       type: "date",  key: "date" },
                    { id: "time",  label: "START TIME *", type: "time",  key: "time" },
                  ] as { id: string; label: string; type: string; key: keyof typeof newEvent }[]).map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>{f.label}</label>
                      <input id={f.id} type={f.type} required value={newEvent[f.key]}
                        onChange={(e) => setNewEvent({ ...newEvent, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg font-sans text-sm text-white outline-none"
                        style={{ ...inputStyle, colorScheme: "dark" }} onFocus={focusBlue} onBlur={blurGray} />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="spots" className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>MAX SPOTS</label>
                  <input id="spots" type="number" min="4" max="100" value={newEvent.spots}
                    onChange={(e) => setNewEvent({ ...newEvent, spots: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg font-sans text-sm text-white outline-none"
                    style={inputStyle} onFocus={focusBlue} onBlur={blurGray} />
                </div>
              </div>
              <button type="submit" className="btn-blue w-full text-white font-sans font-extrabold py-4 rounded-xl mt-8 text-base">
                Create Event (Save as Draft)
              </button>
            </form>
          </div>
        )}

        {/* ── Votes tab ── */}
        {tab === "votes" && (
          <div>
            <h2 className="font-extrabold text-sm mb-2" style={{ color: "#7c3aed", letterSpacing: "0.2em" }}>MANAGE VOTING OPTIONS</h2>
            <p className="text-slate-500 font-sans text-xs mb-6">Toggle which games members can vote on for the next event.</p>
            <div className="card-gaming p-6 max-w-lg">
              <div className="space-y-3">
                {allVoteOptions.map((game) => {
                  const active = voteList.includes(game);
                  return (
                    <div key={game} className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: active ? "#7c3aed15" : "transparent", border: `1px solid ${active ? "#7c3aed30" : "#1e1e35"}` }}>
                      <span className="font-bold text-sm font-sans" style={{ color: active ? "#c4b5fd" : "#64748b" }}>{game}</span>
                      <button onClick={() => setVoteList((p) => active ? p.filter((g) => g !== game) : [...p, game])}
                        className="font-sans font-bold text-xs px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-200"
                        style={{ backgroundColor: active ? "#7c3aed20" : "#1e1e35", border: `1px solid ${active ? "#7c3aed" : "#334155"}`, color: active ? "#7c3aed" : "#64748b" }}>
                        {active ? "Remove" : "Add"}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid #1e1e35" }}>
                <p className="font-sans text-xs text-slate-500">Active: <span style={{ color: "#7c3aed" }}>{voteList.join(", ")}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* ── Members tab ── */}
        {tab === "members" && (
          <div>
            <h2 className="font-extrabold text-sm mb-6" style={{ color: "#93c5fd", letterSpacing: "0.2em" }}>MEMBER STATS & ATTENDANCE</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Members",    value: "1,247", color: "#8b5cf6" },
                { label: "Active This Month",value: "891",   color: "#3b82f6" },
                { label: "Avg Wins/Member",  value: "14.8",  color: "#7c3aed" },
              ].map((s) => (
                <div key={s.label} className="card-gaming p-4 text-center">
                  <div className="font-black text-2xl mb-1" style={{ color: s.color, fontFamily: "'Nunito', sans-serif" }}>{s.value}</div>
                  <div className="font-sans text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="card-gaming overflow-hidden">
              <table className="w-full text-sm">
                <thead style={{ borderBottom: "1px solid #1e1e35" }}>
                  <tr>
                    {["Member", "Tier", "Wins", "Events Attended", "Last Active"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 font-extrabold text-xs text-slate-500" style={{ letterSpacing: "0.1em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {memberRows.map((m, i) => (
                    <tr key={m.username} style={{ borderBottom: "1px solid #1e1e3510", backgroundColor: i % 2 === 0 ? "transparent" : "#ffffff03" }}>
                      <td className="px-6 py-4 font-bold text-white font-sans">{m.username}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${tierColors[m.tier]}20`, border: `1px solid ${tierColors[m.tier]}40`, color: tierColors[m.tier] }}>
                          {m.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black" style={{ color: "#8b5cf6", fontFamily: "'Nunito', sans-serif" }}>{m.wins}</td>
                      <td className="px-6 py-4 font-sans text-slate-400">{m.attended}</td>
                      <td className="px-6 py-4 font-sans text-xs text-slate-500">{m.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
