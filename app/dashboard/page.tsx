"use client";

import { useState } from "react";
import RGCLogo from "../components/RGCLogo";

const memberStats = {
  username: "xXGamerXx",
  tier: "Pro Gamer",
  joined: "Jan 2025",
  gamesAttended: 14,
  totalWins: 47,
  winRate: 34,
  favoriteGame: "Catan",
  rank: 3,
  totalMembers: 1247,
};

const leaderboard = [
  { rank: 1, username: "D3ShawnGames",   wins: 62, tier: "Elite",      streak: 5 },
  { rank: 2, username: "NightOwlNadia",  wins: 58, tier: "Elite",      streak: 3 },
  { rank: 3, username: "xXGamerXx",     wins: 47, tier: "Pro Gamer",  streak: 2, isMe: true },
  { rank: 4, username: "PixelPriya",    wins: 31, tier: "Pro Gamer",  streak: 1 },
  { rank: 5, username: "BoardBoss_Ray", wins: 29, tier: "Pro Gamer",  streak: 0 },
  { rank: 6, username: "CriticalHit_Sam", wins: 27, tier: "Free",     streak: 0 },
  { rank: 7, username: "GG_Alexis",     wins: 24, tier: "Free",       streak: 2 },
  { rank: 8, username: "TheStrategist", wins: 21, tier: "Pro Gamer",  streak: 0 },
];

const winHistory = [
  { date: "Apr 5, 2026",  event: "Board Game Bonanza",    game: "Catan",               placement: "1st", wins: 2 },
  { date: "Mar 22, 2026", event: "March Madness Card Night", game: "Magic: The Gathering", placement: "3rd", wins: 1 },
  { date: "Feb 15, 2026", event: "Fighting Game Fest",    game: "Street Fighter 6",    placement: "1st", wins: 3 },
  { date: "Jan 18, 2026", event: "January Kickoff",       game: "Ticket to Ride",      placement: "2nd", wins: 1 },
  { date: "Dec 7, 2025",  event: "Holiday Game Night",    game: "Pandemic",            placement: "1st", wins: 2 },
];

const gameVotes = [
  { game: "Wingspan",          votes: 34, total: 78, color: "#8b5cf6" },
  { game: "Gloomhaven",        votes: 28, total: 78, color: "#3b82f6" },
  { game: "Twilight Imperium", votes:  8, total: 78, color: "#7c3aed" },
  { game: "Cascadia",          votes:  5, total: 78, color: "#93c5fd" },
  { game: "Spirit Island",     votes:  3, total: 78, color: "#c4b5fd" },
];

const tierColors: Record<string, string> = {
  Elite:      "#3b82f6",
  "Pro Gamer":"#8b5cf6",
  Free:       "#64748b",
};

const rankGradients = [
  "linear-gradient(135deg,#f59e0b,#d97706)",
  "linear-gradient(135deg,#94a3b8,#64748b)",
  "linear-gradient(135deg,#cd7c2f,#92400e)",
];

