"use client";

import { useState } from "react";
import Link from "next/link";
import RGCLogo from "../components/RGCLogo";

const gameInterests = [
  "Board Games", "Card Games", "Video Games", "Tabletop RPGs",
  "Strategy Games", "Party Games", "Fighting Games", "All of the above",
];

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", city: "" });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (item: string) =>
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-grid" style={{ backgroundColor: "#0a0a0f" }}>
        <div className="card-gaming p-12 max-w-md w-full text-center" style={{ borderColor: "#2563eb40", boxShadow: "0 0 60px #2563eb10" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#2563eb20", border: "2px solid #2563eb" }}>
            <svg className="w-10 h-10" fill="none" stroke="#2563eb" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <RGCLogo size={48} showText={false} className="justify-center mb-4" />
          <h2 className="font-black text-3xl text-white mb-3">You&apos;re on the list!</h2>
          <p className="text-slate-400 mb-2 font-sans">
            Welcome, <span className="font-bold" style={{ color: "#f59e0b" }}>{form.name || "gamer"}</span>. We&apos;ll send game night details to{" "}
            <span className="font-bold" style={{ color: "#60a5fa" }}>{form.email}</span>.
          </p>
          <p className="text-slate-500 text-sm mb-8 font-sans">Stay tuned — your first game night invite is coming soon.</p>
          <Link href="/events" className="btn-primary text-white font-sans font-extrabold px-8 py-3 rounded-xl inline-block">
            Browse Upcoming Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid py-16 px-6" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <RGCLogo size={64} showText={false} className="justify-center mb-5" />
          <span className="badge-blue mb-4 inline-block" style={{ letterSpacing: "0.15em" }}>FREE · NO PAYMENT NEEDED</span>
          <h1 className="font-black text-4xl text-white mb-3">Join Real Gamers Club</h1>
          <p className="text-slate-400 font-sans">
            Get game night invites, event updates, and community news straight to your inbox.
          </p>
        </div>

        {/* Form card */}
        <div className="card-gaming p-8" style={{ borderColor: "#2563eb30" }}>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>
                YOUR NAME *
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Marcus, Priya, DeShawn…"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg font-sans text-sm text-white placeholder-slate-600 outline-none transition-colors"
                style={{ backgroundColor: "#0a0a0f", border: "1px solid #1c1f35" }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e)  => (e.target.style.borderColor = "#1c1f35")}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>
                EMAIL ADDRESS *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="gamer@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg font-sans text-sm text-white placeholder-slate-600 outline-none transition-colors"
                style={{ backgroundColor: "#0a0a0f", border: "1px solid #1c1f35" }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e)  => (e.target.style.borderColor = "#1c1f35")}
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block font-extrabold text-xs text-slate-400 mb-2" style={{ letterSpacing: "0.1em" }}>
                YOUR CITY <span className="text-slate-600 font-normal">(optional)</span>
              </label>
              <input
                id="city"
                type="text"
                placeholder="Atlanta, Chicago, LA…"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 rounded-lg font-sans text-sm text-white placeholder-slate-600 outline-none transition-colors"
                style={{ backgroundColor: "#0a0a0f", border: "1px solid #1c1f35" }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e)  => (e.target.style.borderColor = "#1c1f35")}
              />
            </div>

            {/* Game interests */}
            <div>
              <label className="block font-extrabold text-xs text-slate-400 mb-3" style={{ letterSpacing: "0.1em" }}>
                WHAT DO YOU PLAY? <span className="text-slate-600 font-normal">(select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {gameInterests.map((item) => {
                  const sel = selectedInterests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className="px-3 py-1.5 rounded-lg font-sans font-bold text-xs transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: sel ? "#2563eb20" : "#0a0a0f",
                        border:          `1px solid ${sel ? "#2563eb" : "#1c1f35"}`,
                        color:           sel ? "#60a5fa" : "#64748b",
                        boxShadow:       sel ? "0 0 8px #2563eb20" : "none",
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div style={{ borderTop: "1px solid #1c1f35" }} className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full text-white font-sans font-extrabold py-4 rounded-xl text-base cursor-pointer"
              >
                Subscribe to the Newsletter →
              </button>
              <p className="text-slate-600 text-xs text-center mt-3 font-sans">
                No spam. No payments. Unsubscribe anytime.
              </p>
            </div>
          </form>
        </div>

        {/* Already subscribed */}
        <p className="text-center text-slate-600 text-sm mt-6 font-sans">
          Already subscribed?{" "}
          <Link href="/events" className="font-bold transition-colors hover:text-white cursor-pointer" style={{ color: "#2563eb" }}>
            Check out upcoming events
          </Link>
        </p>

      </div>
    </div>
  );
}
