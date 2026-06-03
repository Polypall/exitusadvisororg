export const WAITLIST_URL = "https://tally.so/r/Bz2QaQ";
export const FREE_CHAT_LIMIT = 5;

export const PROFILE_KEY = "exitus_user_profile";
export const CHAT_COUNT_KEY = "exitus_chat_count";
export const CHAT_DATE_KEY = "exitus_chat_date";

export type WarningLevel = "red" | "orange";
export const COUNTRY_WARNINGS: Record<string, { level: WarningLevel; reasons: string[] }> = {
  Haiti: { level: "red", reasons: ["political instability", "gang violence", "famine risk"] },
  Sudan: { level: "red", reasons: ["active conflict", "famine risk"] },
  Venezuela: { level: "red", reasons: ["political instability", "economic crisis"] },
  Ethiopia: { level: "orange", reasons: ["regional conflict in Tigray"] },
};

export const VISA_LINKS: Array<{
  country: string;
  flag: string;
  commonVisa: string;
  url: string;
}> = [
  { country: "Thailand", flag: "🇹🇭", commonVisa: "Destination Thailand Visa (DTV) — 5-yr remote worker", url: "https://www.thaievisa.go.th/" },
  { country: "Ghana", flag: "🇬🇭", commonVisa: "Tourist + extendable residence permit", url: "https://www.gis.gov.gh/" },
  { country: "Malaysia", flag: "🇲🇾", commonVisa: "MM2H (Malaysia My Second Home)", url: "https://www.imi.gov.my/" },
  { country: "Colombia", flag: "🇨🇴", commonVisa: "Digital Nomad (V) Visa", url: "https://www.cancilleria.gov.co/en/procedures_services/visas" },
  { country: "Morocco", flag: "🇲🇦", commonVisa: "90-day visa-free + 1-yr residence card", url: "https://www.consulat.ma/en" },
  { country: "Kenya", flag: "🇰🇪", commonVisa: "eTA + Class G work/investor permit", url: "https://immigration.go.ke/" },
  { country: "Vietnam", flag: "🇻🇳", commonVisa: "E-visa (90 days, multiple entry)", url: "https://evisa.xuatnhapcanh.gov.vn/" },
  { country: "UAE", flag: "🇦🇪", commonVisa: "Golden Visa / Remote Work Visa", url: "https://u.ae/en/information-and-services/visa-and-emirates-id" },
];

export type UserProfile = {
  ageRange: string;
  gender: string;
  religion: string;
  family: string;
  workType: string;
  languages: string;
  budget: string;
  destination: string;
  duration: string;
};

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getChatCount(): number {
  if (typeof window === "undefined") return 0;
  const date = localStorage.getItem(CHAT_DATE_KEY);
  if (date !== todayStr()) return 0;
  return Number(localStorage.getItem(CHAT_COUNT_KEY) ?? "0");
}

export function incrementChatCount(): number {
  const current = getChatCount();
  const next = current + 1;
  localStorage.setItem(CHAT_DATE_KEY, todayStr());
  localStorage.setItem(CHAT_COUNT_KEY, String(next));
  return next;
}
