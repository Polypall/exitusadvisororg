import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const EMAP_ICON = "https://i.postimg.cc/25sLq1hS/Untitled-design-1-removebg-preview.png";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
});

function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.paid) {
          localStorage.setItem("exitus_tier", "settler");
          localStorage.setItem("exitus_customer_id", data.customer_id ?? "");
          setEmail(data.email ?? "");
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          Verifying your payment…
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't verify your payment. If you were charged, email us and we'll sort it out.
          </p>
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <img src={EMAP_ICON} alt="Emap" className="w-20 h-20 rounded-full mx-auto mb-6 ring-4 ring-accent shadow-lg" />
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Settler! 🎉</h1>
        {email && (
          <p className="text-muted-foreground mb-2">
            Confirmation sent to <span className="font-medium text-foreground">{email}</span>
          </p>
        )}
        <p className="text-muted-foreground mb-8">
          You now have unlimited Emap chats, access to the document checklist, Tax & FBAR guide, and your monthly strategy call link.
        </p>

        <div className="rounded-2xl border border-border bg-card p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-accent text-lg">✓</span>
            <div>
              <div className="font-semibold text-foreground">Unlimited Emap chats</div>
              <div className="text-sm text-muted-foreground">No daily limit — chat as much as you need.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent text-lg">✓</span>
            <div>
              <div className="font-semibold text-foreground">Monthly strategy call</div>
              <div className="text-sm text-muted-foreground">
                Book your call:{" "}
                <a
                  href="https://tally.so/r/Bz2QaQ"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  Schedule here →
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent text-lg">✓</span>
            <div>
              <div className="font-semibold text-foreground">Private travelers community</div>
              <div className="text-sm text-muted-foreground">
                Join the group:{" "}
                <a
                  href="https://tally.so/r/Bz2QaQ"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  Access here →
                </a>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] text-primary px-8 py-3 font-semibold shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
        >
          <img src={EMAP_ICON} alt="" className="w-5 h-5" />
          Start chatting with Emap →
        </Link>
      </div>
    </div>
  );
}
