import React, { useEffect, useState } from "react";
import {
  Smartphone,
  MapPin,
  Clock,
  CheckCircle,
  Users,
  Briefcase,
  Globe2,
  Sparkles,
  ThumbsUp,
  Star,
  Zap,
  ArrowRight,
  Shield,
  TrendingUp,
  Award,
  Rocket,
  Heart,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  :root {
    --neon-green:  #00ffb3;
    --neon-cyan:   #00e5ff;
    --neon-purple: #bf5fff;
    --neon-pink:   #ff2d78;
    --neon-amber:  #ffb830;
    --bg-base:     #050a0f;
    --bg-card:     #0c1420;
    --bg-card2:    #0f1a28;
    --border:      rgba(0,229,255,0.12);
    --border-glow: rgba(0,255,179,0.3);
    --text-primary: #e8f4ff;
    --text-muted:   #6a8aab;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font-body);
    background: var(--bg-base);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  @keyframes blink    { 50% { opacity: 0; } }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 12px var(--neon-green), 0 0 30px rgba(0,255,179,.15); }
    50%       { box-shadow: 0 0 24px var(--neon-green), 0 0 60px rgba(0,255,179,.3); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes orb-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -20px) scale(1.1); }
    66%       { transform: translate(-20px, 15px) scale(0.95); }
  }
  @keyframes scan-line {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-up { animation: fade-up 0.6s ease both; }
  .delay-1 { animation-delay: .1s; }
  .delay-2 { animation-delay: .2s; }
  .delay-3 { animation-delay: .3s; }
  .delay-4 { animation-delay: .4s; }

  /* Neon text helpers */
  .neon-text-green  { color: var(--neon-green);  text-shadow: 0 0 20px rgba(0,255,179,.6); }
  .neon-text-cyan   { color: var(--neon-cyan);   text-shadow: 0 0 20px rgba(0,229,255,.6); }
  .neon-text-purple { color: var(--neon-purple); text-shadow: 0 0 20px rgba(191,95,255,.6); }

  /* Card base */
  .dark-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    transition: border-color .3s, box-shadow .3s, transform .3s;
  }
  .dark-card:hover {
    border-color: rgba(0,255,179,.35);
    box-shadow: 0 0 40px rgba(0,255,179,.08), 0 20px 60px rgba(0,0,0,.5);
    transform: translateY(-4px);
  }

  /* Neon gradient button */
  .btn-neon {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 14px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    border: none;
    outline: none;
    text-decoration: none;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s;
  }
  .btn-neon::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    transition: opacity .2s;
  }
  .btn-neon::after {
    content: '';
    position: absolute; inset: -1px;
    border-radius: 15px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    opacity: 0;
    filter: blur(12px);
    transition: opacity .2s;
    z-index: -1;
  }
  .btn-neon span { position: relative; z-index: 1; color: #000; }
  .btn-neon svg  { position: relative; z-index: 1; color: #000; }
  .btn-neon:hover { transform: translateY(-2px) scale(1.03); }
  .btn-neon:hover::after { opacity: .6; }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 14px;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 15px;
    color: var(--neon-cyan);
    border: 1px solid rgba(0,229,255,.35);
    background: rgba(0,229,255,.05);
    text-decoration: none;
    transition: all .2s;
    cursor: pointer;
  }
  .btn-ghost:hover {
    background: rgba(0,229,255,.12);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 20px rgba(0,229,255,.2);
    transform: translateY(-2px);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-base); }
  ::-webkit-scrollbar-thumb { background: rgba(0,255,179,.3); border-radius: 3px; }
