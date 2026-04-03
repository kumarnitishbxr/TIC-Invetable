// import React, { useState, useMemo } from 'react';


// export default function FAQ() {
//   const [query, setQuery] = useState('');
//   const [category, setCategory] = useState('all');
//   const [openId, setOpenId] = useState(null);
//   const [showReport, setShowReport] = useState(false);
//   const [reportData, setReportData] = useState({ name: '', phone: '', email: '', issue: '', details: '' });
//   const [contact, setContact] = useState({ name: '', email: '', message: '' });
//   const [feedbackMessage, setFeedbackMessage] = useState('');

// //   const faqs = [
// //     {
// //       id: 'f1',
// //       q: 'How do I create a worker profile on KaamSetu?',
// //       a: 'Go to Profile > Edit and fill in your personal details, skills, experience and preferred work locations. Verify your phone number to activate your profile.',
// //       category: 'workers'
// //     },
// //     {
// //       id: 'f2',
// //       q: 'How can employers post a job?',
// //       a: 'Employers can navigate to Post Job, fill the 4-step wizard with job details, salary, required skills and publish. You can manage applicants from Applicants tab.',
// //       category: 'employers'
// //     },
// //     {
// //       id: 'f3',
// //       q: 'What payment methods are supported?',
// //       a: 'KaamSetu supports bank transfers and UPI. For escrow-protected jobs, funds are held until milestone completion or dispute resolution.',
// //       category: 'payments'
// //     },
// //     {
// //       id: 'f4',
// //       q: 'How does dispute mediation work?',
// //       a: 'Raise a dispute from My Work or Applicant dashboard with evidence. Our mediation team reviews within 24-48 hours and suggests a fair resolution.',
// //       category: 'disputes'
// //     },
// //     {
// //       id: 'f5',
// //       q: 'How is worker verification handled?',
// //       a: 'Verification may include phone OTP, ID document upload, and employer endorsements. Verified badges improve job visibility.',
// //       category: 'general'
// //     },
// //     {
// //       id: 'f6',
// //       q: 'Can I search jobs by distance?',
// //       a: 'Yes — use the location filter and distance options to find hyperlocal jobs within 2km, 5km, or 10km of your saved location.',
// //       category: 'workers'
// //     },
// //     {
// //       id: 'f7',
// //       q: 'How do I get support if payment is delayed?',
// //       a: 'Open a dispute or contact Support from the Help page. Include your job ID and payment proof — our support team will investigate promptly.',
// //       category: 'payments'
// //     },
// //     {
// //       id: 'f8',
// //       q: 'How do ratings and work history affect hiring?',
// //       a: 'Employers view verified work history and ratings when selecting candidates. Strong ratings and consistent work history boost match ranking.',
// //       category: 'general'
// //     }
// //   ];

// const faqs = useMemo(() => [
//   {
//     id: 'f1',
//     q: 'How do I create a worker profile on KaamSetu?',
//     a: 'Go to the signup page, enter your details and choose your role as worker.',
//     category: 'workers'
//   },
//   {
//     id: 'f2',
//     q: 'How do employers post jobs?',
//     a: 'Once logged in, employers can go to Dashboard → Post Job and fill the required details.',
//     category: 'employers'
//   },
//   {
//     id: 'f3',
//     q: 'How can I contact support?',
//     a: 'You can use the help form at the bottom of this page to raise a ticket.',
//     category: 'general'
//   },
//   // Add all your remaining FAQs here...
// ], []);


//   const categories = [
//     { id: 'all', label: 'All' },
//     { id: 'general', label: 'General' },
//     { id: 'workers', label: 'Workers' },
//     { id: 'employers', label: 'Employers' },
//     { id: 'payments', label: 'Payments' },
//     { id: 'disputes', label: 'Disputes' }
//   ];

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return faqs.filter(f => (category === 'all' || f.category === category) && (!q || (f.q + ' ' + f.a).toLowerCase().includes(q)));
//   }, [faqs, query, category]);

//   function toggleOpen(id) {
//     setOpenId(openId === id ? null : id);
//   }

//   function submitContact(e) {
//     e.preventDefault();
//     // TODO: replace with API call
//     setFeedbackMessage('Thank you! Our support team will contact you shortly.');
//     setContact({ name: '', email: '', message: '' });
//     setTimeout(() => setFeedbackMessage(''), 5000);
//   }

