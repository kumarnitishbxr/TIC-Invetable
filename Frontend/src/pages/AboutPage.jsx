
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users, Heart, Target, Mail, Award, TrendingUp,
  Sparkles, ArrowRight, CheckCircle,
} from "lucide-react";
import Footer from '../components/layouts/Footer'

const aboutCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --neon-green:  #00ffb3;
    --neon-blue:   #00c8ff;
    --neon-purple: #b06dff;
    --bg-base:     #080b12;
    --bg-card:     #0d1120;
    --bg-card2:    #111827;
    --border:      rgba(255,255,255,0.07);
    --border-glow: rgba(0,255,179,0.25);
    --text:        #e8edf5;
    --muted:       #6b7a99;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg-base);
    color: var(--text);
    overflow-x: hidden;
    font-size: 15px;
    line-height: 1.65;
  }

  /* ── ABOUT PAGE ── */
  .ab-main {
    min-height: 100vh;
    background: var(--bg-base);
    color: var(--text);
    padding-top: 64px;
  }

  /* container */
  .ab-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .ab-section   { padding: 90px 0; }

  /* ── HERO ── */
  .ab-hero {
    position: relative; overflow: hidden;
    padding: 80px 2rem 90px;
  }
  .ab-hero-orb {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.3; pointer-events: none;
  }
  .ab-orb-1 { width: 500px; height: 500px; top: -140px; left: -120px; background: radial-gradient(circle, #00ffb340, transparent 70%); }
  .ab-orb-2 { width: 380px; height: 380px; bottom: -100px; right: -80px; background: radial-gradient(circle, #b06dff35, transparent 70%); }
  .ab-grid-lines {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .ab-hero-inner {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    display: grid; gap: 3.5rem;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  @media (max-width: 900px) {
    .ab-hero-inner { grid-template-columns: 1fr; }
    .ab-stats-grid { grid-template-columns: 1fr 1fr !important; }
  }

  /* badge */
  .ab-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 16px; border-radius: 100px;
    border: 1px solid rgba(0,255,179,0.3);
    background: rgba(0,255,179,0.07);
    color: var(--neon-green); font-size: 12.5px; font-weight: 500;
    margin-bottom: 1.5rem; letter-spacing: 0.5px;
  }
  .ab-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--neon-green);
    box-shadow: 0 0 6px var(--neon-green);
    animation: abPulse 2s infinite;
  }
  @keyframes abPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes abFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* heading */
  .ab-hero-heading {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.5vw, 4.6rem);
    font-weight: 800; line-height: 1.08; letter-spacing: -2px;
    margin-bottom: 1.4rem;
    animation: abFadeUp 0.6s ease both;
  }
  .ab-plain-text {
    background: linear-gradient(135deg, #e8edf5, #a0aec0);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .ab-grad-text {
    background: linear-gradient(135deg, var(--neon-green) 0%, var(--neon-blue) 50%, var(--neon-purple) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .ab-hero-desc {
    font-size: 1.05rem; color: var(--muted); max-width: 520px;
    margin-bottom: 2rem; line-height: 1.75;
    animation: abFadeUp 0.6s 0.1s ease both;
  }
  .ab-ctas {
    display: flex; gap: 1rem; flex-wrap: wrap;
    animation: abFadeUp 0.6s 0.2s ease both;
  }

  /* buttons */
  .ab-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    color: #070b12; font-weight: 700; font-size: 14.5px;
    border: none; cursor: pointer; font-family: var(--font-body);
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(0,255,179,0.3);
    text-decoration: none;
  }
  .ab-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,255,179,0.5); }
  .ab-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.03);
    color: var(--text); font-weight: 600; font-size: 14.5px;
    cursor: pointer; font-family: var(--font-body);
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    text-decoration: none;
  }
  .ab-btn-outline:hover { border-color: rgba(0,255,179,0.4); background: rgba(0,255,179,0.05); transform: translateY(-2px); }

  /* stats grid */
  .ab-stats-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
    animation: abFadeUp 0.6s 0.15s ease both;
  }
  .ab-stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px; padding: 1.6rem;
    text-align: center;
    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .ab-stat-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,255,179,0), rgba(0,200,255,0));
    transition: background 0.4s;
    border-radius: 20px;
  }
  .ab-stat-card:hover { transform: translateY(-5px); border-color: var(--border-glow); box-shadow: 0 16px 40px rgba(0,255,179,0.1); }
  .ab-stat-card:hover::before { background: linear-gradient(135deg, rgba(0,255,179,0.06), rgba(0,200,255,0.06)); }
  .ab-stat-icon {
    width: 48px; height: 48px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 0.85rem;
    background: linear-gradient(135deg, rgba(0,255,179,0.12), rgba(0,200,255,0.12));
  }
  .ab-stat-icon svg { width: 22px; height: 22px; color: var(--neon-green); }
  .ab-stat-num {
    font-family: var(--font-display); font-size: 2rem; font-weight: 800;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .ab-stat-label { font-size: 12.5px; color: var(--muted); margin-top: 3px; }

  /* ── SECTION HEADERS ── */
  .ab-section-header { text-align: center; margin-bottom: 3.5rem; }
  .ab-section-tag {
    display: inline-block; font-size: 11.5px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--neon-green); margin-bottom: 0.75rem;
  }
  .ab-section-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 2.7rem);
    font-weight: 800; letter-spacing: -1px; line-height: 1.15;
    margin-bottom: 0.75rem;
  }
  .ab-section-sub { color: var(--muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

  /* ── MISSION CARDS ── */
  .ab-mission-grid { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  .ab-mission-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px; padding: 2rem;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    position: relative; overflow: hidden;
  }
  .ab-mission-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,200,255,0.1);
    border-color: rgba(0,200,255,0.25);
  }
  .ab-mission-icon {
    width: 60px; height: 60px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
  }
  .ab-mission-icon svg { width: 28px; height: 28px; color: #070b12; }
  .ab-mission-title {
    font-family: var(--font-display); font-size: 1.2rem; font-weight: 800;
    margin-bottom: 0.65rem;
  }
  .ab-mission-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

  /* ── VALUES / WHY SECTION ── */
  .ab-values-wrap {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px; padding: 3rem 2.5rem;
  }
  .ab-values-title {
    font-family: var(--font-display); font-size: 1.9rem; font-weight: 800;
    text-align: center; margin-bottom: 2.5rem; letter-spacing: -0.5px;
  }
  .ab-values-grid { display: grid; gap: 1rem; grid-template-columns: 1fr 1fr; }
  @media (max-width: 700px) { .ab-values-grid { grid-template-columns: 1fr; } }
  .ab-value-item {
    display: flex; gap: 1rem; align-items: flex-start;
    padding: 1.1rem 1.2rem; border-radius: 14px;
    border: 1px solid transparent;
    transition: background 0.25s, border-color 0.25s, transform 0.25s;
  }
  .ab-value-item:hover {
    background: rgba(0,255,179,0.04);
    border-color: rgba(0,255,179,0.15);
    transform: translateX(4px);
  }
  .ab-value-icon {
    width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    box-shadow: 0 0 14px rgba(0,255,179,0.25);
  }
  .ab-value-icon svg { width: 18px; height: 18px; color: #070b12; }
  .ab-value-title { font-weight: 700; font-size: 14.5px; margin-bottom: 4px; }
  .ab-value-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ── CTA SECTION ── */
  .ab-cta-wrap {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #080b12, #0d1526, #080b12);
    border: 1px solid rgba(0,200,255,0.12);
    border-radius: 24px; padding: 3.5rem 3rem;
  }
  .ab-cta-orb {
    position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; opacity: 0.18;
  }
  .ab-cta-orb-1 { width: 320px; height: 320px; top: -80px; left: -60px; background: var(--neon-green); }
  .ab-cta-orb-2 { width: 280px; height: 280px; bottom: -80px; right: -60px; background: var(--neon-blue); }
  .ab-cta-inner {
    position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 2rem;
  }
  .ab-cta-title {
    font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.5px;
  }
  .ab-cta-sub { color: var(--muted); font-size: 15px; max-width: 440px; }
  .ab-cta-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .ab-btn-purple {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    color: #fff; font-weight: 700; font-size: 14.5px;
    border: none; cursor: pointer; font-family: var(--font-body);
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(0,200,255,0.25);
    text-decoration: none;
  }
  .ab-btn-purple:hover { transform: translateY(-2px); box-shadow: 0 0 34px rgba(0,200,255,0.45); }
`;

const STATS = [
  { title: "Active Jobs",  value: "1.2K+", Icon: Target    },
  { title: "Workers",      value: "8.5K+", Icon: Users     },
  { title: "Employers",    value: "500+",  Icon: Award     },
  { title: "Success Rate", value: "98%",   Icon: TrendingUp },
];

const MISSION = [
  {
    Icon: Target,
    title: "Fair Pay",
    desc: "We promote transparent wage listings and on-time payments so workers receive fair compensation for their labor.",
    gradient: "linear-gradient(135deg, #00ffb3, #00c8ff)",
    glow: "rgba(0,255,179,0.3)",
  },
  {
    Icon: Users,
    title: "Local Trust",
    desc: "Verified employers, simple KYC and community ratings — building trust at the village level.",
    gradient: "linear-gradient(135deg, #00c8ff, #b06dff)",
    glow: "rgba(0,200,255,0.3)",
  },
  {
    Icon: Heart,
    title: "Worker-First",
    desc: "Low-connectivity support (SMS flows), multilingual UI and simple design for first-time users.",
    gradient: "linear-gradient(135deg, #b06dff, #00c8ff)",
    glow: "rgba(176,109,255,0.3)",
  },
];

const VALUES = [
  { title: "Verified Opportunities", desc: "All jobs are verified and employers are background-checked" },
  { title: "Instant Payments",       desc: "Get paid on time through secure digital payment methods" },
  { title: "Dispute Resolution",     desc: "Fair mediation system to resolve any work-related issues" },
  { title: "Local Focus",            desc: "Find work near you and build connections in your community" },
  { title: "No Hidden Fees",         desc: "Transparent pricing with no surprise charges or deductions" },
  { title: "24/7 Support",           desc: "Help is always available when you need it" },
];

export default function AboutPage() {
  useEffect(() => {
    const id = "kaamsetu-about-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = aboutCSS;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <main className="ab-main">

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-grid-lines" />
        <div className="ab-hero-orb ab-orb-1" />
        <div className="ab-hero-orb ab-orb-2" />

        <div className="ab-hero-inner">
          {/* Left */}
          <div>
            <div className="ab-badge">
              <div className="ab-badge-dot" />
              Building Trust, Creating Opportunity
            </div>

            <h1 className="ab-hero-heading">
              <span className="ab-plain-text">About</span>
              <br />
              <span className="ab-grad-text">KaamSetu</span>
            </h1>

            <p className="ab-hero-desc">
              KaamSetu is built to make local daily-wage work discoverable, safe and fair.
              We design for low-bandwidth environments, simple onboarding, and transparent
              payments so workers and employers can transact with trust.
            </p>

            <div className="ab-ctas">
              <Link to="/jobpage" className="ab-btn-primary">
                Browse Jobs <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
              <Link to="/contactpage" className="ab-btn-outline">
                Contact Support
              </Link>
            </div>
          </div>

          {/* Right — stats */}
          <div className="ab-stats-grid">
            {STATS.map(({ title, value, Icon }) => (
              <div key={title} className="ab-stat-card">
                <div className="ab-stat-icon">
                  <Icon style={{ width: 22, height: 22, color: "var(--neon-green)" }} />
                </div>
                <div className="ab-stat-num">{value}</div>
                <div className="ab-stat-label">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="ab-section">
        <div className="ab-container">
          <div className="ab-section-header">
            <div className="ab-section-tag">Purpose</div>
            <div className="ab-section-title">Our Mission</div>
            <div className="ab-section-sub">
              Connecting honest work with local workers through transparent, accessible technology
            </div>
          </div>

          <div className="ab-mission-grid">
            {MISSION.map(({ Icon, title, desc, gradient, glow }) => (
              <div key={title} className="ab-mission-card">
                <div
                  className="ab-mission-icon"
                  style={{ background: gradient, boxShadow: `0 0 20px ${glow}` }}
                >
                  <Icon style={{ width: 28, height: 28, color: "#070b12" }} />
                </div>
                <div className="ab-mission-title">{title}</div>
                <div className="ab-mission-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="ab-section" style={{ paddingTop: 0 }}>
        <div className="ab-container">
          <div className="ab-values-wrap">
            <div className="ab-values-title">Why Choose KaamSetu?</div>
            <div className="ab-values-grid">
              {VALUES.map(({ title, desc }) => (
                <div key={title} className="ab-value-item">
                  <div className="ab-value-icon">
                    <CheckCircle style={{ width: 18, height: 18, color: "#070b12" }} />
                  </div>
                  <div>
                    <div className="ab-value-title">{title}</div>
                    <div className="ab-value-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ab-section" style={{ paddingTop: 0 }}>
        <div className="ab-container">
          <div className="ab-cta-wrap">
            <div className="ab-cta-orb ab-cta-orb-1" />
            <div className="ab-cta-orb ab-cta-orb-2" />
            <div className="ab-cta-inner">
              <div>
                <div className="ab-cta-title">Have Questions or Want to Partner?</div>
                <div className="ab-cta-sub">
                  We love collaborating with NGOs, local governments and community groups.
                </div>
              </div>
              <div className="ab-cta-btns">
                <button className="ab-btn-purple">
                  <Mail style={{ width: 18, height: 18 }} /> Email Us
                </button>
                <Link to="/contactpage" className="ab-btn-outline">
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}