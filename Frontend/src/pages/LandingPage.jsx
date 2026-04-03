
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import { listJobs } from "../store/slices/jobSlice";


const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --neon-green: #00ffb3;
    --neon-blue: #00c8ff;
    --neon-purple: #b06dff;
    --bg-base: #080b12;
    --bg-card: #0d1120;
    --bg-card2: #111827;
    --border: rgba(255,255,255,0.07);
    --border-glow: rgba(0,255,179,0.25);
    --text: #e8edf5;
    --muted: #6b7a99;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
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

  /* ── NAVBAR ── */
  .wl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    backdrop-filter: blur(20px);
    background: rgba(8,11,18,0.75);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 64px;
    display: flex; align-items: center; gap: 2rem;
  }
  .wl-nav-logo {
    font-family: var(--font-display);
    font-size: 1.3rem; font-weight: 800;
    background: linear-gradient(90deg, var(--neon-green), var(--neon-blue));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    white-space: nowrap; text-decoration: none; letter-spacing: -0.5px;
  }
  .wl-nav-search {
    flex: 1; max-width: 340px;
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0 14px; height: 38px;
    transition: border-color 0.2s;
  }
  .wl-nav-search:focus-within { border-color: var(--border-glow); }
  .wl-nav-search input {
    background: transparent; border: none; outline: none;
    color: var(--text); font-family: var(--font-body); font-size: 13.5px;
    width: 100%;
  }
  .wl-nav-search input::placeholder { color: var(--muted); }
  .wl-nav-links {
    display: flex; align-items: center; gap: 1.5rem; margin-left: auto;
  }
  .wl-nav-links a {
    color: var(--muted); font-size: 13.5px; text-decoration: none;
    transition: color 0.2s;
  }
  .wl-nav-links a:hover { color: var(--text); }
  .wl-btn-nav {
    padding: 7px 18px; border-radius: 8px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    color: #080b12 !important; font-weight: 700; font-size: 13px;
    cursor: pointer; border: none; font-family: var(--font-body);
    transition: opacity 0.2s, transform 0.15s;
  }
  .wl-btn-nav:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── HERO ── */
  .wl-hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 2rem 80px;
    overflow: hidden;
    position: relative;
  }
  .wl-hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

  /* Scrolling image strips */
  .wl-img-strips {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; gap: 0;
    overflow: hidden;
  }
  .wl-img-strip {
    display: flex; gap: 12px;
    padding: 6px 0;
    will-change: transform;
    flex-shrink: 0;
  }
  .wl-strip-ltr  { animation: wlScrollLTR 40s linear infinite; }
  .wl-strip-rtl  { animation: wlScrollRTL 50s linear infinite; }
  .wl-strip-ltr2 { animation: wlScrollLTR 35s linear infinite; }
  @keyframes wlScrollLTR {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes wlScrollRTL {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  .wl-strip-img {
    width: 220px; height: 150px; border-radius: 14px;
    object-fit: cover; flex-shrink: 0;
    opacity: 0.55;
    filter: saturate(0.7) brightness(0.6);
    border: 1px solid rgba(255,255,255,0.06);
    transition: opacity 0.3s;
  }

  /* Dark gradient overlay over the strips so text is legible */
  .wl-img-overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(to bottom, #080b12 0%, rgba(8,11,18,0.55) 25%, rgba(8,11,18,0.55) 75%, #080b12 100%),
      linear-gradient(to right,  #080b12 0%, transparent 12%, transparent 88%, #080b12 100%);
    z-index: 1;
  }

  .wl-grid-lines {
    position: absolute; inset: 0; z-index: 2;
    background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .wl-orb {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35; z-index: 2;
  }
  .wl-orb-1 { width: 520px; height: 520px; top: -120px; left: -100px; background: radial-gradient(circle, #00ffb350, transparent 70%); }
  .wl-orb-2 { width: 400px; height: 400px; bottom: -80px; right: -80px; background: radial-gradient(circle, #b06dff40, transparent 70%); }
  .wl-orb-3 { width: 300px; height: 300px; top: 30%; left: 55%; background: radial-gradient(circle, #00c8ff30, transparent 70%); }
  .wl-hero-inner {
    position: relative; z-index: 1;
    max-width: 900px; margin: 0 auto; text-align: center;
    animation: wlFadeUp 0.7s ease both;
  }
  @keyframes wlFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes wlPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .wl-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 16px; border-radius: 100px;
    border: 1px solid rgba(0,255,179,0.3);
    background: rgba(0,255,179,0.07);
    color: var(--neon-green); font-size: 12.5px; font-weight: 500;
    margin-bottom: 2rem; letter-spacing: 0.5px;
  }
  .wl-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--neon-green);
    box-shadow: 0 0 6px var(--neon-green);
    animation: wlPulse 2s infinite;
  }
  .wl-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4.8rem);
    font-weight: 800; line-height: 1.1;
    letter-spacing: -2px;
    margin-bottom: 1.5rem;
  }
  .wl-grad-text {
    background: linear-gradient(135deg, var(--neon-green) 0%, var(--neon-blue) 50%, var(--neon-purple) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .wl-hero p {
    font-size: 1.1rem; color: var(--muted); max-width: 560px;
    margin: 0 auto 2.5rem;
  }
  .wl-hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .wl-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    color: #070b12; font-weight: 700; font-size: 14.5px;
    cursor: pointer; border: none; font-family: var(--font-body);
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(0,255,179,0.3);
    text-decoration: none;
  }
  .wl-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,255,179,0.5); }
  .wl-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.03);
    color: var(--text); font-weight: 600; font-size: 14.5px;
    cursor: pointer; font-family: var(--font-body);
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    text-decoration: none;
  }
  .wl-btn-outline:hover { border-color: rgba(0,255,179,0.4); background: rgba(0,255,179,0.05); transform: translateY(-2px); }
  .wl-hero-stats {
    display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;
    margin-top: 4rem; padding-top: 2.5rem;
    border-top: 1px solid var(--border);
  }
  .wl-stat-num {
    font-family: var(--font-display); font-size: 1.9rem; font-weight: 800;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .wl-stat-label { font-size: 12.5px; color: var(--muted); margin-top: 2px; text-align: center; }

  /* ── FLASH BANNER ── */
  .wl-flash-banner {
    background: linear-gradient(90deg, #0d1120, #1a0d2e, #0d1120);
    border-top: 1px solid rgba(176,109,255,0.2);
    border-bottom: 1px solid rgba(176,109,255,0.2);
    padding: 1.2rem 2rem;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    flex-wrap: wrap;
  }
  .wl-flash-label {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-display); font-size: 1.05rem; font-weight: 800;
    color: var(--neon-purple); letter-spacing: 0.5px;
  }
  .wl-flash-msg { color: var(--muted); font-size: 13.5px; }
  .wl-flash-msg strong { color: var(--text); }
  .wl-countdown { display: flex; gap: 8px; align-items: center; }
  .wl-cd-block {
    background: rgba(176,109,255,0.12);
    border: 1px solid rgba(176,109,255,0.25);
    border-radius: 8px;
    padding: 4px 10px; text-align: center; min-width: 46px;
  }
  .wl-cd-num {
    font-family: var(--font-display); font-size: 1.2rem; font-weight: 800;
    color: var(--neon-purple); display: block;
  }
  .wl-cd-unit { font-size: 10px; color: var(--muted); letter-spacing: 0.5px; }
  .wl-cd-sep { color: var(--neon-purple); font-weight: 700; font-size: 1.1rem; }

  /* ── LAYOUT ── */
  .wl-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .wl-section-pad { padding: 90px 0; }
  .wl-section-header { text-align: center; margin-bottom: 3.5rem; }
  .wl-section-tag {
    display: inline-block; font-size: 11.5px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--neon-green); margin-bottom: 0.75rem;
  }
  .wl-section-title {
    font-family: var(--font-display); font-size: clamp(1.8rem, 3.5vw, 2.7rem);
    font-weight: 800; letter-spacing: -1px; line-height: 1.15;
    margin-bottom: 0.75rem;
  }
  .wl-section-sub { color: var(--muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

  /* ── CATEGORIES ── */
  .wl-cat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
  .wl-cat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem 1rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    text-decoration: none;
    color: var(--text);
  }
  .wl-cat-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-glow);
    box-shadow: 0 12px 40px rgba(0,255,179,0.12);
  }
  .wl-cat-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 0.85rem; font-size: 1.5rem;
    transition: transform 0.25s;
  }
  .wl-cat-card:hover .wl-cat-icon { transform: scale(1.12); }
  .wl-cat-name { font-size: 13px; font-weight: 600; }
  .wl-cat-count { font-size: 11.5px; color: var(--muted); margin-top: 2px; }

  /* ── FEATURED JOBS ── */
  .wl-prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
  .wl-prod-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    position: relative;
  }
  .wl-prod-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,200,255,0.12);
    border-color: rgba(0,200,255,0.3);
  }
  .wl-prod-img {
    height: 180px; display: flex; align-items: center; justify-content: center;
    font-size: 4rem; position: relative; overflow: hidden;
  }
  .wl-prod-img::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(13,17,32,0.8));
  }
  .wl-prod-badge {
    position: absolute; top: 12px; left: 12px; z-index: 1;
    padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;
    letter-spacing: 0.3px;
  }
  .wl-badge-new { background: rgba(0,255,179,0.15); color: var(--neon-green); border: 1px solid rgba(0,255,179,0.3); }
  .wl-badge-sale { background: rgba(255,75,75,0.15); color: #ff6b6b; border: 1px solid rgba(255,75,75,0.3); }
  .wl-badge-hot { background: rgba(255,165,0,0.15); color: #ffaa44; border: 1px solid rgba(255,165,0,0.3); }
  .wl-prod-body { padding: 1rem 1.1rem 1.2rem; }
  .wl-prod-category { font-size: 11.5px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.8px; }
  .wl-prod-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.3; }
  .wl-prod-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 0.75rem; }
  .wl-stars { color: #ffaa44; font-size: 12px; }
  .wl-rating-count { font-size: 12px; color: var(--muted); }
  .wl-prod-footer { display: flex; align-items: center; justify-content: space-between; }
  .wl-prod-price { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; }
  .wl-price-old { font-size: 12px; color: var(--muted); text-decoration: none; margin-left: 6px; }
  .wl-btn-add {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    border: none; color: #080b12; font-size: 1.2rem; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 12px rgba(0,255,179,0.3);
  }
  .wl-btn-add:hover { transform: scale(1.12); box-shadow: 0 0 20px rgba(0,255,179,0.5); }
  .wl-btn-add.added { background: linear-gradient(135deg, #00ffb3, #00c8ff); }

  /* ── TRENDING ── */
  .wl-trend-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
  .wl-trend-card {
    background: var(--bg-card2);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1rem; display: flex; align-items: center; gap: 0.85rem;
    cursor: pointer; transition: border-color 0.25s, transform 0.25s;
  }
  .wl-trend-card:hover { border-color: rgba(176,109,255,0.35); transform: translateX(4px); }
  .wl-trend-emoji { font-size: 1.8rem; width: 46px; text-align: center; flex-shrink: 0; }
  .wl-trend-name { font-weight: 600; font-size: 13.5px; line-height: 1.3; }
  .wl-trend-price { font-size: 12.5px; color: var(--neon-green); font-weight: 700; margin-top: 2px; }
  .wl-trend-rank { margin-left: auto; font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: rgba(255,255,255,0.07); flex-shrink: 0; }

  /* ── TRUST ── */
  .wl-trust-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.25rem; }
  .wl-trust-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.6rem 1.3rem;
    transition: border-color 0.25s, transform 0.25s;
  }
  .wl-trust-card:hover { border-color: var(--border-glow); transform: translateY(-3px); }
  .wl-trust-icon {
    width: 48px; height: 48px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center; font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  .wl-trust-title { font-weight: 700; font-size: 14.5px; margin-bottom: 5px; }
  .wl-trust-desc { font-size: 13px; color: var(--muted); line-height: 1.55; }

  /* ── NEWSLETTER ── */
  .wl-newsletter {
    background: linear-gradient(135deg, #0d1526, #121a2e);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 24px;
    padding: 3.5rem 2rem;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .wl-newsletter::before {
    content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .wl-nl-title { font-family: var(--font-display); font-size: 1.9rem; font-weight: 800; margin-bottom: 0.6rem; letter-spacing: -0.5px; }
  .wl-nl-sub { color: var(--muted); font-size: 14.5px; margin-bottom: 1.75rem; }
  .wl-nl-form { display: flex; gap: 10px; max-width: 440px; margin: 0 auto; }
  .wl-nl-input {
    flex: 1; padding: 12px 18px; border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text); font-family: var(--font-body); font-size: 14px;
    outline: none; transition: border-color 0.2s;
  }
  .wl-nl-input:focus { border-color: rgba(0,200,255,0.4); }
  .wl-nl-input::placeholder { color: var(--muted); }
  .wl-nl-btn {
    padding: 12px 22px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    color: #fff; font-weight: 700; font-size: 14px;
    border: none; cursor: pointer; font-family: var(--font-body);
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(0,200,255,0.25);
  }
  .wl-nl-btn:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(0,200,255,0.4); }
  .wl-nl-hint { font-size: 12px; color: var(--muted); margin-top: 0.75rem; }

  /* ── FOOTER ── */
  .wl-footer {
    border-top: 1px solid var(--border);
    padding: 2.5rem 2rem 2rem;
  }
  .wl-footer-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1.5rem;
  }
  .wl-footer-logo {
    font-family: var(--font-display); font-size: 1.15rem; font-weight: 800;
    background: linear-gradient(90deg, var(--neon-green), var(--neon-blue));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    display: block; margin-bottom: 4px;
  }
  .wl-footer-tagline { font-size: 12.5px; color: var(--muted); }
  .wl-footer-links { display: flex; gap: 1.75rem; }
  .wl-footer-links a { color: var(--muted); font-size: 13px; text-decoration: none; transition: color 0.2s; }
  .wl-footer-links a:hover { color: var(--text); }
  .wl-footer-copy { font-size: 12px; color: var(--muted); }
`;

const CATEGORIES = [
  { icon: "🌾", name: "Agriculture", count: "320 jobs", bg: "rgba(0,255,179,0.1)" },
  { icon: "🏗️", name: "Construction", count: "218 jobs", bg: "rgba(0,200,255,0.1)" },
  { icon: "🚚", name: "Transport", count: "145 jobs", bg: "rgba(176,109,255,0.1)" },
  { icon: "🍳", name: "Domestic", count: "189 jobs", bg: "rgba(255,165,0,0.1)" },
  { icon: "🔧", name: "Repairs", count: "97 jobs", bg: "rgba(255,100,100,0.1)" },
  { icon: "💊", name: "Healthcare", count: "62 jobs", bg: "rgba(0,255,179,0.1)" },
  { icon: "🎓", name: "Teaching", count: "44 jobs", bg: "rgba(0,200,255,0.1)" },
  { icon: "🏪", name: "Retail", count: "113 jobs", bg: "rgba(176,109,255,0.1)" },
];

const TRENDING = [
  { emoji: "🔨", name: "Carpenter Helper", price: "₹650/day" },
  { emoji: "🚛", name: "Truck Loader", price: "₹550/day" },
  { emoji: "🍳", name: "Cook Assistant", price: "₹400/day" },
  { emoji: "🌿", name: "Garden Worker", price: "₹480/day" },
  { emoji: "🎓", name: "Home Tutor", price: "₹300/hr" },
  { emoji: "🛡️", name: "Security Guard", price: "₹750/day" },
  { emoji: "💊", name: "Nursing Aide", price: "₹500/day" },
  { emoji: "🏪", name: "Shop Assistant", price: "₹350/day" },
];

const TRUST = [
  { icon: "✅", bg: "rgba(0,255,179,0.1)", color: "var(--neon-green)", title: "Verified Employers", desc: "Every employer is KYC-verified before they can post jobs. Zero scams, guaranteed." },
  { icon: "💳", bg: "rgba(0,200,255,0.1)", color: "var(--neon-blue)", title: "Secure Payments", desc: "Wages are tracked and dispute-protected. You get paid what was agreed." },
  { icon: "⚖️", bg: "rgba(176,109,255,0.1)", color: "var(--neon-purple)", title: "Fair Mediation", desc: "Trained mediators resolve conflicts between workers and employers fairly." },
  { icon: "📍", bg: "rgba(255,165,0,0.12)", color: "#ffaa44", title: "Local First", desc: "Jobs are shown by distance. Find work within walking distance of your home." },
  { icon: "⭐", bg: "rgba(255,100,100,0.1)", color: "#ff7070", title: "Ratings System", desc: "Both workers and employers rate each other after every job. Stay accountable." },
  { icon: "🤝", bg: "rgba(0,255,179,0.1)", color: "var(--neon-green)", title: "One-tap Apply", desc: "No paperwork. Apply in seconds with your verified profile, get hired today." },
];

function useCountdown(initialSeconds) {
  const [total, setTotal] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setTotal((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return { h, m, s };
}

export default function LandingPage() {

  useEffect(() => {
    const styleId = "worklink-global-styles";
    if (!document.getElementById(styleId)) {
      const el = document.createElement("style");
      el.id = styleId;
      el.textContent = globalCSS;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  const { h, m, s } = useCountdown(4 * 3600 + 27 * 60 + 13);
  const [addedJobs, setAddedJobs] = useState({});
  const [nlEmail, setNlEmail] = useState("");
  const [nlDone, setNlDone] = useState(false);
  

  const handleAdd = (id) => {
    setAddedJobs((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setAddedJobs((prev) => ({ ...prev, [id]: false })), 1500);
  };

  const handleSubscribe = () => {
    if (nlEmail.trim()) {
      setNlDone(true);
      setNlEmail("");
      setTimeout(() => setNlDone(false), 3000);
    }
  };

  const dispatch = useDispatch();
  const { jobs = [], loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text)" }}>

      <section className="wl-hero">
        <div className="wl-hero-bg">

          {/* Scrolling image strips */}
          <div className="wl-img-strips">

            <div className="wl-img-strip wl-strip-ltr">
              {[
                "https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=440&h=300&fit=crop",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="wl-strip-img" draggable="false" />
              ))}
            </div>

            <div className="wl-img-strip wl-strip-rtl">
              {[
                "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=440&h=300&fit=crop",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="wl-strip-img" draggable="false" />
              ))}
            </div>

            <div className="wl-img-strip wl-strip-ltr2">
              {[
                "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=440&h=300&fit=crop",
                "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=440&h=300&fit=crop",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="wl-strip-img" draggable="false" />
              ))}
            </div>
          </div>

          <div className="wl-img-overlay" />

          <div className="wl-grid-lines" />
          <div className="wl-orb wl-orb-1" />
          <div className="wl-orb wl-orb-2" />
          <div className="wl-orb wl-orb-3" />
        </div>
        <div className="wl-hero-inner">
          <div className="wl-badge">
            <div className="wl-badge-dot" />
            Trusted by 8,500+ Workers across India
          </div>
          <h1>
            Empowering Rural Workers,<br />
            <span className="wl-grad-text">Building Tomorrow</span>
          </h1>
          <p>
            Find verified nearby jobs, apply instantly, and resolve disputes through our fair
            mediation system — trusted, local, and transparent.
          </p>
          <div className="wl-hero-ctas">
            <Link to="/jobpage" className="wl-btn-primary">
              Find Jobs
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/jobpost" className="wl-btn-outline">Post a Job</Link>
          </div>
          <div className="wl-hero-stats">
            {[["1.2K+", "Active Jobs"], ["8.5K+", "Workers"], ["500+", "Employers"], ["98%", "Success Rate"]].map(
              ([num, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div className="wl-stat-num">{num}</div>
                  <div className="wl-stat-label">{label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <div className="wl-flash-banner">
        <div className="wl-flash-label">⚡ FLASH HIRING EVENT</div>
        <div className="wl-flash-msg">
          <strong>50+ new jobs</strong> posted this morning — apply before they fill up!
        </div>
        <div className="wl-countdown">
          <div className="wl-cd-block"><span className="wl-cd-num">{h}</span><span className="wl-cd-unit">HRS</span></div>
          <span className="wl-cd-sep">:</span>
          <div className="wl-cd-block"><span className="wl-cd-num">{m}</span><span className="wl-cd-unit">MIN</span></div>
          <span className="wl-cd-sep">:</span>
          <div className="wl-cd-block"><span className="wl-cd-num">{s}</span><span className="wl-cd-unit">SEC</span></div>
        </div>
        <Link to="/jobpage" className="wl-btn-primary" style={{ padding: "9px 20px", fontSize: "13px" }}>
          Browse Now →
        </Link>
      </div>

      <section id="categories" className="wl-section-pad">
        <div className="wl-container">
          <div className="wl-section-header">
            <div className="wl-section-tag">Explore</div>
            <div className="wl-section-title">Browse by Category</div>
            <div className="wl-section-sub">Find work that matches your skills and location</div>
          </div>
          <div className="wl-cat-grid">
            {CATEGORIES.map((cat) => (
              <a href="#" key={cat.name} className="wl-cat-card">
                <div className="wl-cat-icon" style={{ background: cat.bg }}>{cat.icon}</div>
                <div className="wl-cat-name">{cat.name}</div>
                <div className="wl-cat-count">{cat.count}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="wl-section-pad" style={{ paddingTop: 0 }}>
        <div className="wl-container">
          <div className="wl-section-header">
            <div className="wl-section-tag">Featured</div>
            <div className="wl-section-title">Top Jobs Near You</div>
            <div className="wl-section-sub">Hand-picked opportunities within your reach</div>
          </div>
      
          <div className="wl-prod-grid">
              {loading ? (
                <p>Loading jobs...</p>
              ) : jobs.length === 0 ? (
                <p>No jobs available</p>
              ) : (
                jobs.slice(0, 6).map((job) => (
                  <div key={job._id} className="wl-prod-card">
                    
                    <div
                      className="wl-prod-img"
                      style={{ background: "linear-gradient(135deg, #0f2217, #1a3a27)" }}
                    >
                      🛠️
                      <span className="wl-prod-badge wl-badge-new">LIVE</span>
                    </div>

                    <div className="wl-prod-body">
                      <div className="wl-prod-category">
                        {job.category} · {job.locationText}
                      </div>

                      <div className="wl-prod-name">{job.title}</div>

                      <div className="wl-prod-rating">
                        <span className="wl-stars">★★★★★</span>
                        <span className="wl-rating-count">
                          {job.employer?.name || "Employer"}
                        </span>
                      </div>

                      <div className="wl-prod-footer">
                        <div>
                          <span
                            className="wl-prod-price"
                            style={{ color: "var(--neon-green)" }}
                          >
                            ₹{job.salaryMax || job.wage || 0}
                          </span>
                          <span className="wl-price-old">
                            / {job.payFrequency || "day"}
                          </span>
                        </div>

                        <button
                          className={`wl-btn-add ${
                            addedJobs[job._id] ? "added" : ""
                          }`}
                          onClick={() => handleAdd(job._id)}
                        >
                          {addedJobs[job._id] ? "✓" : "+"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
        </div>
      </section>

      <section className="wl-section-pad" style={{ paddingTop: 0 }}>
        <div className="wl-container">
          <div className="wl-section-header">
            <div className="wl-section-tag">Trending Now</div>
            <div className="wl-section-title">Most Applied This Week</div>
            <div className="wl-section-sub">See what workers are grabbing fast</div>
          </div>
          <div className="wl-trend-grid">
            {TRENDING.map((item, i) => (
              <div key={item.name} className="wl-trend-card">
                <div className="wl-trend-emoji">{item.emoji}</div>
                <div>
                  <div className="wl-trend-name">{item.name}</div>
                  <div className="wl-trend-price">{item.price}</div>
                </div>
                <div className="wl-trend-rank">{String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST FEATURES ── */}
      <section id="features" className="wl-section-pad" style={{ paddingTop: 0 }}>
        <div className="wl-container">
          <div className="wl-section-header">
            <div className="wl-section-tag">Why WorkLink</div>
            <div className="wl-section-title">Built for Trust</div>
          </div>
          <div className="wl-trust-grid">
            {TRUST.map((t) => (
              <div key={t.title} className="wl-trust-card">
                <div className="wl-trust-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
                <div className="wl-trust-title">{t.title}</div>
                <div className="wl-trust-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="wl-section-pad" style={{ paddingTop: 0 }}>
        <div className="wl-container">
          <div className="wl-newsletter">
            <div className="wl-section-tag">Stay Ahead</div>
            <div className="wl-nl-title">Get Job Alerts Instantly</div>
            <div className="wl-nl-sub">Subscribe and be the first to know about new jobs near you.</div>
            <div className="wl-nl-form">
              <input
                className="wl-nl-input"
                type="email"
                placeholder="Enter your mobile or email..."
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
              />
              <button
                className="wl-nl-btn"
                onClick={handleSubscribe}
                style={nlDone ? { background: "linear-gradient(135deg, var(--neon-green), #00a0cc)" } : {}}
              >
                {nlDone ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </div>
            <div className="wl-nl-hint">No spam. Unsubscribe anytime. 6,200+ workers already subscribed.</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
     <Footer/>

    </main>
  );
}