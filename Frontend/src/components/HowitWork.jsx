// // src/pages/HowItWorks.jsx
// import React, { useState } from "react";
// import {
//   ArrowRight,
//   MapPin,
//   Briefcase,
//   ShieldCheck,
//   MessageSquare,
//   CheckCircle,
//   Users,
//   Sparkles,
//   Clock,
//   IndianRupee,
//   AlertTriangle,
// } from "lucide-react";

// export default function HowItWorks() {
//   const [activeFlow, setActiveFlow] = useState("worker");

//   const steps = [
//     {
//       id: 1,
//       title: "Create & Verify Your Profile",
//       description:
//         "Workers and employers sign up with basic details, phone verification and optional ID/Aadhaar. Verified badges increase trust and visibility.",
//       icon: Users,
//     },
//     {
//       id: 2,
//       title: "Smart Matching Based on Skills & Location",
//       description:
//         "KaamSetu recommends nearby jobs to workers using skills, role, distance and demand. Employers get a ranked list of best-fit workers.",
//       icon: Sparkles,
//     },
//     {
//       id: 3,
//       title: "Secure Hiring & Transparent Work",
//       description:
//         "Both parties confirm job details inside the app—timings, pay, location, and duration. Updates and communication stay on-platform.",
//       icon: Briefcase,
//     },
//     {
//       id: 4,
//       title: "Payment & Mediation (If Needed)",
//       description:
//         "Payments can be logged or routed via escrow (future-ready). If issues arise, mediation and dispute resolution flows protect both sides.",
//       icon: ShieldCheck,
//     },
//   ];

//   const flowContent = {
//     worker: {
//       title: "For Workers (Laborers)",
//       tagline: "Find nearby work in minutes — no agents, no confusion.",
//       bulletTitle: "Worker Journey on KaamSetu",
//       bullets: [
//         "Create your profile with name, skills, contact, and optional Aadhaar.",
//         "Allow location or set your area to get hyperlocal job suggestions.",
//         "Apply to suitable jobs and chat with employers inside the app.",
//         "Reach the worksite, complete the task, and build your rating & work history.",
//       ],
//       highlight: "The more you work, the stronger your digital reputation becomes — unlocking better paying jobs.",
//     },
//     employer: {
//       title: "For Employers",
//       tagline: "Hire the right worker faster, with full visibility and control.",
//       bulletTitle: "Employer Journey on KaamSetu",
//       bullets: [
//         "Post a job with role, work type, pay, location and duration.",
//         "Review a ranked list of nearby workers with ratings and skills.",
//         "Shortlist, chat, and confirm workers directly from the dashboard.",
//         "Track attendance, mark completion and log payments for future reference.",
//       ],
//       highlight: "KaamSetu reduces time-to-hire and dependence on local agents or informal networks.",
//     },
//     mediation: {
//       title: "Mediation & Dispute Resolution",
//       tagline: "If something goes wrong, the platform doesn’t leave you alone.",
//       bulletTitle: "Mediation Journey on KaamSetu",
//       bullets: [
//         "Worker or employer raises an issue from the job/booking (e.g. payment not received, unsafe conditions).",
//         "Both parties submit brief descriptions and any proof (screenshots, photos, etc.).",
//         "A mediator reviews the case, checks logs and suggests a fair outcome.",
//         "Decision and actions (payment adjustment, block, warning) are recorded in the system.",
//       ],
//       highlight: "Mediation builds long-term trust and discourages bad behavior on both sides.",
//     },
//   };

//   const currentFlow = flowContent[activeFlow];

//   return (
//     <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
//       <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14">
//         {/* Hero */}
//         <section className="grid gap-8 lg:grid-cols-2 items-center mb-10">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-xs font-medium text-indigo-700 mb-3">
//               <Sparkles className="w-3 h-3" />
//               How KaamSetu Works
//             </div>
//             <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-snug">
//               A simple, trust-first workflow <br className="hidden sm:block" />
//               for rural labor hiring.
//             </h1>
//             <p className="mt-3 text-slate-600 text-sm lg:text-base">
//               KaamSetu connects laborers, employers and mediators on a single platform.  
//               No middlemen, no guesswork—just clear workflows, verified profiles and transparent processes.
//             </p>

