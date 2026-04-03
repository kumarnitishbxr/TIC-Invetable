
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, Users, Wallet, ArrowUpRight, ArrowRight, Plus, Search,
  Filter, UserCheck, CreditCard, Clock, CheckCircle2, IndianRupee,
  TrendingUp, MapPin,
} from "lucide-react";
import axiosClient from "../API/axiosClient";


const dashCSS = `
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

  body {
    font-family: var(--font-body);
    background: var(--bg-base);
    color: var(--text);
    overflow-x: hidden;
    font-size: 15px;
    line-height: 1.65;
  }

  /* ── LAYOUT ── */
  .ed-root {
    min-height: 100vh;
    background: var(--bg-base);
    color: var(--text);
    position: relative;
  }
  .ed-orb {
    position: absolute; border-radius: 50%; filter: blur(80px);
    opacity: 0.25; pointer-events: none;
  }
  .ed-orb-1 { width: 500px; height: 500px; top: -120px; left: -100px; background: radial-gradient(circle, #00ffb340, transparent 70%); }
  .ed-orb-2 { width: 420px; height: 420px; bottom: 0; right: -100px; background: radial-gradient(circle, #b06dff35, transparent 70%); }
  .ed-grid-lines {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* ── HEADER ── */
  .ed-header {
    position: sticky; top: 0; z-index: 50;
    backdrop-filter: blur(20px);
    background: rgba(8,11,18,0.82);
    border-bottom: 1px solid var(--border);
  }
  .ed-header-inner {
    max-width: 1280px; margin: 0 auto; padding: 1.4rem 2rem;
    display: flex; flex-wrap: wrap; align-items: flex-start; gap: 1.5rem;
    justify-content: space-between;
  }
  .ed-header-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 100px;
    border: 1px solid rgba(0,255,179,0.3);
    background: rgba(0,255,179,0.07);
    color: var(--neon-green); font-size: 11.5px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase; margin-bottom: 0.6rem;
  }
  .ed-header-badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--neon-green); box-shadow: 0 0 5px var(--neon-green);
    animation: edPulse 2s infinite;
  }
  @keyframes edPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .ed-header-title {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 800; letter-spacing: -0.5px; margin-bottom: 0.35rem;
    background: linear-gradient(135deg, #e8edf5, #a0aec0);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .ed-header-sub { font-size: 13.5px; color: var(--muted); max-width: 520px; }
  .ed-header-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

  /* buttons */
  .ed-btn-outline {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.03);
    color: var(--text); font-weight: 600; font-size: 13.5px;
    cursor: pointer; font-family: var(--font-body);
    transition: border-color 0.2s, background 0.2s, transform 0.15s;
    text-decoration: none;
  }
  .ed-btn-outline:hover { border-color: rgba(0,255,179,0.35); background: rgba(0,255,179,0.05); transform: translateY(-1px); }
  .ed-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 22px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    color: #070b12; font-weight: 700; font-size: 13.5px;
    border: none; cursor: pointer; font-family: var(--font-body);
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(0,255,179,0.28);
    text-decoration: none;
  }
  .ed-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 34px rgba(0,255,179,0.5); }

  /* ── MAIN ── */
  .ed-main { max-width: 1280px; margin: 0 auto; padding: 2rem; position: relative; z-index: 1; }
  .ed-space { display: flex; flex-direction: column; gap: 2rem; }

  /* ── STAT CARDS ── */
  .ed-stats-grid { display: grid; gap: 1.1rem; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
  .ed-stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 18px; padding: 1.4rem 1.5rem;
    display: flex; align-items: flex-start; justify-content: space-between;
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
  }
  .ed-stat-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,255,179,0), rgba(0,200,255,0));
    transition: background 0.4s; border-radius: 18px;
  }
  .ed-stat-card:hover { transform: translateY(-4px); border-color: var(--border-glow); box-shadow: 0 14px 36px rgba(0,255,179,0.1); }
  .ed-stat-card:hover::before { background: linear-gradient(135deg, rgba(0,255,179,0.05), rgba(0,200,255,0.05)); }
  .ed-stat-label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem; }
  .ed-stat-value { font-family: var(--font-display); font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, var(--neon-green), var(--neon-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.35rem; }
  .ed-stat-sub { font-size: 11.5px; color: var(--neon-green); font-weight: 600; display: flex; align-items: center; gap: 4px; }
  .ed-stat-icon-wrap {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(0,255,179,0.12), rgba(0,200,255,0.12));
  }
  .ed-stat-icon-wrap svg { width: 20px; height: 20px; color: var(--neon-green); }

  /* ── GRID LAYOUT ── */
  .ed-content-grid { display: grid; gap: 2rem; grid-template-columns: 1fr 1fr 1fr; }
  .ed-col-main { grid-column: span 2; display: flex; flex-direction: column; gap: 1.5rem; }
  .ed-col-side { display: flex; flex-direction: column; gap: 1.5rem; }
  @media (max-width: 1024px) {
    .ed-content-grid { grid-template-columns: 1fr; }
    .ed-col-main { grid-column: span 1; }
  }

  /* ── CARD BASE ── */
  .ed-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px; overflow: hidden;
  }
  .ed-card-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  }
  .ed-card-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; margin-bottom: 2px; }
  .ed-card-sub { font-size: 12.5px; color: var(--muted); }
  .ed-link-btn { font-size: 13px; font-weight: 700; color: var(--neon-green); background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.2s; }
  .ed-link-btn:hover { opacity: 0.75; }

  /* ── SEARCH BAR ── */
  .ed-search-row { display: flex; align-items: center; gap: 0.6rem; }
  .ed-search-wrap { position: relative; }
  .ed-search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: var(--muted); }
  .ed-search-input {
    padding: 9px 14px 9px 36px; border-radius: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    color: var(--text); font-family: var(--font-body); font-size: 13px;
    outline: none; transition: border-color 0.2s;
    width: 200px;
  }
  .ed-search-input:focus { border-color: var(--border-glow); }
  .ed-search-input::placeholder { color: var(--muted); }
  .ed-filter-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px; border-radius: 10px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.03);
    color: var(--text); font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: var(--font-body);
    transition: border-color 0.2s;
  }
  .ed-filter-btn:hover { border-color: var(--border-glow); }

  /* ── JOB ROWS ── */
  .ed-job-row { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); transition: background 0.2s; }
  .ed-job-row:last-child { border-bottom: none; }
  .ed-job-row:hover { background: rgba(255,255,255,0.02); }
  .ed-job-row-inner { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; }
  .ed-job-num {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 3px 10px; border-radius: 100px;
    background: linear-gradient(135deg, rgba(0,255,179,0.12), rgba(0,200,255,0.12));
    border: 1px solid rgba(0,255,179,0.2);
    color: var(--neon-green); font-size: 11.5px; font-weight: 700;
  }
  .ed-job-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; }
  .ed-job-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-top: 4px; }
  .ed-job-loc { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--muted); }
  .ed-job-loc svg { width: 14px; height: 14px; color: var(--neon-green); }
  .ed-job-tag {
    padding: 3px 10px; border-radius: 100px; font-size: 11.5px; font-weight: 700;
    background: rgba(0,255,179,0.08); border: 1px solid rgba(0,255,179,0.18); color: var(--neon-green);
  }
  .ed-job-stats { display: flex; align-items: center; gap: 1.5rem; margin-left: auto; }
  .ed-job-stat-num { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; }
  .ed-job-stat-label { font-size: 11px; color: var(--muted); font-weight: 600; margin-top: 1px; }
  .ed-status-open  { padding: 4px 12px; border-radius: 100px; font-size: 11.5px; font-weight: 700; background: rgba(0,255,179,0.1); border: 1px solid rgba(0,255,179,0.25); color: var(--neon-green); }
  .ed-status-int   { padding: 4px 12px; border-radius: 100px; font-size: 11.5px; font-weight: 700; background: rgba(0,200,255,0.1); border: 1px solid rgba(0,200,255,0.25); color: var(--neon-blue); }
  .ed-status-closed{ padding: 4px 12px; border-radius: 100px; font-size: 11.5px; font-weight: 700; background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: var(--muted); }
  .ed-card-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--border); background: rgba(255,255,255,0.015); display: flex; align-items: center; justify-content: space-between; }
  .ed-card-footer-text { font-size: 12.5px; color: var(--muted); }

  /* ── APPLICATIONS ── */
  .ed-app-list { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .ed-app-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.1rem; border-radius: 14px;
    border: 1px solid var(--border);
    transition: border-color 0.25s, background 0.25s;
  }
  .ed-app-item:hover { border-color: rgba(0,255,179,0.28); background: rgba(0,255,179,0.03); }
  .ed-app-avatar {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
    color: #070b12; font-family: var(--font-display); font-weight: 800; font-size: 1rem;
    box-shadow: 0 0 14px rgba(0,255,179,0.25);
  }
  .ed-app-name { font-weight: 700; font-size: 14px; margin-bottom: 2px; }
  .ed-app-role { font-size: 13px; color: var(--neon-green); font-weight: 600; }
  .ed-app-exp  { font-size: 12px; color: var(--muted); }
  .ed-stage-new        { padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 700; background: rgba(255,255,255,0.06); color: var(--muted); border: 1px solid var(--border); }
  .ed-stage-shortlisted{ padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 700; background: rgba(0,255,179,0.1); color: var(--neon-green); border: 1px solid rgba(0,255,179,0.25); }
  .ed-stage-interview  { padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 700; background: rgba(0,200,255,0.1); color: var(--neon-blue); border: 1px solid rgba(0,200,255,0.25); }
  .ed-app-time { font-size: 11.5px; color: var(--muted); margin-top: 4px; }

  /* ── PAYMENTS ── */
  .ed-pay-banner {
    padding: 1.5rem;
    background: linear-gradient(135deg, #0d1526, #121a2e, #0d1120);
    border-bottom: 1px solid rgba(0,200,255,0.1);
    display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
  }
  .ed-pay-banner-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 6px; }
  .ed-pay-total { font-family: var(--font-display); font-size: 2rem; font-weight: 800; display: flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--neon-green), var(--neon-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .ed-pay-total svg { width: 22px; height: 22px; color: var(--neon-green); }
  .ed-pay-next-label { font-size: 11.5px; color: var(--neon-blue); font-weight: 600; display: flex; align-items: center; gap: 4px; justify-content: flex-end; margin-bottom: 3px; }
  .ed-pay-next-date { font-size: 13px; font-weight: 700; text-align: right; }
  .ed-pay-next-amt { font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: var(--neon-green); text-align: right; margin-top: 4px; }
  .ed-pay-list { padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; }
  .ed-pay-item {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem;
    padding: 0.85rem 1rem; border-radius: 12px;
    border: 1px solid transparent; transition: border-color 0.2s, background 0.2s;
  }
  .ed-pay-item:hover { border-color: var(--border); background: rgba(255,255,255,0.02); }
  .ed-pay-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,255,179,0.1); border: 1px solid rgba(0,255,179,0.15);
  }
  .ed-pay-icon svg { width: 17px; height: 17px; color: var(--neon-green); }
  .ed-pay-purpose { font-size: 13.5px; font-weight: 700; margin-bottom: 3px; }
  .ed-pay-meta { font-size: 11.5px; color: var(--muted); }
  .ed-pay-amount { font-family: var(--font-display); font-size: 1rem; font-weight: 800; text-align: right; margin-bottom: 4px; }
  .ed-status-completed { padding: 3px 9px; border-radius: 100px; font-size: 11px; font-weight: 700; background: rgba(0,255,179,0.1); color: var(--neon-green); border: 1px solid rgba(0,255,179,0.25); }
  .ed-status-processing { padding: 3px 9px; border-radius: 100px; font-size: 11px; font-weight: 700; background: rgba(255,170,0,0.1); color: #ffaa44; border: 1px solid rgba(255,170,0,0.25); }

  /* ── ACTIVITY TIMELINE ── */
  .ed-activity-list { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
  .ed-activity-item { display: flex; gap: 0.85rem; }
  .ed-activity-icon-col { display: flex; flex-direction: column; align-items: center; }
  .ed-activity-icon {
    width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ed-activity-icon svg { width: 17px; height: 17px; }
  .ed-activity-icon.job     { background: rgba(0,200,255,0.12); border: 1px solid rgba(0,200,255,0.25); color: var(--neon-blue); }
  .ed-activity-icon.hire    { background: rgba(0,255,179,0.12); border: 1px solid rgba(0,255,179,0.25); color: var(--neon-green); }
  .ed-activity-icon.payment { background: rgba(176,109,255,0.12); border: 1px solid rgba(176,109,255,0.25); color: var(--neon-purple); }
  .ed-activity-line { width: 1px; flex: 1; background: var(--border); margin-top: 6px; }
  .ed-activity-title { font-size: 13.5px; font-weight: 700; margin-bottom: 2px; }
  .ed-activity-desc  { font-size: 12.5px; color: var(--muted); }
  .ed-activity-time  { font-size: 11.5px; color: var(--muted); margin-top: 3px; }

  /* ── CTA CARD ── */
  .ed-cta-card {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #0d1526, #1a1030, #0d1120);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 20px; padding: 1.6rem;
  }
  .ed-cta-orb {
    position: absolute; border-radius: 50%; filter: blur(50px); pointer-events: none; opacity: 0.2;
  }
  .ed-cta-orb-1 { width: 180px; height: 180px; top: -60px; right: -40px; background: var(--neon-blue); }
  .ed-cta-orb-2 { width: 140px; height: 140px; bottom: -40px; left: -30px; background: var(--neon-purple); }
  .ed-cta-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; margin-bottom: 0.5rem; position: relative; z-index: 1; }
  .ed-cta-desc { font-size: 13px; color: var(--muted); margin-bottom: 1.1rem; line-height: 1.6; position: relative; z-index: 1; }
  .ed-cta-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 18px; border-radius: 10px;
    background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
    color: #fff; font-weight: 700; font-size: 13px;
    border: none; cursor: pointer; font-family: var(--font-body);
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 16px rgba(0,200,255,0.25);
    position: relative; z-index: 1;
  }
  .ed-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(0,200,255,0.45); }

  /* ── FOOTER ── */
  .ed-footer { padding: 1.5rem 0 1rem; text-align: center; font-size: 12.5px; color: var(--muted); }
`;

