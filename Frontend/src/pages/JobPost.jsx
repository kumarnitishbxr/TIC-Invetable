
import React, { useState } from "react";
// import axiosClient from "../API/axiosClient";
import { useDispatch,useSelector } from "react-redux";
import { createJob } from "../store/slices/jobSlice";
import {
  Briefcase, Users, CreditCard, AlertTriangle, BarChart3,
  CheckCircle, FileText, XCircle, Plus, Eye, MessageSquare,
  ChevronRight, Sparkles, Zap, Shield
} from "lucide-react";

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
    --bg-input:     #081018;
    --border:       rgba(0,229,255,0.10);
    --border-soft:  rgba(255,255,255,0.05);
    --text-primary: #e8f4ff;
    --text-muted:   #5a7a9a;
    --text-sub:     #8aaabe;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
  }

  .ep-root * { box-sizing: border-box; }
  .ep-root {
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
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slide-in {
    from { opacity:0; transform:translateX(-12px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes progress-fill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }

  /* Card */
  .ep-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    transition: border-color .3s, box-shadow .3s;
  }

  /* Input / Select / Textarea */
  .ep-input, .ep-select, .ep-textarea {
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
  .ep-input::placeholder,
  .ep-textarea::placeholder { color: var(--text-muted); }
  .ep-input:focus,
  .ep-select:focus,
  .ep-textarea:focus {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 0 3px rgba(0,229,255,.07);
  }
  .ep-select {
    appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 8l4 4 4-4' stroke='%235a7a9a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }
  .ep-select option { background: #0c1420; color: #e8f4ff; }
  .ep-textarea { resize: none; }

  /* Label */
  .ep-label {
    display: block;
    font-size: 11px; font-weight: 700;
    font-family: var(--font-display);
    color: var(--text-muted);
    text-transform: uppercase; letter-spacing: .05em;
    margin-bottom: 8px;
  }

  /* Error */
  .ep-error { font-size: 11px; color: var(--neon-pink); margin-top: 6px; font-weight: 600; }

  /* Neon btn */
  .ep-btn-neon {
    position: relative;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 26px; border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    color: #000; overflow: hidden;
    transition: transform .2s, box-shadow .2s;
    white-space: nowrap;
  }
  .ep-btn-neon::after {
    content:''; position:absolute; inset:-2px; border-radius:16px;
    background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
    filter:blur(14px); opacity:0; z-index:-1; transition:opacity .2s;
  }
  .ep-btn-neon:hover:not(:disabled) { transform:translateY(-2px); }
  .ep-btn-neon:hover:not(:disabled)::after { opacity:.4; }
  .ep-btn-neon:disabled { opacity:.5; cursor:not-allowed; }

  /* Ghost btn */
  .ep-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 24px; border-radius: 14px; cursor: pointer;
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    background: rgba(0,229,255,.05); border: 1px solid rgba(0,229,255,.18);
    color: var(--neon-cyan); transition: all .2s; white-space: nowrap;
  }
  .ep-btn-ghost:hover {
    background: rgba(0,229,255,.1);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 16px rgba(0,229,255,.12);
  }

  /* Skill tag */
  .ep-skill-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-radius: 100px;
    background: rgba(0,229,255,.08); border: 1px solid rgba(0,229,255,.22);
    color: var(--neon-cyan); font-size: 12px; font-weight: 700;
    font-family: var(--font-display);
  }
  .ep-skill-tag button {
    background: none; border: none; cursor: pointer;
    color: rgba(0,229,255,.5); padding:0; display:flex; align-items:center;
    transition: color .2s;
  }
  .ep-skill-tag button:hover { color: var(--neon-pink); }

  /* Review item */
  .ep-review-item {
    background: rgba(255,255,255,.02);
    border: 1px solid var(--border-soft);
    border-radius: 12px; padding: 14px 16px;
  }

  /* Step connector line */
  .ep-step-line {
    height: 2px; flex: 1; margin: 0 6px; border-radius: 2px;
    transition: background .4s;
  }

  @media(max-width:900px){ .ep-layout{grid-template-columns:1fr!important} .ep-sidebar{position:static!important} }
  @media(max-width:640px){ .ep-form-grid-2{grid-template-columns:1fr!important} }
`;

const getInitialPostData = () => ({
  title:"", category:"Agriculture", type:"Full-time",
  location:"", description:"", salaryMin:"", salaryMax:"",
  payFreq:"Daily", skillsInput:"", skills:[], experience:"Entry Level"
});

export default function EmployerPlatform() {
  const [currentPage, setCurrentPage] = useState("postjob");
  const [jobPostStep, setJobPostStep]   = useState(1);
  const [postData, setPostData]         = useState(getInitialPostData());
  const [postErrors, setPostErrors]     = useState({});
  const [submitState, setSubmitState]   = useState({ loading:false, error:null, success:null });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.job);

  const pd = (field, val) => setPostData(p => ({ ...p, [field]: val }));

  const validateStep = step => {
    const e = {};
    if (step===1) {
      if (!postData.title.trim())       e.title       = "Job title required";
      if (!postData.location.trim())    e.location    = "Location required";
      if (!postData.description.trim()) e.description = "Description required";
    }
    if (step===2) {
      if (!postData.salaryMin||isNaN(Number(postData.salaryMin))) e.salaryMin="Enter min salary";
      if (!postData.salaryMax||isNaN(Number(postData.salaryMax))) e.salaryMax="Enter max salary";
      if (Number(postData.salaryMin)>Number(postData.salaryMax)) e.salaryMax="Max must be ≥ Min";
    }
    if (step===3) { if (!postData.skills.length) e.skills="Add at least one skill"; }
    setPostErrors(e);
    return !Object.keys(e).length;
  };

  const ensureStepsValid = () => {
    for (let s=1;s<=3;s++) { if (!validateStep(s)) { setJobPostStep(s); return false; } }
    return true;
  };

  const resetPostForm = () => { setPostData(getInitialPostData()); setPostErrors({}); setJobPostStep(1); };
  const nextStep = () => { if (validateStep(jobPostStep)) setJobPostStep(s => Math.min(4,s+1)); };
  const prevStep = () => setJobPostStep(s => Math.max(1,s-1));

  const addSkill = () => {
    const list = postData.skillsInput.split(",").map(s=>s.trim()).filter(Boolean);
    if (!list.length) return;
    setPostData(p => ({ ...p, skills:Array.from(new Set([...p.skills,...list])), skillsInput:"" }));
    setPostErrors(p => ({ ...p, skills:undefined }));
  };

  const removeSkill = s => setPostData(p => ({ ...p, skills:p.skills.filter(x=>x!==s) }));

  const startNewJob = () => { setCurrentPage("postjob"); resetPostForm(); setSubmitState({loading:false,error:null,success:null}); };

  // const publishJob = async () => {
  //   if (!ensureStepsValid()) return;
  //   const num = v => { const n=Number(v); return Number.isFinite(n)?n:undefined; };
  //   const payload = {
  //     title:postData.title.trim(), description:postData.description.trim(),
  //     category:postData.category, employmentType:postData.type,
  //     locationText:postData.location.trim(),
  //     salaryMin:num(postData.salaryMin), salaryMax:num(postData.salaryMax),
  //     payFrequency:postData.payFreq, skills:postData.skills, experienceLevel:postData.experience
  //   };
  //   setSubmitState({loading:true,error:null,success:null});
  //   try {
  //     const { data } = await axiosClient.post("/user/jobs", payload);
  //     setSubmitState({loading:false,error:null,success:data?.message||"Job published successfully!"});
  //     resetPostForm(); setCurrentPage("applicants");
  //   } catch(err) {
  //     setSubmitState({loading:false,error:err.response?.data?.message||"Failed to publish. Please try again.",success:null});
  //   }
  // };


  const publishJob = async () => {
  if (!ensureStepsValid()) return;

  const payload = {
    title: postData.title.trim(),
    description: postData.description.trim(),
    category: postData.category,
    type: postData.type,
    location: postData.location.trim(),
    salaryMin: Number(postData.salaryMin),
    salaryMax: Number(postData.salaryMax),
    payFrequency: postData.payFreq,
    skills: postData.skills,
    experience: postData.experience,
  };

  setSubmitState({ loading: true, error: null, success: null });

  try {
    const resultAction = await dispatch(createJob(payload));

    if (createJob.fulfilled.match(resultAction)) {
      setSubmitState({
        loading: false,
        error: null,
        success: "Job posted successfully 🚀",
      });

      resetPostForm();
      setCurrentPage("applicants");

    } else {
      setSubmitState({
        loading: false,
        error: resultAction.payload || "Failed to post job",
        success: null,
      });
    }

  } catch (err) {
    setSubmitState({
      loading: false,
      error: "Something went wrong",
      success: null,
    });
  }
};


  const navItems = [
    { id:"postjob",    label:"Post Job",    icon:FileText,      neon:"var(--neon-green)" },
    { id:"applicants", label:"Applicants",  icon:Users,         neon:"var(--neon-cyan)" },
    { id:"payments",   label:"Payments",    icon:CreditCard,    neon:"var(--neon-purple)" },
    { id:"disputes",   label:"Disputes",    icon:AlertTriangle, neon:"var(--neon-pink)" },
    { id:"analytics",  label:"Analytics",   icon:BarChart3,     neon:"var(--neon-amber)" },
  ];

  const stepLabels = ["Basic Info","Compensation","Skills","Review"];

  return (
    <>
      <style>{styles}</style>
      <div className="ep-root" style={{ position:"relative" }}>

        {/* Ambient orbs */}
        <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
          <div style={{ position:"absolute",width:600,height:600,top:-150,left:-100,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,179,.04) 0%,transparent 70%)",animation:"orb-drift 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute",width:400,height:400,bottom:"5%",right:"-80px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,229,255,.04) 0%,transparent 70%)",animation:"orb-drift 22s ease-in-out infinite reverse" }} />
          <div style={{ position:"absolute",width:300,height:300,top:"40%",left:"50%",borderRadius:"50%",background:"radial-gradient(circle,rgba(191,95,255,.03) 0%,transparent 70%)",animation:"orb-drift 25s ease-in-out infinite 5s" }} />
        </div>

        <div className="ep-layout" style={{ position:"relative",zIndex:1,maxWidth:1200,margin:"0 auto",padding:"32px 20px",display:"grid",gridTemplateColumns:"260px 1fr",gap:20,alignItems:"start" }}>

          {/* ── Sidebar ── */}
          <aside className="ep-sidebar ep-card" style={{ padding:20,position:"sticky",top:24 }}>
            {/* Brand */}
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:28,paddingBottom:20,borderBottom:"1px solid var(--border-soft)" }}>
              <div style={{ width:42,height:42,borderRadius:13,background:"linear-gradient(135deg,var(--neon-green),var(--neon-cyan))",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-display)",fontWeight:800,fontSize:16,color:"#000",boxShadow:"0 0 18px rgba(0,255,179,.3)" }}>
                E
              </div>
              <div>
                <div style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:14,background:"linear-gradient(135deg,var(--neon-green),var(--neon-cyan))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Employer Hub</div>
                <div style={{ fontSize:11,color:"var(--text-muted)" }}>Dashboard</div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display:"flex",flexDirection:"column",gap:4,marginBottom:24 }}>
              {navItems.map(item => {
                const active = currentPage === item.id;
                return (
                  <button key={item.id} onClick={() => setCurrentPage(item.id)}
                    style={{
                      display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:14,
                      background:active?`linear-gradient(135deg,${item.neon}15,${item.neon}08)`:"transparent",
                      border:`1px solid ${active?`${item.neon}30`:"transparent"}`,
                      color:active?item.neon:"var(--text-muted)",
                      fontFamily:"var(--font-display)",fontWeight:700,fontSize:13,
                      cursor:"pointer",transition:"all .2s",textAlign:"left",width:"100%",
                      boxShadow:active?`0 0 20px ${item.neon}08`:"none"
                    }}
                    onMouseEnter={e=>{if(!active){e.currentTarget.style.background="rgba(255,255,255,.03)";e.currentTarget.style.color="var(--text-sub)";}}}
                    onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--text-muted)";}}}
                  >
                    <div style={{ width:32,height:32,borderRadius:10,background:active?`${item.neon}18`:"rgba(255,255,255,.04)",border:`1px solid ${active?`${item.neon}30`:"rgba(255,255,255,.06)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s" }}>
                      <item.icon size={15} style={{ color:active?item.neon:"var(--text-muted)" }} />
                    </div>
                    {item.label}
                    {active && <ChevronRight size={13} style={{ marginLeft:"auto",color:item.neon }} />}
                  </button>
                );
              })}
            </nav>

            {/* New Job CTA */}
            <div style={{ paddingTop:16,borderTop:"1px solid var(--border-soft)" }}>
              <div style={{ fontSize:10,fontFamily:"var(--font-display)",fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10 }}>Quick Actions</div>
              <button className="ep-btn-neon" style={{ width:"100%",padding:"13px 16px" }} onClick={startNewJob}>
                <Plus size={15} /> New Job
              </button>
            </div>
          </aside>

          {/* ── Main ── */}
          <main style={{ display:"flex",flexDirection:"column",gap:0 }}>

            {/* Post Job */}
            {currentPage==="postjob" && (
              <div className="ep-card" style={{ padding:36,animation:"fade-up .4s ease both" }}>
                <div style={{ marginBottom:32 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
                    <div style={{ width:36,height:36,borderRadius:10,background:"rgba(0,255,179,.12)",border:"1px solid rgba(0,255,179,.25)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <FileText size={16} style={{ color:"var(--neon-green)" }} />
                    </div>
                    <h1 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(20px,3vw,28px)",background:"linear-gradient(135deg,var(--text-primary),var(--text-sub))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
                      Post a New Job
                    </h1>
                  </div>
                  <p style={{ fontSize:14,color:"var(--text-muted)",marginLeft:46 }}>Create a post to receive qualified applicants.</p>
                </div>

                {submitState.error && (
                  <div style={{ padding:"12px 16px",borderRadius:14,background:"rgba(255,45,120,.07)",border:"1px solid rgba(255,45,120,.25)",color:"var(--neon-pink)",fontSize:13,marginBottom:24 }}>
                    {submitState.error}
                  </div>
                )}

                {/* Step indicator */}
                <div style={{ display:"flex",alignItems:"center",marginBottom:36 }}>
                  {[1,2,3,4].map((s,i) => (
                    <React.Fragment key={s}>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0 }}>
                        <div style={{
                          width:38,height:38,borderRadius:12,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontFamily:"var(--font-display)",fontWeight:800,fontSize:14,
                          background:jobPostStep>=s?"linear-gradient(135deg,var(--neon-green),var(--neon-cyan))":jobPostStep===s-1?"rgba(0,255,179,.1)":"rgba(255,255,255,.04)",
                          border:jobPostStep>=s?"none":jobPostStep===s-1?"1px solid rgba(0,255,179,.3)":"1px solid rgba(255,255,255,.07)",
                          color:jobPostStep>=s?"#000":"var(--text-muted)",
                          boxShadow:jobPostStep>=s?"0 0 16px rgba(0,255,179,.25)":"none",
                          transition:"all .3s"
                        }}>{jobPostStep>s?<CheckCircle size={16}/>:s}</div>
                        <div style={{ fontSize:10,fontFamily:"var(--font-display)",fontWeight:700,color:jobPostStep>=s?"var(--neon-green)":"var(--text-muted)",whiteSpace:"nowrap",transition:"color .3s" }}>
                          {stepLabels[i]}
                        </div>
                      </div>
                      {i<3 && (
                        <div className="ep-step-line" style={{ background:jobPostStep>s?"linear-gradient(90deg,var(--neon-green),var(--neon-cyan))":"rgba(255,255,255,.06)" }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* ── Step 1 ── */}
                {jobPostStep===1 && (
                  <div style={{ animation:"slide-in .3s ease both" }}>
                    <h2 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:18,marginBottom:24,color:"var(--text-primary)" }}>Basic Information</h2>
                    <div className="ep-form-grid-2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18 }}>
                      <div>
                        <label className="ep-label">Job Title</label>
                        <input className="ep-input" value={postData.title} onChange={e=>pd("title",e.target.value)} placeholder="e.g. Field Worker, Painter" />
                        {postErrors.title && <div className="ep-error">{postErrors.title}</div>}
                      </div>
                      <div>
                        <label className="ep-label">Category</label>
                        <select className="ep-select" value={postData.category} onChange={e=>pd("category",e.target.value)}>
                          {["Agriculture","Construction","Manufacturing","Services"].map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="ep-label">Employment Type</label>
                        <select className="ep-select" value={postData.type} onChange={e=>pd("type",e.target.value)}>
                          {["Full-time","Part-time","Contract","Daily Wage"].map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="ep-label">Location</label>
                        <input className="ep-input" value={postData.location} onChange={e=>pd("location",e.target.value)} placeholder="City, village or area" />
                        {postErrors.location && <div className="ep-error">{postErrors.location}</div>}
                      </div>
                      <div style={{ gridColumn:"1/-1" }}>
                        <label className="ep-label">Job Description</label>
                        <textarea className="ep-textarea" rows={5} value={postData.description} onChange={e=>pd("description",e.target.value)} placeholder="Describe the role, responsibilities, and requirements..." />
                        {postErrors.description && <div className="ep-error">{postErrors.description}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 2 ── */}
                {jobPostStep===2 && (
                  <div style={{ animation:"slide-in .3s ease both" }}>
                    <h2 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:18,marginBottom:24,color:"var(--text-primary)" }}>Compensation & Budget</h2>
                    <div className="ep-form-grid-2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18 }}>
                      <div>
                        <label className="ep-label">Minimum Salary (₹)</label>
                        <input className="ep-input" type="number" value={postData.salaryMin} onChange={e=>pd("salaryMin",e.target.value)} placeholder="e.g. 300" />
                        {postErrors.salaryMin && <div className="ep-error">{postErrors.salaryMin}</div>}
                      </div>
                      <div>
                        <label className="ep-label">Maximum Salary (₹)</label>
                        <input className="ep-input" type="number" value={postData.salaryMax} onChange={e=>pd("salaryMax",e.target.value)} placeholder="e.g. 500" />
                        {postErrors.salaryMax && <div className="ep-error">{postErrors.salaryMax}</div>}
                      </div>
                      <div style={{ gridColumn:"1/-1" }}>
                        <label className="ep-label">Payment Frequency</label>
                        <select className="ep-select" value={postData.payFreq} onChange={e=>pd("payFreq",e.target.value)}>
                          {["Daily","Weekly","Monthly"].map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                      {/* Secure payment notice */}
                      <div style={{ gridColumn:"1/-1",padding:"18px 20px",borderRadius:16,background:"linear-gradient(135deg,rgba(0,255,179,.06),rgba(0,229,255,.04))",border:"1px solid rgba(0,255,179,.2)" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                          <div style={{ width:36,height:36,borderRadius:10,background:"rgba(0,255,179,.12)",border:"1px solid rgba(0,255,179,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                            <Shield size={16} style={{ color:"var(--neon-green)" }} />
                          </div>
                          <div>
                            <div style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:14,color:"var(--neon-green)",marginBottom:3 }}>Secure Payment Protection</div>
                            <div style={{ fontSize:13,color:"var(--text-sub)" }}>All payments are protected through our secure escrow system.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 3 ── */}
                {jobPostStep===3 && (
                  <div style={{ animation:"slide-in .3s ease both" }}>
                    <h2 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:18,marginBottom:24,color:"var(--text-primary)" }}>Requirements & Skills</h2>
                    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                      <div>
                        <label className="ep-label">Required Skills</label>
                        <div style={{ display:"flex",gap:10 }}>
                          <input className="ep-input" value={postData.skillsInput} onChange={e=>pd("skillsInput",e.target.value)}
                            onKeyDown={e=>e.key==="Enter"&&addSkill()}
                            placeholder="Enter skills separated by commas" style={{ flex:1 }} />
                          <button className="ep-btn-neon" style={{ padding:"13px 22px",flexShrink:0 }} onClick={addSkill}>Add</button>
                        </div>
                        {postErrors.skills && <div className="ep-error">{postErrors.skills}</div>}
                        <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:14 }}>
                          {postData.skills.map(s => (
                            <span key={s} className="ep-skill-tag">
                              {s}
                              <button onClick={()=>removeSkill(s)}><XCircle size={13} /></button>
                            </span>
                          ))}
                          {!postData.skills.length && (
                            <span style={{ fontSize:13,color:"var(--text-muted)",fontStyle:"italic" }}>No skills added yet…</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="ep-label">Experience Level</label>
                        <select className="ep-select" value={postData.experience} onChange={e=>pd("experience",e.target.value)}>
                          {["Entry Level","Experienced","Senior"].map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 4 ── */}
                {jobPostStep===4 && (
                  <div style={{ animation:"slide-in .3s ease both" }}>
                    <h2 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:18,marginBottom:24,color:"var(--text-primary)" }}>Review & Publish</h2>

                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }} className="ep-form-grid-2">
                      {[
                        ["Job Title", postData.title||"—"],
                        ["Location",  postData.location||"—"],
                        ["Type",      postData.type],
                        ["Salary Range", `₹${postData.salaryMin||"—"} – ₹${postData.salaryMax||"—"}`],
                        ["Pay Frequency", postData.payFreq],
                        ["Experience", postData.experience],
                      ].map(([l,v]) => (
                        <div key={l} className="ep-review-item">
                          <div style={{ fontSize:10,fontFamily:"var(--font-display)",fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:5 }}>{l}</div>
                          <div style={{ fontFamily:"var(--font-display)",fontWeight:700,fontSize:14,color:"var(--text-primary)" }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    <div className="ep-review-item" style={{ marginBottom:14 }}>
                      <div style={{ fontSize:10,fontFamily:"var(--font-display)",fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:10 }}>Skills</div>
                      <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                        {postData.skills.map(s=><span key={s} className="ep-skill-tag">{s}</span>)}
                        {!postData.skills.length && <span style={{ fontSize:13,color:"var(--text-muted)" }}>None</span>}
                      </div>
                    </div>

                    <div className="ep-review-item" style={{ marginBottom:24 }}>
                      <div style={{ fontSize:10,fontFamily:"var(--font-display)",fontWeight:700,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:6 }}>Description</div>
                      <div style={{ fontSize:13,color:"var(--text-sub)",lineHeight:1.7 }}>{postData.description||"—"}</div>
                    </div>

                    {/* Ready banner */}
                    <div style={{ padding:"18px 20px",borderRadius:16,background:"linear-gradient(135deg,rgba(0,255,179,.07),rgba(0,229,255,.04))",border:"1px solid rgba(0,255,179,.2)",display:"flex",alignItems:"center",gap:14 }}>
                      <div style={{ width:40,height:40,borderRadius:12,background:"rgba(0,255,179,.14)",border:"1px solid rgba(0,255,179,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <Sparkles size={18} style={{ color:"var(--neon-green)" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:14,color:"var(--neon-green)",marginBottom:3 }}>Ready to Publish</div>
                        <div style={{ fontSize:13,color:"var(--text-sub)" }}>Your job will be visible to candidates immediately.</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ marginTop:32,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <div>
                    {jobPostStep>1 && (
                      <button className="ep-btn-ghost" onClick={prevStep}>← Back</button>
                    )}
                  </div>
                  <div>
                    {jobPostStep<4
                      ? <button className="ep-btn-neon" onClick={nextStep}>Continue <ChevronRight size={15} /></button>
                      : <button className="ep-btn-neon" onClick={publishJob} disabled={submitState.loading}
                          style={{ background:submitState.loading?"rgba(0,255,179,.3)":"linear-gradient(135deg,var(--neon-green),var(--neon-cyan))" }}>
                          {submitState.loading?"Publishing…":"Publish Job 🚀"}
                        </button>
                    }
                  </div>
                </div>
              </div>
            )}

            {/* Applicants */}
            {currentPage==="applicants" && (
              <div className="ep-card" style={{ padding:36,animation:"fade-up .4s ease both" }}>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
                  <div style={{ width:36,height:36,borderRadius:10,background:"rgba(0,229,255,.1)",border:"1px solid rgba(0,229,255,.25)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <Users size={16} style={{ color:"var(--neon-cyan)" }} />
                  </div>
                  <h2 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(18px,3vw,26px)",background:"linear-gradient(135deg,var(--text-primary),var(--text-sub))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
                    Applicant Management
                  </h2>
                </div>
                <p style={{ fontSize:14,color:"var(--text-muted)",marginBottom:24,marginLeft:48 }}>Review and manage candidates for your roles.</p>

                {submitState.success && (
                  <div style={{ padding:"12px 16px",borderRadius:14,background:"rgba(0,255,179,.06)",border:"1px solid rgba(0,255,179,.25)",color:"var(--neon-green)",fontSize:13,marginBottom:24,display:"flex",alignItems:"center",gap:8 }}>
                    <CheckCircle size={15} /> {submitState.success}
                  </div>
                )}

                <div style={{ padding:"60px 24px",textAlign:"center" }}>
                  <div style={{ width:60,height:60,borderRadius:18,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}>
                    <Users size={26} style={{ color:"var(--text-muted)" }} />
                  </div>
                  <p style={{ color:"var(--text-muted)",fontSize:14,fontFamily:"var(--font-display)",fontWeight:600 }}>No applicants yet. Check back later!</p>
                </div>
              </div>
            )}

            {/* Other pages */}
            {currentPage!=="postjob" && currentPage!=="applicants" && (
              <div className="ep-card" style={{ padding:36,textAlign:"center",animation:"fade-up .4s ease both" }}>
                {(() => { const item=navItems.find(n=>n.id===currentPage); return (
                  <>
                    <div style={{ width:60,height:60,borderRadius:18,background:`${item.neon}12`,border:`1px solid ${item.neon}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px" }}>
                      <item.icon size={26} style={{ color:item.neon }} />
                    </div>
                    <h2 style={{ fontFamily:"var(--font-display)",fontWeight:800,fontSize:24,marginBottom:8,color:"var(--text-primary)" }}>{item.label}</h2>
                    <p style={{ color:"var(--text-muted)",fontSize:14 }}>This section is under development.</p>
                  </>
                ); })()}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}