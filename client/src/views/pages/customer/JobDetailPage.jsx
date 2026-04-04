import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppController } from "../../../controllers/AppController.jsx";
import {
  cancelJobRequest,
  claimWarrantyRequest,
  confirmJobCompletionRequest,
  getJobDetailsRequest,
  getJobMatchesRequest,
  getTrackingRequest,
  markWorkCompletedRequest,
  markWorkerArrivedRequest,
  raiseDisputeRequest,
  selectWorkerRequest,
} from "../../../models/job.model.js";
import MotionPage from "../../components/MotionPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import SectionPanel from "../../components/SectionPanel.jsx";
import DetailGrid from "../../components/DetailGrid.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { formatCurrency, formatDateTime } from "../../../models/format.model.js";
import { InputField, TextAreaField } from "../../components/FormField.jsx";
import EmptyState from "../../components/EmptyState.jsx";

export default function JobDetailPage() {
  const { jobId } = useParams();
  const { user } = useAppController();
  const [job, setJob] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completeForm, setCompleteForm] = useState({
    finalQuotedAmount: "",
    workSummary: "",
  });
  const [confirmForm, setConfirmForm] = useState({
    rating: 5,
    review: "",
  });
  const [issue, setIssue] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [warrantyNotes, setWarrantyNotes] = useState("");

  const isAdmin = user?.role === "admin";
  const isCustomer = String(job?.customer?._id || job?.customer || "") === String(user?._id);
  const isWorker =
    String(job?.selectedWorker?._id || job?.selectedWorker || "") === String(user?._id);

  const load = async () => {
    setLoading(true);
    try {
      const [jobResponse, trackingResponse] = await Promise.all([
        getJobDetailsRequest(jobId),
        getTrackingRequest(jobId),
      ]);
      setJob(jobResponse.data.job);
      setTracking(trackingResponse.data.tracking);

      if (isAdmin || String(jobResponse.data.job?.customer?._id || jobResponse.data.job?.customer || "") === String(user?._id)) {
        try {
          const matchesResponse = await getJobMatchesRequest(jobId);
          setMatches(matchesResponse.data.nearbyWorkers || []);
        } catch {
          setMatches([]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [jobId]);

  const withRefresh = async (action, successMessage) => {
    try {
      await action();
      if (successMessage) {
        toast.success(successMessage);
      }
      await load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="loading loading-ring loading-lg text-warning" />
      </div>
    );
  }

  if (!job) {
    return <EmptyState title="Job not found" copy="The selected job could not be loaded." />;
  }

  const applications = [...(job.applications || [])].sort((left, right) => {
    if (left.isBoosted !== right.isBoosted) {
      return left.isBoosted ? -1 : 1;
    }
    return new Date(right.submittedAt) - new Date(left.submittedAt);
  });

  return (
    <MotionPage className="space-y-8">
      <PageHeader
        eyebrow="Job control"
        title={job.title}
        description={job.description}
        actions={<StatusBadge value={job.status} />}
      />

      <SectionPanel>
        <DetailGrid
          items={[
            { label: "Category", value: job.category },
            { label: "Location", value: job.locationText || "Not set" },
            { label: "Pricing model", value: job.pricingModel },
            {
              label: "Customer payable",
              value: formatCurrency(job.pricing?.totalUserPayable || job.wage || 0),
            },
            { label: "Rocket mode", value: job.rocketMode?.enabled ? "Enabled" : "Off" },
            { label: "Created", value: formatDateTime(job.createdAt) },
            {
              label: "Dispute window ends",
              value: formatDateTime(job.timeline?.disputeWindowEndsAt),
            },
            { label: "Warranty ends", value: formatDateTime(job.warranty?.endsAt) },
          ]}
        />
      </SectionPanel>

      {tracking ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <SectionPanel>
            <p className="section-label">Trust and tracking</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-base-content/70">
              <p>
                SOS enabled: {tracking.trustAndSafety?.sosEnabled ? "Yes" : "No"}
              </p>
              <p>
                Verified ID tracking:{" "}
                {tracking.trustAndSafety?.verifiedIdTracking ? "Enabled" : "Disabled"}
              </p>
              <p>
                Warranty status: {tracking.warranty?.status || "inactive"}
              </p>
            </div>
          </SectionPanel>

          <SectionPanel warm>
            <p className="section-label">Cross-sell and ads</p>
            {tracking.trackingAd?.title ? (
              <div className="mt-4 rounded-[1.5rem] border border-white/6 bg-white/3 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
                  Sponsored
                </p>
                <h3 className="mt-2 text-lg text-base-100">{tracking.trackingAd.title}</h3>
                <p className="mt-1 text-sm text-base-content/60">
                  {tracking.trackingAd.businessName}
                </p>
              </div>
            ) : null}
            <div className="mt-4 space-y-3">
              {(tracking.crossSellRecommendations || []).map((item) => (
                <div
                  key={item.serviceCode}
                  className="rounded-[1.4rem] border border-white/6 bg-white/3 px-4 py-4"
                >
                  <h4 className="text-base text-base-100">{item.title}</h4>
                  <p className="mt-1 text-sm text-base-content/60">{item.description}</p>
                </div>
              ))}
            </div>
          </SectionPanel>
        </div>
      ) : null}

      {(isCustomer || isAdmin) && matches.length ? (
        <SectionPanel>
          <p className="section-label">Nearby workers</p>
          <h2 className="mt-2 text-2xl text-base-100">Instant dispatch candidates</h2>
          <div className="mt-6 grid gap-4">
            {matches.map((worker) => (
              <div
                key={worker._id}
                className="rounded-[1.5rem] border border-white/6 bg-white/3 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg text-base-100">{worker.Name}</h3>
                    <p className="text-sm text-base-content/60">
                      {worker.workerProfile?.headline || "Nearby verified worker"}
                    </p>
                  </div>
                  <button
                    className="k-btn"
                    onClick={() =>
                      withRefresh(
                        () => selectWorkerRequest(jobId, worker._id),
                        "Worker selected",
                      )
                    }
                  >
                    Select worker
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionPanel>
      ) : null}

      {applications.length ? (
        <SectionPanel>
          <p className="section-label">Applications</p>
          <h2 className="mt-2 text-2xl text-base-100">Interested workers and quotes</h2>
          <div className="mt-6 grid gap-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="rounded-[1.5rem] border border-white/6 bg-white/3 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg text-base-100">
                        {application.worker?.Name || application.fullName}
                      </h3>
                      {application.isBoosted ? <span className="status-chip">Boosted</span> : null}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-base-content/65">
                      {application.message || application.quoteText || "No written note"}
                    </p>
                    {application.voiceInput?.transcript ? (
                      <p className="mt-2 text-sm text-base-content/55">
                        Voice: {application.voiceInput.transcript}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2 text-right text-sm text-base-content/60">
                    <p>{formatCurrency(application.quoteAmount || 0)}</p>
                    <p>{application.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionPanel>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        {(isCustomer || isAdmin) && ["broadcasting", "worker_selected", "in_progress"].includes(job.status) ? (
          <SectionPanel>
            <p className="section-label">Cancellation</p>
            <h2 className="mt-2 text-2xl text-base-100">Cancel booking</h2>
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                withRefresh(() => cancelJobRequest(jobId, cancelReason), "Job cancelled");
              }}
            >
              <TextAreaField
                label="Reason"
                value={cancelReason}
                onChange={(event) => setCancelReason(event.target.value)}
              />
              <button className="k-btn-ghost" type="submit">
                Cancel job
              </button>
            </form>
          </SectionPanel>
        ) : null}

        {(isWorker || isAdmin) && job.status === "worker_selected" ? (
          <SectionPanel>
            <p className="section-label">Arrival</p>
            <h2 className="mt-2 text-2xl text-base-100">Mark on-site arrival</h2>
            <p className="mt-3 text-sm leading-7 text-base-content/65">
              This starts the in-progress timer and unlocks the worker completion flow.
            </p>
            <button
              className="k-btn mt-6"
              onClick={() =>
                withRefresh(() => markWorkerArrivedRequest(jobId), "Arrival marked")
              }
            >
              Mark arrived
            </button>
          </SectionPanel>
        ) : null}

        {(isWorker || isAdmin) && ["in_progress", "worker_selected"].includes(job.status) ? (
          <SectionPanel warm>
            <p className="section-label">Worker closeout</p>
            <h2 className="mt-2 text-2xl text-base-100">Mark work completed</h2>
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                withRefresh(
                  () => markWorkCompletedRequest(jobId, completeForm),
                  "Marked as completed",
                );
              }}
            >
              <InputField
                label="Final quoted amount"
                value={completeForm.finalQuotedAmount}
                onChange={(event) =>
                  setCompleteForm((current) => ({
                    ...current,
                    finalQuotedAmount: event.target.value,
                  }))
                }
              />
              <TextAreaField
                label="Work summary"
                value={completeForm.workSummary}
                onChange={(event) =>
                  setCompleteForm((current) => ({
                    ...current,
                    workSummary: event.target.value,
                  }))
                }
              />
              <button className="k-btn" type="submit">
                Swipe work completed
              </button>
            </form>
          </SectionPanel>
        ) : null}

        {(isCustomer || isAdmin) && job.status === "completed_pending_confirmation" ? (
          <SectionPanel>
            <p className="section-label">Confirmation</p>
            <h2 className="mt-2 text-2xl text-base-100">Confirm within the 2-hour window</h2>
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                withRefresh(
                  () => confirmJobCompletionRequest(jobId, confirmForm),
                  "Job confirmed",
                );
              }}
            >
              <InputField
                label="Rating"
                type="number"
                min="1"
                max="5"
                value={confirmForm.rating}
                onChange={(event) =>
                  setConfirmForm((current) => ({
                    ...current,
                    rating: Number(event.target.value),
                  }))
                }
              />
              <TextAreaField
                label="Review"
                value={confirmForm.review}
                onChange={(event) =>
                  setConfirmForm((current) => ({
                    ...current,
                    review: event.target.value,
                  }))
                }
              />
              <button className="k-btn" type="submit">
                Confirm job done
              </button>
            </form>
          </SectionPanel>
        ) : null}

        {(isCustomer || isAdmin) && ["completed_pending_confirmation", "completed"].includes(job.status) ? (
          <SectionPanel warm>
            <p className="section-label">Support</p>
            <h2 className="mt-2 text-2xl text-base-100">Dispute or warranty flows</h2>
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                withRefresh(() => raiseDisputeRequest(jobId, { issue }), "Dispute raised");
              }}
            >
              <TextAreaField
                label="Dispute notes"
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
              />
              <button className="k-btn-ghost" type="submit">
                Raise dispute
              </button>
            </form>

            {job.warranty?.status === "active" ? (
              <form
                className="mt-6 space-y-4 surface-divider pt-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  withRefresh(
                    () => claimWarrantyRequest(jobId, { notes: warrantyNotes }),
                    "Warranty claimed",
                  );
                }}
              >
                <TextAreaField
                  label="Warranty claim notes"
                  value={warrantyNotes}
                  onChange={(event) => setWarrantyNotes(event.target.value)}
                />
                <button className="k-btn" type="submit">
                  Claim 7-day warranty
                </button>
              </form>
            ) : null}
          </SectionPanel>
        ) : null}
      </div>
    </MotionPage>
  );
}
