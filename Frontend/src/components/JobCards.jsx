


import React from "react";
import { MapPin, Star, Clock, ArrowRight} from "lucide-react";
import { Link } from "react-router";


// const sampleJobs = [
//   {
//     id: "job-001",
//     title: "Field Harvester — Seasonal",
//     employer: "Kumar Farms",
//     description: "Harvesting and bundling wheat. 7 AM - 5 PM. Tools provided.",
//     wage: 600,
//     payType: "Daily",
//     locationName: "Sikandarpur Village",
//     distance: 2.1,
//     rating: 4.8,
//   },
//   {
//     id: "job-002",
//     title: "Masonry Helper",
//     employer: "Rai Construction",
//     description: "Assist masons on-site. 8 AM - 6 PM. Basic experience required.",
//     wage: 700,
//     payType: "Daily",
//     locationName: "Block Market",
//     distance: 4.5,
//     rating: 4.6,
//   },
//   {
//     id: "job-003",
//     title: "Irrigation Assistant",
//     employer: "Sharma Farms",
//     description: "Help in canal irrigation and maintenance.",
//     wage: 500,
//     payType: "Daily",
//     locationName: "Gram Panchayat",
//     distance: 1.2,
//     rating: 4.9,
//   },
// ];

function formatWage(w) {
  return `₹${w.toLocaleString("en-IN")}`;
}
export default function JobCard({ job }) {
  return (
    <article
      className="group relative bg-linear-to-br from-white via-slate-50 to-white border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col justify-between overflow-hidden hover:scale-[1.02]"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 via-teal-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                {job.payType}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold text-slate-700">{job.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
              {job.title}
            </h3>
            
            <p className="text-sm text-slate-500 font-medium mb-3">
              {job.employer} • <span className="text-slate-600">{job.locationName}</span>
            </p>
            
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{job.description}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-3xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {formatWage(job.wage)}
            </div>
            <div className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">per {job.payType}</div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> 
              <span className="font-semibold text-slate-700">{job.distance} km</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100">
              <Clock className="w-3.5 h-3.5 text-teal-600" /> 
              <span className="font-semibold text-slate-700">{job.payType}</span>
            </span>
          </div>
          
          <button  onClick={() => alert("Applied Sucessfully")} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 group-hover:scale-105">
            Apply <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}