//   function submitReport(e) {
//     e.preventDefault();
//     // TODO: replace with API call to report issue endpoint
//     setFeedbackMessage('Report submitted. Our mediation team will review the issue.');
//     setReportData({ name: '', phone: '', email: '', issue: '', details: '' });
//     setShowReport(false);
//     setTimeout(() => setFeedbackMessage(''), 5000);
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold">Help & FAQs — KaamSetu</h1>
//               <p className="text-sm text-gray-600 mt-1">Find answers, contact support, or report issues quickly.</p>
//             </div>

//             <div className="flex items-center gap-3 w-full md:w-auto">
//               <div className="flex-1">
//                 <label className="sr-only">Search FAQs</label>
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search FAQs e.g. payments, verification..."
//                   className="w-full md:w-96 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="hidden md:block">
//                 <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border rounded">
//                   {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
//                 </select>
//               </div>

//               <button onClick={() => setShowReport(true)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Report Issue</button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* FAQ list */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow divide-y">
//               {filtered.length === 0 && (
//                 <div className="p-6 text-center text-gray-500">No results — try a different keyword or category.</div>
//               )}

//               {filtered.map((f) => (
//                 <div key={f.id} className="p-4">
//                   <button
//                     onClick={() => toggleOpen(f.id)}
//                     className="w-full text-left flex items-start justify-between gap-4"
//                     aria-expanded={openId === f.id}
//                     aria-controls={`panel-${f.id}`}
//                   >
//                     <div>
//                       <h3 className="font-semibold text-gray-800">{f.q}</h3>
//                       <div className="text-xs text-gray-500 mt-1">Category: {f.category}</div>
//                     </div>
//                     <div className="text-gray-400">{openId === f.id ? '−' : '+'}</div>
//                   </button>

//                   <div id={`panel-${f.id}`} className={`${openId === f.id ? 'block' : 'hidden'} mt-3 text-gray-700 pl-2`}> 
//                     {f.a}
//                   </div>
//                 </div>
//               ))}

//             </div>

//             {/* Helpful links / CTA */}
//             <div className="mt-6 flex flex-col sm:flex-row gap-3">
//               <a href="#" onClick={(e)=>{e.preventDefault(); setShowReport(true);}} className="flex-1 text-center px-4 py-3 border rounded hover:bg-gray-50">Report a Payment Issue</a>
//               <a href="#" className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Contact Support</a>
//             </div>
//           </div>

//           {/* Contact + Quick Help */}
//           <aside className="bg-white rounded-lg shadow p-4">
//             <div>
//               <h4 className="font-semibold">Quick Help</h4>
//               <p className="text-sm text-gray-600 mt-2">If you need immediate assistance, call our helpline:</p>

//               <div className="mt-3 border rounded p-3 bg-gray-50">
//                 <div className="text-xs text-gray-500">Helpline (India)</div>
//                 <div className="font-semibold">1800-XXX-XXXX</div>
//                 <div className="text-xs text-gray-500">Mon–Sat 8:00–20:00</div>
//               </div>

//               <div className="mt-4">
//                 <h5 className="font-medium">Contact Support</h5>
//                 <form onSubmit={submitContact} className="mt-3 space-y-3">
//                   <input required value={contact.name} onChange={(e)=>setContact(c=>({...c,name:e.target.value}))} placeholder="Your name" className="w-full px-3 py-2 border rounded" />
//                   <input required type="email" value={contact.email} onChange={(e)=>setContact(c=>({...c,email:e.target.value}))} placeholder="Email" className="w-full px-3 py-2 border rounded" />
//                   <textarea required value={contact.message} onChange={(e)=>setContact(c=>({...c,message:e.target.value}))} placeholder="Brief message" rows={3} className="w-full px-3 py-2 border rounded" />
//                   <button type="submit" className="w-full px-3 py-2 bg-blue-600 text-white rounded">Send</button>
//                 </form>
//               </div>

//               {feedbackMessage && <div className="mt-3 text-sm text-green-600">{feedbackMessage}</div>}

//               <div className="mt-6">
//                 <h5 className="font-medium">Popular Topics</h5>
//                 <ul className="mt-2 space-y-1 text-sm">
//                   <li><button onClick={()=>{setCategory('workers'); setQuery('');}} className="text-left text-blue-600 hover:underline">How to create a worker profile</button></li>
//                   <li><button onClick={()=>{setCategory('payments'); setQuery('');}} className="text-left text-blue-600 hover:underline">Payment & Escrow questions</button></li>
//                   <li><button onClick={()=>{setCategory('disputes'); setQuery('');}} className="text-left text-blue-600 hover:underline">Raise a dispute</button></li>
//                 </ul>
//               </div>
//             </div>
//           </aside>

//         </div>

