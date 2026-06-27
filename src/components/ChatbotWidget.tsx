import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const CANNED: { match: RegExp; reply: string }[] = [
  { match: /rain|monsoon/i, reply: "The southwest monsoon should reach Kerala around June 1, give or take four days. Nationally we're tracking about 4% above the long-period average — a wetter-than-usual year so far." },
  { match: /flood/i, reply: "Active flood watches sit over Assam's Brahmaputra basin and coastal Odisha right now. Hop into Risk Alerts on the dashboard for district-level severity." },
  { match: /heat|temperature/i, reply: "There's a heatwave advisory for parts of Rajasthan and Vidarbha. Daytime highs are forecast to stay above 44°C for the next 72 hours." },
  { match: /drought/i, reply: "Soil moisture is running below normal across interior Karnataka and Marathwada — not a drought yet, but worth keeping an eye on." },
  { match: /hello|hi|hey/i, reply: "Hey! Ask me about rainfall, floods, heatwaves, droughts, or anything you see on the dashboard." },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi — I'm the Climate Twin assistant. Ask me about rainfall, floods, heatwaves, or what any panel on the dashboard is showing." },
  ]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const hit = CANNED.find((c) => c.match.test(text));
    const reply = hit?.reply ?? "I'm a demo assistant for now — try asking about rainfall, floods, heatwaves, or drought outlooks.";
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-3 flex h-[460px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl glass-strong shadow-elevated animate-fade-up">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 bg-gradient-to-br from-teal/20 to-monsoon/10">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-teal to-monsoon text-white shadow-glow">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Climate Twin Assistant</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-monsoon animate-pulse-dot" /> online · demo
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md p-1 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-teal to-monsoon px-3.5 py-2 text-sm text-white shadow-card"
                      : "max-w-[85%] rounded-2xl rounded-tl-sm glass px-3.5 py-2 text-sm"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rainfall, floods, heatwaves…"
              className="flex-1 rounded-full glass px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal/40"
            />
            <button type="submit" aria-label="Send" className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-teal to-monsoon text-white shadow-glow hover:scale-105 active:scale-95 transition-transform">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Climate Twin assistant"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-teal to-monsoon text-white shadow-glow hover:scale-110 active:scale-95 transition-transform"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