const jobStats = [
  { label: "Open Jobs",           value: 5,        subtext: "2 closing this week",  icon: Briefcase  },
  { label: "Total Applications",  value: 132,      subtext: "18 new today",         icon: Users      },
  { label: "Hires This Month",    value: 9,        subtext: "On track for target",  icon: UserCheck  },
  { label: "Total Spent",         value: "₹84,300",subtext: "Across 3 months",      icon: Wallet     },
];

const recentApplications = [
  { name: "Ravi Kumar",    role: "Warehouse Helper",     experience: "2 yrs", stage: "Shortlisted",          appliedAt: "3h ago"   },
  { name: "Sangeeta Devi", role: "Domestic Helper",      experience: "5 yrs", stage: "Interview Scheduled",  appliedAt: "Yesterday" },
  { name: "Imran Ali",     role: "House Painting Crew",  experience: "3 yrs", stage: "New",                  appliedAt: "Just now"  },
];

const paymentSummary = {
  totalPaid: "₹84,300",
  upcomingPayout: "₹12,500",
  nextPayoutDate: "28 Nov, 2025",
};

const recentPayments = [
  { id: "#PAY-9821", purpose: "Wages - House Painting Crew",   amount: "₹18,000", status: "Completed",  date: "25 Nov", method: "UPI"           },
  { id: "#PAY-9775", purpose: "Advance - Warehouse Helpers",   amount: "₹7,500",  status: "Processing", date: "23 Nov", method: "Bank Transfer"  },
  { id: "#PAY-9710", purpose: "Full & Final - Electrician",    amount: "₹12,800", status: "Completed",  date: "18 Nov", method: "UPI"           },
];