//         {/* Report Issue Modal */}
//         {showReport && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="absolute inset-0 bg-black opacity-40" onClick={()=>setShowReport(false)} />
//             <div className="relative bg-white rounded-lg shadow-lg max-w-xl w-full p-6 z-60">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold">Report an Issue / Dispute</h3>
//                 <button onClick={()=>setShowReport(false)} className="text-gray-500 hover:text-gray-700">✕</button>
//               </div>

//               <form onSubmit={submitReport} className="space-y-3">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <input required value={reportData.name} onChange={(e)=>setReportData(d=>({...d,name:e.target.value}))} placeholder="Your name" className="px-3 py-2 border rounded" />
//                   <input required value={reportData.phone} onChange={(e)=>setReportData(d=>({...d,phone:e.target.value}))} placeholder="Phone" className="px-3 py-2 border rounded" />
//                 </div>

//                 <input required type="email" value={reportData.email} onChange={(e)=>setReportData(d=>({...d,email:e.target.value}))} placeholder="Email (optional)" className="w-full px-3 py-2 border rounded" />

//                 <select required value={reportData.issue} onChange={(e)=>setReportData(d=>({...d,issue:e.target.value}))} className="w-full px-3 py-2 border rounded">
//                   <option value="">Select issue type</option>
//                   <option value="payment">Payment not received</option>
//                   <option value="unsafe">Unsafe work conditions</option>
//                   <option value="fraud">Fraud / Fake listing</option>
//                   <option value="other">Other</option>
//                 </select>

//                 <textarea required value={reportData.details} onChange={(e)=>setReportData(d=>({...d,details:e.target.value}))} rows={4} placeholder="Describe the issue, include job id or screenshots link if any" className="w-full px-3 py-2 border rounded" />