`;

const Typewriter = ({ phrases = [], speed = 60, pause = 1500 }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[idx % phrases.length];
    const tick = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length)
            setTimeout(() => setDeleting(true), pause);
        } else {
          if (text.length === 0) {
            setDeleting(false);
            setIdx((i) => (i + 1) % phrases.length);
          } else setText(current.slice(0, text.length - 1));
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(tick);
  }, [text, deleting, idx, phrases, speed, pause]);

  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        color: "var(--neon-green)",
        textShadow: "0 0 20px rgba(0,255,179,.5)",
      }}
    >
      {text}
      <span
        style={{ animation: "blink 1s steps(2,start) infinite", marginLeft: 2 }}
      >
        |
      </span>
    </span>
  );
};

/* ─── Main Page ──────────────────────────────────────────────────────── */
const FeaturesPage = () => (
  <>
    <style>{globalStyles}</style>

    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,179,.06) 0%, transparent 70%)",
            top: "-100px",
            left: "-100px",
            animation: "orb-drift 15s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,229,255,.05) 0%, transparent 70%)",
            bottom: "10%",
            right: "-80px",
            animation: "orb-drift 18s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(191,95,255,.04) 0%, transparent 70%)",
            top: "40%",
            left: "45%",
            animation: "orb-drift 20s ease-in-out infinite 5s",
          }}
        />
        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,179,.04), transparent)",
            animation: "scan-line 8s linear infinite",
          }}
        />
      </div>

      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "100px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important}}`}</style>

        <div className="animate-fade-up">
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 100,
              border: "1px solid rgba(0,255,179,.3)",
              background: "rgba(0,255,179,.06)",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              color: "var(--neon-green)",
              marginBottom: 28,
              boxShadow: "0 0 20px rgba(0,255,179,.1)",
            }}
          >
            <Sparkles size={14} />
            Trusted by 120K+ Workers
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px,5vw,64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>Karigar —</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work Local,
              <br />
              Grow Local
            </span>
          </h1>

          <div style={{ fontSize: 18, marginBottom: 36, minHeight: 28 }}>
            <Typewriter
              phrases={[
                "Verified local jobs.",
                "Fair pay, fast hires.",
                "Mobile-first for every worker.",
              ]}
              speed={55}
              pause={1600}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            <Link to="/login" className="btn-neon">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={16} /> Get Started
              </span>
            </Link>
            <Link to="/howitwork" className="btn-ghost">
              Learn How It Works
            </Link>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <StatBadge
              icon={<Star size={16} />}
              value="4.8"
              label="App rating"
              color="var(--neon-amber)"
            />
            <StatBadge
              icon={<ThumbsUp size={16} />}
              value="120k+"
              label="Jobs posted"
              color="var(--neon-cyan)"
            />
            <StatBadge
              icon={<Zap size={16} />}
              value="<24h"
              label="Avg hire time"
              color="var(--neon-purple)"
            />
          </div>
        </div>

        {/* Promo cards */}
        <div
          className="animate-fade-up delay-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <PromoCard
            title="Workers"
            desc="Create profile & get work"
            icon={<Users size={22} />}
            neon="var(--neon-green)"
          />
          <PromoCard
            title="Employers"
            desc="Post jobs & hire fast"
            icon={<Briefcase size={22} />}
            neon="var(--neon-pink)"
          />
          <PromoCard
            title="Local Matches"
            desc="Find nearby talent"
            icon={<MapPin size={22} />}
            neon="var(--neon-cyan)"
          />
          <PromoCard
            title="Offline Support"
            desc="Low-data friendly"
            icon={<Smartphone size={22} />}
            neon="var(--neon-amber)"
          />
        </div>
      </section>

      {/* ─── MAIN CONTENT ───────────────────────────────────────────── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* Worker / Employer cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 80,
          }}
          className="two-col"
        >
          <style>{`@media(max-width:768px){.two-col{grid-template-columns:1fr!important}}`}</style>

          <RoleCard
            title="For Workers"
            desc="Find jobs, build reputation, get paid on time."
            icon={<Users size={28} />}
            neon="var(--neon-green)"
            steps={[
              {
                num: 1,
                icon: <Smartphone size={16} />,
                title: "Create Profile",
                text: "Sign up, add skills & documents",
              },
              {
                num: 2,
                icon: <MapPin size={16} />,
                title: "Browse Jobs",
                text: "Filter by distance, pay and skills",
              },
              {
                num: 3,
                icon: <Clock size={16} />,
                title: "Work & Track",
                text: "Check-in/out and get accurate timesheets",
              },
              {
                num: 4,
                icon: <CheckCircle size={16} />,
                title: "Get Paid",
                text: "Secure payouts; build ratings",
              },
            ]}
            ctaText="Sign up as Worker"
            ctaTo="/signup"
          />

          <RoleCard
            title="For Employers"
            desc="Post jobs, manage hires and payouts easily."
            icon={<Briefcase size={28} />}
            neon="var(--neon-pink)"
            steps={[
              {
                num: 1,
                icon: <Globe2 size={16} />,
                title: "Create Account",
                text: "Verify & set hiring preferences",
              },
              {
                num: 2,
                icon: <Briefcase size={16} />,
                title: "Post Job",
                text: "Set wage, location & skills required",
              },
              {
                num: 3,
                icon: <Users size={16} />,
                title: "Select & Communicate",
                text: "Review applicants and message them",
              },
              {
                num: 4,
                icon: <CheckCircle size={16} />,
                title: "Confirm & Pay",
                text: "Secure payout on completion",
              },
            ]}
            ctaText="Sign up as Employer"
            ctaTo="/signup"
          />
        </section>

        {/* Why Karigar */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Why{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Karigar?
              </span>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 17,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Everything you need for seamless work connections
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            <MiniFeature
              icon={<Shield size={24} />}
              title="Verified Jobs"
              desc="Only trusted employers"
              neon="var(--neon-green)"
            />
            <MiniFeature
              icon={<Clock size={24} />}
              title="Quick Hiring"
              desc="Post & hire fast"
              neon="var(--neon-cyan)"
            />
            <MiniFeature
              icon={<MapPin size={24} />}
              title="Local Matches"
              desc="Find nearby workers"
              neon="var(--neon-purple)"
            />
            <MiniFeature
              icon={<Smartphone size={24} />}
              title="Mobile-first"
              desc="Works on low-end phones"
              neon="var(--neon-amber)"
            />
          </div>
        </section>

        {/* Testimonials + FAQ */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginBottom: 80,
          }}
          className="two-col"
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Heart
                size={24}
                style={{
                  color: "var(--neon-pink)",
                  filter: "drop-shadow(0 0 8px var(--neon-pink))",
                }}
              />
              What People Say
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Testimonial
                text="Found reliable daily work through Karigar. Payouts are quick and consistent."
                name="Raju"
                role="Worker"
                rating={5}
              />
              <Testimonial
                text="We hired 8 workers in a day for harvest — app made it painless."
                name="Sikha"
                role="Employer"
                rating={5}
              />
              <Testimonial
                text="Best platform for finding local work. Verification makes it trustworthy."
                name="Amit"
                role="Worker"
                rating={5}
              />
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 28,
              }}
            >
              Frequently Asked Questions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Accordion
                q="How do payments work?"
                a="Employers release payments after job completion; payouts to bank or mobile wallets follow partner rules."
              />
              <Accordion
                q="Is verification required?"
                a="Basic verification improves trust — IDs or contact confirmation may be requested."
              />
              <Accordion
                q="What if a worker doesn't show up?"
                a="Employers can flag no-shows; repeated incidents affect worker rating."
              />
              <Accordion
                q="How quickly can I get hired?"
                a="Most workers get hired within 24 hours of applying, depending on job requirements and location."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #0a1628 0%, #0d1f35 50%, #0a1628 100%)",
            borderRadius: 28,
            padding: "64px 40px",
            border: "1px solid rgba(0,255,179,.2)",
            boxShadow:
              "0 0 80px rgba(0,255,179,.06), inset 0 1px 0 rgba(0,255,179,.1)",
            textAlign: "center",
          }}
        >
          {/* Corner glows */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 250,
              height: 250,
              background:
                "radial-gradient(circle,rgba(0,255,179,.1) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 250,
              height: 250,
              background:
                "radial-gradient(circle,rgba(0,229,255,.08) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 24px",
              borderRadius: 18,
              background:
                "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(0,255,179,.4)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <Rocket size={30} color="#000" />
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 800,
              marginBottom: 12,
              color: "var(--text-primary)",
            }}
          >
            Ready to Get Started?
          </h3>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-muted)",
              marginBottom: 36,
              maxWidth: 500,
              margin: "0 auto 36px",
            }}
          >
            Create your account and begin connecting with trusted local workers
            or employers.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/signup" className="btn-neon">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                Sign Up <ArrowRight size={16} />
              </span>
            </Link>
            <Link to="/login" className="btn-ghost">
              Login
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(0,229,255,.08)",
          background: "rgba(0,0,0,.3)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          padding: "24px",
          fontSize: 13,
          color: "var(--text-muted)",
          fontWeight: 500,
        }}
      >
        © {new Date().getFullYear()} Karigar.{" "}
        <span
          style={{
            color: "var(--neon-green)",
            textShadow: "0 0 10px rgba(0,255,179,.4)",
          }}
        >
          Empowering rural workers
        </span>
        , building a better tomorrow.
      </footer>
    </div>
  </>
);