//             <div className="mt-5 flex flex-wrap gap-3 text-xs">
//               <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border border-slate-100">
//                 <MapPin className="w-4 h-4 text-indigo-500" />
//                 Hyperlocal matching
//               </div>
//               <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border border-slate-100">
//                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
//                 Trust & mediation layer
//               </div>
//               <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border border-slate-100">
//                 <IndianRupee className="w-4 h-4 text-amber-500" />
//                 Transparent payments
//               </div>
//             </div>
//           </div>

//           {/* Right: process summary card */}
//           <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 lg:p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <p className="text-xs text-slate-500">Platform Snapshot</p>
//                 <p className="text-lg font-semibold text-slate-900">End-to-end labor lifecycle</p>
//               </div>
//               <div className="flex items-center gap-2 text-[11px] px-3 py-1 rounded-full bg-slate-900 text-slate-100">
//                 Live Prototype <ArrowRight className="w-3 h-3" />
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-3 text-center text-xs">
//               <div className="rounded-xl bg-indigo-50 py-3">
//                 <p className="text-[11px] text-slate-500">Workers onboarded</p>
//                 <p className="text-base font-semibold text-indigo-700">+120</p>
//               </div>
//               <div className="rounded-xl bg-emerald-50 py-3">
//                 <p className="text-[11px] text-slate-500">Jobs managed</p>
//                 <p className="text-base font-semibold text-emerald-700">+80</p>
//               </div>
//               <div className="rounded-xl bg-amber-50 py-3">
//                 <p className="text-[11px] text-slate-500">Mediated disputes</p>
//                 <p className="text-base font-semibold text-amber-700">✓ Resolved</p>
//               </div>
//             </div>

//             <div className="mt-4 border-t pt-3 text-[11px] text-slate-500 space-y-1">
//               <p>
//                 ✔ Unorganized labor data → structured digital profiles{" "}
//               </p>
//               <p>✔ Offline hiring → guided digital workflows</p>
//               <p>✔ Verbal disputes → auditable mediation logs</p>
//             </div>
//           </div>
//         </section>

//         {/* 4-step core flow */}
//         <section className="mb-10">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-slate-900">Core Platform Flow</h2>
//             <p className="text-xs text-slate-500">Same backbone, tailored for workers, employers and mediators.</p>
//           </div>
//           <div className="grid gap-4 md:grid-cols-4">
//             {steps.map((s, idx) => {
//               const Icon = s.icon;
//               return (
//                 <div
//                   key={s.id}
//                   className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col h-full"
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-semibold">
//                       {s.id}
//                     </div>
//                     {idx < steps.length - 1 && (
//                       <ArrowRight className="w-3 h-3 text-slate-300 hidden md:block" />
//                     )}
//                   </div>
//                   <Icon className="w-5 h-5 text-indigo-500 mb-2" />
//                   <h3 className="text-sm font-semibold text-slate-900">{s.title}</h3>
//                   <p className="mt-2 text-xs text-slate-600 flex-1">{s.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* Flows tabs */}
//         <section className="mb-10">
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
//             <h2 className="text-lg font-semibold text-slate-900">Detailed Flows</h2>
//             <div className="flex gap-2 text-xs bg-white rounded-full p-1 border border-slate-200">
//               <button
//                 onClick={() => setActiveFlow("worker")}
//                 className={`px-3 py-1 rounded-full flex items-center gap-1 ${
//                   activeFlow === "worker" ? "bg-slate-900 text-slate-50" : "text-slate-600"
//                 }`}
//               >
//                 <Users className="w-3 h-3" /> Workers
//               </button>
//               <button
//                 onClick={() => setActiveFlow("employer")}
//                 className={`px-3 py-1 rounded-full flex items-center gap-1 ${
//                   activeFlow === "employer" ? "bg-slate-900 text-slate-50" : "text-slate-600"
//                 }`}
//               >
//                 <Briefcase className="w-3 h-3" /> Employers
//               </button>
//               <button
//                 onClick={() => setActiveFlow("mediation")}
//                 className={`px-3 py-1 rounded-full flex items-center gap-1 ${
//                   activeFlow === "mediation" ? "bg-slate-900 text-slate-50" : "text-slate-600"
//                 }`}
//               >
//                 <ShieldCheck className="w-3 h-3" /> Mediation
//               </button>
//             </div>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             {/* Left: overview */}
//             <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col">
//               <p className="text-xs font-semibold text-indigo-600 mb-1 uppercase tracking-wide">
//                 {currentFlow.title}
//               </p>
//               <h3 className="text-lg font-semibold text-slate-900 mb-2">{currentFlow.tagline}</h3>
//               <p className="text-xs text-slate-600 mb-4">
//                 {currentFlow.bulletTitle}
//               </p>

