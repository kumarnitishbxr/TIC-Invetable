//  const PostJobContent = (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>
//         <p className="text-sm text-gray-600">Create a job post to receive qualified applicants.</p>
//       </div>

//       <div className="mt-4 mb-6">
//         <div className="flex gap-2 items-center">
//           {[1, 2, 3, 4].map(s => (
//             <div key={s} className="flex-1 flex items-center gap-2">
//               <div className={`flex items-center justify-center w-8 h-8 rounded-full ${jobPostStep >= s ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>{s}</div>
//               {s < 4 && <div className={`h-1 flex-1 ${jobPostStep > s ? "bg-indigo-600" : "bg-gray-200"}`} />}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-6">
//         {jobPostStep === 1 && (
//           <div>
//             <h2 className="text-lg font-semibold">Basic Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//               <div>
//                 <label className="text-sm text-gray-700">Job Title</label>
//                 <input value={postData.title} onChange={(e) => setPostData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1" placeholder="e.g. labour, painter" />
//                 {postErrors.title && <div className="text-xs text-red-600 mt-1">{postErrors.title}</div>}
//               </div>
//               <div>
//                 <label className="text-sm text-gray-700">Category</label>
//                 <select value={postData.category} onChange={(e) => setPostData(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
//                   <option>Painter</option>
//                   <option>Carpainter</option>
//                   <option>Plumber</option>
//                   <option>Construction</option>
//                   <option>Operations</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-700">Employment Type</label>
//                 <select value={postData.type} onChange={(e) => setPostData(p => ({ ...p, type: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
//                   <option>Full-time</option>
//                   <option>Part-time</option>
//                   <option>Contract</option>
//                   <option>Daily Wage</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-700">Location</label>
//                 <input value={postData.location} onChange={(e) => setPostData(p => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1" placeholder="City, area or Remote" />
//                 {postErrors.location && <div className="text-xs text-red-600 mt-1">{postErrors.location}</div>}
//               </div>

//               <div className="md:col-span-2">
//                 <label className="text-sm text-gray-700">Job Description</label>
//                 <textarea value={postData.description} onChange={(e) => setPostData(p => ({ ...p, description: e.target.value }))} rows={5} className="w-full px-4 py-2 border rounded mt-1" placeholder="Role, responsibilities, and requirements..." />
//                 {postErrors.description && <div className="text-xs text-red-600 mt-1">{postErrors.description}</div>}
//               </div>
//             </div>
//           </div>
//         )}

//         {jobPostStep === 2 && (
//           <div>
//             <h2 className="text-lg font-semibold">Compensation & Budget</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//               <div>
//                 <label className="text-sm text-gray-700">Minimum Salary</label>
//                 <input value={postData.salaryMin} onChange={(e) => setPostData(p => ({ ...p, salaryMin: e.target.value }))} type="number" className="w-full px-4 py-2 border rounded mt-1" placeholder="e.g. 50000" />
//                 {postErrors.salaryMin && <div className="text-xs text-red-600 mt-1">{postErrors.salaryMin}</div>}
//               </div>
//               <div>
//                 <label className="text-sm text-gray-700">Maximum Salary</label>
//                 <input value={postData.salaryMax} onChange={(e) => setPostData(p => ({ ...p, salaryMax: e.target.value }))} type="number" className="w-full px-4 py-2 border rounded mt-1" placeholder="e.g. 80000" />
//                 {postErrors.salaryMax && <div className="text-xs text-red-600 mt-1">{postErrors.salaryMax}</div>}
//               </div>

//               <div>
//                 <label className="text-sm text-gray-700">Payment Frequency</label>
//                 <select value={postData.payFreq} onChange={(e) => setPostData(p => ({ ...p, payFreq: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
//                   <option>Annual</option>
//                   <option>Monthly</option>
//                   <option>Daily</option>
//                   <option>Hourly</option>
//                 </select>
//               </div>

