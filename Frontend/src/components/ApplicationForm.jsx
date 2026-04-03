// src/pages/ApplicationPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

/**
 * ApplicationPage
 * - For workers: shows job details and an application form
 * - For employers: shows list of applicants (if `isEmployer` in auth)
 *
 * Assumptions:
 * - GET /api/jobs/:jobId returns job details
 * - POST /api/jobs/:jobId/apply expects multipart/form-data:
 *     { coverLetter, phone, expectedPay, resumeFile }
 * - GET /api/jobs/:jobId/applications returns array of applications (for employer)
 *
 * Adjust endpoints to match your backend.
 */

function ApplicantList({ jobId, token }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    const fetchApps = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load applications");
        const data = await res.json();
        if (mounted) setApps(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchApps();
    return () => (mounted = false);
  }, [jobId, token]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Applicants</h3>
      {loading ? (
        <div className="text-sm text-gray-500">Loading applicants…</div>
      ) : apps.length === 0 ? (
        <div className="text-sm text-gray-500">No applicants yet.</div>
      ) : (
        <ul className="space-y-3">
          {apps.map((a) => (
            <li key={a.id} className="p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{a.name || a.applicantName}</div>
                  <div className="text-sm text-gray-500">Phone: {a.phone}</div>
                  <div className="text-sm text-gray-500">Expected: {a.expectedPay || "—"}</div>
                  <div className="mt-2 text-sm">{a.coverLetter}</div>
                </div>
                <div className="text-right">
                  {a.resumeUrl ? (
                    <a
                      href={a.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 rounded-md bg-emerald-500 text-white text-sm"
                    >
                      View Resume
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ApplicationForm() {
  const { jobId } = useParams(); // route: /jobs/:jobId/apply or similar
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);
  const token = auth?.user?.token || auth?.token;
  const isEmployer = auth?.user?.role === "employer";

  // Job info
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);

  // Form state
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState(auth?.user?.phone || "");
  const [expectedPay, setExpectedPay] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchJob = async () => {
      setLoadingJob(true);
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        if (mounted) setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoadingJob(false);
      }
    };
    if (jobId) fetchJob();
    return () => (mounted = false);
  }, [jobId]);

  // Basic client-side validation
  function validate() {
    const e = {};
    if (!coverLetter || coverLetter.trim().length < 20) e.coverLetter = "Write at least 20 characters about your experience.";
    if (!phone || phone.trim().length < 7) e.phone = "Enter a valid phone number.";
    if (resumeFile) {
      const allowed = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];
      const ext = (resumeFile.name.split(".").pop() || "").toLowerCase();
      if (!allowed.includes(ext)) e.resumeFile = "Allowed: pdf, doc, docx, png, jpg.";
      if (resumeFile.size > 5 * 1024 * 1024) e.resumeFile = "File too large (max 5 MB).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitApplication(e) {
    e.preventDefault();
    setSuccessMessage("");
    if (!validate()) return;

    setSubmitting(true);
    setProgress(0);

    // Use FormData for file upload
    const form = new FormData();
    form.append("coverLetter", coverLetter);
    form.append("phone", phone);
    form.append("expectedPay", expectedPay);
    if (resumeFile) form.append("resume", resumeFile);

    try {
      // Using fetch with progress requires XMLHttpRequest for upload progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/api/jobs/${jobId}/apply`);
        if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

        xhr.upload.onprogress = (evt) => {
          if (evt.lengthComputable) {
            const percent = Math.round((evt.loaded / evt.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText || "{}"));
          else reject(new Error(xhr.responseText || `Status ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.send(form);
      });

      setSuccessMessage("Application submitted — good luck!");
      setCoverLetter("");
      setExpectedPay("");
      setResumeFile(null);
      setProgress(null);

      // optional: navigate to applications page or refresh
      // navigate("/applications");
    } catch (err) {
      console.error(err);
      setErrors({ submit: err.message || "Submission failed" });
    } finally {
      setSubmitting(false);
    }
  }

  // Quick file input helper
  function onFileChange(e) {
    const f = e.target.files[0];
    setResumeFile(f || null);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-slate-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Job header */}
        <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 mb-6 shadow-sm backdrop-blur-sm border">
          {loadingJob ? (
            <div className="text-sm text-gray-500">Loading job…</div>
          ) : !job ? (
            <div className="text-red-500">Job not found.</div>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <div className="text-sm text-gray-500">{job.companyName || job.postedByName} • {job.location || "Remote/Local"}</div>
                <div className="mt-2 text-sm">{job.shortDescription}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Posted</div>
                <div className="font-medium">{new Date(job.createdAt || Date.now()).toLocaleDateString()}</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form column */}
          <div className="lg:col-span-2">
            <form onSubmit={submitApplication} className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 shadow-sm backdrop-blur-sm border">
              <h2 className="text-lg font-semibold mb-4">Apply for this job</h2>

              {errors.submit && <div className="text-sm text-rose-600 mb-3">{errors.submit}</div>}
              {successMessage && <div className="text-sm text-emerald-600 mb-3">{successMessage}</div>}

              <label className="block mb-3">
                <div className="text-sm font-medium mb-1">Cover letter *</div>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  placeholder="Introduce yourself, mention experience and why you're fit for this job..."
                  className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-cyan-700 outline-none"
                />
                {errors.coverLetter && <div className="text-sm text-rose-600 mt-1">{errors.coverLetter}</div>}
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <label>
                  <div className="text-sm font-medium mb-1">Phone *</div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full p-2 rounded-lg border bg-white dark:bg-gray-800 outline-none"
                  />
                  {errors.phone && <div className="text-sm text-rose-600 mt-1">{errors.phone}</div>}
                </label>

                <label>
                  <div className="text-sm font-medium mb-1">Expected Pay (optional)</div>
                  <input
                    value={expectedPay}
                    onChange={(e) => setExpectedPay(e.target.value)}
                    placeholder="e.g. ₹500/day or ₹4000/month"
                    className="w-full p-2 rounded-lg border bg-white dark:bg-gray-800 outline-none"
                  />
                </label>
              </div>

              <label className="block mb-4">
                <div className="text-sm font-medium mb-1">Upload resume / image (optional)</div>
                <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={onFileChange} />
                {errors.resumeFile && <div className="text-sm text-rose-600 mt-1">{errors.resumeFile}</div>}
                {resumeFile && <div className="text-sm text-slate-500 mt-2">Selected: {resumeFile.name} ({(resumeFile.size/1024|0)} KB)</div>}
              </label>

              {progress !== null && (
                <div className="mb-3">
                  <div className="text-sm text-gray-600 mb-1">Uploading: {progress}%</div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-emerald-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-linear-to-br from-teal-500 to-cyan-500 text-white font-semibold shadow hover:brightness-95 transition disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit application"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCoverLetter("");
                    setExpectedPay("");
                    setResumeFile(null);
                    setErrors({});
                  }}
                  className="px-4 py-2 rounded-xl border"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <aside>
            {isEmployer ? (
              <ApplicantList jobId={jobId} token={token} />
            ) : (
              <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 shadow-sm backdrop-blur-sm border">
                <h4 className="text-sm font-medium mb-2">Tips for a strong application</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Write a short, clear cover letter — mention relevant skills.</li>
                  <li>Attach a photo of your previous work if relevant (plumbing, carpentry).</li>
                  <li>Be honest about availability and expected pay.</li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
