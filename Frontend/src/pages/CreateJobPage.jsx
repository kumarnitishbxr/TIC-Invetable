import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJob } from "../store/slices/jobSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  IndianRupee,
  Layers,
  ChevronRight,
  CheckCircle,
  XCircle,
  Sparkles,
  Shield,
  Plus,
} from "lucide-react";

/* ─── CSS ─────────────────────────────────────────────────────────────── */
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

  .cj-root * { box-sizing: border-box; }
  .cj-root {
    font-family: var(--font-body);
    background: var(--bg-base);
    color: var(--text-primary);
    min-height: 100vh;
    position: relative;
  }

  /* ── Animations ── */
  @keyframes orb-drift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(40px,-30px) scale(1.08); }
    66%      { transform: translate(-25px,20px) scale(0.94); }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slide-in {
    from { opacity:0; transform:translateX(-14px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Card ── */
  .cj-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px;
    animation: fade-up .45s ease both;
  }

  /* ── Input / Select / Textarea ── */
  .cj-input, .cj-select, .cj-textarea {
    width: 100%;
    background: var(--bg-input);
    border: 1px solid rgba(0,229,255,.14);
    border-radius: 14px;
    padding: 13px 16px;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .cj-input::placeholder,
  .cj-textarea::placeholder { color: var(--text-muted); }
  .cj-input:focus,
  .cj-select:focus,
  .cj-textarea:focus {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 0 3px rgba(0,229,255,.07);
  }
  .cj-select {
    appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 8l4 4 4-4' stroke='%235a7a9a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 38px;
  }
  .cj-select option { background: #0c1420; color: #e8f4ff; }
  .cj-textarea { resize: vertical; min-height: 120px; }

  /* ── Label ── */
  .cj-label {
    display: block;
    font-size: 11px; font-weight: 700;
    font-family: var(--font-display);
    color: var(--text-muted);
    text-transform: uppercase; letter-spacing: .05em;
    margin-bottom: 8px;
  }

  /* ── Error ── */
  .cj-error {
    font-size: 11.5px;
    color: var(--neon-pink);
    margin-top: 6px;
    font-weight: 600;
    display: flex; align-items: center; gap: 5px;
  }

  /* ── Neon Button ── */
  .cj-btn-neon {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 28px; border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    color: #000; overflow: hidden;
    transition: transform .2s, box-shadow .2s;
    white-space: nowrap;
  }
  .cj-btn-neon::after {
    content:''; position:absolute; inset:-2px; border-radius:16px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    filter:blur(14px); opacity:0; z-index:-1; transition:opacity .2s;
  }
  .cj-btn-neon:hover:not(:disabled) { transform:translateY(-2px); }
  .cj-btn-neon:hover:not(:disabled)::after { opacity:.4; }
  .cj-btn-neon:disabled { opacity:.5; cursor:not-allowed; transform:none; }

  /* ── Ghost Button ── */
  .cj-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 24px; border-radius: 14px; cursor: pointer;
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    background: rgba(0,229,255,.05); border: 1px solid rgba(0,229,255,.18);
    color: var(--neon-cyan); transition: all .2s; white-space: nowrap;
  }
  .cj-btn-ghost:hover {
    background: rgba(0,229,255,.1);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 16px rgba(0,229,255,.12);
  }

  /* ── Back Button ── */
  .cj-btn-back {
    display: flex; align-items: center; justify-content: center;
    width: 42px; height: 42px; border-radius: 13px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    cursor: pointer; transition: all .2s;
    color: var(--text-sub); flex-shrink: 0;
  }
  .cj-btn-back:hover {
    border-color: rgba(0,255,179,.3);
    color: var(--neon-green);
    box-shadow: 0 0 16px rgba(0,255,179,.1);
  }

  /* ── Skill Tag ── */
  .cj-skill-tag {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 13px; border-radius: 100px;
    background: rgba(0,229,255,.08); border: 1px solid rgba(0,229,255,.22);
    color: var(--neon-cyan); font-size: 12px; font-weight: 700;
    font-family: var(--font-display);
    animation: fade-up .2s ease both;
  }
  .cj-skill-tag button {
    background: none; border: none; cursor: pointer;
    color: rgba(0,229,255,.45); padding:0;
    display: flex; align-items: center;
    transition: color .2s;
  }
  .cj-skill-tag button:hover { color: var(--neon-pink); }

  /* ── Step Indicator ── */
  .cj-step-line {
    height: 2px; flex: 1; margin: 0 6px; border-radius: 2px;
    transition: background .4s;
  }

  /* ── Review Item ── */
  .cj-review-item {
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(255,255,255,.05);
    border-radius: 13px; padding: 14px 16px;
  }

  /* ── Grid ── */
  .cj-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media(max-width:640px){ .cj-grid-2 { grid-template-columns: 1fr !important; } }
`;

/* ─── Constants ──────────────────────────────────────────────────────── */
const CATEGORIES     = ["General", "Cleaning", "Electrical", "Plumbing", "Painting", "Other"];
const EMP_TYPES      = ["Full-time", "Part-time"];
const PAY_FREQS      = ["Daily", "Weekly", "Monthly"];
const EXP_LEVELS     = ["Entry Level", "Intermediate", "Advanced", "Expert"];
const STEP_LABELS    = ["Basic Info", "Compensation", "Skills", "Review"];

/* ─── Initial State ──────────────────────────────────────────────────── */
const INITIAL = {
  title:        "",
  category:     "General",
  employmentType: "Full-time",
  locationText:   "",
  description:    "",
  salaryMin:      "",
  salaryMax:      "",
  payFrequency:   "Daily",
  skillsInput:    "",
  skills:         [],
  experienceLevel: "Entry Level",
};

/* ─── Component ──────────────────────────────────────────────────────── */
export default function CreateJobPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { loading } = useSelector((state) => state.job);

  const [step,   setStep]   = useState(1);
  const [form,   setForm]   = useState(INITIAL);
  const [errors, setErrors] = useState({});

  /* ── helpers ── */
  const set = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
  };

  /* ── validation per step ── */
  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.title.trim())        e.title       = "Job title is required";
      if (!form.locationText.trim()) e.locationText = "Location is required";
      if (!form.description.trim())  e.description  = "Description is required";
    }
    if (s === 2) {
      const min = Number(form.salaryMin);
      const max = Number(form.salaryMax);
      if (!form.salaryMin || isNaN(min)) e.salaryMin = "Enter minimum salary";
      if (!form.salaryMax || isNaN(max)) e.salaryMax = "Enter maximum salary";
      if (!e.salaryMin && !e.salaryMax && min > max) e.salaryMax = "Max salary must be ≥ Min salary";
    }
    if (s === 3) {
      if (!form.skills.length) e.skills = "Add at least one skill";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateAll = () => {
    for (let s = 1; s <= 3; s++) {
      if (!validate(s)) { setStep(s); return false; }
    }
    return true;
  };

  /* ── step navigation ── */
  const next = () => { if (validate(step)) setStep(s => Math.min(4, s + 1)); };
  const prev = () => setStep(s => Math.max(1, s - 1));

  /* ── skill management ── */
  const addSkill = () => {
    const list = form.skillsInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    if (!list.length) return;
    setForm(p => ({
      ...p,
      skills: Array.from(new Set([...p.skills, ...list])),
      skillsInput: "",
    }));
    setErrors(p => ({ ...p, skills: undefined }));
  };

  const removeSkill = (s) =>
    setForm(p => ({ ...p, skills: p.skills.filter(x => x !== s) }));

  /* ── submit ── */
  const publish = async () => {
    if (!validateAll()) return;

    /* ✅ Exact fields backend expects */
    const payload = {
      title:           form.title.trim(),
      description:     form.description.trim(),
      category:        form.category,
      employmentType:  form.employmentType,
      locationText:    form.locationText.trim(),
      salaryMin:       Number(form.salaryMin),
      salaryMax:       Number(form.salaryMax),
      payFrequency:    form.payFrequency,
      skills:          form.skills,
      experienceLevel: form.experienceLevel,
    };

    const toastId = toast.loading("Publishing your job…");

    const result = await dispatch(createJob(payload));

    if (createJob.fulfilled.match(result)) {
      toast.success("Job posted successfully! 🚀", { id: toastId });
      setTimeout(() => navigate("/user/dashboard"), 1200);
    } else {
      const msg = result.payload || "Failed to post job. Please try again.";
      toast.error(msg, { id: toastId });
    }
  };

  /* ── reset ── */
  const reset = () => { setForm(INITIAL); setErrors({}); setStep(1); };

  /* ─────────────────────────── RENDER ─────────────────────────────── */
  return (
    <>
      <style>{styles}</style>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0c1420",
            color: "#e8f4ff",
            border: "1px solid rgba(0,229,255,.2)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          },
        }}
      />

      <div className="cj-root">
        {/* Ambient Orbs */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
          <div style={{ position:"absolute", width:550, height:550, top:-120, left:-80, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,255,179,.05) 0%,transparent 70%)", animation:"orb-drift 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:450, height:450, bottom:"5%", right:"-80px", borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,255,.04) 0%,transparent 70%)", animation:"orb-drift 22s ease-in-out infinite reverse" }} />
          <div style={{ position:"absolute", width:320, height:320, top:"45%", left:"52%", borderRadius:"50%", background:"radial-gradient(circle,rgba(191,95,255,.03) 0%,transparent 70%)", animation:"orb-drift 26s ease-in-out infinite 4s" }} />
        </div>

        {/* Content */}
        <div style={{ position:"relative", zIndex:1, maxWidth:780, margin:"0 auto", padding:"36px 20px 64px" }}>

          {/* ── Page Header ── */}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:36 }}>
            <button className="cj-btn-back" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(20px,3.5vw,28px)", color:"var(--text-primary)", marginBottom:4 }}>
                Post a New Job
              </h1>
              <p style={{ fontSize:13, color:"var(--text-muted)" }}>
                Fill in the details below to find the right candidates.
              </p>
            </div>
          </div>

          {/* ── Main Card ── */}
          <div className="cj-card" style={{ padding:"36px 36px 40px" }}>

            {/* ── Step Indicator ── */}
            <div style={{ display:"flex", alignItems:"center", marginBottom:40 }}>
              {[1,2,3,4].map((s, i) => (
                <React.Fragment key={s}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, flexShrink:0 }}>
                    <div
                      onClick={() => s < step && setStep(s)}
                      style={{
                        width:40, height:40, borderRadius:13, cursor: s < step ? "pointer" : "default",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"var(--font-display)", fontWeight:800, fontSize:14,
                        background: step > s
                          ? "linear-gradient(135deg,var(--neon-green),var(--neon-cyan))"
                          : step === s
                          ? "rgba(0,255,179,.12)"
                          : "rgba(255,255,255,.03)",
                        border: step > s
                          ? "none"
                          : step === s
                          ? "1px solid rgba(0,255,179,.4)"
                          : "1px solid rgba(255,255,255,.07)",
                        color: step > s ? "#000" : step === s ? "var(--neon-green)" : "var(--text-muted)",
                        boxShadow: step > s ? "0 0 18px rgba(0,255,179,.25)" : step === s ? "0 0 12px rgba(0,255,179,.12)" : "none",
                        transition:"all .3s",
                      }}
                    >
                      {step > s ? <CheckCircle size={17} /> : s}
                    </div>
                    <div style={{
                      fontSize:10, fontFamily:"var(--font-display)", fontWeight:700,
                      color: step >= s ? "var(--neon-green)" : "var(--text-muted)",
                      whiteSpace:"nowrap", transition:"color .3s",
                    }}>
                      {STEP_LABELS[i]}
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="cj-step-line" style={{
                      background: step > s
                        ? "linear-gradient(90deg,var(--neon-green),var(--neon-cyan))"
                        : "rgba(255,255,255,.06)",
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ══════════ STEP 1 — Basic Info ══════════ */}
            {step === 1 && (
              <div style={{ animation:"slide-in .3s ease both" }}>
                <StepHeading icon={<Briefcase size={16} style={{ color:"var(--neon-green)" }} />} title="Basic Information" />

                <div className="cj-grid-2">
                  {/* Title */}
                  <div style={{ gridColumn:"1/-1" }}>
                    <label className="cj-label">Job Title *</label>
                    <input
                      className="cj-input"
                      value={form.title}
                      onChange={e => set("title", e.target.value)}
                      placeholder="e.g. Electrician Needed, House Painter"
                    />
                    <FieldError msg={errors.title} />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="cj-label">Category</label>
                    <select className="cj-select" value={form.category} onChange={e => set("category", e.target.value)}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="cj-label">Employment Type</label>
                    <select className="cj-select" value={form.employmentType} onChange={e => set("employmentType", e.target.value)}>
                      {EMP_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Location */}
                  <div style={{ gridColumn:"1/-1" }}>
                    <label className="cj-label">Location *</label>
                    <div style={{ position:"relative" }}>
                      <MapPin size={15} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", pointerEvents:"none" }} />
                      <input
                        className="cj-input"
                        style={{ paddingLeft:40 }}
                        value={form.locationText}
                        onChange={e => set("locationText", e.target.value)}
                        placeholder="e.g. Bhopal, MP"
                      />
                    </div>
                    <FieldError msg={errors.locationText} />
                  </div>

                  {/* Description */}
                  <div style={{ gridColumn:"1/-1" }}>
                    <label className="cj-label">Job Description *</label>
                    <textarea
                      className="cj-textarea"
                      rows={5}
                      value={form.description}
                      onChange={e => set("description", e.target.value)}
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                    />
                    <FieldError msg={errors.description} />
                    <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:6 }}>
                      {form.description.length} characters
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ STEP 2 — Compensation ══════════ */}
            {step === 2 && (
              <div style={{ animation:"slide-in .3s ease both" }}>
                <StepHeading icon={<IndianRupee size={16} style={{ color:"var(--neon-amber)" }} />} title="Compensation & Pay" />

                <div className="cj-grid-2">
                  {/* Salary Min */}
                  <div>
                    <label className="cj-label">Minimum Salary (₹)</label>
                    <div style={{ position:"relative" }}>
                      <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", fontSize:14, fontWeight:700 }}>₹</span>
                      <input
                        className="cj-input"
                        style={{ paddingLeft:30 }}
                        type="number"
                        min="0"
                        value={form.salaryMin}
                        onChange={e => set("salaryMin", e.target.value)}
                        placeholder="e.g. 300"
                      />
                    </div>
                    <FieldError msg={errors.salaryMin} />
                  </div>

                  {/* Salary Max */}
                  <div>
                    <label className="cj-label">Maximum Salary (₹)</label>
                    <div style={{ position:"relative" }}>
                      <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)", fontSize:14, fontWeight:700 }}>₹</span>
                      <input
                        className="cj-input"
                        style={{ paddingLeft:30 }}
                        type="number"
                        min="0"
                        value={form.salaryMax}
                        onChange={e => set("salaryMax", e.target.value)}
                        placeholder="e.g. 600"
                      />
                    </div>
                    <FieldError msg={errors.salaryMax} />
                  </div>

                  {/* Pay Frequency */}
                  <div style={{ gridColumn:"1/-1" }}>
                    <label className="cj-label">Payment Frequency</label>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      {PAY_FREQS.map(f => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => set("payFrequency", f)}
                          style={{
                            padding:"10px 22px", borderRadius:12, cursor:"pointer",
                            fontFamily:"var(--font-display)", fontWeight:700, fontSize:13,
                            border: form.payFrequency === f
                              ? "1px solid var(--neon-green)"
                              : "1px solid rgba(255,255,255,.08)",
                            background: form.payFrequency === f
                              ? "rgba(0,255,179,.1)"
                              : "rgba(255,255,255,.02)",
                            color: form.payFrequency === f
                              ? "var(--neon-green)"
                              : "var(--text-muted)",
                            transition:"all .2s",
                          }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview banner */}
                  {form.salaryMin && form.salaryMax && Number(form.salaryMin) <= Number(form.salaryMax) && (
                    <div style={{ gridColumn:"1/-1", padding:"16px 20px", borderRadius:16, background:"linear-gradient(135deg,rgba(0,255,179,.06),rgba(0,229,255,.04))", border:"1px solid rgba(0,255,179,.2)", display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:38, height:38, borderRadius:11, background:"rgba(0,255,179,.12)", border:"1px solid rgba(0,255,179,.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Shield size={16} style={{ color:"var(--neon-green)" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:14, color:"var(--neon-green)", marginBottom:2 }}>Pay Range Preview</div>
                        <div style={{ fontSize:13, color:"var(--text-sub)" }}>
                          ₹{form.salaryMin} – ₹{form.salaryMax} &nbsp;·&nbsp; {form.payFrequency}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ══════════ STEP 3 — Skills ══════════ */}
            {step === 3 && (
              <div style={{ animation:"slide-in .3s ease both" }}>
                <StepHeading icon={<Layers size={16} style={{ color:"var(--neon-cyan)" }} />} title="Skills & Experience" />

                <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
                  {/* Skills Input */}
                  <div>
                    <label className="cj-label">Required Skills *</label>
                    <div style={{ display:"flex", gap:10 }}>
                      <input
                        className="cj-input"
                        value={form.skillsInput}
                        onChange={e => set("skillsInput", e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                        placeholder="e.g. Wiring, Plumbing, Painting (comma-separated)"
                        style={{ flex:1 }}
                      />
                      <button
                        type="button"
                        className="cj-btn-neon"
                        style={{ padding:"13px 20px", flexShrink:0 }}
                        onClick={addSkill}
                      >
                        <Plus size={15} /> Add
                      </button>
                    </div>
                    <div style={{ fontSize:11.5, color:"var(--text-muted)", marginTop:6 }}>
                      Press Enter or click Add. Multiple skills can be separated by commas.
                    </div>
                    <FieldError msg={errors.skills} />

                    {/* Skill Tags */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:14, minHeight:32 }}>
                      {form.skills.length === 0 ? (
                        <span style={{ fontSize:13, color:"var(--text-muted)", fontStyle:"italic" }}>No skills added yet…</span>
                      ) : (
                        form.skills.map(s => (
                          <span key={s} className="cj-skill-tag">
                            {s}
                            <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                              <XCircle size={14} />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="cj-label">Experience Level</label>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      {EXP_LEVELS.map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => set("experienceLevel", level)}
                          style={{
                            padding:"13px 16px", borderRadius:13, cursor:"pointer", textAlign:"left",
                            fontFamily:"var(--font-display)", fontWeight:700, fontSize:13,
                            border: form.experienceLevel === level
                              ? "1px solid var(--neon-cyan)"
                              : "1px solid rgba(255,255,255,.07)",
                            background: form.experienceLevel === level
                              ? "rgba(0,229,255,.08)"
                              : "rgba(255,255,255,.02)",
                            color: form.experienceLevel === level
                              ? "var(--neon-cyan)"
                              : "var(--text-muted)",
                            transition:"all .2s",
                          }}
                        >
                          {form.experienceLevel === level && (
                            <CheckCircle size={13} style={{ display:"inline", marginRight:6, verticalAlign:"middle" }} />
                          )}
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ STEP 4 — Review ══════════ */}
            {step === 4 && (
              <div style={{ animation:"slide-in .3s ease both" }}>
                <StepHeading icon={<Sparkles size={16} style={{ color:"var(--neon-amber)" }} />} title="Review & Publish" />

                {/* Review Grid */}
                <div className="cj-grid-2" style={{ marginBottom:14 }}>
                  {[
                    ["Job Title",         form.title || "—"],
                    ["Location",          form.locationText || "—"],
                    ["Category",          form.category],
                    ["Employment Type",   form.employmentType],
                    ["Pay Range",         form.salaryMin && form.salaryMax ? `₹${form.salaryMin} – ₹${form.salaryMax}` : "—"],
                    ["Pay Frequency",     form.payFrequency],
                    ["Experience Level",  form.experienceLevel],
                  ].map(([label, value]) => (
                    <div key={label} className="cj-review-item">
                      <div style={{ fontSize:10, fontFamily:"var(--font-display)", fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:5 }}>
                        {label}
                      </div>
                      <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:14, color:"var(--text-primary)" }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills review */}
                <div className="cj-review-item" style={{ marginBottom:14 }}>
                  <div style={{ fontSize:10, fontFamily:"var(--font-display)", fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:10 }}>
                    Skills Required
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {form.skills.length
                      ? form.skills.map(s => <span key={s} className="cj-skill-tag">{s}</span>)
                      : <span style={{ fontSize:13, color:"var(--text-muted)" }}>None</span>
                    }
                  </div>
                </div>

                {/* Description review */}
                <div className="cj-review-item" style={{ marginBottom:24 }}>
                  <div style={{ fontSize:10, fontFamily:"var(--font-display)", fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:7 }}>
                    Job Description
                  </div>
                  <div style={{ fontSize:13, color:"var(--text-sub)", lineHeight:1.75 }}>
                    {form.description || "—"}
                  </div>
                </div>

                {/* Ready Banner */}
                <div style={{ padding:"18px 22px", borderRadius:16, background:"linear-gradient(135deg,rgba(0,255,179,.07),rgba(0,229,255,.04))", border:"1px solid rgba(0,255,179,.2)", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:"rgba(0,255,179,.14)", border:"1px solid rgba(0,255,179,.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Sparkles size={18} style={{ color:"var(--neon-green)" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:14, color:"var(--neon-green)", marginBottom:3 }}>
                      Ready to Publish
                    </div>
                    <div style={{ fontSize:13, color:"var(--text-sub)" }}>
                      Your job will be visible to candidates immediately after publishing.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ── */}
            <div style={{ marginTop:36, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                {step > 1 && (
                  <button className="cj-btn-ghost" type="button" onClick={prev}>
                    ← Back
                  </button>
                )}
              </div>
              <div style={{ display:"flex", gap:12 }}>
                {step < 4 ? (
                  <button className="cj-btn-neon" type="button" onClick={next}>
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <>
                    <button
                      className="cj-btn-ghost"
                      type="button"
                      onClick={reset}
                      style={{ borderColor:"rgba(255,45,120,.3)", color:"var(--neon-pink)" }}
                    >
                      Reset
                    </button>
                    <button
                      className="cj-btn-neon"
                      type="button"
                      onClick={publish}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div style={{ width:16, height:16, borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#000", animation:"spin 1s linear infinite" }} />
                          Publishing…
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} /> Publish Job
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Bottom Help Text ── */}
          <p style={{ textAlign:"center", fontSize:12, color:"var(--text-muted)", marginTop:20 }}>
            Need help? Visit our{" "}
            <span
              onClick={() => navigate("/faq")}
              style={{ color:"var(--neon-cyan)", cursor:"pointer", fontWeight:600 }}
            >
              FAQ page
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
}

/* ─── Small Sub-Components ────────────────────────────────────────────── */
function StepHeading({ icon, title }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
      <div style={{ width:36, height:36, borderRadius:10, background:"rgba(0,229,255,.07)", border:"1px solid rgba(0,229,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {icon}
      </div>
      <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(17px,2.5vw,20px)", color:"var(--text-primary)" }}>
        {title}
      </h2>
    </div>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <div className="cj-error">
      <XCircle size={13} /> {msg}
    </div>
  );
}