const recentActivity = [
  { type: "job",     title: "New job posted",      description: "Warehouse Helper at Noida Sector 63",          time: "2h ago"    },
  { type: "hire",    title: "Candidate hired",     description: "Ravi Kumar hired for Construction Helper",     time: "Yesterday" },
  { type: "payment", title: "Payment completed",   description: "₹18,000 paid for House Painting Crew",        time: "2 days ago"},
  { type: "job",     title: "Job closed",          description: "Electrician (Residential) marked as filled",  time: "5 days ago"},
];

// ── HELPERS ───────────────────────────────────────────────────────────────
function stageClass(stage) {
  if (stage === "New")                  return "ed-stage-new";
  if (stage === "Shortlisted")          return "ed-stage-shortlisted";
  return "ed-stage-interview";
}
function statusClass(status) {
  if (status === "Open")         return "ed-status-open";
  if (status === "Interviewing") return "ed-status-int";
  return "ed-status-closed";
}

// ── COMPONENT ─────────────────────────────────────────────────────────────
const EmployerDashboard = () => {
  const employerName = "KaamSetu Employer";
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const id = "ed-global-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = dashCSS;
      document.head.appendChild(el);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    axiosClient.get("/jobs").then((res) => setRecentJobs(res.data.data));
  }, []);

  return (
    <div className="ed-root">
      {/* Background */}
      <div className="ed-grid-lines" />
      <div className="ed-orb ed-orb-1" />
      <div className="ed-orb ed-orb-2" />

      {/* ── HEADER ── */}
      <header className="ed-header">
        <div className="ed-header-inner">
          <div>
            <div className="ed-header-badge">
              <div className="ed-header-badge-dot" />
              <Briefcase style={{ width: 12, height: 12 }} />
              Employer Control Panel
            </div>
            <div className="ed-header-title">
              Hi, {employerName.split(" ")[0]} — let's manage your workforce 🚀
            </div>
            <div className="ed-header-sub">
              Post jobs, track applications, review payments, and keep a history of all your hiring activity in one place.
            </div>
          </div>
          <div className="ed-header-actions">
            <button className="ed-btn-outline">
              <IndianRupee style={{ width: 15, height: 15 }} />
              Payment Center
            </button>
            <Link to="/jobpost" className="ed-btn-primary">
              <Plus style={{ width: 16, height: 16 }} />
              Post a Job
            </Link>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="ed-main">
        <div className="ed-space">

          {/* ── STAT CARDS ── */}
          <section className="ed-stats-grid">
            {jobStats.map(({ label, value, subtext, icon: Icon }) => (
              <div key={label} className="ed-stat-card">
                <div>
                  <div className="ed-stat-label">{label}</div>
                  <div className="ed-stat-value">{value}</div>
                  <div className="ed-stat-sub">
                    <TrendingUp style={{ width: 12, height: 12 }} />
                    {subtext}
                  </div>
                </div>
                <div className="ed-stat-icon-wrap">
                  <Icon style={{ width: 20, height: 20 }} />
                </div>
              </div>
            ))}
          </section>

          {/* ── CONTENT GRID ── */}
          <div className="ed-content-grid">

            {/* LEFT — Jobs + Applications */}
            <div className="ed-col-main">

              {/* Job Postings */}
              <div className="ed-card">
                <div className="ed-card-header">
                  <div>
                    <div className="ed-card-title">Your Job Postings</div>
                    <div className="ed-card-sub">Overview of recent jobs and their application funnel.</div>
                  </div>
                  <div className="ed-search-row">
                    <div className="ed-search-wrap">
                      <Search />
                      <input className="ed-search-input" type="text" placeholder="Search jobs..." />
                    </div>
                    <button className="ed-filter-btn">
                      <Filter style={{ width: 14, height: 14 }} /> Filters
                    </button>
                  </div>
                </div>

                {recentJobs.length > 0 && recentJobs.map((job, idx) => (
                  <div key={job._id} className="ed-job-row">
                    <div className="ed-job-row-inner">
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "6px" }}>
                          <span className="ed-job-num">{idx + 1}</span>
                          <span className="ed-job-title">{job.title}</span>
                        </div>
                        <div className="ed-job-meta">
                          <span className="ed-job-loc">
                            <MapPin /> {job?.locationText}
                          </span>
                          <span className="ed-job-tag">{job.category}</span>
                        </div>
                      </div>
                      <div className="ed-job-stats">
                        <div style={{ textAlign: "center" }}>
                          <div className="ed-job-stat-num">{job.applications}</div>
                          <div className="ed-job-stat-label">Applications</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div className="ed-job-stat-num" style={{ color: "var(--neon-green)" }}>{job.hired}</div>
                          <div className="ed-job-stat-label">Hired</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <span className={statusClass(job.status)}>{job.status}</span>
                          <button className="ed-link-btn">
                            View <ArrowRight style={{ width: 14, height: 14 }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="ed-card-footer">
                  <span className="ed-card-footer-text">Showing {recentJobs.length} recent job postings</span>
                  <button className="ed-link-btn">View all jobs →</button>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="ed-card">
                <div className="ed-card-header">
                  <div>
                    <div className="ed-card-title">Recent Applications</div>
                    <div className="ed-card-sub">Latest candidates across your open jobs.</div>
                  </div>
                  <button className="ed-link-btn">View all</button>
                </div>
                <div className="ed-app-list">
                  {recentApplications.map((app) => (
                    <div key={app.name + app.role} className="ed-app-item">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div className="ed-app-avatar">{app.name.split(" ")[0][0]}</div>
                        <div>
                          <div className="ed-app-name">{app.name}</div>
                          <div className="ed-app-role">{app.role}</div>
                          <div className="ed-app-exp">{app.experience}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className={stageClass(app.stage)}>{app.stage}</span>
                        <div className="ed-app-time">{app.appliedAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Payments + Activity + CTA */}
            <div className="ed-col-side">

              {/* Payments */}
              <div className="ed-card">
                <div className="ed-card-header">
                  <div>
                    <div className="ed-card-title">Payments Overview</div>
                    <div className="ed-card-sub">Track payouts and hiring spend.</div>
                  </div>
                  <button className="ed-link-btn">
                    View all <ArrowUpRight style={{ width: 14, height: 14 }} />
                  </button>
                </div>

                <div className="ed-pay-banner">
                  <div>
                    <div className="ed-pay-banner-label">Total Paid</div>
                    <div className="ed-pay-total">
                      <IndianRupee />
                      {paymentSummary.totalPaid.replace("₹", "")}
                    </div>
                  </div>
                  <div>
                    <div className="ed-pay-next-label">
                      <Clock style={{ width: 12, height: 12 }} /> Next payout
                    </div>
                    <div className="ed-pay-next-date">{paymentSummary.nextPayoutDate}</div>
                    <div className="ed-pay-next-amt">{paymentSummary.upcomingPayout}</div>
                  </div>
                </div>

                <div className="ed-pay-list">
                  {recentPayments.map((pay) => (
                    <div key={pay.id} className="ed-pay-item">
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                        <div className="ed-pay-icon"><CreditCard /></div>
                        <div>
                          <div className="ed-pay-purpose">{pay.purpose}</div>
                          <div className="ed-pay-meta">{pay.id} · {pay.method} · {pay.date}</div>
                        </div>
                      </div>
                      <div>
                        <div className="ed-pay-amount">{pay.amount}</div>
                        <span className={pay.status === "Completed" ? "ed-status-completed" : "ed-status-processing"}>
                          {pay.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="ed-card">
                <div className="ed-card-header">
                  <div className="ed-card-title">Recent Activity</div>
                  <div className="ed-card-sub">Jobs · Hires · Payments</div>
                </div>
                <div className="ed-activity-list">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="ed-activity-item">
                      <div className="ed-activity-icon-col">
                        <div className={`ed-activity-icon ${item.type}`}>
                          {item.type === "job"     && <Briefcase />}
                          {item.type === "hire"    && <CheckCircle2 />}
                          {item.type === "payment" && <Wallet />}
                        </div>
                        {i !== recentActivity.length - 1 && <div className="ed-activity-line" />}
                      </div>
                      <div>
                        <div className="ed-activity-title">{item.title}</div>
                        <div className="ed-activity-desc">{item.description}</div>
                        <div className="ed-activity-time">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="ed-cta-card">
                <div className="ed-cta-orb ed-cta-orb-1" />
                <div className="ed-cta-orb ed-cta-orb-2" />
                <div className="ed-cta-title">Want to hire faster with verified workers?</div>
                <div className="ed-cta-desc">
                  Boost your job visibility and get more applications from trusted workers in your area.
                </div>
                <button className="ed-cta-btn">
                  <TrendingUp style={{ width: 15, height: 15 }} />
                  Explore Boost Options
                </button>
              </div>

            </div>
          </div>

          <div className="ed-footer">
            © {new Date().getFullYear()} KaamSetu • Employer Dashboard
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;