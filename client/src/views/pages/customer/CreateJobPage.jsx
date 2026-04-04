import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Paperclip, X, FileVideo, FileImage } from "lucide-react";
import { createJobRequest } from "../../../models/job.model.js";
import MotionPage from "../../components/MotionPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import SectionPanel from "../../components/SectionPanel.jsx";
import { InputField, SelectField, TextAreaField } from "../../components/FormField.jsx";
import BrowserLocationField from "../../components/BrowserLocationField.jsx";
import VoiceComposerField from "../../components/VoiceComposerField.jsx";

const categories = [
  "General", "Electrical", "Plumbing", "Painting",
  "Cleaning", "Appliance", "Carpentry", "Other",
];

const standardServices = [
  ["fan-installation", "Fan Installation"],
  ["switchboard-repair", "Switchboard Repair"],
  ["tap-replacement", "Tap Replacement"],
  ["pipe-leak-fix", "Pipe Leak Fix"],
  ["ac-service-basic", "AC Service (Basic)"],
  ["deep-cleaning-room", "Deep Cleaning (1 Room)"],
  ["door-lock-repair", "Door Lock Repair"],
];

export default function CreateJobPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    locationText: "",
    address: "",
    skills: "inspection, urgent response",
    pricingModel: "inspection",
    serviceCode: "",
    rocketMode: false,
    voiceTranscript: "",
    language: "Hindi",
    coordinates: null,
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (filePreview) URL.revokeObjectURL(filePreview);
    setAttachedFile(file);
    setFilePreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
    event.target.value = "";
  };

  const removeFile = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setAttachedFile(null);
    setFilePreview(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await createJobRequest({
        title: form.title,
        description: form.description,
        category: form.category,
        locationText: form.locationText,
        address: form.address,
        pricingModel: form.pricingModel,
        serviceCode: form.pricingModel === "standard" ? form.serviceCode : "",
        rocketMode: form.rocketMode,
        skills: form.skills
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        voiceInput: {
          transcript: form.voiceTranscript,
          language: form.language,
          speakerRole: "customer",
        },
        coordinates: form.coordinates || undefined,
      });

      toast.success("Job created and broadcast");
      navigate(`/app/customer/jobs/${response.data.job._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create job");
    } finally {
      setSubmitting(false);
    }
  };

  const isVideo = attachedFile?.type.startsWith("video/");

  return (
    <MotionPage className="space-y-8">
      <PageHeader
        eyebrow="Create booking"
        title="Turn a repair request into a live nearby broadcast"
        description="Choose fixed pricing or inspection-first booking, add your voice note transcript, and optionally enable Rocket Mode for emergency dispatch."
      />

      <SectionPanel className="max-w-5xl">
        <form className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>

          <InputField
            label="Job title"
            value={form.title}
            onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
          />
          <SelectField
            label="Category"
            value={form.category}
            onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </SelectField>

          <div className="md:col-span-2">
            <TextAreaField
              label="Problem description"
              value={form.description}
              onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
            />
          </div>

          <InputField
            label="Location label"
            value={form.locationText}
            onChange={(e) => setForm((c) => ({ ...c, locationText: e.target.value }))}
          />
          <InputField
            label="Address"
            value={form.address}
            onChange={(e) => setForm((c) => ({ ...c, address: e.target.value }))}
          />

          <div className="md:col-span-2">
            <BrowserLocationField
              label="Dispatch location"
              description="Capture your current location so nearby verified workers can be matched automatically. If you skip this, we fall back to any saved profile location."
              value={form.coordinates}
              onChange={(coordinates) =>
                setForm((current) => ({ ...current, coordinates }))
              }
            />
          </div>

          <SelectField
            label="Pricing model"
            value={form.pricingModel}
            onChange={(e) => setForm((c) => ({ ...c, pricingModel: e.target.value }))}
          >
            <option value="inspection">Inspection-first</option>
            <option value="standard">Standard rate card</option>
          </SelectField>

          <SelectField
            label="Standard service"
            disabled={form.pricingModel !== "standard"}
            value={form.serviceCode}
            onChange={(e) => setForm((c) => ({ ...c, serviceCode: e.target.value }))}
          >
            <option value="">Select a service</option>
            {standardServices.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </SelectField>

          <div className="md:col-span-2">
            <InputField
              label="Skills needed"
              value={form.skills}
              onChange={(e) => setForm((c) => ({ ...c, skills: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 grid gap-5 md:grid-cols-[1fr_220px]">
            <VoiceComposerField
              label="Voice transcript"
              value={form.voiceTranscript}
              language={
                form.language === "Bhojpuri"
                  ? "hi-IN"
                  : `${form.language.slice(0, 2).toLowerCase()}-IN`
              }
              onChange={(value) => setForm((c) => ({ ...c, voiceTranscript: value }))}
            />
            <SelectField
              label="Voice language"
              value={form.language}
              onChange={(e) => setForm((c) => ({ ...c, language: e.target.value }))}
            >
              {["Hindi", "Bhojpuri", "English", "Marathi", "Bengali"].map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </SelectField>
          </div>

          {/* ── File Attachment — mic ke neeche ── */}
          <div className="md:col-span-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-base-content/45">
              Attachment
            </p>

            {!attachedFile && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center gap-3 rounded-[1.25rem] border border-dashed border-white/10 bg-white/3 px-5 py-4 text-left transition-colors hover:border-warning/40 hover:bg-white/5"
              >
                <Paperclip className="h-5 w-5 shrink-0 text-warning" />
                <div>
                  <p className="text-sm text-base-content/70">Attach a photo or video</p>
                  <p className="mt-0.5 text-xs text-base-content/40">
                    JPG, PNG, MP4, MOV · single file · max 50 MB
                  </p>
                </div>
              </button>
            )}

            {attachedFile && (
              <div className="relative rounded-[1.25rem] border border-white/8 bg-white/3 p-4">
                <div className="flex items-center gap-4">
                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="preview"
                      className="h-16 w-16 rounded-[0.875rem] object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[0.875rem] bg-white/5">
                      {isVideo
                        ? <FileVideo className="h-7 w-7 text-warning" />
                        : <FileImage className="h-7 w-7 text-warning" />
                      }
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-base-content/80">{attachedFile.name}</p>
                    <p className="mt-1 text-xs text-base-content/45">
                      {(attachedFile.size / 1024 / 1024).toFixed(2)} MB · {attachedFile.type.split("/")[0]}
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-xs text-warning/70 hover:text-warning transition-colors"
                    >
                      Change file
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-base-content/50 transition-colors hover:bg-white/15 hover:text-base-content"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Rocket Mode */}
          <div className="md:col-span-2 rounded-[1.5rem] border border-white/6 bg-white/3 px-5 py-5">
            <label className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-medium text-base-100">Enable Rocket Mode</p>
                <p className="mt-1 text-sm text-base-content/60">
                  Add the emergency siren so nearby workers see this request first.
                </p>
              </div>
              <input
                checked={form.rocketMode}
                className="toggle toggle-warning"
                type="checkbox"
                onChange={(e) => setForm((c) => ({ ...c, rocketMode: e.target.checked }))}
              />
            </label>
          </div>

          <div className="md:col-span-2">
            <button className="k-btn" disabled={submitting} type="submit">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Broadcasting...
                </span>
              ) : (
                "Create and broadcast job"
              )}
            </button>
          </div>

        </form>
      </SectionPanel>
    </MotionPage>
  );
}