/* ─── StatBadge ─────────────────────────────────────────────────────── */
const StatBadge = ({ icon, value, label, color }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 16px",
      borderRadius: 14,
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
    }}
  >
    <div style={{ color, filter: `drop-shadow(0 0 6px ${color})` }}>{icon}</div>
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 15,
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
      <div
        style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}
      >
        {label}
      </div>
    </div>
  </div>
);

/* ─── PromoCard ─────────────────────────────────────────────────────── */
const PromoCard = ({ title, desc, icon, neon }) => (
  <div className="dark-card" style={{ padding: 24, cursor: "default" }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        marginBottom: 16,
        background: `${neon}18`,
        border: `1px solid ${neon}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: neon,
        filter: `drop-shadow(0 0 8px ${neon})`,
        transition: "all .3s",
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 15,
        marginBottom: 4,
        color: "var(--text-primary)",
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{desc}</div>
  </div>
);

/* ─── RoleCard ──────────────────────────────────────────────────────── */
const RoleCard = ({ title, desc, icon, neon, steps, ctaText, ctaTo }) => (
  <div className="dark-card" style={{ padding: 32 }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 28,
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 6,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{desc}</p>
      </div>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          flexShrink: 0,
          background: `${neon}18`,
          border: `1px solid ${neon}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: neon,
          filter: `drop-shadow(0 0 10px ${neon})`,
        }}
      >
        {icon}
      </div>
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 28,
      }}
    >
      {steps.map((s) => (
        <StepRow key={s.num} {...s} neon={neon} />
      ))}
    </div>

    <Link
      to={ctaTo}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "14px 24px",
        borderRadius: 14,
        background: `linear-gradient(135deg, ${neon}22, ${neon}11)`,
        border: `1px solid ${neon}50`,
        color: neon,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 15,
        textDecoration: "none",
        transition: "all .25s",
        boxShadow: `0 0 20px ${neon}10`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${neon}20`;
        e.currentTarget.style.boxShadow = `0 0 30px ${neon}25`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg,${neon}22,${neon}11)`;
        e.currentTarget.style.boxShadow = `0 0 20px ${neon}10`;
      }}
    >
      {ctaText} <ArrowRight size={16} />
    </Link>
  </div>
);

