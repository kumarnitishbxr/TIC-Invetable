import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, RadioTower, Sparkles, Wallet } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import { formatCurrency, formatDateTime } from "../../models/format.model.js";

export default function JobCard({ job, href, action }) {
  const amount =
    job?.pricing?.standardRate ||
    job?.pricing?.inspectionFee ||
    job?.pricing?.totalUserPayable ||
    job?.wage ||
    0;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="glass-panel rounded-[1.75rem] p-5"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-base-content/45">
              {job.category || "General"}
            </p>
            <h3 className="text-xl font-semibold text-base-100">{job.title}</h3>
          </div>
          <StatusBadge value={job.status} />
        </div>

        <p className="line-clamp-2 text-sm leading-7 text-base-content/65">
          {job.description}
        </p>

        <div className="grid gap-3 text-sm text-base-content/65 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-warning" />
            <span>{job.locationText || "Location pending"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-warning" />
            <span>{formatCurrency(amount)}</span>
          </div>
          <div className="flex items-center gap-2">
            <RadioTower className="h-4 w-4 text-warning" />
            <span>{job.pricingModel === "standard" ? "Fixed rate" : "Inspection-first"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-warning" />
            <span>{formatDateTime(job.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(job.skills || []).slice(0, 3).map((skill) => (
              <span key={skill} className="status-chip">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {href ? (
              <Link className="k-btn-ghost" to={href}>
                View
              </Link>
            ) : null}
            {action}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
