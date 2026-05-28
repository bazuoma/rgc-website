"use client";

import { useState, useEffect } from "react";
import RgcLogo from "../../components/RgcLogo";
import { supabase } from "../../lib/supabase";
import type { GameNight } from "../../lib/gameNightTypes";

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

const base = {
  fontFamily: "'Nunito', sans-serif",
} as const;

const inputStyle: React.CSSProperties = {
  ...base,
  backgroundColor: "#0a0a0f",
  border: "1px solid #1e1e35",
  color: "#e2e8f0",
  borderRadius: "10px",
  padding: "13px 16px",
  width: "100%",
  outline: "none",
  fontSize: "15px",
};

export default function JoinPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [gameNight, setGameNight] = useState<GameNight | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("game_nights")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) setGameNight(data as GameNight);
        else setNotFound(true);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) {
      setError("Please provide an email address or phone number.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/join/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  const pageWrap: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#0b0f1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  };

  const card: React.CSSProperties = {
    backgroundColor: "#12121e",
    border: "1px solid #1e1e35",
    borderRadius: "16px",
    padding: "40px 36px",
    maxWidth: "440px",
    width: "100%",
  };

  if (!gameNight && !notFound) {
    return (
      <div style={pageWrap}>
        <p style={{ ...base, color: "#64748b" }}>Loading…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={pageWrap}>
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <RgcLogo size={44} showText={false} />
          </div>
          <h1 style={{ ...base, color: "#e2e8f0", textAlign: "center", fontWeight: 900, fontSize: "20px" }}>
            Game Night Not Found
          </h1>
          <p style={{ ...base, color: "#64748b", textAlign: "center", marginTop: "8px", fontSize: "14px" }}>
            This link may be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={pageWrap}>
        <div style={card}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              backgroundColor: "#8b5cf620", border: "2px solid #8b5cf6",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 style={{ ...base, color: "#e2e8f0", fontSize: "24px", fontWeight: 900, marginBottom: "10px" }}>
              You&apos;re in!
            </h1>
            <p style={{ ...base, color: "#a78bfa", fontWeight: 800, marginBottom: "4px", fontSize: "16px" }}>
              {gameNight!.name}
            </p>
            <p style={{ ...base, color: "#64748b", fontSize: "14px" }}>
              {fmtDateTime(gameNight!.date, gameNight!.time)}
            </p>
            <p style={{ ...base, color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
              {gameNight!.location}
            </p>
            <p style={{ ...base, color: "#475569", fontSize: "13px", marginTop: "20px" }}>
              See you there — let&apos;s play!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <RgcLogo size={44} showText={false} />
        </div>

        <h1 style={{ ...base, color: "#e2e8f0", fontSize: "22px", fontWeight: 900, textAlign: "center", marginBottom: "6px" }}>
          {gameNight!.name}
        </h1>
        <p style={{ ...base, color: "#8b5cf6", fontSize: "13px", fontWeight: 800, textAlign: "center", marginBottom: "4px" }}>
          {fmtDateTime(gameNight!.date, gameNight!.time)}
        </p>
        <p style={{ ...base, color: "#64748b", fontSize: "13px", textAlign: "center", marginBottom: "28px" }}>
          {gameNight!.location}
        </p>

        <div style={{ borderTop: "1px solid #1e1e35", marginBottom: "24px" }} />

        <p style={{ ...base, color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
          Sign in below to join tonight&apos;s game night.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ ...base, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>
              YOUR NAME *
            </label>
            <input
              type="text"
              required
              placeholder="First &amp; last name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#8b5cf6")}
              onBlur={e => (e.target.style.borderColor = "#1e1e35")}
            />
          </div>

          <div>
            <label style={{ ...base, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#3b82f6")}
              onBlur={e => (e.target.style.borderColor = "#1e1e35")}
            />
          </div>

          <div>
            <label style={{ ...base, display: "block", color: "#64748b", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "6px" }}>
              PHONE NUMBER
            </label>
            <input
              type="tel"
              placeholder="(555) 000-0000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = "#3b82f6")}
              onBlur={e => (e.target.style.borderColor = "#1e1e35")}
            />
          </div>

          <p style={{ ...base, color: "#475569", fontSize: "12px", marginTop: "-4px" }}>
            * Provide email or phone number
          </p>

          {error && (
            <div style={{ backgroundColor: "#ef444410", border: "1px solid #ef444430", borderRadius: "8px", padding: "10px 14px" }}>
              <p style={{ ...base, color: "#ef4444", fontSize: "13px" }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !name.trim()}
            style={{
              ...base,
              backgroundColor: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              fontWeight: 800,
              fontSize: "15px",
              cursor: submitting || !name.trim() ? "not-allowed" : "pointer",
              opacity: submitting || !name.trim() ? 0.6 : 1,
              marginTop: "4px",
            }}
          >
            {submitting ? "Joining…" : "Count Me In!"}
          </button>
        </form>
      </div>
    </div>
  );
}