/* ─── StepRow ───────────────────────────────────────────────────────── */
const StepRow = ({ num, icon, title, text, neon }) => (
  <div
    style={{
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      padding: "14px 16px",
      borderRadius: 14,
      background: "rgba(255,255,255,.02)",
      border: "1px solid rgba(255,255,255,.05)",
      transition: "background .2s",
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        flexShrink: 0,
        background: `${neon}18`,
        border: `1px solid ${neon}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 13,
        color: neon,
      }}
    >
      {num}
    </div>
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 3,
        }}
      >
        <span style={{ color: neon, opacity: 0.8 }}>{icon}</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </div>
      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{text}</p>
    </div>
  </div>
);

/* ─── MiniFeature ───────────────────────────────────────────────────── */
const MiniFeature = ({ icon, title, desc, neon }) => (
  <div className="dark-card" style={{ padding: 28, cursor: "default" }}>
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        marginBottom: 20,
        background: `${neon}15`,
        border: `1px solid ${neon}35`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: neon,
        filter: `drop-shadow(0 0 10px ${neon})`,
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 16,
        marginBottom: 6,
        color: "var(--text-primary)",
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{desc}</div>
  </div>
);

/* ─── Testimonial ───────────────────────────────────────────────────── */
const Testimonial = ({ text, name, role, rating }) => (
  <div className="dark-card" style={{ padding: 22 }}>
    <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
      {[...Array(rating)].map((_, i) => (
        <Star
          key={i}
          size={14}
          style={{
            fill: "var(--neon-amber)",
            color: "var(--neon-amber)",
            filter: "drop-shadow(0 0 4px var(--neon-amber))",
          }}
        />
      ))}
    </div>
    <p
      style={{
        fontSize: 14,
        color: "#c0d0e0",
        fontStyle: "italic",
        marginBottom: 14,
        lineHeight: 1.6,
      }}
    >
      "{text}"
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, var(--neon-green), var(--neon-cyan))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 14,
          color: "#000",
        }}
      >
        {name[0]}
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{role}</div>
      </div>
    </div>
  </div>
);

/* ─── Accordion ─────────────────────────────────────────────────────── */
const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${open ? "rgba(0,255,179,.25)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "16px 18px",
        transition: "border-color .3s, box-shadow .3s",
        boxShadow: open ? "0 0 20px rgba(0,255,179,.06)" : "none",
      }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            color: "var(--text-primary)",
            textAlign: "left",
          }}
        >
          {q}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: open ? "rgba(0,255,179,.15)" : "rgba(255,255,255,.05)",
            border: `1px solid ${open ? "rgba(0,255,179,.3)" : "rgba(255,255,255,.08)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "var(--neon-green)" : "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "all .25s",
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 200 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height .3s ease, opacity .3s ease",
        }}
      >
        <p
          style={{
            paddingTop: 12,
            fontSize: 13,
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
};

export default FeaturesPage;
