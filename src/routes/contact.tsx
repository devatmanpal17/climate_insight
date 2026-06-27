import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AuroraBackground } from "../components/AuroraBackground";
import { Mail, Github, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bharat Climate Twin" },
      { name: "description", content: "Drop us a line — researchers, agencies, and partners interested in using the Climate Twin." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="relative flex-1">
        <AuroraBackground className="opacity-40" />
        <div className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Let's talk.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Researchers, agencies, weather-curious citizens — if any of this is useful to you, we want to hear about it.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <form className="rounded-3xl glass-strong p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" placeholder="Your name" />
                <Field label="Email" type="email" placeholder="you@org.in" />
              </div>
              <Field label="Organisation" placeholder="e.g. IIT, ISRO, State agency" />
              <div className="mt-4">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  placeholder="What's on your mind?"
                  className="mt-1.5 w-full rounded-2xl glass px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>
              <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-teal to-monsoon px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                <Send className="h-4 w-4" /> Send message
              </button>
            </form>

            <div className="space-y-3">
              {[
                { icon: Mail, h: "Email", v: "team@bharatclimatetwin.in" },
                { icon: Github, h: "GitHub", v: "github.com/bharat-climate-twin" },
                { icon: MapPin, h: "Based in", v: "New Delhi, India" },
              ].map((c) => (
                <div key={c.h} className="flex items-start gap-3 rounded-2xl glass p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal/15 to-monsoon/10 text-teal">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{c.h}</p>
                    <p className="mt-0.5 text-sm font-medium">{c.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl glass px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal/40"
      />
    </div>
  );
}
