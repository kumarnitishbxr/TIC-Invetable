import React, { useState, useEffect } from "react";
import { Search, Filter, Eye } from "lucide-react";

export default function Applications() {
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetch("/api/applicants"); 
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const filteredApplicants = applicants.filter((app) => {
    const matchSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || app.status.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search applicant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading applicants...</p>
        ) : filteredApplicants.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No applicants found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplicants.map((applicant) => (
              <div
                key={applicant._id}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {applicant.name}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize ${
                      applicant.status === "hired"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Role:</strong> {applicant.role}
                  </p>
                  <p>
                    <strong>Experience:</strong> {applicant.experience} years
                  </p>
                  <p>
                    <strong>Location:</strong> {applicant.location}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(applicant)}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
                >
                  <Eye size={16} /> View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative shadow-lg">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {selected.name}
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Role:</strong> {selected.role}</p>
              <p><strong>Experience:</strong> {selected.experience} years</p>
              <p><strong>Skills:</strong> {selected.skills?.join(", ") || "N/A"}</p>
              <p><strong>Location:</strong> {selected.location}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">
                Hire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
