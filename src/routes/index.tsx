import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

function openChat(_country?: string) {
  // Opens the Emap chat widget — dispatches a custom event the EmapChat component listens for
  window.dispatchEvent(new CustomEvent("exitus:open-chat", { detail: { country: _country } }));
}

function DisclaimerModal({ onAgree }: { onAgree: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem("exitus_terms_agreed");
    if (agreed !== "true") {
      setOpen(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("exitus_terms_agreed", "true");
    setOpen(false);
    onAgree();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-primary mb-2">Terms of Use</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Before using Exitus, please review and agree to the following:
        </p>

        <div className="space-y-4 text-sm text-foreground mb-6">
          <div className="rounded-xl bg-primary/5 border border-border p-4">
            <h3 className="font-semibold text-primary mb-1">Not professional advice</h3>
            <p className="text-muted-foreground">
              Exitus provides general information only. It is not legal, immigration, financial, or tax advice. Always confirm with official sources and qualified professionals before making decisions.
            </p>
          </div>
          <div className="rounded-xl bg-primary/5 border border-border p-4">
            <h3 className="font-semibold text-primary mb-1">AI-generated guidance (Emap)</h3>
            <p className="text-muted-foreground">
              Emap's responses can be incomplete, outdated, or incorrect. Treat everything as a starting point for your own research — not a final answer or guarantee.
            </p>
          </div>
          <div className="rounded-xl bg-primary/5 border border-border p-4">
            <h3 className="font-semibold text-primary mb-1">Safety & country information</h3>
            <p className="text-muted-foreground">
              Conditions change quickly and may be outdated. Always check current travel advisories from your own government before making plans.
            </p>
          </div>
          <div className="rounded-xl bg-primary/5 border border-border p-4">
            <h3 className="font-semibold text-primary mb-1">No liability</h3>
            <p className="text-muted-foreground">
              Exitus is provided "as is" without warranties. We are not responsible for any loss, harm, cost, or decision that results from using this app.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleAgree}
            className="flex-1 py-3 rounded-full font-semibold text-primary bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:scale-[1.02] transition-transform"
          >
            I Agree — Enter Exitus
          </button>
          <Link
            to="/terms"
            className="text-center py-3 px-4 rounded-full border border-input bg-background text-sm font-medium text-foreground hover:bg-accent transition"
          >
            Read full disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Exitus — Ready to Exit the West?" },
      {
        name: "description",
        content:
          "Exitus helps you find the best non-Western country for your lifestyle, budget, and values — with Emap, your friendly AI relocation guide.",
      },
      { property: "og:title", content: "Exitus — Find Your EXIT" },
      {
        property: "og:description",
        content: "AI-powered relocation advice for life beyond the West.",
      },
      {
        property: "og:image",
        content: "https://i.postimg.cc/RCQKhwMk/Chat-GPT-Image-May-26-2026-03-17-05-PM.png",
      },
    ],
  }),
});

const EMAP_ICON = "https://i.postimg.cc/25sLq1hS/Untitled-design-1-removebg-preview.png";
const BANNER = "https://i.postimg.cc/RCQKhwMk/Chat-GPT-Image-May-26-2026-03-17-05-PM.png";
const IMG_PLANES = "https://i.postimg.cc/GmkVJHCs/1On-XA.jpg";
const IMG_FAMILIES = "https://i.postimg.cc/YSScrM5F/Xf7XI.jpg";

const FEATURES = [
  { icon: "🌍", title: "Country Matching", desc: "Personalized picks based on your income, family, and lifestyle." },
  { icon: "💳", title: "Banking Abroad", desc: "Wise, SoFi, and VPN tips for expats who need to keep their money moving." },
  { icon: "🛂", title: "Visa Pathways", desc: "Digital nomad, retirement, and investment visas explained simply." },
  { icon: "🏥", title: "Healthcare Tips", desc: "International insurance plus affordable private care options." },
  { icon: "⚠️", title: "Safety Alerts", desc: "Red-flag warnings for political risk, discrimination, and conflict zones." },
  { icon: "💰", title: "Cost Snapshots", desc: "Real monthly budgets per destination — no fantasy numbers." },
];

