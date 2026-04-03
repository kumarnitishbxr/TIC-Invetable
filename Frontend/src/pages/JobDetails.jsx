
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosClient from "../API/axiosClient";
import { ArrowLeft, MapPin, Clock, Tag, Phone, User, Wallet, Users, CheckCircle, Briefcase } from "lucide-react";

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
    --border-hover: rgba(0,255,179,0.35);
    --text-primary: #e8f4ff;
    --text-muted:   #5a7a9a;
    --text-sub:     #8aaabe;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
  }

  .jd-root * { box-sizing: border-box; }
  .jd-root {
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
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes pulse-ring {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,255,179,.3); }
    50%      { box-shadow: 0 0 0 8px rgba(0,255,179,.0); }
  }
  @keyframes shimmer-slide {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .jd-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    transition: border-color .3s, box-shadow .3s;
  }
  .jd-card:hover {
    border-color: rgba(0,255,179,.18);
    box-shadow: 0 0 40px rgba(0,255,179,.05), 0 20px 50px rgba(0,0,0,.4);
  }

  .jd-input {
    width: 100%;
    background: var(--bg-input);
    border: 1px solid rgba(0,229,255,.15);
    border-radius: 12px;
    padding: 11px 14px;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .jd-input::placeholder { color: var(--text-muted); }
  .jd-input:focus {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 0 3px rgba(0,229,255,.08);
  }

  .jd-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-display);
    color: var(--text-muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: .04em;
  }

  .jd-btn-primary {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    color: #000;
  }
  .jd-btn-primary::after {
    content: '';
    position: absolute; inset: -2px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    filter: blur(14px);
    opacity: 0;
    z-index: -1;
    transition: opacity .2s;
  }
  .jd-btn-primary:hover:not(:disabled) { transform: translateY(-2px); }
  .jd-btn-primary:hover:not(:disabled)::after { opacity: .5; }
  .jd-btn-primary:disabled { opacity: .5; cursor: not-allowed; }

  .jd-btn-back {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    cursor: pointer;
    transition: all .2s;
    color: var(--text-sub);
    flex-shrink: 0;
  }
  .jd-btn-back:hover {
    border-color: rgba(0,255,179,.3);
    color: var(--neon-green);
    box-shadow: 0 0 16px rgba(0,255,179,.1);
  }

  .jd-skill-tag {
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-display);
    background: rgba(0,229,255,.08);
    border: 1px solid rgba(0,229,255,.25);
    color: var(--neon-cyan);
  }

  .jd-stat-box {
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.05);
    border-radius: 14px;
    padding: 14px 18px;
  }

  .jd-applicant-row {
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.05);
    border-radius: 14px;
    padding: 16px;
    transition: border-color .2s;
  }
  .jd-applicant-row:hover { border-color: rgba(0,255,179,.2); }

  .jd-sidebar-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,.04);
  }
  .jd-sidebar-row:last-child { border-bottom: none; padding-bottom: 0; }

  .jd-sidebar-icon {
    width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,229,255,.07);
    border: 1px solid rgba(0,229,255,.15);
  }

  .jd-alert-error {
    padding: 10px 14px; border-radius: 12px;
    background: rgba(255,45,120,.08);
    border: 1px solid rgba(255,45,120,.25);
    color: #ff6b9d; font-size: 13px;
  }
  .jd-alert-success {
    padding: 10px 14px; border-radius: 12px;
    background: rgba(0,255,179,.06);
    border: 1px solid rgba(0,255,179,.25);
    color: var(--neon-green); font-size: 13px;
  }

  .jd-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,.05);
    margin: 28px 0;
  }

  .jd-map-placeholder {
    width: 100%; height: 140px; border-radius: 14px;
    background: linear-gradient(135deg, rgba(0,229,255,.04), rgba(0,255,179,.03));
    border: 1px solid rgba(0,229,255,.12);
    display: flex; align-items: center; justify-content: center;
    gap: 8px; color: var(--text-muted); font-size: 13px;
  }

  @media(max-width:768px){
    .jd-grid { grid-template-columns: 1fr !important; }
    .jd-form-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function JobDetails({ job: jobProp }) {
  const { id: jobIdFromParams } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  const jobIdentifier = jobProp?._id || jobProp?.id || jobIdFromParams;

  const [job, setJob] = useState(jobProp || null);
  const [loading, setLoading] = useState(!jobProp);
  const [fetchError, setFetchError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [canViewApplicants, setCanViewApplicants] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicantCount, setApplicantCount] = useState(0);
  const [applyStatus, setApplyStatus] = useState({ loading: false, error: "", success: "" });
  const [applyForm, setApplyForm] = useState({
    fullName: user?.firstName || "",
    contactNumber: user?.contact ? String(user.contact) : "",
    experience: "",
    message: ""
  });

  const fetchJob = useCallback(async () => {
    if (!jobIdentifier) { setFetchError("Missing job identifier."); return; }
    setLoading(true); setFetchError("");
    try {
      const { data } = await axiosClient.get(`/jobs/${jobIdentifier}`);
      const payload = data?.data;
      if (payload?.job) {
        setJob(payload.job);
        setCanViewApplicants(!!payload.canViewApplicants);
        setHasApplied(!!payload.hasApplied);
        setApplicantCount(payload.applicantCount ?? payload.job.applications?.length ?? 0);
        setApplicants(payload.canViewApplicants ? (payload.job.applications || []) : []);
      } else { setFetchError("Unable to load job details."); }
    } catch (err) {
      setFetchError(err.response?.data?.message || "Unable to load job details.");
    } finally { setLoading(false); }
  }, [jobIdentifier]);

  useEffect(() => { if (jobProp && !jobIdentifier) setJob(jobProp); }, [jobProp, jobIdentifier]);
  useEffect(() => { if (jobIdentifier) fetchJob(); }, [jobIdentifier, fetchJob]);
  useEffect(() => {
    setApplyForm(prev => ({
      ...prev,
      fullName: prev.fullName || user?.firstName || "",
      contactNumber: prev.contactNumber || (user?.contact ? String(user.contact) : "")
    }));
  }, [user]);

  const formattedWage = useMemo(() => {
    if (!job) return "—";
    if (job.wage) return `₹${job.wage}`;
    if (job.salaryMin && job.salaryMax) return `₹${job.salaryMin} – ₹${job.salaryMax}`;
    if (job.salaryMin) return `₹${job.salaryMin}`;
    return job.payType || job.payFrequency || "—";
  }, [job]);

  const payFrequency   = job?.payFrequency || job?.employmentType || job?.payType || "—";
  const locationText   = job?.locationText || job?.location || "Location not specified";
  const employerName   = job?.employer?.firstName || job?.company || "Hiring Manager";
  const employerContact = job?.employer?.contact || job?.contact?.phone || "";
  const skillList      = job?.skills?.length ? job.skills : (job?.requirements || []);
  const postedLabel    = job?.posted || (job?.createdAt ? new Date(job.createdAt).toLocaleString() : "");
  const initials       = (employerName || "J").split(" ").map(s => s[0]).slice(0, 2).join("");

  const handleInputChange = (field, value) => {
    setApplyForm(prev => ({ ...prev, [field]: value }));
    if (applyStatus.error) setApplyStatus(prev => ({ ...prev, error: "" }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { setApplyStatus({ loading:false, error:"Please log in to apply.", success:"" }); return; }
    if (!job?._id && !jobIdentifier) { setApplyStatus({ loading:false, error:"Job info missing.", success:"" }); return; }
    if (hasApplied) { setApplyStatus({ loading:false, error:"You have already applied.", success:"" }); return; }
    const name = applyForm.fullName.trim(), contact = applyForm.contactNumber.trim();
    if (!name || !contact) { setApplyStatus({ loading:false, error:"Please provide name and contact.", success:"" }); return; }
    setApplyStatus({ loading:true, error:"", success:"" });
    try {
      await axiosClient.post(`/jobs/${job?._id || jobIdentifier}/apply`, {
        fullName: name, contactNumber: contact,
        experience: applyForm.experience.trim(), message: applyForm.message.trim()
      });
      setApplyStatus({ loading:false, error:"", success:"Application submitted successfully!" });
      setHasApplied(true);
      setApplyForm(prev => ({ ...prev, experience:"", message:"" }));
      fetchJob();
    } catch (err) {
      setApplyStatus({ loading:false, error: err.response?.data?.message || "Failed to submit. Please try again.", success:"" });
    }
  };

  /* ── Loading / Error states ── */
  if (fetchError) return (
    <>
      <style>{styles}</style>
      <main className="jd-root" style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ textAlign:'center', display:'flex', flexDirection:'column', gap:16 }}>
          <p style={{ color:'var(--neon-pink)', fontFamily:'var(--font-display)', fontWeight:700 }}>{fetchError}</p>
          <button onClick={() => navigate(-1)} className="jd-btn-back" style={{ width:'auto', padding:'10px 24px', borderRadius:12 }}>
            Go back
          </button>
        </div>
      </main>
    </>
  );

  if (loading || !job) return (
    <>
      <style>{styles}</style>
      <main className="jd-root" style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <div style={{
            width:48, height:48, borderRadius:'50%',
            border:'2px solid transparent',
            borderTopColor:'var(--neon-green)',
            animation:'spin 1s linear infinite'
          }} />
          <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-display)' }}>Loading job details…</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </main>
    </>
  );

  return (
    <>
      <style>{styles}</style>

      {/* Ambient orbs */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
        <div style={{ position:'absolute', width:500, height:500, top:-100, left:-100, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,179,.05) 0%,transparent 70%)', animation:'orb-drift 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', width:400, height:400, bottom:'5%', right:'-80px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,.04) 0%,transparent 70%)', animation:'orb-drift 20s ease-in-out infinite reverse' }} />
      </div>

      <main className="jd-root" style={{ position:'relative', zIndex:1, paddingBottom:64 }}>
        <div style={{ maxWidth:960, margin:'0 auto', padding:'32px 20px', animation:'fade-up .5s ease both' }}>

          {/* ── Header ── */}
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
            <button className="jd-btn-back" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(20px,3vw,28px)', color:'var(--text-primary)', marginBottom:4 }}>
                {job.title}
              </h1>
              <p style={{ fontSize:13, color:'var(--text-muted)' }}>
                {employerName}{postedLabel ? ` · Posted ${postedLabel}` : ""}
              </p>
            </div>
          </div>

          {/* ── Grid ── */}
          <div className="jd-grid" style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>

            {/* ── Main Card ── */}
            <div className="jd-card" style={{ padding:32 }}>

              {/* Employer row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:28 }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{
                    width:52, height:52, borderRadius:14, flexShrink:0,
                    background:'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, color:'#000',
                    boxShadow:'0 0 20px rgba(0,255,179,.25)'
                  }}>{initials}</div>
                  <div>
                    <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, color:'var(--text-primary)', marginBottom:3 }}>{employerName}</p>
                    <p style={{ fontSize:13, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:5 }}>
                      <MapPin size={12} style={{ color:'var(--neon-cyan)' }} /> {locationText}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{
                    fontFamily:'var(--font-display)', fontWeight:800, fontSize:22,
                    background:'linear-gradient(135deg,var(--neon-green),var(--neon-cyan))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
                  }}>{formattedWage}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{payFrequency}</div>
                </div>
              </div>

              {/* Stats strip */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:28 }}>
                <div className="jd-stat-box">
                  <div style={{ fontSize:11, fontFamily:'var(--font-display)', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:6 }}>Applicants</div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:22, color:'var(--neon-cyan)' }}>{applicantCount}</div>
                </div>
                <div className="jd-stat-box">
                  <div style={{ fontSize:11, fontFamily:'var(--font-display)', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:6 }}>Experience</div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, color:'var(--text-primary)' }}>{job.experienceLevel || "Not specified"}</div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom:24 }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, color:'var(--text-primary)', marginBottom:10 }}>Job Description</h3>
                <p style={{ fontSize:14, color:'var(--text-sub)', lineHeight:1.75 }}>{job.description || "No description provided."}</p>
              </div>

              {/* Skills */}
              {skillList.length > 0 && (
                <div style={{ marginBottom:24 }}>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, color:'var(--text-primary)', marginBottom:12 }}>Required Skills</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {skillList.map((s,i) => <span key={i} className="jd-skill-tag">{s}</span>)}
                  </div>
                </div>
              )}

              {/* Safety Notes */}
              {job.safetyNotes && (
                <div style={{ marginBottom:24 }}>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, color:'var(--text-primary)', marginBottom:8 }}>Safety Notes</h3>
                  <p style={{ fontSize:13, color:'var(--text-sub)', lineHeight:1.7 }}>{job.safetyNotes}</p>
                </div>
              )}

              <hr className="jd-divider" />

              {/* Apply Form */}
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:18, color:'var(--text-primary)', marginBottom:20 }}>
                  Apply for this Job
                </h3>
                <form onSubmit={handleApply} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  <div className="jd-form-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div>
                      <label className="jd-label">Full Name</label>
                      <input className="jd-input" value={applyForm.fullName} onChange={e => handleInputChange("fullName", e.target.value)} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="jd-label">Contact Number</label>
                      <input className="jd-input" value={applyForm.contactNumber} onChange={e => handleInputChange("contactNumber", e.target.value)} placeholder="Phone number" />
                    </div>
                  </div>
                  <div className="jd-form-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div>
                      <label className="jd-label">Experience</label>
                      <input className="jd-input" value={applyForm.experience} onChange={e => handleInputChange("experience", e.target.value)} placeholder="e.g. 2 years construction" />
                    </div>
                    <div>
                      <label className="jd-label">Message / Availability</label>
                      <input className="jd-input" value={applyForm.message} onChange={e => handleInputChange("message", e.target.value)} placeholder="Share anything important" />
                    </div>
                  </div>

                  {applyStatus.error   && <div className="jd-alert-error">{applyStatus.error}</div>}
                  {applyStatus.success && <div className="jd-alert-success">{applyStatus.success}</div>}

                  <div>
                    <button type="submit" className="jd-btn-primary" disabled={applyStatus.loading || hasApplied}
                      style={{ minWidth:180 }}>
                      {hasApplied
                        ? <><CheckCircle size={16} /> Application Sent</>
                        : applyStatus.loading ? "Submitting…" : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Applicants list */}
              {canViewApplicants && (
                <>
                  <hr className="jd-divider" />
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
                      <div style={{ color:'var(--neon-green)', filter:'drop-shadow(0 0 6px var(--neon-green))' }}>
                        <Users size={18} />
                      </div>
                      <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:18, color:'var(--text-primary)' }}>
                        Applicants
                      </h3>
                      <span style={{ fontSize:13, color:'var(--text-muted)', background:'rgba(0,255,179,.08)', border:'1px solid rgba(0,255,179,.2)', borderRadius:100, padding:'2px 10px', fontFamily:'var(--font-display)', fontWeight:700 }}>
                        {applicants.length}
                      </span>
                    </div>
                    {applicants.length === 0
                      ? <p style={{ fontSize:14, color:'var(--text-muted)' }}>No applicants yet.</p>
                      : <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                          {applicants.map(app => (
                            <div key={app._id || `${app.applicant}-${app.submittedAt}`} className="jd-applicant-row">
                              <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, marginBottom: (app.experience || app.message) ? 10 : 0 }}>
                                <div>
                                  <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, color:'var(--text-primary)', marginBottom:3 }}>
                                    {app.fullName || app.applicant?.firstName}
                                  </p>
                                  <p style={{ fontSize:12, color:'var(--text-muted)' }}>{app.contactNumber || app.applicant?.contact}</p>
                                </div>
                                <span style={{ fontSize:11, color:'var(--text-muted)' }}>
                                  {app.submittedAt ? new Date(app.submittedAt).toLocaleString() : ""}
                                </span>
                              </div>
                              {(app.experience || app.message) && (
                                <div style={{ display:'flex', flexDirection:'column', gap:5, fontSize:13 }}>
                                  {app.experience && <p style={{ color:'var(--text-sub)' }}><span style={{ color:'var(--neon-cyan)', fontWeight:600 }}>Experience: </span>{app.experience}</p>}
                                  {app.message    && <p style={{ color:'var(--text-sub)' }}><span style={{ color:'var(--neon-cyan)', fontWeight:600 }}>Note: </span>{app.message}</p>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                    }
                  </div>
                </>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="jd-card" style={{ padding:24 }}>
              {/* Wage highlight */}
              <div style={{
                padding:'18px 20px', borderRadius:16, marginBottom:20,
                background:'linear-gradient(135deg, rgba(0,255,179,.08), rgba(0,229,255,.05))',
                border:'1px solid rgba(0,255,179,.2)',
                textAlign:'center'
              }}>
                <div style={{ fontSize:11, fontFamily:'var(--font-display)', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>Pay</div>
                <div style={{
                  fontFamily:'var(--font-display)', fontWeight:800, fontSize:26,
                  background:'linear-gradient(135deg,var(--neon-green),var(--neon-cyan))',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
                }}>{formattedWage}</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>{payFrequency}</div>
              </div>

              {/* Detail rows */}
              <div className="jd-sidebar-row">
                <div className="jd-sidebar-icon"><User size={16} style={{ color:'var(--neon-cyan)' }} /></div>
                <div>
                  <p style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em', marginBottom:4 }}>Contact</p>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:2 }}>{employerName}</p>
                  {employerContact && (
                    <a href={`tel:${employerContact}`} style={{ fontSize:13, color:'var(--neon-cyan)', textDecoration:'none' }}>{employerContact}</a>
                  )}
                </div>
              </div>

              <div className="jd-sidebar-row">
                <div className="jd-sidebar-icon"><MapPin size={16} style={{ color:'var(--neon-green)' }} /></div>
                <div>
                  <p style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em', marginBottom:4 }}>Location</p>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{locationText}</p>
                </div>
              </div>

              <div className="jd-sidebar-row">
                <div className="jd-sidebar-icon"><Clock size={16} style={{ color:'var(--neon-purple)' }} /></div>
                <div>
                  <p style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em', marginBottom:4 }}>Duration</p>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{job.duration || "Not specified"}</p>
                </div>
              </div>

              <div className="jd-sidebar-row">
                <div className="jd-sidebar-icon"><Briefcase size={16} style={{ color:'var(--neon-amber)' }} /></div>
                <div>
                  <p style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em', marginBottom:4 }}>Category</p>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{job.category || "General work"}</p>
                </div>
              </div>

              <div className="jd-sidebar-row">
                <div className="jd-sidebar-icon"><Tag size={16} style={{ color:'var(--neon-pink)' }} /></div>
                <div>
                  <p style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em', marginBottom:4 }}>Schedule</p>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)' }}>{job.payFrequency || "Flexible schedule"}</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div style={{ marginTop:20 }}>
                <div className="jd-map-placeholder">
                  <MapPin size={18} style={{ color:'var(--neon-cyan)' }} />
                  <span>Map preview coming soon</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}