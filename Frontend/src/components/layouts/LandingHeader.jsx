
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate?.() || (() => {});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lh-root {
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HEADER BAR ── */
        .lh-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: linear-gradient(180deg, #05090f 0%, #070d1a 100%);
          border-bottom: 1px solid rgba(0, 240, 255, 0.1);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .lh-header.scrolled {
          border-color: rgba(0, 240, 255, 0.22);
          box-shadow:
            0 1px 0 rgba(0, 240, 255, 0.1),
            0 8px 40px rgba(0, 0, 0, 0.7),
            0 0 60px rgba(0, 240, 255, 0.04);
        }

        /* scanline texture */
        .lh-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 240, 255, 0.012) 3px,
            rgba(0, 240, 255, 0.012) 4px
          );
          pointer-events: none;
        }

        .lh-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          position: relative;
        }

        /* ── BRAND ── */
        .lh-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
        }

        .lh-logo-mark {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%);
          display: grid;
          place-items: center;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #fff;
          flex-shrink: 0;
          box-shadow:
            0 0 14px rgba(0, 240, 255, 0.45),
            0 0 36px rgba(0, 240, 255, 0.18),
            inset 0 1px 0 rgba(255,255,255,0.25);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }

        .lh-brand:hover .lh-logo-mark {
          box-shadow:
            0 0 22px rgba(0, 240, 255, 0.75),
            0 0 56px rgba(0, 240, 255, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.3);
          transform: scale(1.06) rotate(-2deg);
        }

        .lh-brand-text {
          display: none;
        }

        @media (min-width: 640px) {
          .lh-brand-text { display: flex; flex-direction: column; }
        }

        .lh-brand-name {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.04em;
          background: linear-gradient(90deg, #00f0ff 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .lh-brand-sub {
          font-size: 10.5px;
          color: rgba(0, 240, 255, 0.45);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          font-weight: 400;
        }

        /* ── DESKTOP NAV ── */
        .lh-desk {
          display: none;
          align-items: center;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .lh-desk { display: flex; }
        }

        .lh-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .lh-nav-link {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(160, 200, 240, 0.65);
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.25s, background 0.25s;
        }

        .lh-nav-link::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 14px;
          right: 14px;
          height: 1.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, #00f0ff, #7c3aed);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lh-nav-link:hover {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.06);
        }

        .lh-nav-link:hover::after {
          transform: scaleX(1);
        }

        /* ── BUTTONS ── */
        .lh-btn-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lh-btn-ghost {
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(160, 210, 240, 0.75);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 240, 255, 0.12);
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .lh-btn-ghost:hover {
          background: rgba(0, 240, 255, 0.08);
          border-color: rgba(0, 240, 255, 0.4);
          color: #00f0ff;
          box-shadow: 0 0 16px rgba(0, 240, 255, 0.15);
          transform: translateY(-1px);
        }

        .lh-btn-primary {
          padding: 8px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #00d4e8 0%, #7c3aed 100%);
          border: none;
          cursor: pointer;
          letter-spacing: 0.03em;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          box-shadow:
            0 0 14px rgba(0, 212, 232, 0.35),
            0 0 30px rgba(124, 58, 237, 0.2),
            0 4px 16px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        .lh-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          pointer-events: none;
        }

        .lh-btn-primary::after {
          content: '';
          position: absolute;
          top: -100%;
          left: -60%;
          width: 60%;
          height: 300%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }

        .lh-btn-primary:hover {
          box-shadow:
            0 0 24px rgba(0, 212, 232, 0.55),
            0 0 50px rgba(124, 58, 237, 0.35),
            0 6px 24px rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }

        .lh-btn-primary:hover::after {
          left: 130%;
        }

        /* ── MOBILE TOGGLE ── */
        .lh-hamburger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 240, 255, 0.12);
          color: rgba(0, 240, 255, 0.75);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lh-hamburger:hover {
          background: rgba(0, 240, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.4);
          color: #00f0ff;
          box-shadow: 0 0 14px rgba(0, 240, 255, 0.2);
        }

        @media (min-width: 768px) {
          .lh-hamburger { display: none; }
        }

        /* ── MOBILE DRAWER ── */
        .lh-drawer {
          display: block;
          background: #070d1a;
          border-top: 1px solid rgba(0, 240, 255, 0.1);
          padding: 16px;
          animation: drawer-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drawer-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 768px) {
          .lh-drawer { display: none; }
        }

        .lh-mob-link {
          display: block;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(160, 210, 240, 0.7);
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }

        .lh-mob-link:hover {
          background: rgba(0, 240, 255, 0.07);
          color: #00f0ff;
          padding-left: 20px;
        }

        .lh-mob-divider {
          border: none;
          border-top: 1px solid rgba(0, 240, 255, 0.08);
          margin: 10px 0;
        }

        .lh-mob-ghost {
          width: 100%;
          padding: 11px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(160, 210, 240, 0.75);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 240, 255, 0.12);
          cursor: pointer;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .lh-mob-ghost:hover {
          background: rgba(0, 240, 255, 0.08);
          border-color: rgba(0, 240, 255, 0.4);
          color: #00f0ff;
        }

        .lh-mob-primary {
          width: 100%;
          margin-top: 8px;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #00d4e8 0%, #7c3aed 100%);
          border: none;
          cursor: pointer;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          box-shadow:
            0 0 16px rgba(0, 212, 232, 0.3),
            0 0 30px rgba(124, 58, 237, 0.18);
          transition: all 0.3s ease;
        }

        .lh-mob-primary:hover {
          box-shadow:
            0 0 26px rgba(0, 212, 232, 0.5),
            0 0 50px rgba(124, 58, 237, 0.3);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="lh-root">
        <header className={`lh-header${scrolled ? " scrolled" : ""}`}>
          <div className="lh-inner">

            <button onClick={() => navigate("/")} className="lh-brand" aria-label="Go home">
              <div className="lh-logo-mark">WL</div>
              <div className="lh-brand-text">
                <span className="lh-brand-name">WorkLink</span>
                <span className="lh-brand-sub">Empowering Rural Workers</span>
              </div>
            </button>

            <div className="lh-desk">
              <nav className="lh-nav">
                <Link to="/jobpage" className="lh-nav-link">Jobs</Link>
                <Link to="/featurespage" className="lh-nav-link">Features</Link>
                <Link to="/aboutpage" className="lh-nav-link">About</Link>
              </nav>

              <div className="lh-btn-group">
                <button onClick={() => navigate("/login")} className="lh-btn-ghost">
                  Sign In
                </button>
                <button onClick={() => navigate("/signup")} className="lh-btn-primary">
                  Get Started
                </button>
              </div>
            </div>

            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="lh-hamburger"
            >
              {open
                ? <X style={{ width: 18, height: 18 }} />
                : <Menu style={{ width: 18, height: 18 }} />
              }
            </button>
          </div>

          {open && (
            <div className="lh-drawer">
              <nav>
                <a href="#jobs" onClick={() => setOpen(false)} className="lh-mob-link">Jobs</a>
                <a href="#features" onClick={() => setOpen(false)} className="lh-mob-link">Features</a>
                <a href="#about" onClick={() => setOpen(false)} className="lh-mob-link">About</a>
              </nav>

              <hr className="lh-mob-divider" />

              <button onClick={() => { setOpen(false); navigate("/signin"); }} className="lh-mob-ghost">
                Sign In
              </button>
              <button onClick={() => { setOpen(false); navigate("/signup"); }} className="lh-mob-primary">
                Get Started
              </button>
            </div>
          )}
        </header>
      </div>
    </>
  );
}