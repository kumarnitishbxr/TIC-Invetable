
import React, { useEffect, useRef, useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";

export default function AppHeader({ user = {}, onSearch = () => {} }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifPulse, setNotifPulse] = useState(true);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const initials = (user?.firstName || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .ks-header {
          position: sticky;
          top: 0;
          z-index: 40;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(180deg, #060b14 0%, #080f1c 100%);
          border-bottom: 1px solid rgba(0, 240, 255, 0.12);
          box-shadow:
            0 1px 0 rgba(0, 240, 255, 0.08),
            0 4px 32px rgba(0, 0, 0, 0.6);
        }

        /* Scanline overlay */
        .ks-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 240, 255, 0.015) 3px,
            rgba(0, 240, 255, 0.015) 4px
          );
          pointer-events: none;
        }

        .ks-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          position: relative;
        }

        /* ── LOGO ── */
        .ks-logo-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          text-decoration: none;
        }

        .ks-logo-mark {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%);
          display: grid;
          place-items: center;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          position: relative;
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.5),
            0 0 32px rgba(0, 240, 255, 0.2),
            inset 0 1px 0 rgba(255,255,255,0.25);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .ks-logo-mark:hover {
          box-shadow:
            0 0 20px rgba(0, 240, 255, 0.8),
            0 0 50px rgba(0, 240, 255, 0.35),
            inset 0 1px 0 rgba(255,255,255,0.3);
          transform: scale(1.05);
        }

        /* ── SEARCH ── */
        .ks-search-wrap {
          position: relative;
          display: none;
        }

        @media (min-width: 640px) {
          .ks-search-wrap { display: block; }
        }

        .ks-search-input {
          width: 300px;
          padding: 8px 16px 8px 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 240, 255, 0.12);
          color: #e2f0ff;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .ks-search-input::placeholder {
          color: rgba(160, 200, 230, 0.4);
        }

        .ks-search-input:focus {
          background: rgba(0, 240, 255, 0.06);
          border-color: rgba(0, 240, 255, 0.5);
          box-shadow:
            0 0 0 3px rgba(0, 240, 255, 0.08),
            0 0 20px rgba(0, 240, 255, 0.12),
            inset 0 1px 0 rgba(0,240,255,0.06);
          width: 340px;
        }

        .ks-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(0, 240, 255, 0.45);
          width: 15px;
          height: 15px;
          pointer-events: none;
          transition: color 0.3s;
        }

        .ks-search-input:focus ~ .ks-search-icon-wrap .ks-search-icon,
        .ks-search-wrap:focus-within .ks-search-icon {
          color: rgba(0, 240, 255, 0.9);
        }

        /* ── NAV ── */
        .ks-nav {
          display: none;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 768px) {
          .ks-nav { display: flex; }
        }

        .ks-nav-link {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(160, 200, 230, 0.7);
          text-decoration: none;
          letter-spacing: 0.03em;
          position: relative;
          transition: color 0.25s, background 0.25s;
        }

        .ks-nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 14px;
          right: 14px;
          height: 1.5px;
          background: linear-gradient(90deg, #00f0ff, #7c3aed);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 2px;
        }

        .ks-nav-link:hover {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.06);
        }

        .ks-nav-link:hover::after {
          transform: scaleX(1);
        }

        /* ── RIGHT ACTIONS ── */
        .ks-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── NOTIF BUTTON ── */
        .ks-notif-btn {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 240, 255, 0.1);
          color: rgba(0, 240, 255, 0.7);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ks-notif-btn:hover {
          background: rgba(0, 240, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.4);
          color: #00f0ff;
          box-shadow: 0 0 16px rgba(0, 240, 255, 0.2);
          transform: translateY(-1px);
        }

        .ks-notif-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00f0ff;
          box-shadow: 0 0 6px #00f0ff, 0 0 12px rgba(0,240,255,0.6);
          animation: neon-pulse 1.8s ease-in-out infinite;
        }

        @keyframes neon-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00f0ff, 0 0 12px rgba(0,240,255,0.6); }
          50% { opacity: 0.5; box-shadow: 0 0 3px #00f0ff, 0 0 6px rgba(0,240,255,0.3); }
        }

        /* ── AVATAR / PROFILE ── */
        .ks-profile-btn {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 4px 12px 4px 4px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0, 240, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ks-profile-btn:hover {
          background: rgba(0, 240, 255, 0.07);
          border-color: rgba(0, 240, 255, 0.35);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
        }

        .ks-avatar {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%);
          display: grid;
          place-items: center;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.35);
          flex-shrink: 0;
        }

        .ks-profile-info {
          display: none;
          flex-direction: column;
          text-align: left;
        }

        @media (min-width: 640px) {
          .ks-profile-info { display: flex; }
        }

        .ks-profile-name {
          font-size: 13px;
          font-weight: 500;
          color: #d0e8ff;
          line-height: 1.2;
        }

        .ks-profile-role {
          font-size: 11px;
          color: rgba(0, 240, 255, 0.5);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .ks-chevron {
          color: rgba(0, 240, 255, 0.4);
          width: 14px;
          height: 14px;
          transition: transform 0.3s ease, color 0.3s;
        }

        .ks-chevron.open {
          transform: rotate(180deg);
          color: rgba(0, 240, 255, 0.8);
        }

        /* ── DROPDOWN ── */
        .ks-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 180px;
          border-radius: 14px;
          background: #0b1425;
          border: 1px solid rgba(0, 240, 255, 0.15);
          box-shadow:
            0 20px 60px rgba(0,0,0,0.7),
            0 0 30px rgba(0, 240, 255, 0.08),
            inset 0 1px 0 rgba(0, 240, 255, 0.08);
          padding: 6px;
          z-index: 50;
          animation: dropdown-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top right;
        }

        @keyframes dropdown-in {
          from { opacity: 0; transform: scale(0.92) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ks-drop-item {
          width: 100%;
          text-align: left;
          padding: 9px 12px;
          border-radius: 9px;
          font-size: 13px;
          color: rgba(180, 210, 240, 0.85);
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          display: block;
        }

        .ks-drop-item:hover {
          background: rgba(0, 240, 255, 0.08);
          color: #00f0ff;
          padding-left: 16px;
        }

        .ks-drop-divider {
          border: none;
          border-top: 1px solid rgba(0, 240, 255, 0.08);
          margin: 4px 0;
        }

        .ks-drop-item.danger {
          color: rgba(255, 90, 120, 0.8);
        }

        .ks-drop-item.danger:hover {
          background: rgba(255, 60, 90, 0.1);
          color: #ff5a78;
        }

        /* ── LEFT CLUSTER ── */
        .ks-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      `}</style>

      <header className="ks-header">
        <div className="ks-inner">
          {/* Left: Logo + Search */}
          <div className="ks-left">
            <button onClick={() => navigate("/")} className="ks-logo-btn">
              <div className="ks-logo-mark">S</div>
            </button>

            <div className="ks-search-wrap">
              <Search className="ks-search-icon" />
              <input
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search jobs, applicants..."
                className="ks-search-input"
              />
            </div>
          </div>

          {/* Right: Nav + Notif + Profile */}
          <div className="ks-actions">
            <nav className="ks-nav">
              <Link to="/jobpage" className="ks-nav-link">Jobs</Link>
              <Link to="/featurespage" className="ks-nav-link">Features</Link>
              <Link to="/aboutpage" className="ks-nav-link">About</Link>
            </nav>

            <button
              className="ks-notif-btn"
              aria-label="Notifications"
              onClick={() => { navigate("/notifications"); setNotifPulse(false); }}
            >
              <Bell style={{ width: 16, height: 16 }} />
              {notifPulse && <span className="ks-notif-dot" />}
            </button>

            <div style={{ position: "relative" }} ref={profileRef}>
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="ks-profile-btn"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <div className="ks-avatar">{initials}</div>
                <div className="ks-profile-info">
                  <span className="ks-profile-name">{user?.firstName || "User"}</span>
                  <span className="ks-profile-role">Worker</span>
                </div>
                <ChevronDown className={`ks-chevron${profileOpen ? " open" : ""}`} />
              </button>

              {profileOpen && (
                <div className="ks-dropdown">
                  <button
                    className="ks-drop-item"
                    onClick={() => { setProfileOpen(false); navigate("/user/dashboard"); }}
                  >
                    Profile
                  </button>
                  <button
                    className="ks-drop-item"
                    onClick={() => { setProfileOpen(false); navigate("/user/profile"); }}
                  >
                    Settings
                  </button>
                  <hr className="ks-drop-divider" />
                  <button className="ks-drop-item danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}