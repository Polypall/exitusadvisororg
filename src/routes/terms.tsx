import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Exitus — Disclaimer & Privacy Notice" },
      {
        name: "description",
        content:
          "Exitus disclaimer, privacy notice, and terms of use. Information only — not professional advice.",
      },
    ],
  }),
});

const SECTIONS = [
  {
    title: "Information only — not professional advice",
    content: `Exitus provides general information to help you explore the possibility of moving abroad. It is not legal, immigration, financial, or tax advice, and using it does not create any professional relationship. Everyone's situation is different, and immigration rules, visa requirements, costs, and eligibility change often and vary by country.

Before you apply for any visa or residency, send any money, or make any decision about relocating, confirm everything with official government sources and, where appropriate, a qualified immigration lawyer, financial advisor, or other licensed professional. Please do not rely on Exitus as your only source.`,
  },
  {
    title: "AI-generated guidance (Emap)",
    content: `Emap, the in-app assistant, generates its responses automatically and can be incomplete, out of date, or simply wrong. Treat anything Emap tells you as a starting point for your own research — not as a final answer, and not as a guarantee that you qualify for anything.`,
  },
  {
    title: "Safety and country information",
    content: `Exitus may show information about safety, political stability, corruption, conflict, health risks, and conditions for different groups of people in different countries. This kind of information can change quickly and may be inaccurate or outdated. It is not a safety guarantee, and it is not a recommendation to travel to — or avoid — any particular place. Always check the current travel advisories issued by your own government before making plans.`,
  },
  {
    title: "Links to other websites",
    content: `Exitus links out to government and third-party websites so you can apply directly through official channels. We don't control those websites and aren't responsible for their content, their accuracy, or what happens when you use them.`,
  },
  {
    title: "Your privacy and your data",
    content: `Exitus is built to respect your privacy. The answers you give Emap and any information you enter are saved only in your own browser, on your own device (local storage). We do not collect, store, see, or sell your personal information, and there is no account to create or log in to. If you clear your browser data, that information is gone. Because it lives on your device, keep that in mind if you share the device with anyone else.`,
  },
  {
    title: "No liability",
    content: `Exitus is provided "as is," without warranties of any kind. To the fullest extent allowed by law, we are not responsible for any loss, harm, cost, or decision that results from using the information in this app.`,
  },
  {
    title: "Contact",
    content: `Questions or concerns? Reach us at polySW@proton.me`,
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              Exit<span className="text-accent">us</span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition"
          >
            ← Back to home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Disclaimer & Privacy Notice
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Last updated: May 31st, 2026
        </p>

        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-primary mb-3">
                {section.title}
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground px-6">
        <Link to="/" className="hover:text-primary transition">
          ← Back to Exitus
        </Link>
      </footer>
    </div>
  );
}