//                 <div className="flex gap-2 justify-end">
//                   <button type="button" onClick={()=>setShowReport(false)} className="px-4 py-2 border rounded">Cancel</button>
//                   <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">Submit Report</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} KaamSetu — Help & Support</div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useMemo } from 'react';
import {Link} from 'react-router-dom'
import { Search, Filter, AlertCircle, Phone, Mail, MessageSquare, ChevronDown, ChevronUp, X, Send, HelpCircle, Shield, Zap } from 'lucide-react';

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState({ name: '', phone: '', email: '', issue: '', details: '' });
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const faqs = useMemo(() => [
    {
      id: 'f1',
      q: 'How do I create a worker profile on KaamSetu?',
      a: 'Go to the signup page, enter your details and choose your role as worker.',
      category: 'workers'
    },
    {
      id: 'f2',
      q: 'How do employers post jobs?',
      a: 'Once logged in, employers can go to Dashboard → Post Job and fill the required details.',
      category: 'employers'
    },
    {
      id: 'f3',
      q: 'How can I contact support?',
      a: 'You can use the help form at the bottom of this page to raise a ticket.',
      category: 'general'
    },
    {
      id: 'f4',
      q: 'What payment methods are supported?',
      a: 'KaamSetu supports bank transfers and UPI. For escrow-protected jobs, funds are held until milestone completion or dispute resolution.',
      category: 'payments'
    },
    {
      id: 'f5',
      q: 'How does dispute mediation work?',
      a: 'Raise a dispute from My Work or Applicant dashboard with evidence. Our mediation team reviews within 24-48 hours and suggests a fair resolution.',
      category: 'disputes'
    },
    {
      id: 'f6',
      q: 'How is worker verification handled?',
      a: 'Verification may include phone OTP, ID document upload, and employer endorsements. Verified badges improve job visibility.',
      category: 'general'
    },
  ], []);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'workers', label: 'Workers' },
    { id: 'employers', label: 'Employers' },
    { id: 'payments', label: 'Payments' },
    { id: 'disputes', label: 'Disputes' }
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(f => (category === 'all' || f.category === category) && (!q || (f.q + ' ' + f.a).toLowerCase().includes(q)));
  }, [faqs, query, category]);

  function toggleOpen(id) {
    setOpenId(openId === id ? null : id);
  }

  function submitContact(e) {
    e.preventDefault();
    setFeedbackMessage('Thank you! Our support team will contact you shortly.');
    setContact({ name: '', email: '', message: '' });
    setTimeout(() => setFeedbackMessage(''), 5000);
  }

  function submitReport(e) {
    e.preventDefault();
    setFeedbackMessage('Report submitted. Our mediation team will review the issue.');
    setReportData({ name: '', phone: '', email: '', issue: '', details: '' });
    setShowReport(false);
    setTimeout(() => setFeedbackMessage(''), 5000);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 mb-6 shadow-lg shadow-emerald-500/30">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Help & FAQs
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers, contact support, or report issues quickly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search FAQs e.g. payments, verification..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-bold text-slate-700"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>

            <button
              onClick={() => setShowReport(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all"
            >
              <AlertCircle className="w-5 h-5" /> Report Issue
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {filtered.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">No results — try a different keyword or category.</p>
                </div>
              )}

              {filtered.map((f, idx) => (
                <div key={f.id} className={`${idx !== 0 ? 'border-t border-slate-200' : ''}`}>
                  <button
                    onClick={() => toggleOpen(f.id)}
                    className="w-full text-left p-6 hover:bg-slate-50 transition-colors"
                    aria-expanded={openId === f.id}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-slate-900 mb-2">{f.q}</h3>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                          {f.category}
                        </div>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                        {openId === f.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </button>

                  {openId === f.id && (
                    <div className="px-6 pb-6">
                      <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                        <p className="text-slate-700 leading-relaxed">{f.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setShowReport(true)}
                className="p-6 rounded-3xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all text-center"
              >
                Report a Payment Issue
              </button>
              <Link to="/contactpage" className="p-6 text-center rounded-3xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all">
                Contact Support
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Help */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Quick Help</h4>
              </div>
              
              <p className="text-sm text-slate-600 mb-4">If you need immediate assistance, call our helpline:</p>

              <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Helpline (India)</div>
                <div className="text-xl font-black text-slate-900 mb-1">1800-XXX-XXXX</div>
                <div className="text-xs text-slate-600 font-semibold">Mon–Sat 8:00–20:00</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Contact Support</h4>
              </div>

              <div className="space-y-3">
                <input
                  required
                  value={contact.name}
                  onChange={(e) => setContact(c => ({ ...c, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                />
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact(c => ({ ...c, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                />
                <textarea
                  required
                  value={contact.message}
                  onChange={(e) => setContact(c => ({ ...c, message: e.target.value }))}
                  placeholder="Brief message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium resize-none"
                />
                <button
                  onClick={submitContact}
                  className="w-full py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </div>

              {feedbackMessage && (
                <div className="mt-4 p-3 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                  <p className="text-sm text-emerald-700 font-semibold">{feedbackMessage}</p>
                </div>
              )}
            </div>

            {/* Popular Topics */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-6">
              <h5 className="text-lg font-black text-slate-900 mb-4">Popular Topics</h5>
              <div className="space-y-2">
                <button
                  onClick={() => { setCategory('workers'); setQuery(''); }}
                  className="w-full text-left p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 text-emerald-600 font-bold transition-all border border-transparent hover:border-emerald-200"
                >
                  How to create a worker profile
                </button>
                <button
                  onClick={() => { setCategory('payments'); setQuery(''); }}
                  className="w-full text-left p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 text-emerald-600 font-bold transition-all border border-transparent hover:border-emerald-200"
                >
                  Payment & Escrow questions
                </button>
                <button
                  onClick={() => { setCategory('disputes'); setQuery(''); }}
                  className="w-full text-left p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 text-emerald-600 font-bold transition-all border border-transparent hover:border-emerald-200"
                >
                  Raise a dispute
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Report Issue Modal */}
        {showReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowReport(false)} />
            <div className="relative bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-8 z-60">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Report an Issue</h3>
                </div>
                <button
                  onClick={() => setShowReport(false)}
                  className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    value={reportData.name}
                    onChange={(e) => setReportData(d => ({ ...d, name: e.target.value }))}
                    placeholder="Your name"
                    className="px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                  />
                  <input
                    required
                    value={reportData.phone}
                    onChange={(e) => setReportData(d => ({ ...d, phone: e.target.value }))}
                    placeholder="Phone"
                    className="px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                  />
                </div>

                <input
                  required
                  type="email"
                  value={reportData.email}
                  onChange={(e) => setReportData(d => ({ ...d, email: e.target.value }))}
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                />

                <select
                  required
                  value={reportData.issue}
                  onChange={(e) => setReportData(d => ({ ...d, issue: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-bold text-slate-700"
                >
                  <option value="">Select issue type</option>
                  <option value="payment">Payment not received</option>
                  <option value="unsafe">Unsafe work conditions</option>
                  <option value="fraud">Fraud / Fake listing</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  required
                  value={reportData.details}
                  onChange={(e) => setReportData(d => ({ ...d, details: e.target.value }))}
                  rows={5}
                  placeholder="Describe the issue, include job id or screenshots link if any"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium resize-none"
                />

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReport(false)}
                    className="px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReport}
                    className="px-6 py-3 rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} KaamSetu — Help & Support
        </div>
      </div>
    </div>
  );
}