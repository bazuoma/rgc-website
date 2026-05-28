"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import RgcLogo from "../../../components/RgcLogo";
import { supabase } from "../../../lib/supabase";
import type { GameNight, Game, Attendee, GroupWithMembers } from "../../../lib/gameNightTypes";

const PIN = "1234";
const AUTH_KEY = "rgc-game-night-admin";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtDateTime(date: string, time: string): string {
  const [yr, mo, dy] = date.split("-").map(Number);
  const [hr, mn] = time.split(":").map(Number);
  const d = new Date(yr, mo - 1, dy, hr, mn);
  const ampm = hr >= 12 ? "pm" : "am";
  const hh = ((hr + 11) % 12) + 1;
  const mm = mn === 0 ? "" : `:${String(mn).padStart(2, "0")}`;
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()} · ${hh}${mm}${ampm}`;
}

function fmtTime(ts: string): string {
  const d = new Date(ts);
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "pm" : "am";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, "0")}${ampm}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const f = "'Nunito', sans-serif";

function inputSty(extra?: React.CSSProperties): React.CSSProperties {
  return {
    fontFamily: f, backgroundColor: "#0a0a0f", border: "1px solid #1e1e35",
    color: "#e2e8f0", borderRadius: "8px", padding: "10px 14px", outline: "none",
    fontSize: "14px", colorScheme: "dark" as const, ...extra,
  };
}

function SmallBtn({ onClick, danger, children }: { onClick: () => void; danger?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: f, backgroundColor: "transparent", cursor: "pointer", fontWeight: 700,
      fontSize: "12px", padding: "5px 10px", borderRadius: "6px",
      border: `1px solid ${danger ? "#ef444440" : "#1e1e35"}`,
      color: danger ? "#ef4444" : "#64748b",
    }}>
      {children}
    </button>
  );
}

type Tab = "qr" | "games" | "attendees" | "groups";

const TABS: { key: Tab; label: string; color: string }[] = [
  { key: "qr",        label: "QR Code",   color: "#8b5cf6" },
  { key: "games",     label: "Games",     color: "#3b82f6" },
  { key: "attendees", label: "Attendees", color: "#7c3aed" },
  { key: "groups",    label: "Groups",    color: "#93c5fd" },
];

export default function GameNightDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Auth
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // UI
  const [activeTab, setActiveTab] = useState<Tab>("qr");
  const [joinUrl, setJoinUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data
  const [gameNight, setGameNight] = useState<GameNight | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);

  // Forms
  const [newGame, setNewGame] = useState({ name: "", player_count: "4" });
  const [addingGame, setAddingGame] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", max_size: "4" });
  const [addingGroup, setAddingGroup] = useState(false);
  const [randomizing, setRandomizing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === "true") setAuthed(true);
    setAuthChecked(true);
    setJoinUrl(`${window.location.origin}/join/${id}`);
  }, [id]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN) {
      setAuthed(true);
      setPinError(false);
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      setPinError(true);
    }
  };

  // Load groups + members
  async function loadGroups() {
    const { data: gData } = await supabase
      .from("groups")
      .select("*")
      .eq("game_night_id", id)
      .order("created_at");

    if (!gData || gData.length === 0) { setGroups([]); return; }

    const groupIds = (gData as GroupWithMembers[]).map(g => g.id);
    const { data: mData } = await supabase
      .from("group_members")
      .select("id, group_id, attendee_id, attendees(name)")
      .in("group_id", groupIds);

    type MemberRow = { id: string; group_id: string; attendee_id: string; attendees: { name: string } | null };
    const members = (mData ?? []) as unknown as MemberRow[];

    setGroups((gData as GroupWithMembers[]).map(g => ({
      ...g,
      members: members
        .filter(m => m.group_id === g.id)
        .map(m => ({ id: m.id, attendee_id: m.attendee_id, attendee_name: m.attendees?.name ?? "" })),
    })));
  }

  // Initial fetch + realtime
  useEffect(() => {
    if (!authed) return;

    let cancelled = false;

    async function init() {
      setLoading(true);
      const [nightRes, gamesRes, attendeesRes, groupsRes] = await Promise.all([
        supabase.from("game_nights").select("*").eq("id", id).single(),
        supabase.from("games").select("*").eq("game_night_id", id).order("created_at"),
        supabase.from("attendees").select("*").eq("game_night_id", id).order("created_at"),
        supabase.from("groups").select("*").eq("game_night_id", id).order("created_at"),
      ]);

      if (cancelled) return;

      if (nightRes.data) setGameNight(nightRes.data as GameNight);
      if (gamesRes.data) setGames(gamesRes.data as Game[]);
      if (attendeesRes.data) setAttendees(attendeesRes.data as Attendee[]);

      const gData = (groupsRes.data ?? []) as GroupWithMembers[];
      if (gData.length > 0) {
        const groupIds = gData.map(g => g.id);
        const { data: mData } = await supabase
          .from("group_members")
          .select("id, group_id, attendee_id, attendees(name)")
          .in("group_id", groupIds);

        type MemberRow = { id: string; group_id: string; attendee_id: string; attendees: { name: string } | null };
        const members = (mData ?? []) as unknown as MemberRow[];
        setGroups(gData.map(g => ({
          ...g,
          members: members
            .filter(m => m.group_id === g.id)
            .map(m => ({ id: m.id, attendee_id: m.attendee_id, attendee_name: m.attendees?.name ?? "" })),
        })));
      } else {
        setGroups([]);
      }

      if (!cancelled) setLoading(false);
    }

    init();

    const channel = supabase
      .channel(`attendees-${id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "attendees",
        filter: `game_night_id=eq.${id}`,
      }, payload => {
        if (!cancelled) setAttendees(prev => [...prev, payload.new as Attendee]);
      })
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [authed, id]);

  // Games
  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingGame(true);
    const { data } = await supabase
      .from("games")
      .insert({ game_night_id: id, name: newGame.name.trim(), player_count: parseInt(newGame.player_count) })
      .select()
      .single();
    if (data) { setGames(prev => [...prev, data as Game]); setNewGame({ name: "", player_count: "4" }); }
    setAddingGame(false);
  };

  const handleDeleteGame = async (gameId: string) => {
    await supabase.from("games").delete().eq("id", gameId);
    setGames(prev => prev.filter(g => g.id !== gameId));
    setGroups(prev => prev.map(g => g.game_id === gameId ? { ...g, game_id: null } : g));
  };

  // Groups
  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingGroup(true);
    const { data } = await supabase
      .from("groups")
      .insert({ game_night_id: id, name: newGroup.name.trim(), max_size: parseInt(newGroup.max_size) })
      .select()
      .single();
    if (data) { setGroups(prev => [...prev, { ...(data as GroupWithMembers), members: [] }]); setNewGroup({ name: "", max_size: "4" }); }
    setAddingGroup(false);
  };

  const handleDeleteGroup = async (groupId: string) => {
    await supabase.from("groups").delete().eq("id", groupId);
    setGroups(prev => prev.filter(g => g.id !== groupId));
  };

  const handleAssignGame = async (groupId: string, gameId: string) => {
    const val = gameId === "" ? null : gameId;
    await supabase.from("groups").update({ game_id: val }).eq("id", groupId);
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, game_id: val } : g));
  };

  const handleRandomize = async () => {
    if (groups.length === 0 || attendees.length === 0) return;
    setRandomizing(true);
    const groupIds = groups.map(g => g.id);
    await supabase.from("group_members").delete().in("group_id", groupIds);
    const shuffled = shuffle(attendees);
    const inserts: { group_id: string; attendee_id: string }[] = [];
    let idx = 0;
    for (const group of groups) {
      const chunk = shuffled.slice(idx, idx + group.max_size);
      chunk.forEach(a => inserts.push({ group_id: group.id, attendee_id: a.id }));
      idx += group.max_size;
    }
    if (inserts.length > 0) await supabase.from("group_members").insert(inserts);
    await loadGroups();
    setRandomizing(false);
  };

  const downloadQR = () => {
    const wrapper = document.getElementById("qr-wrapper");
    const svg = wrapper?.querySelector("svg");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rgc-qr.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── PIN gate ──
  if (!authChecked) return null;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0f1e", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ backgroundColor: "#12121e", border: "1px solid #1e1e3560", borderRadius: "16px", padding: "40px", maxWidth: "360px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <RgcLogo size={52} showText={false} />
          </div>
          <h1 style={{ fontFamily: f, fontWeight: 900, fontSize: "22px", color: "#e2e8f0", textAlign: "center", marginBottom: "24px" }}>
            Game Night Admin
          </h1>
          <form onSubmit={handleAuth}>
            <label style={{ fontFamily: f, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "8px" }}>ADMIN PIN</label>
            <input
              type="password" placeholder="••••" value={pin} maxLength={6}
              onChange={e => setPin(e.target.value)}
              style={{ ...inputSty({ textAlign: "center", fontSize: "20px", letterSpacing: "0.3em", width: "100%", borderColor: pinError ? "#ef4444" : "#1e1e35" }), marginBottom: "8px" }}
            />
            {pinError && <p style={{ fontFamily: f, color: "#ef4444", fontSize: "12px", textAlign: "center", marginBottom: "8px" }}>Incorrect PIN</p>}
            <button type="submit" style={{ fontFamily: f, backgroundColor: "#8b5cf6", color: "white", border: "none", borderRadius: "10px", padding: "13px", width: "100%", fontWeight: 800, fontSize: "15px", cursor: "pointer", marginTop: "8px" }}>
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main layout ──
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0f1e", padding: "36px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Back + header */}
        <div style={{ marginBottom: "8px" }}>
          <Link href="/admin/game-nights" style={{ fontFamily: f, color: "#64748b", fontSize: "13px", textDecoration: "none", fontWeight: 700 }}>
            ← All Game Nights
          </Link>
        </div>
        {loading ? (
          <p style={{ fontFamily: f, color: "#64748b", padding: "60px 0", textAlign: "center" }}>Loading…</p>
        ) : (
          <>
            <div style={{ marginBottom: "28px" }}>
              <h1 style={{ fontFamily: f, fontWeight: 900, fontSize: "24px", color: "#e2e8f0", marginBottom: "4px" }}>
                {gameNight?.name ?? "Game Night"}
              </h1>
              {gameNight && (
                <p style={{ fontFamily: f, color: "#8b5cf6", fontSize: "14px", fontWeight: 700 }}>
                  {fmtDateTime(gameNight.date, gameNight.time)} · {gameNight.location}
                </p>
              )}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                  fontFamily: f, fontWeight: 700, fontSize: "13px", padding: "8px 18px", borderRadius: "8px", cursor: "pointer",
                  backgroundColor: activeTab === t.key ? `${t.color}20` : "transparent",
                  border: `1px solid ${activeTab === t.key ? t.color : "#1e1e35"}`,
                  color: activeTab === t.key ? t.color : "#64748b",
                }}>
                  {t.label}
                  {t.key === "attendees" && (
                    <span style={{ marginLeft: "6px", backgroundColor: "#3b82f620", border: "1px solid #3b82f640", color: "#3b82f6", borderRadius: "10px", padding: "1px 7px", fontSize: "11px" }}>
                      {attendees.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ── QR CODE TAB ── */}
            {activeTab === "qr" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                <p style={{ fontFamily: f, color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>
                  Display this QR code at your event so guests can check in.
                </p>
                <div id="qr-wrapper" style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", display: "inline-block" }}>
                  <QRCode value={joinUrl} size={220} />
                </div>
                <p style={{ fontFamily: f, color: "#64748b", fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em", maxWidth: "340px", textAlign: "center", wordBreak: "break-all" }}>
                  {joinUrl}
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={copyLink} style={{ fontFamily: f, backgroundColor: copied ? "#8b5cf620" : "#8b5cf6", color: copied ? "#8b5cf6" : "white", border: `1px solid ${copied ? "#8b5cf6" : "transparent"}`, borderRadius: "8px", padding: "10px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button onClick={downloadQR} style={{ fontFamily: f, backgroundColor: "transparent", color: "#64748b", border: "1px solid #1e1e35", borderRadius: "8px", padding: "10px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                    Download QR
                  </button>
                </div>
              </div>
            )}

            {/* ── GAMES TAB ── */}
            {activeTab === "games" && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                  {games.length === 0 && (
                    <p style={{ fontFamily: f, color: "#64748b", fontSize: "14px" }}>No games added yet.</p>
                  )}
                  {games.map(game => (
                    <div key={game.id} style={{ backgroundColor: "#12121e", border: "1px solid #1e1e35", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontFamily: f, fontWeight: 800, color: "#e2e8f0", fontSize: "15px" }}>{game.name}</span>
                        <span style={{ marginLeft: "10px", fontFamily: f, fontSize: "12px", fontWeight: 700, color: "#3b82f6", backgroundColor: "#3b82f615", border: "1px solid #3b82f630", borderRadius: "10px", padding: "2px 9px" }}>
                          {game.player_count} players
                        </span>
                      </div>
                      <SmallBtn onClick={() => handleDeleteGame(game.id)} danger>Remove</SmallBtn>
                    </div>
                  ))}
                </div>

                <div style={{ backgroundColor: "#12121e", border: "1px solid #3b82f630", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontFamily: f, fontWeight: 800, fontSize: "12px", color: "#3b82f6", letterSpacing: "0.2em", marginBottom: "16px" }}>ADD GAME</h3>
                  <form onSubmit={handleAddGame} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <input
                      type="text" required placeholder="Game name" value={newGame.name}
                      onChange={e => setNewGame({ ...newGame, name: e.target.value })}
                      onFocus={ev => (ev.target.style.borderColor = "#3b82f6")}
                      onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                      style={{ ...inputSty({ flex: "1", minWidth: "180px" }) }}
                    />
                    <input
                      type="number" required min="2" max="20" placeholder="# players" value={newGame.player_count}
                      onChange={e => setNewGame({ ...newGame, player_count: e.target.value })}
                      onFocus={ev => (ev.target.style.borderColor = "#3b82f6")}
                      onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                      style={{ ...inputSty({ width: "110px" }) }}
                    />
                    <button type="submit" disabled={addingGame} style={{ fontFamily: f, backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: 700, fontSize: "13px", cursor: addingGame ? "not-allowed" : "pointer", opacity: addingGame ? 0.7 : 1, whiteSpace: "nowrap" }}>
                      {addingGame ? "Adding…" : "Add Game"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ── ATTENDEES TAB ── */}
            {activeTab === "attendees" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <div style={{ fontFamily: f, fontWeight: 900, fontSize: "28px", color: "#7c3aed" }}>{attendees.length}</div>
                  <div>
                    <div style={{ fontFamily: f, fontWeight: 700, color: "#e2e8f0", fontSize: "14px" }}>Check-ins</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                      <span style={{ fontFamily: f, color: "#64748b", fontSize: "12px" }}>Live</span>
                    </div>
                  </div>
                </div>

                {attendees.length === 0 ? (
                  <div style={{ backgroundColor: "#12121e", border: "1px solid #1e1e35", borderRadius: "10px", padding: "40px", textAlign: "center" }}>
                    <p style={{ fontFamily: f, color: "#64748b", fontSize: "14px" }}>No check-ins yet. Guests scan the QR code to join.</p>
                  </div>
                ) : (
                  <div style={{ backgroundColor: "#12121e", border: "1px solid #1e1e35", borderRadius: "10px", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #1e1e35" }}>
                          {["Name", "Email / Phone", "Check-in Time"].map(h => (
                            <th key={h} style={{ fontFamily: f, fontWeight: 800, fontSize: "11px", color: "#64748b", letterSpacing: "0.1em", textAlign: "left", padding: "12px 18px" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {attendees.map((a, i) => (
                          <tr key={a.id} style={{ borderBottom: "1px solid #1e1e3510", backgroundColor: i % 2 === 0 ? "transparent" : "#ffffff03" }}>
                            <td style={{ fontFamily: f, fontWeight: 700, color: "#e2e8f0", padding: "12px 18px", fontSize: "14px" }}>{a.name}</td>
                            <td style={{ fontFamily: f, color: "#94a3b8", padding: "12px 18px", fontSize: "13px" }}>{a.email ?? a.phone ?? "—"}</td>
                            <td style={{ fontFamily: f, color: "#64748b", padding: "12px 18px", fontSize: "12px" }}>{fmtTime(a.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── GROUPS TAB ── */}
            {activeTab === "groups" && (
              <div>
                {/* Controls */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                  <p style={{ fontFamily: f, color: "#64748b", fontSize: "13px" }}>
                    {attendees.length} attendees · {groups.length} groups
                  </p>
                  <button
                    onClick={handleRandomize}
                    disabled={randomizing || groups.length === 0 || attendees.length === 0}
                    style={{ fontFamily: f, backgroundColor: groups.length === 0 || attendees.length === 0 ? "#1e1e35" : "#8b5cf6", color: groups.length === 0 || attendees.length === 0 ? "#64748b" : "white", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: 800, fontSize: "13px", cursor: randomizing || groups.length === 0 || attendees.length === 0 ? "not-allowed" : "pointer", opacity: randomizing ? 0.7 : 1 }}
                  >
                    {randomizing ? "Shuffling…" : "🎲 Randomize Attendees"}
                  </button>
                </div>

                {/* Group cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
                  {groups.length === 0 && (
                    <p style={{ fontFamily: f, color: "#64748b", fontSize: "14px" }}>No groups yet. Add one below.</p>
                  )}
                  {groups.map(group => (
                    <div key={group.id} style={{ backgroundColor: "#12121e", border: "1px solid #1e1e35", borderRadius: "10px", padding: "18px 20px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px", gap: "10px", flexWrap: "wrap" }}>
                        <div>
                          <span style={{ fontFamily: f, fontWeight: 900, color: "#e2e8f0", fontSize: "16px" }}>{group.name}</span>
                          <span style={{ marginLeft: "8px", fontFamily: f, fontSize: "12px", color: "#64748b" }}>
                            (max {group.max_size})
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <select
                            value={group.game_id ?? ""}
                            onChange={e => handleAssignGame(group.id, e.target.value)}
                            style={{ fontFamily: f, backgroundColor: "#0a0a0f", border: "1px solid #1e1e35", color: group.game_id ? "#93c5fd" : "#64748b", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontWeight: 700, cursor: "pointer", colorScheme: "dark", outline: "none" }}
                          >
                            <option value="">Assign game…</option>
                            {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                          </select>
                          <SmallBtn onClick={() => handleDeleteGroup(group.id)} danger>Delete</SmallBtn>
                        </div>
                      </div>

                      {group.members.length === 0 ? (
                        <p style={{ fontFamily: f, color: "#475569", fontSize: "12px" }}>
                          No members assigned — click Randomize.
                        </p>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {group.members.map(m => (
                            <span key={m.id} style={{ fontFamily: f, backgroundColor: "#8b5cf615", border: "1px solid #8b5cf630", color: "#a78bfa", borderRadius: "20px", padding: "3px 10px", fontSize: "13px", fontWeight: 700 }}>
                              {m.attendee_name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add group form */}
                <div style={{ backgroundColor: "#12121e", border: "1px solid #93c5fd30", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontFamily: f, fontWeight: 800, fontSize: "12px", color: "#93c5fd", letterSpacing: "0.2em", marginBottom: "16px" }}>ADD GROUP</h3>
                  <form onSubmit={handleAddGroup} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <input
                      type="text" required placeholder="Group name (e.g. Table 1)" value={newGroup.name}
                      onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
                      onFocus={ev => (ev.target.style.borderColor = "#93c5fd")}
                      onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                      style={{ ...inputSty({ flex: "1", minWidth: "180px" }) }}
                    />
                    <input
                      type="number" required min="2" max="20" placeholder="Max size" value={newGroup.max_size}
                      onChange={e => setNewGroup({ ...newGroup, max_size: e.target.value })}
                      onFocus={ev => (ev.target.style.borderColor = "#93c5fd")}
                      onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                      style={{ ...inputSty({ width: "110px" }) }}
                    />
                    <button type="submit" disabled={addingGroup} style={{ fontFamily: f, backgroundColor: "#93c5fd20", color: "#93c5fd", border: "1px solid #93c5fd40", borderRadius: "8px", padding: "10px 18px", fontWeight: 700, fontSize: "13px", cursor: addingGroup ? "not-allowed" : "pointer", opacity: addingGroup ? 0.7 : 1, whiteSpace: "nowrap" }}>
                      {addingGroup ? "Adding…" : "Add Group"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
