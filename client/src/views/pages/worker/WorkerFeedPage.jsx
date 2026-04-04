import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getWorkerFeedRequest } from "../../../models/worker.model.js";
import MotionPage from "../../components/MotionPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import SectionPanel from "../../components/SectionPanel.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import JobCard from "../../components/JobCard.jsx";
import { useAppController } from "../../../controllers/AppController.jsx";

export default function WorkerFeedPage() {
  const { user } = useAppController();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const response = await getWorkerFeedRequest();
      setJobs(response.data.jobs || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load worker feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <MotionPage className="space-y-8">
      <PageHeader
        eyebrow="Worker dispatch"
        title="Nearby jobs ready for your quote"
        description="Tap interested for free, boost your profile when the lead is worth it, and use Verified Pro to unlock a 10-second head start."
        actions={
          <Link className="k-btn-ghost" to="/app/worker/profile">
            Edit worker profile
          </Link>
        }
      />

      {/* Worker stats panel */}
      <SectionPanel warm>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="section-label">Wallet state</p>
            <p className="mt-2 text-3xl text-base-100">{user?.wallet?.balance ?? 0}</p>
            <p className="mt-2 text-sm text-base-content/60">
              Credit limit: {user?.wallet?.creditLimit ?? -200}
            </p>
          </div>
          <div>
            <p className="section-label">Verified Pro</p>
            <p className="mt-2 text-3xl text-base-100">
              {user?.subscription?.status === "active" ? "Active" : "Inactive"}
            </p>
            <p className="mt-2 text-sm text-base-content/60">
              Early access: {user?.subscription?.earlyAccessSeconds ?? 0}s
            </p>
          </div>
          <div>
            <p className="section-label">Availability</p>
            <p className="mt-2 text-3xl text-base-100">
              {user?.workerProfile?.isAvailable ? "Live" : "Paused"}
            </p>
            <p className="mt-2 text-sm text-base-content/60">
              Radius: {user?.workerProfile?.serviceRadiusKm ?? 0} km
            </p>
          </div>
        </div>
      </SectionPanel>

      {/* Job list */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <span className="loading loading-ring loading-lg text-warning" />
        </div>
      ) : jobs.length ? (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              href={`/app/worker/jobs/${job._id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No nearby jobs right now"
          copy="Make sure your live location and worker availability are on. New jobs in your radius will appear here."
        />
      )}
    </MotionPage>
  );
}