//               <ol className="space-y-2 text-xs text-slate-700">
//                 {currentFlow.bullets.map((b, idx) => (
//                   <li key={idx} className="flex items-start gap-2">
//                     <span className="mt-0.5 text-[10px] text-slate-500">{idx + 1}.</span>
//                     <span>{b}</span>
//                   </li>
//                 ))}
//               </ol>

//               <div className="mt-4 rounded-xl bg-slate-900 text-slate-50 text-xs p-3 flex items-start gap-2">
//                 <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-400" />
//                 <p>{currentFlow.highlight}</p>
//               </div>
//             </div>

//             {/* Right: quick cards */}
//             <div className="space-y-3">
//               {activeFlow === "worker" && (
//                 <>
//                   <MiniInfoCard
//                     icon={MapPin}
//                     title="Location-aware jobs"
//                     text="Jobs appear based on your saved area or GPS, reducing travel time and cost."
//                   />
//                   <MiniInfoCard
//                     icon={Clock}
//                     title="Daily & weekly work"
//                     text="Supports both one-day gigs and short-term contracts for rural workers."
//                   />
//                   <MiniInfoCard
//                     icon={IndianRupee}
//                     title="Proof of work"
//                     text="Digital records of jobs completed help workers negotiate better wages in future."
//                   />
//                 </>
//               )}
//               {activeFlow === "employer" && (
//                 <>
//                   <MiniInfoCard
//                     icon={Sparkles}
//                     title="Ranked worker list"
//                     text="Employers see top-matching workers first, based on skills, distance and rating."
//                   />
//                   <MiniInfoCard
//                     icon={MessageSquare}
//                     title="On-platform chat"
//                     text="No need to share phone numbers initially; chat before confirming a worker."
//                   />
//                   <MiniInfoCard
//                     icon={ShieldCheck}
//                     title="Reduced risk"
//                     text="Verified profiles and mediation options reduce payment and quality risk."
//                   />
//                 </>
//               )}
//               {activeFlow === "mediation" && (
//                 <>
//                   <MiniInfoCard
//                     icon={AlertTriangle}
//                     title="Structured complaints"
//                     text="Disputes are raised with categories and details, not just verbal blame."
//                   />
//                   <MiniInfoCard
//                     icon={ShieldCheck}
//                     title="Neutral mediators"
//                     text="Mediators see both sides, platform logs and previous behavior before deciding."
//                   />
//                   <MiniInfoCard
//                     icon={IndianRupee}
//                     title="Linked to payments"
//                     text="Decisions can trigger partial/ full payments, warnings or blocks."
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Lifecycle timeline */}
//         <section className="mb-10">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-slate-900">Job Lifecycle on KaamSetu</h2>
//             <p className="text-xs text-slate-500">From posting to completion and rating.</p>
//           </div>
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <TimelineItem
//                 label="1. Post"
//                 title="Employer posts a job"
//                 text="Role, pay, timings and location are added. The job goes live for nearby workers."
//               />
//               <TimelineDivider />
//               <TimelineItem
//                 label="2. Match"
//                 title="Workers apply"
//                 text="Workers with relevant skills and proximity apply or are invited."
//               />
//               <TimelineDivider />
//               <TimelineItem
//                 label="3. Work"
//                 title="Task completion"
//                 text="Worker reaches site, completes the job. Attendance can be marked on app."
//               />
//               <TimelineDivider />
//               <TimelineItem
//                 label="4. Close"
//                 title="Payment & rating"
//                 text="Payment is logged, and both sides can rate each other for future trust."
//               />
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="mb-6">
//           <div className="bg-slate-900 rounded-2xl text-slate-50 px-5 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-1">
//                 Ready to experience the flow?
//               </p>
//               <h3 className="text-lg font-semibold">KaamSetu turns chaotic labor markets into predictable workflows.</h3>
//               <p className="text-xs text-slate-300 mt-1">
//                 Use the same app to post jobs, apply for work, track status and resolve disputes.
//               </p>
//             </div>
//             <div className="flex gap-2 text-xs">
//               <button
//                 onClick={() => window.location.assign("/signup")}
//                 className="px-4 py-2 rounded-lg bg-slate-50 text-slate-900 font-medium flex items-center gap-2"
//               >
//                 Get Started <ArrowRight className="w-3 h-3" />
//               </button>
//               <button
//                 onClick={() => window.location.assign("/faq")}
//                 className="px-4 py-2 rounded-lg border border-slate-500 text-slate-100"
//               >
//                 View FAQs
//               </button>
//             </div>
//           </div>
//         </section>