//               <div className="md:col-span-2">
//                 <div className="bg-indigo-50 border border-indigo-100 rounded p-4">
//                   <div className="font-semibold text-indigo-700">Escrow Protection</div>
//                   <div className="text-sm text-indigo-600 mt-1">Use escrow to secure payments for contract and milestone-based work.</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {jobPostStep === 3 && (
//           <div>
//             <h2 className="text-lg font-semibold">Requirements & Skills</h2>
//             <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm text-gray-700">Required Skills (comma separated)</label>
//                 <div className="flex gap-2 mt-1">
//                   <input value={postData.skillsInput} onChange={(e) => setPostData(p => ({ ...p, skillsInput: e.target.value }))} className="flex-1 px-4 py-2 border rounded" placeholder="e.g. React, Node.js" />
//                   <button onClick={addSkillFromInput} className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
//                 </div>
//                 {postErrors.skills && <div className="text-xs text-red-600 mt-1">{postErrors.skills}</div>}
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {postData.skills.map(s => (
//                     <span key={s} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
//                       {s}
//                       <button onClick={() => removeSkill(s)} className="p-0.5"><XCircle size={14} /></button>
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-700">Experience Level</label>
//                 <select value={postData.experience} onChange={(e) => setPostData(p => ({ ...p, experience: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
//                   <option>Entry Level</option>
//                   <option>Mid Level</option>
//                   <option>Senior Level</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         )}

//         {jobPostStep === 4 && (
//           <div>
//             <h2 className="text-lg font-semibold">Review & Publish</h2>
//             <div className="mt-3 bg-gray-50 p-4 rounded border">
//               <div className="mb-3">
//                 <div className="text-sm text-gray-600">Job Title</div>
//                 <div className="font-semibold">{postData.title || "—"}</div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div>
//                   <div className="text-sm text-gray-600">Location</div>
//                   <div className="font-semibold">{postData.location || "—"}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600">Type</div>
//                   <div className="font-semibold">{postData.type}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600">Salary Range</div>
//                   <div className="font-semibold">${postData.salaryMin || "—"} - ${postData.salaryMax || "—"}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600">Experience</div>
//                   <div className="font-semibold">{postData.experience}</div>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <div className="text-sm text-gray-600">Skills</div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {postData.skills.length ? postData.skills.map(s => <span key={s} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded">{s}</span>) : <span className="text-sm text-gray-500">No skills</span>}
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <div className="text-sm text-gray-600">Description</div>
//                 <div className="text-sm text-gray-700 mt-1">{postData.description || "—"}</div>
//               </div>
//             </div>

//             <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded">
//               <div className="text-sm text-green-800 font-semibold">Ready to Publish</div>
//               <div className="text-sm text-green-700">Your job will be visible to candidates after publishing.</div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
//         <div>
//           {jobPostStep > 1 && <button onClick={prevStep} className="px-4 py-2 border rounded hover:bg-gray-50 w-full sm:w-auto">Back</button>}
//         </div>
//         <div className="flex gap-3">
//           {jobPostStep < 4 ? (
//             <button onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto">Continue</button>
//           ) : (
//             <button onClick={publishJob} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto">Publish Job</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const ApplicantManagementContent = (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <div>
//           <h2 className="text-xl font-semibold">Applicant Management</h2>
//           <p className="text-sm text-gray-600">Review and manage candidates for your roles</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input value={appSearch} onChange={(e) => setAppSearch(e.target.value)} placeholder="Search applicants..." className="pl-10 pr-3 py-2 border rounded w-full md:w-64" />
//           </div>
//           <select value={appFilterJob} onChange={(e) => setAppFilterJob(e.target.value)} className="px-3 py-2 border rounded">
//             <option value="all">All Jobs</option>
//             {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {[
//           { label: 'New', count: apps.filter(a => a.status === 'New').length },
//           { label: 'Reviewing', count: apps.filter(a => a.status === 'Reviewing').length },
//           { label: 'Interviewing', count: apps.filter(a => a.status === 'Interviewing').length },
//           { label: 'Hired', count: apps.filter(a => a.status === 'Hired').length }
//         ].map(s => (
//           <div key={s.label} className="bg-gray-50 border rounded p-4 shadow">
//             <div className="text-sm text-gray-600">{s.label}</div>
//             <div className="text-2xl font-bold text-gray-800">{s.count}</div>
//           </div>
//         ))}
//       </div>

//       <div className="divide-y rounded overflow-hidden border">
//         {filteredApps.map(app => (
//           <div key={app.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
//                 {app.name.split(" ").map(n => n[0]).join("")}
//               </div>
//               <div>
//                 <div className="font-semibold">{app.name}</div>
//                 <div className="text-sm text-gray-500">{app.position} • Applied {app.appliedAt}</div>
//               </div>
//               <div className="ml-0 md:ml-6 text-sm">
//                 <div className="text-xs text-gray-500">Match</div>
//                 <div className="font-medium text-indigo-600">{app.match}%</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="text-sm text-right mr-2">
//                 <div className={`font-medium ${app.status === 'Hired' ? 'text-green-600' : app.status === 'Reviewing' ? 'text-yellow-600' : 'text-gray-700'}`}>{app.status}</div>
//               </div>
//               <button onClick={() => alert(`View resume for ${app.name} (mock)`)} className="p-2 hover:bg-gray-100 rounded"><Eye size={18} /></button>
//               <button onClick={() => alert(`Message ${app.name} (mock)`)} className="p-2 hover:bg-gray-100 rounded"><MessageSquare size={18} /></button>
//               <div className="relative">
//                 <button className="p-2 hover:bg-gray-100 rounded"><MoreVertical size={18} /></button>
//                 <div className="hidden"> {/* placeholder for action menu; implement if needed */} </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         {filteredApps.length === 0 && <div className="p-6 text-center text-gray-500">No applicants found.</div>}
//       </div>
//     </div>
//   );

//   const PaymentContent = (
//     <div className="space-y-6">
//       <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold">Payment & Escrow</h2>
//           <p className="text-sm text-gray-600">Manage balances and escrowed funds</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-indigo-600 text-white rounded"><Download size={16} /> Export</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow">
//           <div className="flex justify-between">
//             <div>
//               <div className="text-sm opacity-90">Available Balance</div>
//               <div className="text-2xl font-bold mt-2">12,450</div>
//             </div>
//             <DollarSign size={28} />
//           </div>
//         </div>

//         <div className="bg-linear-to-br from-yellow-500 to-orange-500 rounded-lg p-6 text-white shadow">
//           <div className="flex justify-between">
//             <div>
//               <div className="text-sm opacity-90">In Escrow</div>
//               <div className="text-2xl font-bold mt-2">8,200</div>
//             </div>
//             <Clock size={28} />
//           </div>
//         </div>

//         <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow">
//           <div className="flex justify-between">
//             <div>
//               <div className="text-sm opacity-90">This Month</div>
//               <div className="text-2xl font-bold mt-2">24,680</div>
//             </div>
//             <TrendingUp size={28} />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded shadow p-4">
//           <div className="font-semibold mb-3">Active Escrow Contracts</div>
//           <div className="space-y-4">
//             {[
//               { project: 'Mobile App', freelancer: 'Sarah J.', amount: 3500, released: 60 },
//               { project: 'Website Redesign', freelancer: 'Michael C.', amount: 2800, released: 30 }
//             ].map((c, i) => (
//               <div key={i} className="border rounded p-3">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="font-semibold">{c.project}</div>
//                     <div className="text-sm text-gray-500">{c.freelancer}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-bold">${c.amount}</div>
//                     <div className="text-xs text-gray-500">Escrowed</div>
//                   </div>
//                 </div>
//                 <div className="mt-3 h-2 bg-gray-200 rounded overflow-hidden">
//                   <div className="h-full bg-green-500" style={{ width: `${c.released}%` }} />
//                 </div>
//                 <div className="mt-2 text-xs text-gray-500">{c.released}% released</div>
//                 <div className="mt-3 flex gap-2">
//                   <button onClick={() => mockReleaseEscrow(c.project)} className="px-3 py-2 bg-indigo-600 text-white rounded">Release</button>
//                   <button className="px-3 py-2 border rounded">Details</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded shadow p-4">
//           <div className="font-semibold mb-3">Recent Transactions</div>
//           <div className="space-y-3">
//             {[
//               { type: 'Payment Released', desc: 'Milestone 2 - Mobile App', amount: -2100, date: 'Oct 27' },
//               { type: 'Escrow Deposit', desc: 'New Contract - Website', amount: 2800, date: 'Oct 25' }
//             ].map((t, i) => (
//               <div key={i} className="flex justify-between">
//                 <div>
//                   <div className="font-medium">{t.type}</div>
//                   <div className="text-sm text-gray-500">{t.desc}</div>
//                 </div>
//                 <div className={`text-right ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   {t.amount > 0 ? '+' : '-'}${Math.abs(t.amount)}
//                   <div className="text-xs text-gray-500">{t.date}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const DisputeContent = (
//     <div>
//       <div className="bg-white rounded shadow p-6 mb-6">
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <h2 className="text-xl font-semibold">Dispute Management</h2>
//             <p className="text-sm text-gray-600">Track and respond to raised disputes</p>
//           </div>
//           <button className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2"><Plus size={16} /> Raise Dispute</button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-gray-50 rounded p-4 text-center">
//             <div className="text-sm text-gray-600">Open Disputes</div>
//             <div className="text-2xl font-bold">{disputes.filter(d => d.status === "Open").length}</div>
//           </div>
//           <div className="bg-gray-50 rounded p-4 text-center">
//             <div className="text-sm text-gray-600">Under Review</div>
//             <div className="text-2xl font-bold">{disputes.filter(d => d.status === "Under Review").length}</div>
//           </div>
//           <div className="bg-gray-50 rounded p-4 text-center">
//             <div className="text-sm text-gray-600">Resolved</div>
//             <div className="text-2xl font-bold">{disputes.filter(d => d.status === "Resolved").length}</div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded shadow divide-y">
//         {disputes.map(d => (
//           <div key={d.id} className="p-4 flex flex-col md:flex-row justify-between gap-3">
//             <div>
//               <div className="font-mono text-xs text-gray-500">{d.id} • <span className="text-xs text-gray-400">{d.date}</span></div>
//               <div className="font-semibold text-lg">{d.title}</div>
//               <div className="text-sm text-gray-600">Contractor: {d.contractor} • Amount: ${d.amount.toLocaleString()}</div>
//             </div>
//             <div className="flex gap-2">
//               <button className="px-3 py-2 border rounded">View</button>
//               <button className="px-3 py-2 bg-indigo-600 text-white rounded">Respond</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const AnalyticsContent = (
//     <div>
//       <div className="bg-white rounded shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold">Analytics</h2>
//           <div className="text-sm text-gray-600">Hiring performance and trends</div>
//         </div>
//         <div className="flex gap-3">
//           <select className="px-3 py-2 border rounded">
//             <option>Last 30 days</option>
//             <option>Last 90 days</option>
//           </select>
//           <button className="px-3 py-2 bg-indigo-600 text-white rounded"><Download size={14} /> Export</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white rounded shadow p-4">
//           <div className="text-sm text-gray-500">Total Jobs Posted</div>
//           <div className="text-2xl font-bold">{analytics.totalJobs}</div>
//           <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +12%</div>
//         </div>
//         <div className="bg-white rounded shadow p-4">
//           <div className="text-sm text-gray-500">Total Applicants</div>
//           <div className="text-2xl font-bold">{analytics.totalApplicants}</div>
//           <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +28%</div>
//         </div>
//         <div className="bg-white rounded shadow p-4">
//           <div className="text-sm text-gray-500">Successful Hires</div>
//           <div className="text-2xl font-bold">{analytics.hires}</div>
//           <div className="text-xs text-gray-600">Stable</div>
//         </div>
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <div className="text-sm text-gray-600">Latest Activity</div>
//         <div className="mt-3 space-y-2">
//           <div className="flex justify-between">
//             <div className="text-sm">New applicant: Sarah Johnson</div>
//             <div className="text-xs text-gray-500">2 hours ago</div>
//           </div>
//           <div className="flex justify-between">
//             <div className="text-sm">Job published: Senior Software Engineer</div>
//             <div className="text-xs text-gray-500">Yesterday</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );