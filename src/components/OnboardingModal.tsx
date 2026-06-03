import { useState } from "react";
import { saveProfile, type UserProfile } from "@/lib/exitus";

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
};

const FIELDS: Array<{ key: keyof UserProfile; label: string; options?: string[]; placeholder?: string }> = [
  { key: "ageRange", label: "Age range", options: ["18–29", "30–44", "45–59", "60+"] },
  { key: "gender", label: "Gender", options: ["Female", "Male", "Non-binary", "Prefer not to say"] },
  { key: "religion", label: "Religion (optional)", placeholder: "e.g. Muslim, Christian, None" },
  { key: "family", label: "Family status", options: ["Single", "Married, no kids", "Married with kids", "Single parent"] },
  { key: "workType", label: "Work type", options: ["Remote", "In-person", "Retired", "Looking for work"] },
  { key: "languages", label: "Languages spoken", placeholder: "e.g. English, Spanish" },
  { key: "budget", label: "Monthly budget (USD)", options: ["< $1,000", "$1,000–$2,000", "$2,000–$4,000", "$4,000+"] },
  { key: "destination", label: "Destination preference", placeholder: "Region, country, or 'help me decide'" },
  { key: "duration", label: "Stay length", options: ["Short-term (< 1 yr)", "Long-term (1+ yr)", "Permanent"] },
];

const EMPTY: UserProfile = {
  ageRange: "", gender: "", religion: "", family: "", workType: "",
  languages: "", budget: "", destination: "", duration: "",
};

export function OnboardingModal({ open, onClose, onComplete }: Props) {
  const [profile, setProfile] = useState<UserProfile>(EMPTY);

  if (!open) return null;

  const update = (k: keyof UserProfile, v: string) => setProfile((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-2xl font-bold text-primary">Tell Emap about you</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Quick profile so Emap can give you personalized country picks. Saved on your device only.
        </p>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">{f.label}</label>
              {f.options ? (
                <select
                  value={profile[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select…</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  value={profile[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-full font-semibold text-primary bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:scale-[1.02] transition-transform"
            >
              Save & talk to Emap →
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-full border border-input bg-background text-sm font-medium text-foreground hover:bg-accent transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
