import { useState, useRef, useEffect } from "react";

const EMAP_ICON = "https://i.postimg.cc/25sLq1hS/Untitled-design-1-removebg-preview.png";
const CHAT_COUNT_KEY = "exitus_chat_count";
const CHAT_DATE_KEY = "exitus_chat_date";
const CHAT_HISTORY_KEY = "exitus_chat_history";
const TIER_KEY = "exitus_tier";
const FREE_LIMIT = 5;

type Message = { role: "user" | "assistant"; content: string };

function getTodayCount(): number {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem(CHAT_DATE_KEY);
  if (storedDate !== today) {
    localStorage.setItem(CHAT_DATE_KEY, today);
    localStorage.setItem(CHAT_COUNT_KEY, "0");
    return 0;
  }
  return parseInt(localStorage.getItem(CHAT_COUNT_KEY) ?? "0", 10);
}

function incrementCount() {
  const count = getTodayCount();
  localStorage.setItem(CHAT_COUNT_KEY, String(count + 1));
}

function isSettler(): boolean {
  return localStorage.getItem(TIER_KEY) === "settler";
}

export function EmapChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCount(getTodayCount());
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("exitus:open-chat", handler);
    return () => window.removeEventListener("exitus:open-chat", handler);
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const atLimit = !isSettler() && count >= FREE_LIMIT;

  async function sendMessage() {
    if (!input.trim() || loading || atLimit) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    incrementCount();
    setCount(getTodayCount());

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't get a response. Please try again." }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Connection error. Please check your internet and try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl border-2 border-accent overflow-hidden hover:scale-110 transition-transform"
        aria-label="Chat with Emap"
      >
        <img src={EMAP_ICON} alt="Emap" className="w-full h-full object-cover" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] flex flex-col rounded-2xl shadow-2xl border border-border bg-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground">
            <img src={EMAP_ICON} alt="Emap" className="w-8 h-8 rounded-full ring-2 ring-accent" />
            <div>
              <div className="font-bold text-sm">Emap</div>
              <div className="text-xs opacity-80">Your relocation guide</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-primary-foreground/70 hover:text-primary-foreground text-xl leading-none"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm pt-8">
                <img src={EMAP_ICON} alt="" className="w-12 h-12 rounded-full mx-auto mb-3 opacity-60" />
                <p>Hi! I'm Emap 👋</p>
                <p className="mt-1">Tell me about yourself and I'll help you find your ideal country to relocate to.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2 text-sm text-muted-foreground">
                  Emap is thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Limit warning */}
          {atLimit && (
            <div className="px-4 py-2 bg-accent/10 border-t border-border text-xs text-center text-foreground">
              You've used your 5 free chats today.{" "}
              <a href="#pricing" onClick={() => setOpen(false)} className="text-primary font-semibold underline">
                Upgrade to Settler
              </a>{" "}
              for unlimited chats.
            </div>
          )}

          {/* Free tier counter */}
          {!isSettler() && !atLimit && (
            <div className="px-4 py-1 bg-muted/50 text-xs text-center text-muted-foreground border-t border-border">
              {FREE_LIMIT - count} free chat{FREE_LIMIT - count !== 1 ? "s" : ""} remaining today
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-border bg-card">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={atLimit || loading}
              placeholder={atLimit ? "Daily limit reached" : "Ask Emap anything…"}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading || atLimit}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:bg-primary/90 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