const COUNTRIES = [
  { flag: "🇹🇭", name: "Thailand", region: "SE Asia", cost: "$900–$2k/mo", highlight: "Easy visas, great food, strong expat scene.", links: ["https://www.thaievisa.go.th/"] },
  { flag: "🇬🇭", name: "Ghana", region: "West Africa", cost: "$700–$1.5k/mo", highlight: "Year of Return community, English-speaking.", links: ["https://gis.gov.gh/", "https://evisa.immigration.gov.gh/"] },
  { flag: "🇲🇾", name: "Malaysia", region: "SE Asia", cost: "$1k–$2k/mo", highlight: "MM2H visa, multicultural, top healthcare.", links: ["https://www.imi.gov.my/", "https://www.mm2h.gov.my/"] },
  { flag: "🇨🇴", name: "Colombia", region: "Latin America", cost: "$900–$1.8k/mo", highlight: "Spring weather, digital nomad visa.", links: ["https://www.cancilleria.gov.co/tramites_servicios/visa"] },
  { flag: "🇲🇦", name: "Morocco", region: "MENA", cost: "$800–$1.6k/mo", highlight: "1-year visa-free stays, gateway to EU.", links: ["https://www.acces-maroc.ma"] },
  { flag: "🇰🇪", name: "Kenya", region: "East Africa", cost: "$800–$1.7k/mo", highlight: "Nairobi tech hub, Swahili-English.", links: ["https://www.etakenya.go.ke"] },
  { flag: "🇻🇳", name: "Vietnam", region: "SE Asia", cost: "$700–$1.5k/mo", highlight: "Low cost, fast internet, food paradise.", links: ["https://evisa.gov.vn"] },
  { flag: "🇦🇪", name: "UAE", region: "MENA", cost: "$2k–$5k/mo", highlight: "Tax-free income, golden visa pathway.", links: ["https://icp.gov.ae"] },
];

const PRICING = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    features: ["5 Emap chats / day", "Visa options", "Basic banking tips"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Settler",
    price: "$29",
    period: "/mo",
    features: ["Unlimited chats", "Access to Exitus expat online group"],
    cta: "Upgrade to Settler",
    highlighted: true,
  },
];

async function handleUpgrade() {
  try {
    const res = await fetch("/api/create-checkout-session", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong starting checkout. Please try again.");
    }
  } catch {
    alert("Connection error. Please try again.");
  }
}

type WarningLevel = "red" | "orange";
const COUNTRY_WARNINGS: Record<string, { level: WarningLevel; reasons: string[] }> = {
  "Haiti": { level: "red", reasons: ["gang violence", "political collapse", "famine risk"] },
  "Sudan": { level: "red", reasons: ["active civil war", "famine risk", "mass displacement"] },
  "South Sudan": { level: "red", reasons: ["active conflict", "famine risk"] },
  "Yemen": { level: "red", reasons: ["active war", "famine risk", "humanitarian crisis"] },
  "Myanmar": { level: "red", reasons: ["military coup", "active conflict", "travel ban recommended"] },
  "Venezuela": { level: "red", reasons: ["political instability", "economic collapse", "crime"] },
  "Democratic Republic of Congo": { level: "red", reasons: ["armed conflict in eastern regions"] },
  "Libya": { level: "red", reasons: ["active conflict", "no stable government"] },
  "Somalia": { level: "red", reasons: ["active conflict", "terrorism risk", "no stable government"] },
  "Ethiopia": { level: "orange", reasons: ["regional conflict", "ethnic tensions in some areas"] },
  "Nicaragua": { level: "orange", reasons: ["authoritarian government", "political repression"] },
  "Zimbabwe": { level: "orange", reasons: ["economic instability", "political repression"] },
  "El Salvador": { level: "orange", reasons: ["gang crackdown laws may affect foreigners — verify current conditions"] },
  "Pakistan": { level: "orange", reasons: ["political instability", "terrorism risk in certain regions"] },
  "Nigeria": { level: "orange", reasons: ["security varies heavily by region — research specific area"] },
};

function CountryWarning({ country, className = "" }: { country: string; className?: string }) {
  const w = COUNTRY_WARNINGS[country];
  if (!w) return null;
  const reasons = w.reasons.join(", ");
  const isRed = w.level === "red";
  const text = isRed
    ? `We don't recommend ${country} for relocation right now — ${reasons}. Check Travel.State.Gov for current advisories.`
    : `Heads up about ${country}: ${reasons}. Research your specific destination carefully and check Travel.State.Gov.`;
  const styles = isRed
    ? "bg-red-600/15 border-red-600/50 text-red-700 dark:text-red-300"
    : "bg-amber-500/15 border-amber-500/50 text-amber-800 dark:text-amber-200";
  return (
    <div role="alert" className={`flex gap-2 items-start rounded-lg border px-3 py-2 text-xs ${styles} ${className}`}>
      <span aria-hidden>⚠️</span>
      <span>{text}</span>
    </div>
  );
}

