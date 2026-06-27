import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const CANNED: { match: RegExp; reply: string }[] = [
  { match: /rain|monsoon/i, reply: "Monsoon onset over Kerala is forecast around June 1 ± 4 days. Pan-India rainfall is currently tracking 4% above the long-period average." },
  { match: /flood/i, reply: "Active flood watches: Assam (Brahmaputra basin), coastal Odisha. The Risk Alerts panel shows real-time district-level severity." },
  { match: /heat|temperature/i, reply: "A heatwave advisory is active for parts of Rajasthan and Vidarbha. Forecast max temps exceed 44°C for the next 72 hours." },
  { match: /drought/i, reply: "Soil-moisture anomaly is negative across interior Karnataka and Marathwada — early drought signals being monitored." },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! Ask me anything about India's climate or this dashboard." },
  ]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const hit = CANNED.find((c) => c.match.test(text));
    const reply = hit?.reply ?? "I'm a demo assistant — try asking about rainfall, floods, heatwaves, or drought outlooks.";
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-3 flex h-[460px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-gradient-hero px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">ClimateGPT Assistant</p>
                <p className="text-[11px] opacity-80">Online · demo mode</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md p-1 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2 text-sm text-foreground"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about climate, forecasts, alerts…"
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <button type="submit" aria-label="Send" className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open ClimateGPT Assistant"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-hero text-primary-foreground shadow-elevated transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
