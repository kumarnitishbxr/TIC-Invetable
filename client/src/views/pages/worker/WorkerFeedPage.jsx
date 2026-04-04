import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getWorkerFeedRequest, expressInterestRequest } from "../../../models/worker.model.js";
import MotionPage from "../../components/MotionPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import SectionPanel from "../../components/SectionPanel.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import JobCard from "../../components/JobCard.jsx";
import { InputField, TextAreaField } from "../../components/FormField.jsx";
import { useAppController } from "../../../controllers/AppController.jsx";
import VoiceComposerField from "../../components/VoiceComposerField.jsx";

export default function WorkerFeedPage() {
  const { user } = useAppController();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({});

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

  const submitInterest = async (jobId) => {
    try {
      const draft = drafts[jobId] || {};
      await expressInterestRequest(jobId, {
        message: draft.message || "",
        quoteAmount: draft.quoteAmount || "",
        quoteText: draft.quoteText || "",
        boostProfile: Boolean(draft.boostProfile),
        voiceInput: {
          transcript: draft.voiceTranscript || "",
          language: draft.language || user?.preferredLanguage || "Hindi",
          speakerRole: "worker",
        },
      });
      toast.success("Interest sent");
      setDrafts((current) => ({ ...current, [jobId]: {} }));
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send interest");
    }
  };

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

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <span className="loading loading-ring loading-lg text-warning" />
        </div>
      ) : jobs.length ? (
        <div className="grid gap-6">
          {jobs.map((job) => {
            const draft = drafts[job._id] || {};
            return (
              <SectionPanel key={job._id}>
                <JobCard job={job} href={`/app/worker/jobs/${job._id}`} />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <TextAreaField
                    label="Message to customer"
                    value={draft.message || ""}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [job._id]: { ...draft, message: event.target.value },
                      }))
                    }
                  />
                  <div className="space-y-4">
                    <InputField
                      label="Quote amount"
                      value={draft.quoteAmount || ""}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [job._id]: { ...draft, quoteAmount: event.target.value },
                        }))
                      }
                    />
                    <InputField
                      label="Quote note"
                      value={draft.quoteText || ""}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [job._id]: { ...draft, quoteText: event.target.value },
                        }))
                      }
                    />
                    <VoiceComposerField
                      label="Voice transcript"
                      value={draft.voiceTranscript || ""}
                      language={user?.preferredLanguage === "Bhojpuri" ? "hi-IN" : "hi-IN"}
                      onChange={(value) =>
                        setDrafts((current) => ({
                          ...current,
                          [job._id]: { ...draft, voiceTranscript: value },
                        }))
                      }
                    />
                    <label className="flex items-center justify-between rounded-[1.25rem] border border-white/6 bg-white/3 px-4 py-3">
                      <span className="text-sm text-base-content/70">
                        Boost profile for ₹10
                      </span>
                      <input
                        checked={Boolean(draft.boostProfile)}
                        className="toggle toggle-warning"
                        type="checkbox"
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [job._id]: { ...draft, boostProfile: event.target.checked },
                          }))
                        }
                      />
                    </label>
                    <button className="k-btn" onClick={() => submitInterest(job._id)}>
                      Send interest
                    </button>
                  </div>
                </div>
              </SectionPanel>
            );
          })}
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