export default function DashboardPage() {
  const [votedFor, setVotedFor] = useState<string | null>("Wingspan");

  return (
    <div className="min-h-screen bg-grid py-10 px-6" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xl"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", color: "white", fontFamily: "'Nunito', sans-serif" }}>
              {memberStats.username[0]}
            </div>
            <div>
              <h1 className="font-black text-2xl text-white">{memberStats.username}</h1>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#8b5cf620", border: "1px solid #8b5cf640", color: "#a78bfa" }}>
                  {memberStats.tier}
                </span>
                <span className="text-slate-500 font-sans text-xs">Member since {memberStats.joined}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RGCLogo size={32} showText={false} />
            <span className="font-sans text-xs text-slate-500">Rank #{memberStats.rank} of {memberStats.totalMembers.toLocaleString()}</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Game Nights", value: memberStats.gamesAttended, color: "#8b5cf6", sub: "attended" },
            { label: "Total Wins",  value: memberStats.totalWins,    color: "#3b82f6", sub: "all time" },
            { label: "Win Rate",    value: `${memberStats.winRate}%`, color: "#7c3aed", sub: "of rounds" },
            { label: "Fav Game",    value: memberStats.favoriteGame, color: "#93c5fd", sub: "most played" },
          ].map((s) => (
            <div key={s.label} className="card-gaming p-5 text-center" style={{ borderColor: `${s.color}30` }}>
              <div className="font-black text-2xl md:text-3xl mb-1" style={{ color: s.color, textShadow: `0 0 15px ${s.color}50`, fontFamily: "'Nunito', sans-serif" }}>
                {s.value}
              </div>
              <div className="font-bold text-white text-sm">{s.label}</div>
              <div className="font-sans text-xs text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <div className="card-gaming p-5">
              <h2 className="font-extrabold text-sm mb-5" style={{ color: "#3b82f6", letterSpacing: "0.2em" }}>LEADERBOARD</h2>
              <div className="space-y-2">
                {leaderboard.map((m) => (
                  <div key={m.username}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor: m.isMe ? "#8b5cf615" : "transparent",
                      border: m.isMe ? "1px solid #8b5cf630" : "1px solid transparent",
                    }}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0"
                      style={{ background: m.rank <= 3 ? rankGradients[m.rank - 1] : "#1e1e35", color: m.rank <= 3 ? "white" : "#64748b", fontFamily: "'Nunito', sans-serif" }}>
                      {m.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate font-sans" style={{ color: m.isMe ? "#a78bfa" : "#e2e8f0" }}>
                        {m.username}{m.isMe && <span className="text-xs text-slate-500 ml-1">(you)</span>}
                      </div>
                      <div className="font-sans text-xs" style={{ color: tierColors[m.tier] }}>{m.tier}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-sm font-sans" style={{ color: "#8b5cf6" }}>{m.wins}</div>
                      <div className="font-sans text-xs text-slate-500">wins</div>
                    </div>
                    {m.streak > 0 && <span className="badge-blue flex-shrink-0">{m.streak}🔥</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Upcoming RSVPs */}
            <div className="card-gaming p-5">
              <h2 className="font-extrabold text-sm mb-4" style={{ color: "#3b82f6", letterSpacing: "0.2em" }}>YOUR UPCOMING EVENTS</h2>
              <div className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "#3b82f610", border: "1px solid #3b82f630" }}>
                <div>
                  <div className="font-bold text-white font-sans">Card Game Clash</div>
                  <div className="font-sans text-xs text-slate-400 mt-0.5">May 17, 2026 · 7:00 PM · Brew & Board, Midtown</div>
                </div>
                <span className="badge-blue flex-shrink-0">RSVP&apos;d</span>
              </div>
            </div>

            {/* Game Voting */}
            <div className="card-gaming p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-extrabold text-sm" style={{ color: "#8b5cf6", letterSpacing: "0.2em" }}>VOTE: NEXT GAME NIGHT</h2>
                  <p className="text-slate-500 text-xs mt-0.5 font-sans">May 31 event · 78 votes cast · closes May 28</p>
                </div>
                {votedFor && <span className="badge-purple">Voted: {votedFor}</span>}
              </div>
              <div className="space-y-3">
                {gameVotes.map((item) => {
                  const pct     = Math.round((item.votes / item.total) * 100);
                  const isVoted = votedFor === item.game;
                  return (
                    <button key={item.game} onClick={() => setVotedFor(isVoted ? null : item.game)}
                      className="w-full text-left cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm font-sans" style={{ color: isVoted ? item.color : "#e2e8f0" }}>{item.game}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs text-slate-500">{item.votes} votes</span>
                          <span className="font-black text-xs font-sans" style={{ color: item.color }}>{pct}%</span>
                          {isVoted && (
                            <svg className="w-4 h-4" fill={item.color} viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{
                          width: `${pct}%`,
                          background: isVoted ? item.color : `${item.color}60`,
                          boxShadow: isVoted ? `0 0 8px ${item.color}60` : "none",
                        }} />
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-slate-600 font-sans text-xs mt-4">Click a game to cast your vote.</p>
            </div>

            {/* Win History */}
            <div className="card-gaming p-5">
              <h2 className="font-extrabold text-sm mb-5" style={{ color: "#7c3aed", letterSpacing: "0.2em" }}>WIN HISTORY</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e1e35" }}>
                      {["Date", "Event", "Game", "Place", "Wins"].map((h) => (
                        <th key={h} className="text-left pb-3 font-extrabold text-xs text-slate-500 pr-4" style={{ letterSpacing: "0.1em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {winHistory.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1e1e3510" }}>
                        <td className="py-3 pr-4 font-sans text-xs text-slate-500">{row.date}</td>
                        <td className="py-3 pr-4 font-sans text-white text-xs">{row.event}</td>
                        <td className="py-3 pr-4"><span className="badge-blue">{row.game}</span></td>
                        <td className="py-3 pr-4 font-black text-xs"
                          style={{ color: row.placement === "1st" ? "#f59e0b" : row.placement === "2nd" ? "#94a3b8" : "#cd7c2f", fontFamily: "'Nunito', sans-serif" }}>
                          {row.placement}
                        </td>
                        <td className="py-3 font-black text-sm" style={{ color: "#8b5cf6", fontFamily: "'Nunito', sans-serif" }}>+{row.wins}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