function Index() {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("exitus_terms_agreed") === "true") {
      setAgreed(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DisclaimerModal onAgree={() => setAgreed(true)} />

      <div aria-hidden={!agreed} className={!agreed ? "pointer-events-none blur-sm select-none" : ""}>

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={EMAP_ICON} alt="Emap" className="h-10 w-10 rounded-full ring-2 ring-accent" />
            <span className="text-2xl font-bold tracking-tight text-primary">
              Exit<span className="text-accent">us</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-primary transition">Home</a>
            <a href="#features" className="hover:text-primary transition">Features</a>
            <a href="#countries" className="hover:text-primary transition">Countries</a>
            <a href="#pricing" className="hover:text-primary transition">Pricing</a>
            <button onClick={() => openChat()} className="hover:text-primary transition">
              Talk to Emap
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BANNER})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-background" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur border border-accent/40 text-accent-foreground text-sm font-medium mb-6">
            ✈️ Let's find your EXIT
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground drop-shadow-lg mb-6 leading-tight">
            Ready to Exit <span className="text-accent">the West?</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
            Find the best country for you with Emap — your friendly AI relocation guide.
          </p>
          <button
            onClick={() => openChat()}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-primary bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
          >
            <img src={EMAP_ICON} alt="" className="h-8 w-8" />
            Talk to Emap Now →
          </button>
        </div>
      </section>

      {/* Feature images */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-glow)] border-4 border-accent/50 group">
            <img src={IMG_PLANES} alt="Routes leaving the West" className="w-full h-72 object-cover group-hover:scale-105 transition duration-700" />
            <div className="p-6 bg-card">
              <h3 className="text-xl font-bold text-primary mb-2">Pick your destination</h3>
              <p className="text-muted-foreground">
                Southeast Asia, Africa, Latin America, MENA — explore countries that actually fit
                your budget and lifestyle.
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-glow)] border-4 border-accent/50 group">
            <img src={IMG_FAMILIES} alt="Families relocating" className="w-full h-72 object-cover group-hover:scale-105 transition duration-700" />
            <div className="p-6 bg-card">
              <h3 className="text-xl font-bold text-primary mb-2">For every situation</h3>
              <p className="text-muted-foreground">
                Singles, families, retirees, remote workers — tailored advice for who you are and
                what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="bg-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Everything you need to relocate
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent hover:shadow-[var(--shadow-gold)] transition"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries strip */}
      <section id="countries" className="py-20">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-3">
            Popular destinations
          </h2>
          <p className="text-center text-muted-foreground">Ask Emap about these popular destinations</p>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 px-6 max-w-7xl mx-auto min-w-max">
            {COUNTRIES.map((c) => (
              <div
                key={c.name}
                className="text-left w-64 flex-shrink-0 bg-card border-2 border-border hover:border-accent rounded-2xl p-5 transition hover:shadow-[var(--shadow-gold)] hover:-translate-y-1"
              >
                <div className="text-5xl mb-3">{c.flag}</div>
                <div className="font-bold text-primary text-lg">{c.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{c.region} · {c.cost}</div>
                <div className="text-sm text-foreground">{c.highlight}</div>
                <CountryWarning country={c.name} className="mt-3" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.links.map((link, i) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition"
                    >
                      {c.links.length === 1 ? "Visa Portal →" : `Portal ${i + 1} →`}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-primary/5 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-3">
            Simple pricing
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Start free. Upgrade when you're ready to actually move.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 border-2 ${
                  tier.highlighted
                    ? "border-accent bg-card shadow-[var(--shadow-gold)] md:-translate-y-2"
                    : "border-border bg-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[image:var(--gradient-gold)] text-primary mb-3">
                    Most popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-primary">{tier.name}</h3>
                <div className="mt-3 mb-6">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-foreground flex gap-2">
                      <span className="text-accent">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={tier.price === "Free" ? () => openChat() : handleUpgrade}
                  className={`w-full py-3 rounded-full font-semibold transition ${
                    tier.highlighted
                      ? "bg-[image:var(--gradient-gold)] text-primary shadow-[var(--shadow-gold)] hover:scale-105"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Trusted Resources
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Wise", desc: "Move money across borders, hold multiple currencies", url: "https://wise.com/" },
              { name: "Schwab", desc: "International banking — US brokerage + checking with no foreign ATM fees (open before you leave)", url: "https://schwab.com/" },
              { name: "Numbeo", desc: "Crowd-sourced cost-of-living estimates", url: "https://numbeo.com/" },
              { name: "Travel.State.Gov", desc: "Official US travel advisories", url: "https://travel.state.gov/" },
              { name: "AILA", desc: "Find a US immigration lawyer (for US visa/citizenship questions)", url: "https://aila.org/" },
              { name: "SafetyWing", desc: "International health insurance for expats and nomads", url: "https://safetywing.com/" },
            ].map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="block p-5 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-[var(--shadow-gold)] transition"
              >
                <div className="font-bold text-primary">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground px-6 space-y-2">
        <a href="https://fazier.com/launches/exitusadvisor.org" target="_blank" rel="noreferrer" className="inline-block mb-4">
          <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=dark" width={250} alt="Fazier badge" />
        </a>
        <p>© 2026 EXIT US. General information only — not legal, financial, or immigration advice.</p>
        <Link to="/terms" className="inline-block hover:text-primary transition underline underline-offset-2">
          Disclaimer & Privacy Notice
        </Link>
      </footer>

      {/* Chatbase widget loads its own floating button via the script in __root.tsx */}

      </div>
    </div>
  );
}
