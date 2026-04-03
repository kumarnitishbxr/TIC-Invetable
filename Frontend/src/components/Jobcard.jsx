// src/components/JobCard.jsx
import React from "react";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";
import { NavLink } from "react-router";

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-300 p-5 w-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <MapPin size={16} /> {job?.locationText}
          </p>
        </div>
        <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full">
          {job.type}
        </span>
      </div>

      <div className="mt-3 flex items-center text-gray-700 text-sm gap-2">
        <IndianRupee size={16} className="text-primary" />
        <span>{job.wage} / day</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 px-3 py-1 text-xs rounded-full border border-blue-100"
          >
            {skill}
          </span>
        ))}
      </div>

      <NavLink
        to="/applicationform"
        // onClick={() => onApply(job)}
        className="btn btn-primary w-full mt-5 rounded-lg"
      >
        Apply Now
      </NavLink>
    </div>
  );
}