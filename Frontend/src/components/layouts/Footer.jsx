import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const globalCSS = `/* Only footer-related styles (keep global CSS separate ideally) */

.wl-footer {
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 2.5rem 2rem 2rem;
  background: #080b12;
}

.wl-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.wl-footer-logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  background: linear-gradient(90deg, #00ffb3, #00c8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
  margin-bottom: 4px;
}

.wl-footer-tagline {
  font-size: 12.5px;
  color: #6b7a99;
}

.wl-footer-links {
  display: flex;
  gap: 1.75rem;
}

.wl-footer-links a {
  color: #6b7a99;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s;
}

.wl-footer-links a:hover {
  color: #e8edf5;
}

.wl-footer-copy {
  font-size: 12px;
  color: #6b7a99;
}`;

const Footer = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalCSS;
    document.head.appendChild(style);
  }, []);
  return (
    <footer className="wl-footer">
      <div className="wl-footer-inner">
        {/* Logo + Tagline */}
        <div>
          <span className="wl-footer-logo">Karigar ⚡</span>
          <span className="wl-footer-tagline">
            Empowering rural workers across India
          </span>
        </div>

        {/* Navigation Links */}
        <div className="wl-footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/mediation">Mediation</Link>
          <Link to="/contactpage">Contact</Link>
          <Link to="/careers">Careers</Link>
        </div>

        {/* Copyright */}
        <div className="wl-footer-copy">
          © 2026 Karigar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
