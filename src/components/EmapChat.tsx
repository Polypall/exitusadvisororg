import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { chatWithEmap } from "@/lib/chat.functions";

const EMAP_ICON = "https://i.postimg.cc/25sLq1hS/Untitled-design-1-removebg-preview.png";
const DISCLAIMER = "📋 General information only — not legal, financial, or immigration advice.";
const MAX_INPUT_LENGTH = 2000;

const QUICK_STARTS = [
  "What country fits a $1,500/mo budget?",
  "How do I bank abroad?",
  "Best visa for a family of 4?",
  "Is Ghana good for African Americans?",
];

const BANKING_KEYWORDS = ["bank", "wise", "sofi", "vpn", "transfer", "money", "account"];

type Msg = { role: "user" | "assistant"; content: string };

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const clean = text.replace(/[*_>#`]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");
  const u = new SpeechSynthesisUtterance(clean);
  u.rate = 1;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function EmapChat({
  open,
  onClose,
  seedCountry,
}: {
  open: boolean;
  onClose: () => void;
  seedCountry?: string | null;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sendChat = useServerFn(chatWithEmap);

  // Load history
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist history
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Seed with a country pick
  useEffect(() => {
    if (open && seedCountry) {
      send(`Tell me about relocating to ${seedCountry} — cost, visa options, safety, and banking setup.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedCountry, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await sendChat({ data: { messages: next } });
      const reply = result?.reply || result?.error || "Sorry, something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (autoRead && result?.reply) speak(result.reply);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't reach the server. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    stopSpeaking();
    setMessages([]);
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  }

  if (!open) return null;

  const showBankingTip =
    messages.length > 0 &&
    BANKING_KEYWORDS.some((k) => messages[messages.length - 1].content.toLowerCase().includes(k));

  return (
    <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-28 md:right-6 z-50 w-full md:w-[420px] max-w-full md:max-w-[95vw] h-[85vh] md:h-[640px] rounded-t-2xl md:rounded-2xl bg-card border-2 border-accent shadow-[var(--shadow-glow)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[image:var(--gradient-hero)] p-4 flex items-center gap-3">
        <img src={EMAP_ICON} alt="" className="h-12 w-12 rounded-full bg-card/30 p-1 ring-2 ring-accent" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-primary-foreground">Chat with Emap</div>
          <div className="text-xs text-primary-foreground/80">Your relocation guide</div>
        </div>
        <button
          onClick={() => {
            const next = !autoRead;
            setAutoRead(next);
            if (!next) stopSpeaking();
          }}
          title={autoRead ? "Read-aloud on" : "Read-aloud off"}
          className={`px-2 py-1 rounded-md text-sm transition ${
            autoRead ? "bg-accent text-accent-foreground" : "bg-card/20 text-primary-foreground"
          }`}
        >
          🔊
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-primary-foreground/80 hover:text-primary-foreground text-lg"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="flex gap-2 items-start">
              <img src={EMAP_ICON} alt="" className="h-8 w-8 rounded-full ring-2 ring-accent flex-shrink-0" />
              <div className="bg-accent/15 border border-accent/40 rounded-2xl rounded-tl-sm p-3 text-sm text-foreground">
                🌍 Hey! I'm Emap. Tell me a bit about you and I'll help you find a country that fits — budget, lifestyle, family, all of it.
                <div className="mt-2 text-[10px] text-muted-foreground italic">{DISCLAIMER}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_STARTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-accent/50 bg-accent/10 text-foreground hover:bg-accent/20 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} onSpeak={() => speak(m.content)} />
        ))}

        {showBankingTip && (
          <div className="bg-[image:var(--gradient-gold)] rounded-2xl p-3 text-sm text-primary shadow-[var(--shadow-gold)]">
            <div className="font-bold mb-1">💳 Banking abroad — quick tips</div>
            <ul className="list-disc ml-4 space-y-0.5 text-xs">
              <li><strong>Wise</strong>: low-fee transfers + multi-currency accounts.</li>
              <li><strong>SoFi</strong>: keep a US bank that works internationally.</li>
              <li><strong>VPN</strong>: use one set to a US IP when logging into US banks abroad.</li>
            </ul>
          </div>
        )}

        {loading && (
          <div className="flex gap-2 items-start">
            <img src={EMAP_ICON} alt="" className="h-8 w-8 rounded-full ring-2 ring-accent flex-shrink-0" />
            <div className="bg-accent/15 border border-accent/40 rounded-2xl rounded-tl-sm p-3 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">·</span>
                <span className="animate-bounce [animation-delay:120ms]">·</span>
                <span className="animate-bounce [animation-delay:240ms]">·</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border p-3 bg-card flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Emap anything…"
          className="flex-1 px-3 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-full text-sm font-semibold text-primary bg-[image:var(--gradient-gold)] shadow-[var(--shadow-gold)] disabled:opacity-50"
        >
          Send
        </button>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            title="Clear chat"
            className="px-2 py-2 rounded-full text-xs text-muted-foreground hover:text-foreground"
          >
            🗑
          </button>
        )}
      </form>
    </div>
  );
}

function MessageBubble({ msg, onSpeak }: { msg: Msg; onSpeak: () => void }) {
  const isUser = msg.role === "user";
  const hasAlert = !isUser && /⚠️\s*\*\*SAFETY ALERT/i.test(msg.content);

  // Split out safety alert blockquote so we can render it as a styled card
  let body = msg.content;
  let alertText: string | null = null;
  if (hasAlert) {
    const match = msg.content.match(/>\s*⚠️\s*\*\*SAFETY ALERT:\*\*\s*([^\n]+)/i);
    if (match) {
      alertText = match[1].trim();
      body = msg.content.replace(match[0], "").trim();
    }
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-start">
      <img src={EMAP_ICON} alt="" className="h-8 w-8 rounded-full ring-2 ring-accent flex-shrink-0" />
      <div className="max-w-[85%] space-y-2">
        {alertText && (
          <div className="border-2 border-destructive bg-destructive/10 text-destructive-foreground rounded-xl p-3 text-sm">
            <div className="font-bold text-destructive">⚠️ Safety Alert</div>
            <div className="text-foreground">{alertText}</div>
          </div>
        )}
        <div className="bg-accent/15 border border-accent/40 rounded-2xl rounded-tl-sm p-3 text-sm text-foreground prose-sm">
          <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_a]:text-primary [&_a]:underline">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
          {!body.includes("General information only") && (
            <div className="mt-2 text-[10px] text-muted-foreground italic">{DISCLAIMER}</div>
          )}
          <button
            onClick={onSpeak}
            className="mt-2 text-[11px] text-primary hover:underline"
          >
            🔊 listen
          </button>
        </div>
      </div>
    </div>
  );
}
