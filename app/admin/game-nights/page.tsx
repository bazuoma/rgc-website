"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RgcLogo from "../../components/RgcLogo";
import { supabase } from "../../lib/supabase";
import type { GameNight } from "../../lib/gameNightTypes";

const PIN = "1234";
const AUTH_KEY = "rgc-game-night-admin";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtDate(date: string, time: string): string {
  const [yr, mo, dy] = date.split("-").map(Number);
  const [hr, mn] = time.split(":").map(Number);
  const d = new Date(yr, mo - 1, dy, hr, mn);
  const ampm = hr >= 12 ? "pm" : "am";
  const hh = ((hr + 11) % 12) + 1;
  const mm = mn === 0 ? "" : `:${String(mn).padStart(2, "0")}`;
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()} · ${hh}${mm}${ampm}`;
}

const f = "'Nunito', sans-serif";

function inputSty(extra?: React.CSSProperties): React.CSSProperties {
  return {
    fontFamily: f,
    backgroundColor: "#0a0a0f",
    border: "1px solid #1e1e35",
    color: "#e2e8f0",
    borderRadius: "10px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
    colorScheme: "dark",
    ...extra,
  };
}

interface GameNightRow extends GameNight {
  attendee_count: number;
}

export default function GameNightsAdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const [rows, setRows] = useState<GameNightRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newNight, setNewNight] = useState({ name: "", date: "", time: "", location: "" });

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === "true") setAuthed(true);
    setAuthChecked(true);
  }, []);

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

  useEffect(() => {
    if (!authed) return;

    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from("game_nights")
        .select("*")
        .order("date", { ascending: false });

      if (!data) { setLoading(false); return; }

      const counts = await Promise.all(
        (data as GameNight[]).map(async (night) => {
          const { count } = await supabase
            .from("attendees")
            .select("id", { count: "exact", head: true })
            .eq("game_night_id", night.id);
          return { id: night.id, count: count ?? 0 };
        })
      );
      const countMap = Object.fromEntries(counts.map(c => [c.id, c.count]));
      setRows((data as GameNight[]).map(n => ({ ...n, attendee_count: countMap[n.id] ?? 0 })));
      setLoading(false);
    }

    load();
  }, [authed]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data } = await supabase
      .from("game_nights")
      .insert({ ...newNight })
      .select()
      .single();
    if (data) {
      setRows(prev => [{ ...(data as GameNight), attendee_count: 0 }, ...prev]);
      setNewNight({ name: "", date: "", time: "", location: "" });
      setShowCreate(false);
    }
    setCreating(false);
  };

  if (!authChecked) return null;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0f1e", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ backgroundColor: "#12121e", border: "1px solid #1e1e3560", borderRadius: "16px", padding: "40px", maxWidth: "360px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <RgcLogo size={52} showText={false} />
          </div>
          <h1 style={{ fontFamily: f, fontWeight: 900, fontSize: "22px", color: "#e2e8f0", textAlign: "center", marginBottom: "8px" }}>
            Game Night Admin
          </h1>
          <p style={{ fontFamily: f, color: "#64748b", textAlign: "center", fontSize: "14px", marginBottom: "28px" }}>
            Enter your PIN to continue
          </p>
          <form onSubmit={handleAuth}>
            <label style={{ fontFamily: f, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "8px" }}>
              ADMIN PIN
            </label>
            <input
              type="password"
              placeholder="••••"
              value={pin}
              maxLength={6}
              onChange={e => setPin(e.target.value)}
              style={{ ...inputSty({ textAlign: "center", fontSize: "20px", letterSpacing: "0.3em", borderColor: pinError ? "#ef4444" : "#1e1e35" }), marginBottom: "8px" }}
            />
            {pinError && (
              <p style={{ fontFamily: f, color: "#ef4444", fontSize: "12px", textAlign: "center", marginBottom: "12px" }}>
                Incorrect PIN
              </p>
            )}
            <button
              type="submit"
              style={{ fontFamily: f, backgroundColor: "#8b5cf6", color: "white", border: "none", borderRadius: "10px", padding: "13px", width: "100%", fontWeight: 800, fontSize: "15px", cursor: "pointer", marginTop: "8px" }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0f1e", padding: "40px 24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <RgcLogo size={40} showText={false} />
            <div>
              <h1 style={{ fontFamily: f, fontWeight: 900, fontSize: "22px", color: "#e2e8f0" }}>Game Nights</h1>
              <p style={{ fontFamily: f, color: "#64748b", fontSize: "13px" }}>Real Gamers Club · Admin</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setShowCreate(!showCreate)}
              style={{ fontFamily: f, backgroundColor: showCreate ? "transparent" : "#3b82f6", border: `1px solid ${showCreate ? "#1e1e35" : "#3b82f6"}`, color: showCreate ? "#64748b" : "white", borderRadius: "8px", padding: "8px 16px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
            >
              {showCreate ? "Cancel" : "+ New Game Night"}
            </button>
            <button
              onClick={() => { setAuthed(false); localStorage.removeItem(AUTH_KEY); }}
              style={{ fontFamily: f, backgroundColor: "transparent", border: "1px solid #1e1e35", color: "#64748b", borderRadius: "8px", padding: "8px 12px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Create form */}
        {showCreate && (
          <div style={{ backgroundColor: "#12121e", border: "1px solid #3b82f630", borderRadius: "12px", padding: "24px", marginBottom: "28px" }}>
            <h2 style={{ fontFamily: f, fontWeight: 800, fontSize: "12px", color: "#3b82f6", letterSpacing: "0.2em", marginBottom: "20px" }}>
              CREATE GAME NIGHT
            </h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontFamily: f, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>NAME *</label>
                <input type="text" required placeholder="e.g. May Strategy Night" value={newNight.name}
                  onChange={e => setNewNight({ ...newNight, name: e.target.value })}
                  onFocus={ev => (ev.target.style.borderColor = "#3b82f6")}
                  onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                  style={inputSty()} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontFamily: f, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>DATE *</label>
                  <input type="date" required value={newNight.date}
                    onChange={e => setNewNight({ ...newNight, date: e.target.value })}
                    onFocus={ev => (ev.target.style.borderColor = "#3b82f6")}
                    onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                    style={inputSty()} />
                </div>
                <div>
                  <label style={{ fontFamily: f, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>TIME *</label>
                  <input type="time" required value={newNight.time}
                    onChange={e => setNewNight({ ...newNight, time: e.target.value })}
                    onFocus={ev => (ev.target.style.borderColor = "#3b82f6")}
                    onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                    style={inputSty()} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: f, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>LOCATION *</label>
                <input type="text" required placeholder="Venue name, address" value={newNight.location}
                  onChange={e => setNewNight({ ...newNight, location: e.target.value })}
                  onFocus={ev => (ev.target.style.borderColor = "#3b82f6")}
                  onBlur={ev => (ev.target.style.borderColor = "#1e1e35")}
                  style={inputSty()} />
              </div>
              <button
                type="submit"
                disabled={creating}
                style={{ fontFamily: f, backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "10px", padding: "13px 24px", fontWeight: 800, fontSize: "14px", cursor: creating ? "not-allowed" : "pointer", opacity: creating ? 0.7 : 1, alignSelf: "flex-start" }}
              >
                {creating ? "Creating…" : "Create Game Night"}
              </button>
            </form>
          </div>
        )}

        {/* List */}
        {loading ? (
          <p style={{ fontFamily: f, color: "#64748b", textAlign: "center", paddingTop: "60px" }}>Loading…</p>
        ) : rows.length === 0 ? (
          <p style={{ fontFamily: f, color: "#64748b", textAlign: "center", paddingTop: "60px" }}>
            No game nights yet. Create your first one!
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {rows.map(night => (
              <Link key={night.id} href={`/admin/game-nights/${night.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{ backgroundColor: "#12121e", border: "1px solid #1e1e35", borderRadius: "12px", padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#8b5cf650")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e1e35")}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                      <h3 style={{ fontFamily: f, fontWeight: 900, color: "#e2e8f0", fontSize: "17px", marginBottom: "5px" }}>
                        {night.name}
                      </h3>
                      <p style={{ fontFamily: f, color: "#8b5cf6", fontSize: "13px", fontWeight: 700, marginBottom: "3px" }}>
                        {fmtDate(night.date, night.time)}
                      </p>
                      <p style={{ fontFamily: f, color: "#64748b", fontSize: "13px" }}>
                        {night.location}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: f, fontWeight: 900, fontSize: "26px", color: "#3b82f6" }}>
                          {night.attendee_count}
                        </div>
                        <div style={{ fontFamily: f, color: "#64748b", fontSize: "11px" }}>check-ins</div>
                      </div>
                      <div style={{ color: "#8b5cf6", fontSize: "18px", fontWeight: 700 }}>→</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
