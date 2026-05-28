import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

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

function Index() {
  const [chatOpen, setChatOpen] = useState(false);

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
            <button onClick={() => setChatOpen(true)} className="hover:text-primary transition">
              Talk to Emap
            </button>
            <a href="#resources" className="hover:text-primary transition">Resources</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BANNER})` }}
        />
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
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-primary bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
          >
            <img src={EMAP_ICON} alt="" className="h-8 w-8" />
            Talk to Emap Now
          </button>
        </div>
      </section>

      {/* Feature images */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-glow)] border-4 border-accent/50 group">
            <img
              src={IMG_PLANES}
              alt="Routes leaving the West"
              className="w-full h-72 object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="p-6 bg-card">
              <h3 className="text-xl font-bold text-primary mb-2">Pick your destination</h3>
              <p className="text-muted-foreground">
                Southeast Asia, Africa, Latin America, MENA — explore countries that actually fit
                your budget and lifestyle.
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-glow)] border-4 border-accent/50 group">
            <img
              src={IMG_FAMILIES}
              alt="Families relocating"
              className="w-full h-72 object-cover group-hover:scale-105 transition duration-700"
            />
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

      {/* Resources */}
      <section id="resources" className="bg-primary/5 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Trusted Resources
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Wise", desc: "Low-fee international transfers", url: "https://wise.com" },
              { name: "SoFi", desc: "US travel-friendly banking", url: "https://sofi.com" },
              { name: "Numbeo", desc: "Real cost-of-living data", url: "https://numbeo.com" },
              { name: "Travel.State.Gov", desc: "Official US travel advisories", url: "https://travel.state.gov" },
              { name: "AILA", desc: "Find an immigration lawyer", url: "https://aila.org" },
              { name: "SafetyWing", desc: "International health insurance", url: "https://safetywing.com" },
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
          <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
            📋 Exitus provides general advice only. Always consult official sources and licensed
            immigration lawyers before making decisions.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Exitus · Let's find your EXIT
      </footer>

      {/* Floating Emap */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Open Emap chat"
        className="fixed bottom-6 right-6 z-50 h-20 w-20 rounded-full bg-[image:var(--gradient-gold)] shadow-[var(--shadow-glow)] hover:scale-110 transition-transform p-1.5 ring-4 ring-primary/30"
      >
        <img src={EMAP_ICON} alt="Emap" className="h-full w-full rounded-full" />
      </button>

      {chatOpen && (
        <div className="fixed bottom-28 right-6 z-50 w-[90vw] max-w-sm rounded-2xl bg-card border-2 border-accent shadow-[var(--shadow-glow)] overflow-hidden">
          <div className="bg-[image:var(--gradient-hero)] p-4 flex items-center gap-3">
            <img src={EMAP_ICON} alt="" className="h-12 w-12 rounded-full bg-card/30 p-1" />
            <div>
              <div className="font-bold text-primary-foreground">Emap</div>
              <div className="text-xs text-primary-foreground/80">Your relocation guide</div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="ml-auto text-primary-foreground/80 hover:text-primary-foreground"
            >
              ✕
            </button>
          </div>
          <div className="p-5 text-sm text-foreground">
            🌍 Hey there, I'm Emap! Full chat coming next — for now, this is a preview. Ready to
            explore life beyond the West?
            <p className="mt-3 text-xs text-muted-foreground">
              📋 General advice only — consult official sources and immigration lawyers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
