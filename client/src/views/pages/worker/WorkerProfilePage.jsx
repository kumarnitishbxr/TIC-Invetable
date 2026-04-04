import { useState } from "react";
import toast from "react-hot-toast";
import { useAppController } from "../../../controllers/AppController.jsx";
import {
  purchaseVerifiedProRequest,
  updateAvailabilityRequest,
  updateWorkerProfileRequest,
} from "../../../models/worker.model.js";
import MotionPage from "../../components/MotionPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import SectionPanel from "../../components/SectionPanel.jsx";
import { InputField, TextAreaField } from "../../components/FormField.jsx";
import BrowserLocationField from "../../components/BrowserLocationField.jsx";

export default function WorkerProfilePage() {
  const { user, refreshSession } = useAppController();
  const [profileForm, setProfileForm] = useState({
    headline: user?.workerProfile?.headline || "",
    about: user?.workerProfile?.about || "",
    categories: (user?.workerProfile?.categories || []).join(", "),
    languages: (user?.workerProfile?.languages || [user?.preferredLanguage || "Hindi"]).join(", "),
    yearsExperience: user?.workerProfile?.yearsExperience || 0,
    serviceRadiusKm: user?.workerProfile?.serviceRadiusKm || 5,
  });
  const [availabilityForm, setAvailabilityForm] = useState({
    isAvailable: Boolean(user?.workerProfile?.isAvailable),
    serviceRadiusKm: user?.workerProfile?.serviceRadiusKm || 5,
    coordinates: null,
    locationText: user?.locationText || "",
  });

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      await updateWorkerProfileRequest({
        headline: profileForm.headline,
        about: profileForm.about,
        categories: profileForm.categories.split(",").map((value) => value.trim()).filter(Boolean),
        languages: profileForm.languages.split(",").map((value) => value.trim()).filter(Boolean),
        yearsExperience: Number(profileForm.yearsExperience),
        serviceRadiusKm: Number(profileForm.serviceRadiusKm),
      });
      await refreshSession({ silent: true });
      toast.success("Worker profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update worker profile");
    }
  };

  const saveAvailability = async (event) => {
    event.preventDefault();
    try {
      await updateAvailabilityRequest({
        isAvailable: availabilityForm.isAvailable,
        serviceRadiusKm: Number(availabilityForm.serviceRadiusKm),
        coordinates: availabilityForm.coordinates || undefined,
        locationText: availabilityForm.locationText,
      });
      await refreshSession({ silent: true });
      toast.success("Availability updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update availability");
    }
  };

  const activateVerifiedPro = async () => {
    try {
      await purchaseVerifiedProRequest();
      await refreshSession({ silent: true });
      toast.success("Verified Pro activated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not activate Verified Pro");
    }
  };

  return (
    <MotionPage className="space-y-8">
      <PageHeader
        eyebrow="Worker settings"
        title="Sharpen your worker profile"
        description="Tune your categories, radius, live availability, and premium subscription state so the dispatch engine surfaces you first."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionPanel>
          <form className="grid gap-5 md:grid-cols-2" onSubmit={saveProfile}>
            <div className="md:col-span-2">
              <p className="section-label">Worker profile</p>
              <h2 className="mt-2 text-2xl text-base-100">Public worker presentation</h2>
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Headline"
                value={profileForm.headline}
                onChange={(event) =>
                  setProfileForm((current) => ({ ...current, headline: event.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <TextAreaField
                label="About"
                value={profileForm.about}
                onChange={(event) =>
                  setProfileForm((current) => ({ ...current, about: event.target.value }))
                }
              />
            </div>
            <InputField
              label="Categories"
              value={profileForm.categories}
              onChange={(event) =>
                setProfileForm((current) => ({ ...current, categories: event.target.value }))
              }
            />
            <InputField
              label="Languages"
              value={profileForm.languages}
              onChange={(event) =>
                setProfileForm((current) => ({ ...current, languages: event.target.value }))
              }
            />
            <InputField
              label="Years of experience"
              value={profileForm.yearsExperience}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  yearsExperience: event.target.value,
                }))
              }
            />
            <InputField
              label="Service radius (km)"
              value={profileForm.serviceRadiusKm}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  serviceRadiusKm: event.target.value,
                }))
              }
            />
            <div className="md:col-span-2">
              <button className="k-btn" type="submit">
                Save worker profile
              </button>
            </div>
          </form>
        </SectionPanel>

        <div className="space-y-6">
          <SectionPanel warm>
            <form className="space-y-4" onSubmit={saveAvailability}>
              <p className="section-label">Availability</p>
              <h2 className="mt-2 text-2xl text-base-100">Live dispatch settings</h2>
              <label className="flex items-center justify-between rounded-[1.4rem] border border-white/6 bg-white/3 px-4 py-4">
                <span className="text-sm text-base-content/70">Open for jobs right now</span>
                <input
                  checked={availabilityForm.isAvailable}
                  className="toggle toggle-warning"
                  type="checkbox"
                  onChange={(event) =>
                    setAvailabilityForm((current) => ({
                      ...current,
                      isAvailable: event.target.checked,
                    }))
                  }
                />
              </label>
              <InputField
                label="Service radius (km)"
                value={availabilityForm.serviceRadiusKm}
                onChange={(event) =>
                  setAvailabilityForm((current) => ({
                    ...current,
                    serviceRadiusKm: event.target.value,
                  }))
                }
              />
              <BrowserLocationField
                label="Worker live location"
                description="Share your current location from the browser so the matching engine can place you in nearby emergency searches."
                value={availabilityForm.coordinates}
                onChange={(coordinates) =>
                  setAvailabilityForm((current) => ({ ...current, coordinates }))
                }
              />
              <InputField
                label="Location label"
                value={availabilityForm.locationText}
                onChange={(event) =>
                  setAvailabilityForm((current) => ({
                    ...current,
                    locationText: event.target.value,
                  }))
                }
              />
              <button className="k-btn w-full" type="submit">
                Save availability
              </button>
            </form>
          </SectionPanel>

          <SectionPanel>
            <p className="section-label">Premium</p>
            <h2 className="mt-2 text-2xl text-base-100">Verified Pro subscription</h2>
            <p className="mt-3 text-sm leading-7 text-base-content/65">
              Pay ₹149/month to unlock a blue check, get a 10-second head start on new jobs,
              and stand out before free workers even see the request.
            </p>
            <button className="k-btn mt-6" onClick={activateVerifiedPro}>
              Activate Verified Pro
            </button>
          </SectionPanel>
        </div>
      </div>
    </MotionPage>
  );
}