//         <footer className="text-[11px] text-slate-500 text-center mt-4">
//           © {new Date().getFullYear()} KaamSetu · Rural Labor Exchange & Mediation Platform
//         </footer>
//       </div>
//     </main>
//   );
// }

// /* --------- small sub components ---------- */

// function MiniInfoCard({ icon: Icon, title, text }) {
//   return (
//     <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex items-start gap-2 text-xs">
//       <div className="mt-0.5">
//         <Icon className="w-4 h-4 text-indigo-500" />
//       </div>
//       <div>
//         <p className="font-semibold text-slate-900">{title}</p>
//         <p className="mt-1 text-slate-600">{text}</p>
//       </div>
//     </div>
//   );
// }

// function TimelineItem({ label, title, text }) {
//   return (
//     <div className="flex-1 text-xs">
//       <p className="text-[11px] text-slate-500 mb-1">{label}</p>
//       <p className="font-semibold text-slate-900">{title}</p>
//       <p className="mt-1 text-slate-600">{text}</p>
//     </div>
//   );
// }

// function TimelineDivider() {
//   return (
//     <div className="hidden md:flex items-center justify-center">
//       <div className="w-8 h-px bg-slate-200" />
//       <Clock className="w-3 h-3 mx-1 text-slate-300" />
//       <div className="w-8 h-px bg-slate-200" />
//     </div>
//   );
// }











import React, { useState } from "react";
import { ArrowRight, MapPin, Briefcase, ShieldCheck, MessageSquare, CheckCircle, Users, Sparkles, Clock, IndianRupee, AlertTriangle } from "lucide-react";

