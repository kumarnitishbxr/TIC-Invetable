
import React, { useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Search, Filter, Clock, CheckCircle, Star, MessageSquare, FileText, AlertTriangle, DollarSign, User, ArrowLeft, Bookmark, Zap } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* ─── Global Styles ─────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  :root {
    --neon-green:   #00ffb3;
    --neon-cyan:    #00e5ff;
    --neon-purple:  #bf5fff;
    --neon-pink:    #ff2d78;
    --neon-amber:   #ffb830;
    --bg-base:      #050a0f;
    --bg-card:      #0c1420;
    --bg-card2:     #0f1a28;
    --bg-input:     #0a1422;
    --border:       rgba(0,229,255,0.10);
    --border-hover: rgba(0,255,179,0.30);
    --text-primary: #e8f4ff;
    --text-muted:   #5a7a9a;
    --text-sub:     #8aaabe;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
  }

  .jp-root * { box-sizing: border-box; }
  .jp-root {
    font-family: var(--font-body);
    background: var(--bg-base);
    color: var(--text-primary);
    min-height: 100vh;
  }

  @keyframes orb-drift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(40px,-30px) scale(1.08); }
    66%      { transform: translate(-25px,20px) scale(0.94); }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes urgent-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,45,120,.4); }
    50%      { box-shadow: 0 0 0 6px rgba(255,45,120,.0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slide-down {
    from { opacity:0; transform:translateY(-10px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Card */
  .jp-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    transition: border-color .3s, box-shadow .3s, transform .3s;
  }
  .jp-card:hover {
    border-color: rgba(0,255,179,.2);
    box-shadow: 0 0 40px rgba(0,255,179,.05), 0 20px 50px rgba(0,0,0,.4);
    transform: translateY(-3px);
  }

  /* Input */
  .jp-input {
    width: 100%;
    background: var(--bg-input);
    border: 1px solid rgba(0,229,255,.15);
    border-radius: 14px;
    padding: 12px 16px 12px 44px;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .jp-input::placeholder { color: var(--text-muted); }
  .jp-input:focus {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 0 3px rgba(0,229,255,.08);
  }

  /* Select */
  .jp-select {
    width: 100%;
    background: var(--bg-input);
    border: 1px solid rgba(0,229,255,.15);
    border-radius: 14px;
    padding: 12px 16px;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: border-color .2s;
  }
  .jp-select:focus { border-color: var(--neon-cyan); }
  .jp-select option { background: var(--bg-card2); }

  /* Neon btn */
  .jp-btn-neon {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px 22px;
    border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    color: #000;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s;
    text-decoration: none;
    white-space: nowrap;
  }
  .jp-btn-neon::after {
    content:''; position:absolute; inset:-2px; border-radius:16px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    filter: blur(14px); opacity:0; z-index:-1; transition: opacity .2s;
  }
  .jp-btn-neon:hover { transform: translateY(-2px); }
  .jp-btn-neon:hover::after { opacity:.45; }

  /* Ghost btn */
  .jp-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px 22px;
    border-radius: 14px; cursor: pointer;
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    background: rgba(0,229,255,.05);
    border: 1px solid rgba(0,229,255,.2);
    color: var(--neon-cyan);
    transition: all .2s;
    text-decoration: none;
    white-space: nowrap;
  }
  .jp-btn-ghost:hover {
    background: rgba(0,229,255,.1);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 16px rgba(0,229,255,.15);
  }
  .jp-btn-ghost.active {
    background: linear-gradient(135deg,rgba(0,255,179,.15),rgba(0,229,255,.1));
    border-color: var(--neon-green);
    color: var(--neon-green);
    box-shadow: 0 0 20px rgba(0,255,179,.1);
  }

  /* Back btn */
  .jp-btn-back {
    display:inline-flex; align-items:center; gap:8px;
    padding: 10px 18px; border-radius:12px;
    background: var(--bg-card); border:1px solid var(--border);
    color: var(--text-sub); font-family:var(--font-display); font-weight:700; font-size:13px;
    cursor:pointer; transition:all .2s; text-decoration:none;
  }
  .jp-btn-back:hover { border-color: rgba(0,255,179,.3); color:var(--neon-green); }

  /* Tag pill */
  .jp-pill {
    display:inline-flex; align-items:center; gap:5px;
    padding: 5px 11px; border-radius:100px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    font-size:12px; font-weight:600; color:var(--text-sub);
  }

  /* Label */
  .jp-label {
    display:block; font-size:11px; font-weight:700;
    font-family:var(--font-display); color:var(--text-muted);
    text-transform:uppercase; letter-spacing:.05em; margin-bottom:8px;
  }

  /* Range track */
  .jp-range {
    width:100%; height:4px; border-radius:2px; appearance:none; cursor:pointer; outline:none;
    background: rgba(255,255,255,.08);
  }
  .jp-range::-webkit-slider-thumb {
    appearance:none; width:18px; height:18px; border-radius:50%;
    background: var(--neon-green);
    box-shadow: 0 0 10px rgba(0,255,179,.5);
    cursor:pointer;
  }

  /* Quick action link */
  .jp-quick-link {
    padding: 12px 14px; border-radius:14px;
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.06);
    font-family:var(--font-display); font-weight:700; font-size:13px;
    color: var(--text-sub); text-decoration:none; text-align:center;
    transition: all .2s;
    display:block;
  }
  .jp-quick-link:hover {
    background: rgba(0,255,179,.06);
    border-color: rgba(0,255,179,.2);
    color: var(--neon-green);
  }

  /* Employer row */
  .jp-employer-row {
    display:flex; align-items:center; justify-content:space-between;
    padding: 12px 14px; border-radius:14px;
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.05);
    transition: all .2s;
  }
  .jp-employer-row:hover {
    background: rgba(0,229,255,.04);
    border-color: rgba(0,229,255,.15);
  }

  /* Detail row */
  .jp-detail-row {
    display:flex; justify-content:space-between; align-items:center;
    padding: 12px 16px; border-radius:12px;
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.05);
  }

  /* Req item */
  .jp-req-item {
    display:flex; align-items:flex-start; gap:10px; padding: 10px 0;
  }

  /* Sticky header */
  .jp-header {
    position: sticky; top:0; z-index:50;
    background: rgba(5,10,15,.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,229,255,.1);
    box-shadow: 0 4px 30px rgba(0,0,0,.4);
  }

  /* Filters panel */
  .jp-filters {
    animation: slide-down .25s ease both;
  }

  @media(max-width:900px){ .jp-grid-main{grid-template-columns:1fr!important} }
  @media(max-width:640px){ .jp-header-row{flex-direction:column!important; gap:12px!important} .jp-btn-row{display:grid!important; grid-template-columns:1fr 1fr!important} }
`;

/* ─── Sample Jobs ────────────────────────────────────────────────────── */
const SAMPLE_JOBS = [
  { id:"job-001", title:"Construction Helper Needed", company:"BuildRight Co.", location:"Downtown", distance:2.3, pay:"₹800/day", duration:"3 days", posted:"2 hours ago", urgent:true, description:"Tasks include moving materials, assisting skilled workers, site cleanup, and general labor. Bring boots & gloves." },
  { id:"job-002", title:"Warehouse Packer", company:"QuickShip Logistics", location:"Industrial Park", distance:4.1, pay:"₹400/day", duration:"1 week", posted:"5 hours ago", urgent:false, description:"Packing & labeling shipments. Standing work. Basic physical fitness required." },
  { id:"job-003", title:"Moving Assistant", company:"Swift Movers", location:"Westside", distance:1.8, pay:"₹600/day", duration:"1 day", posted:"1 day ago", urgent:false, description:"Help load/unload household goods. Lifting required. Short-term gig." },
  { id:"job-004", title:"General Laborer", company:"Metro Construction", location:"City Center", distance:3.5, pay:"₹500/day", duration:"2 weeks", posted:"1 day ago", urgent:true, description:"Longer-term site work assisting skilled tradespeople." },
];

/* ─── Header ─────────────────────────────────────────────────────────── */
function Header({ query, setQuery, onNearMe, onToggleFilters, showFilters }) {
  return (
    <div className="jp-header">
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'16px 20px' }}>
        <div className="jp-header-row" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            <div style={{
              width:44, height:44, borderRadius:13,
              background:'linear-gradient(135deg,var(--neon-green),var(--neon-cyan))',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--font-display)', fontWeight:800, fontSize:18, color:'#000',
              boxShadow:'0 0 20px rgba(0,255,179,.3)'
            }}>J</div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:17, background:'linear-gradient(135deg,var(--neon-green),var(--neon-cyan))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Find Jobs</div>
              <div style={{ fontSize:11, color:'var(--text-muted)', fontWeight:500 }}>Nearby verified daily work</div>
            </div>
          </div>

          {/* Search + actions */}
          <div style={{ flex:1, display:'flex', gap:10, maxWidth:700 }}>
            <div style={{ position:'relative', flex:1 }}>
              <Search size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
              <input
                className="jp-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by title, company or skills"
                aria-label="Search jobs"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear"
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,.1)', border:'none', cursor:'pointer', color:'var(--text-muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>
                  ✕
                </button>
              )}
            </div>
            <button className={`jp-btn-ghost${showFilters?' active':''}`} onClick={onToggleFilters} style={{ padding:'12px 16px', display:'none' }} id="filter-btn-desktop">
              <Filter size={15} /> Filters
            </button>
            <style>{`@media(min-width:640px){#filter-btn-desktop{display:inline-flex!important}}`}</style>
            <button className="jp-btn-neon" onClick={onNearMe} style={{ padding:'12px 16px' }}>
              <Navigation size={15} /> Near Me
            </button>
          </div>
        </div>

        {/* Mobile filter row */}
        <div className="jp-btn-row" style={{ display:'none', marginTop:12, gap:10 }} id="mobile-btns">
          <style>{`@media(max-width:639px){#mobile-btns{display:grid!important}}`}</style>
          <button className={`jp-btn-ghost${showFilters?' active':''}`} onClick={onToggleFilters}>
            <Filter size={15} /> Filters
          </button>
          <button className="jp-btn-neon" onClick={onNearMe}>
            <Navigation size={15} /> Near Me
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Job Card ───────────────────────────────────────────────────────── */
function JobCard({ job, onView, onApply }) {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <article className="jp-card" style={{ padding:24, cursor:'pointer', animation:'fade-up .4s ease both' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:16 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:17, color:'var(--text-primary)' }}>
              {job.title}
            </h3>
            {job.urgent && (
              <span style={{
                padding:'3px 10px', borderRadius:100,
                background:'linear-gradient(135deg,var(--neon-pink),#ff6b9d)',
                color:'#fff', fontSize:10, fontFamily:'var(--font-display)', fontWeight:800,
                textTransform:'uppercase', letterSpacing:'.06em',
                animation:'urgent-pulse 2s ease-in-out infinite',
                display:'flex', alignItems:'center', gap:4
              }}>
                <Zap size={10} /> URGENT
              </span>
            )}
          </div>
          <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:10 }}>
            {job.company} · {job.location} · {job.distance} km away
          </p>
          <p style={{ fontSize:13, color:'var(--text-sub)', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
            {job.description}
          </p>
        </div>

        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{
            fontFamily:'var(--font-display)', fontWeight:800, fontSize:22,
            background:'linear-gradient(135deg,var(--neon-green),var(--neon-cyan))',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
          }}>{job.pay}</div>
          <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{job.posted}</div>
        </div>
      </div>

      {/* Pills */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
        <span className="jp-pill"><MapPin size={11} style={{ color:'var(--neon-cyan)' }} />{job.location}</span>
        <span className="jp-pill"><Clock size={11} style={{ color:'var(--neon-green)' }} />{job.duration}</span>
        <span className="jp-pill"><FileText size={11} style={{ color:'var(--neon-purple)' }} />{job.posted}</span>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:10 }}>
        <button className="jp-btn-neon" style={{ flex:1 }}
          onClick={() => isAuthenticated ? onApply(job.id) : navigate('/login')}>
          Apply Now
        </button>
        <button className="jp-btn-ghost" style={{ padding:'12px 20px' }} onClick={() => onView(job.id)}>
          View
        </button>
      </div>
    </article>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function JobPage() {
  const [query, setQuery]           = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [nearbyRadius, setNearbyRadius] = useState(10);
  const [selectedPay, setSelectedPay]   = useState("any");
  const [view, setView]             = useState("feed");
  const [selectedJob, setSelectedJob]   = useState(null);
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_JOBS.filter(j => {
      const text = `${j.title} ${j.company} ${j.description} ${j.location}`.toLowerCase();
      return (q === "" || text.includes(q))
        && (selectedPay === "any" || (selectedPay === "high" ? j.pay.includes("₹800") || j.pay.includes("₹600") : true))
        && j.distance <= nearbyRadius;
    });
  }, [query, selectedPay, nearbyRadius]);

  function handleNearMe()        { setNearbyRadius(r => r===10?5:r===5?25:10); }
  function handleToggleFilters() { setShowFilters(s => !s); }
  function handleViewJob(jobId)  { const j = SAMPLE_JOBS.find(j=>j.id===jobId); setSelectedJob(j||null); setView("details"); }
  function handleApply(jobId)    { alert(`Applied to ${jobId}. Your application has been sent.`); }

  /* ── Details view ── */
  if (view === "details" && selectedJob) {
    return (
      <>
        <style>{styles}</style>
        <div className="jp-root" style={{ position:'relative', paddingBottom:60 }}>
          {/* Orbs */}
          <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
            <div style={{ position:'absolute', width:500, height:500, top:-120, left:-80, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,179,.05) 0%,transparent 70%)', animation:'orb-drift 16s ease-in-out infinite' }} />
            <div style={{ position:'absolute', width:400, height:400, bottom:'5%', right:'-60px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,.04) 0%,transparent 70%)', animation:'orb-drift 20s ease-in-out infinite reverse' }} />
          </div>
          <div style={{ position:'relative', zIndex:1, maxWidth:900, margin:'0 auto', padding:'32px 20px' }}>
            <button className="jp-btn-back" onClick={() => setView("feed")} style={{ marginBottom:28 }}>
              <ArrowLeft size={15} /> Back to Jobs
            </button>

            {/* Hero banner */}
            <div style={{
              borderRadius:'20px 20px 0 0', overflow:'hidden',
              background:'linear-gradient(135deg, #0a1f3a, #0d2440, #0a1f3a)',
              border:'1px solid rgba(0,255,179,.2)',
              borderBottom:'none', padding:36
            }}>
              {/* Glows inside banner */}
              <div style={{ position:'absolute', width:300, height:300, top:-60, right:-40, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,179,.07) 0%,transparent 70%)', pointerEvents:'none' }} />
              <div style={{ position:'relative', display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
                <div style={{ flex:1 }}>
                  {selectedJob.urgent && (
                    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', borderRadius:100, background:'rgba(255,45,120,.15)', border:'1px solid rgba(255,45,120,.3)', color:'var(--neon-pink)', fontSize:11, fontFamily:'var(--font-display)', fontWeight:800, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:14 }}>
                      <Zap size={11} /> URGENT
                    </span>
                  )}
                  <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(22px,4vw,34px)', color:'var(--text-primary)', marginBottom:10 }}>
                    {selectedJob.title}
                  </h1>
                  <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:18 }}>
                    {selectedJob.company} · {selectedJob.location}
                  </p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                    <span className="jp-pill" style={{ borderColor:'rgba(0,255,179,.2)', color:'var(--neon-green)' }}>
                      <MapPin size={12} /> {selectedJob.distance} km
                    </span>
                    <span className="jp-pill" style={{ borderColor:'rgba(0,229,255,.2)', color:'var(--neon-cyan)' }}>
                      <Clock size={12} /> {selectedJob.duration}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{
                    fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(28px,4vw,40px)',
                    background:'linear-gradient(135deg,var(--neon-green),var(--neon-cyan))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
                  }}>{selectedJob.pay}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:6 }}>{selectedJob.posted}</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="jp-card" style={{ borderRadius:'0 0 20px 20px', padding:32, borderTop:'none' }}>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:20, marginBottom:12 }}>Job Description</h2>
              <p style={{ fontSize:14, color:'var(--text-sub)', lineHeight:1.8, marginBottom:32 }}>{selectedJob.description}</p>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, marginBottom:32 }} className="det-grid">
                <style>{`@media(max-width:600px){.det-grid{grid-template-columns:1fr!important}}`}</style>

                <div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, marginBottom:14, color:'var(--text-primary)' }}>Requirements</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {["Must be 18+ years old","Able to lift 50 kg","Punctual & safety aware"].map((r,i) => (
                      <div key={i} className="jp-req-item">
                        <CheckCircle size={16} style={{ color:'var(--neon-green)', filter:'drop-shadow(0 0 6px var(--neon-green))', flexShrink:0, marginTop:1 }} />
                        <span style={{ fontSize:14, color:'var(--text-sub)' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, marginBottom:14, color:'var(--text-primary)' }}>Details</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {[["Start","Nov 5, 2025"],["Hours","7 AM – 3 PM"],["Payment","Daily via Escrow"],["Positions","3 available"]].map(([l,v]) => (
                      <div key={l} className="jp-detail-row">
                        <span style={{ fontSize:13, color:'var(--text-muted)' }}>{l}</span>
                        <span style={{ fontSize:13, fontFamily:'var(--font-display)', fontWeight:700, color:'var(--text-primary)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', gap:12 }}>
                <button className="jp-btn-neon" style={{ flex:1, padding:'14px 24px' }}
                  onClick={() => isAuthenticated ? handleApply(selectedJob.id) : navigate('/login')}>
                  Apply Now
                </button>
                <button className="jp-btn-ghost" style={{ padding:'14px 22px' }} onClick={() => alert("Saved for later")}>
                  <Bookmark size={15} /> Save
                </button>
              </div>
            </div>

            {/* About company */}
            <div className="jp-card" style={{ padding:24, marginTop:16 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, marginBottom:10 }}>About {selectedJob.company}</h3>
              <p style={{ fontSize:13, color:'var(--text-sub)', lineHeight:1.7 }}>
                Trusted contractor in residential construction. Rated highly for fair pay and clear terms.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Feed view ── */
  return (
    <>
      <style>{styles}</style>
      <div className="jp-root" style={{ position:'relative' }}>
        {/* Ambient orbs */}
        <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
          <div style={{ position:'absolute', width:600, height:600, top:-150, left:-100, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,179,.04) 0%,transparent 70%)', animation:'orb-drift 18s ease-in-out infinite' }} />
          <div style={{ position:'absolute', width:400, height:400, bottom:'10%', right:'-80px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,.04) 0%,transparent 70%)', animation:'orb-drift 22s ease-in-out infinite reverse' }} />
        </div>

        <div style={{ position:'relative', zIndex:1 }}>
          <Header query={query} setQuery={setQuery} onNearMe={handleNearMe} onToggleFilters={handleToggleFilters} showFilters={showFilters} />

          <div style={{ maxWidth:1200, margin:'0 auto', padding:'28px 20px' }}>
            <div className="jp-grid-main" style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:20, alignItems:'start' }}>

              {/* ── Main column ── */}
              <main style={{ display:'flex', flexDirection:'column', gap:16 }}>

                {/* Filters panel */}
                {showFilters && (
                  <div className="jp-card jp-filters" style={{ padding:24 }}>
                    <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, marginBottom:20 }}>Filters</h3>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16 }}>
                      <div>
                        <label className="jp-label">Pay Range</label>
                        <div style={{ position:'relative' }}>
                          <select className="jp-select" value={selectedPay} onChange={e => setSelectedPay(e.target.value)}>
                            <option value="any">Any Pay</option>
                            <option value="high">Higher Pay (₹600+)</option>
                          </select>
                          <DollarSign size={14} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
                        </div>
                      </div>
                      <div>
                        <label className="jp-label">Radius: {nearbyRadius} km</label>
                        <input type="range" min="1" max="50" value={nearbyRadius}
                          className="jp-range"
                          onChange={e => setNearbyRadius(Number(e.target.value))}
                          style={{ marginTop:6 }}
                        />
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginTop:4 }}>
                          <span>1 km</span><span>50 km</span>
                        </div>
                      </div>
                      <div style={{ display:'flex', alignItems:'flex-end' }}>
                        <button className="jp-btn-ghost" style={{ width:'100%' }}
                          onClick={() => { setQuery(""); setSelectedPay("any"); setNearbyRadius(10); }}>
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Results header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0' }}>
                  <p style={{ fontSize:13, color:'var(--text-muted)' }}>
                    <span style={{ color:'var(--neon-cyan)', fontFamily:'var(--font-display)', fontWeight:700 }}>{filteredJobs.length}</span> job{filteredJobs.length!==1?'s':''} found
                  </p>
                  <span style={{ fontSize:11, color:'var(--text-muted)', background:'rgba(0,255,179,.06)', border:'1px solid rgba(0,255,179,.15)', padding:'4px 10px', borderRadius:100, fontFamily:'var(--font-display)', fontWeight:600 }}>
                    Within {nearbyRadius} km
                  </span>
                </div>

                {/* Job list */}
                {filteredJobs.length ? (
                  filteredJobs.map((job, i) => (
                    <div key={job.id} style={{ animationDelay:`${i*0.07}s` }}>
                      <JobCard job={job} onView={handleViewJob} onApply={handleApply} />
                    </div>
                  ))
                ) : (
                  <div className="jp-card" style={{ padding:48, textAlign:'center' }}>
                    <div style={{ width:56, height:56, borderRadius:16, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                      <Search size={24} style={{ color:'var(--text-muted)' }} />
                    </div>
                    <p style={{ color:'var(--text-muted)', fontSize:14 }}>No jobs found matching your filters.</p>
                  </div>
                )}
              </main>

              {/* ── Sidebar ── */}
              <aside style={{ display:'flex', flexDirection:'column', gap:16 }}>

                {/* Map */}
                <div className="jp-card" style={{ overflow:'hidden', padding:0 }}>
                  <div style={{ padding:'16px 18px 12px', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
                      <MapPin size={14} style={{ color:'var(--neon-cyan)' }} /> Nearby Jobs
                    </div>
                  </div>
                  <div style={{ height:220, overflow:'hidden', position:'relative' }}>
                    <iframe title="Job Map" style={{ width:'100%', height:'100%', border:'none', filter:'invert(0.9) hue-rotate(180deg) saturate(0.7)' }}
                      src="https://www.google.com/maps?q=India&output=embed" />
                    <div style={{ position:'absolute', inset:0, background:'rgba(5,10,15,.15)', pointerEvents:'none' }} />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="jp-card" style={{ padding:20 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, color:'var(--text-primary)' }}>Quick Actions</div>
                    <MessageSquare size={15} style={{ color:'var(--neon-cyan)' }} />
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                    {[["Applications","/application"],["Profile","/user/profile"],["Disputes","/dispute"],["Help","/faq"]].map(([l,to]) => (
                      <Link key={l} to={to} className="jp-quick-link">{l}</Link>
                    ))}
                  </div>
                </div>

                {/* Top Employers */}
                <div className="jp-card" style={{ padding:20 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, color:'var(--text-primary)', marginBottom:14 }}>
                    Top Employers
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {[["BuildRight Co.","4.8"],["QuickShip","4.6"],["Swift Movers","4.5"]].map(([name,rating]) => (
                      <div key={name} className="jp-employer-row">
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,rgba(0,255,179,.15),rgba(0,229,255,.1))', border:'1px solid rgba(0,255,179,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:12, color:'var(--neon-green)' }}>
                            {name[0]}
                          </div>
                          <span style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{name}</span>
                        </div>
                        <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--neon-amber)', fontFamily:'var(--font-display)', fontWeight:700 }}>
                          <Star size={12} style={{ fill:'var(--neon-amber)', filter:'drop-shadow(0 0 4px var(--neon-amber))' }} /> {rating}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}