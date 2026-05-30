import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { EmapChat } from "@/components/EmapChat";

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
  { flag: "🇹🇭", name: "Thailand", region: "SE Asia", cost: "$900–$2k/mo", highlight: "Easy visas, great food, strong expat scene." },
  { flag: "🇬🇭", name: "Ghana", region: "West Africa", cost: "$700–$1.5k/mo", highlight: "Year of Return community, English-speaking." },
  { flag: "🇲🇾", name: "Malaysia", region: "SE Asia", cost: "$1k–$2k/mo", highlight: "MM2H visa, multicultural, top healthcare." },
  { flag: "🇨🇴", name: "Colombia", region: "Latin America", cost: "$900–$1.8k/mo", highlight: "Spring weather, digital nomad visa." },
  { flag: "🇲🇦", name: "Morocco", region: "MENA", cost: "$800–$1.6k/mo", highlight: "1-year visa-free stays, gateway to EU." },
  { flag: "🇰🇪", name: "Kenya", region: "East Africa", cost: "$800–$1.7k/mo", highlight: "Nairobi tech hub, Swahili-English." },
  { flag: "🇻🇳", name: "Vietnam", region: "SE Asia", cost: "$700–$1.5k/mo", highlight: "Low cost, fast internet, food paradise." },
  { flag: "🇦🇪", name: "UAE", region: "MENA", cost: "$2k–$5k/mo", highlight: "Tax-free income, golden visa pathway." },
];

const PRICING = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    features: ["5 Emap chats / day", "Country cards", "Basic banking tips"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Nomad",
    price: "$9",
    period: "/mo",
    features: ["Unlimited chats", "Visa deep-dives", "Banking checklists", "Country comparison"],
    cta: "Upgrade to Nomad",
    highlighted: true,
  },
  {
    name: "Settler",
    price: "$29",
    period: "/mo",
    features: ["Everything in Nomad", "Monthly strategy call", "Document checklist generator", "Tax & FBAR guide"],
    cta: "Upgrade to Settler",
    highlighted: false,
  },
];

function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const [seedCountry, setSeedCountry] = useState<string | null>(null);

  function openChat(country?: string) {
    setSeedCountry(country ?? null);
    setChatOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <p className="text-center text-muted-foreground">Tap a country to chat with Emap about it.</p>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 px-6 max-w-7xl mx-auto min-w-max">
            {COUNTRIES.map((c) => (
              <button
                key={c.name}
                onClick={() => openChat(c.name)}
                className="text-left w-64 flex-shrink-0 bg-card border-2 border-border hover:border-accent rounded-2xl p-5 transition hover:shadow-[var(--shadow-gold)] hover:-translate-y-1"
              >
                <div className="text-5xl mb-3">{c.flag}</div>
                <div className="font-bold text-primary text-lg">{c.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{c.region} · {c.cost}</div>
                <div className="text-sm text-foreground">{c.highlight}</div>
              </button>
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
          <div className="grid md:grid-cols-3 gap-6">
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
                  onClick={() => alert("Payments coming soon — backend /api/create-checkout-session will handle Stripe.")}
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
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground px-6">
        © 2025 EXIT US. General information only — not legal, financial, or immigration advice.
      </footer>

      {/* Floating Emap */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Open Emap chat"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[image:var(--gradient-gold)] shadow-[var(--shadow-glow)] hover:scale-110 transition-transform p-1 ring-4 ring-primary/30"
      >
        <img src={EMAP_ICON} alt="Emap" className="h-full w-full rounded-full" />
      </button>

      <EmapChat open={chatOpen} onClose={() => setChatOpen(false)} seedCountry={seedCountry} />
    </div>
  );
}