export default function HowItWorks() {
  const [activeFlow, setActiveFlow] = useState("worker");

  const steps = [
    { id: 1, title: "Create & Verify Your Profile", description: "Workers and employers sign up with basic details, phone verification and optional ID/Aadhaar. Verified badges increase trust and visibility.", icon: Users },
    { id: 2, title: "Smart Matching Based on Skills & Location", description: "KaamSetu recommends nearby jobs to workers using skills, role, distance and demand. Employers get a ranked list of best-fit workers.", icon: Sparkles },
    { id: 3, title: "Secure Hiring & Transparent Work", description: "Both parties confirm job details inside the app—timings, pay, location, and duration. Updates and communication stay on-platform.", icon: Briefcase },
    { id: 4, title: "Payment & Mediation (If Needed)", description: "Payments can be logged or routed via escrow (future-ready). If issues arise, mediation and dispute resolution flows protect both sides.", icon: ShieldCheck },
  ];

  const flowContent = {
    worker: {
      title: "For Workers (Laborers)",
      tagline: "Find nearby work in minutes — no agents, no confusion.",
      bulletTitle: "Worker Journey on KaamSetu",
      bullets: [
        "Create your profile with name, skills, contact, and optional Aadhaar.",
        "Allow location or set your area to get hyperlocal job suggestions.",
        "Apply to suitable jobs and chat with employers inside the app.",
        "Reach the worksite, complete the task, and build your rating & work history.",
      ],
      highlight: "The more you work, the stronger your digital reputation becomes — unlocking better paying jobs.",
    },
    employer: {
      title: "For Employers",
      tagline: "Hire the right worker faster, with full visibility and control.",
      bulletTitle: "Employer Journey on KaamSetu",
      bullets: [
        "Post a job with role, work type, pay, location and duration.",
        "Review a ranked list of nearby workers with ratings and skills.",
        "Shortlist, chat, and confirm workers directly from the dashboard.",
        "Track attendance, mark completion and log payments for future reference.",
      ],
      highlight: "KaamSetu reduces time-to-hire and dependence on local agents or informal networks.",
    },
    mediation: {
      title: "Mediation & Dispute Resolution",
      tagline: "If something goes wrong, the platform doesn't leave you alone.",
      bulletTitle: "Mediation Journey on KaamSetu",
      bullets: [
        "Worker or employer raises an issue from the job/booking (e.g. payment not received, unsafe conditions).",
        "Both parties submit brief descriptions and any proof (screenshots, photos, etc.).",
        "A mediator reviews the case, checks logs and suggests a fair outcome.",
        "Decision and actions (payment adjustment, block, warning) are recorded in the system.",
      ],
      highlight: "Mediation builds long-term trust and discourages bad behavior on both sides.",
    },
  };

  const currentFlow = flowContent[activeFlow];

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {/* Hero Section */}
        <section className="grid gap-12 lg:grid-cols-2 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              How KaamSetu Works
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-tight mb-6">
              A simple, trust-first workflow for rural labor hiring.
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              KaamSetu connects laborers, employers and mediators on a single platform.  
              No middlemen, no guesswork—just clear workflows, verified profiles and transparent processes.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white shadow-lg border border-slate-200 font-semibold text-sm">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Hyperlocal matching
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white shadow-lg border border-slate-200 font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Trust & mediation layer
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white shadow-lg border border-slate-200 font-semibold text-sm">
                <IndianRupee className="w-5 h-5 text-cyan-600" />
                Transparent payments
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Platform Snapshot</p>
                <p className="text-xl font-black text-slate-900">End-to-end labor lifecycle</p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-slate-900 to-slate-800 text-white text-xs font-bold">
                Live Prototype <ArrowRight className="w-3 h-3" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 p-4 text-center border border-emerald-200">
                <p className="text-xs text-slate-600 font-semibold mb-2">Workers onboarded</p>
                <p className="text-2xl font-black text-emerald-700">+120</p>
              </div>
              <div className="rounded-2xl bg-linear-to-br from-teal-50 to-cyan-50 p-4 text-center border border-teal-200">
                <p className="text-xs text-slate-600 font-semibold mb-2">Jobs managed</p>
                <p className="text-2xl font-black text-teal-700">+80</p>
              </div>
              <div className="rounded-2xl bg-linear-to-br from-cyan-50 to-blue-50 p-4 text-center border border-cyan-200">
                <p className="text-xs text-slate-600 font-semibold mb-2">Mediated disputes</p>
                <p className="text-2xl font-black text-cyan-700">✓ Resolved</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-200">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Unorganized labor data → structured digital profiles
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Offline hiring → guided digital workflows
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Verbal disputes → auditable mediation logs
              </p>
            </div>
          </div>
        </section>

        {/* Core Flow Steps */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">Core Platform Flow</h2>
            <p className="text-sm text-slate-600 font-medium">Same backbone, tailored for workers, employers and mediators.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 overflow-hidden hover:scale-105"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center text-lg font-black shadow-lg">
                        {s.id}
                      </div>
                    </div>
                    <Icon className="w-8 h-8 text-emerald-600 mb-4" />
                    <h3 className="text-lg font-black text-slate-900 mb-3">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Flows */}
        <section className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-black text-slate-900">Detailed Flows</h2>
            <div className="inline-flex gap-2 p-2 rounded-2xl bg-white border-2 border-slate-200 shadow-lg">
              <button
                onClick={() => setActiveFlow("worker")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm transition-all ${
                  activeFlow === "worker" 
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Users className="w-4 h-4" /> Workers
              </button>
              <button
                onClick={() => setActiveFlow("employer")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm transition-all ${
                  activeFlow === "employer" 
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Briefcase className="w-4 h-4" /> Employers
              </button>
              <button
                onClick={() => setActiveFlow("mediation")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm transition-all ${
                  activeFlow === "mediation" 
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Mediation
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-8">
              <p className="text-xs font-black text-emerald-600 mb-2 uppercase tracking-wider">
                {currentFlow.title}
              </p>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{currentFlow.tagline}</h3>
              <p className="text-sm text-slate-600 font-semibold mb-6">
                {currentFlow.bulletTitle}
              </p>

              <ol className="space-y-4 mb-6">
                {currentFlow.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ol>

              <div className="rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 text-white p-6 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{currentFlow.highlight}</p>
              </div>
            </div>

            {/* Side Cards */}
            <div className="space-y-4">
              {activeFlow === "worker" && (
                <>
                  <MiniInfoCard icon={MapPin} title="Location-aware jobs" text="Jobs appear based on your saved area or GPS, reducing travel time and cost." gradient="from-emerald-500 to-teal-500" />
                  <MiniInfoCard icon={Clock} title="Daily & weekly work" text="Supports both one-day gigs and short-term contracts for rural workers." gradient="from-teal-500 to-cyan-500" />
                  <MiniInfoCard icon={IndianRupee} title="Proof of work" text="Digital records of jobs completed help workers negotiate better wages in future." gradient="from-cyan-500 to-blue-500" />
                </>
              )}
              {activeFlow === "employer" && (
                <>
                  <MiniInfoCard icon={Sparkles} title="Ranked worker list" text="Employers see top-matching workers first, based on skills, distance and rating." gradient="from-emerald-500 to-teal-500" />
                  <MiniInfoCard icon={MessageSquare} title="On-platform chat" text="No need to share phone numbers initially; chat before confirming a worker." gradient="from-teal-500 to-cyan-500" />
                  <MiniInfoCard icon={ShieldCheck} title="Reduced risk" text="Verified profiles and mediation options reduce payment and quality risk." gradient="from-cyan-500 to-blue-500" />
                </>
              )}
              {activeFlow === "mediation" && (
                <>
                  <MiniInfoCard icon={AlertTriangle} title="Structured complaints" text="Disputes are raised with categories and details, not just verbal blame." gradient="from-emerald-500 to-teal-500" />
                  <MiniInfoCard icon={ShieldCheck} title="Neutral mediators" text="Mediators see both sides, platform logs and previous behavior before deciding." gradient="from-teal-500 to-cyan-500" />
                  <MiniInfoCard icon={IndianRupee} title="Linked to payments" text="Decisions can trigger partial/ full payments, warnings or blocks." gradient="from-cyan-500 to-blue-500" />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Job Lifecycle */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">Job Lifecycle on KaamSetu</h2>
            <p className="text-sm text-slate-600 font-medium">From posting to completion and rating.</p>
          </div>
          
          <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <TimelineItem 
                label="1. Post" 
                title="Employer posts a job" 
                text="Role, pay, timings and location are added. The job goes live for nearby workers."
                gradient="from-emerald-500 to-teal-500"
              />
              <TimelineItem 
                label="2. Match" 
                title="Workers apply" 
                text="Workers with relevant skills and proximity apply or are invited."
                gradient="from-teal-500 to-cyan-500"
              />
              <TimelineItem 
                label="3. Work" 
                title="Task completion" 
                text="Worker reaches site, completes the job. Attendance can be marked on app."
                gradient="from-cyan-500 to-blue-500"
              />
              <TimelineItem 
                label="4. Close" 
                title="Payment & rating" 
                text="Payment is logged, and both sides can rate each other for future trust."
                gradient="from-blue-500 to-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <div className="relative overflow-hidden bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
                  Ready to experience the flow?
                </p>
                <h3 className="text-2xl font-black mb-3">KaamSetu turns chaotic labor markets into predictable workflows.</h3>
                <p className="text-sm text-slate-300">
                  Use the same app to post jobs, apply for work, track status and resolve disputes.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.assign("/signup")}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.location.assign("/faq")}
                  className="px-6 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all"
                >
                  View FAQs
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-sm text-slate-500 text-center font-medium">
          © {new Date().getFullYear()} KaamSetu · Rural Labor Exchange & Mediation Platform
        </footer>
      </div>
    </main>
  );
}

function MiniInfoCard({ icon: Icon, title, text, gradient }) {
  return (
    <div className="bg-linear-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-lg p-5 hover:shadow-xl transition-all">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-black text-slate-900 text-sm mb-1">{title}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ label, title, text, gradient }) {
  return (
    <div className="relative">
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-xl bg-linear-to-br ${gradient} text-white font-black text-sm mb-4 shadow-lg`}>
        {label[0]}
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <p className="font-black text-slate-900 mb-2">{title}</p>
      <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}