import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Mail, Github, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bharat Climate Twin" },
      { name: "description", content: "Get in touch with the Bharat Climate Twin team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Get in touch.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We'd love to hear from researchers, agencies, and partners interested in using Bharat Climate Twin.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form className="rounded-2xl border border-border bg-card p-6 shadow-card" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" placeholder="Your name" />
              <Field label="Email" type="email" placeholder="you@org.in" />
            </div>
            <Field label="Organization" placeholder="e.g. IIT, ISRO, State agency" />
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <button className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-90">
              Send message
            </button>
          </form>

          <div className="space-y-4">
            {[
              { icon: Mail, h: "Email", v: "team@bharatclimatetwin.in" },
              { icon: Github, h: "GitHub", v: "github.com/bharat-climate-twin" },
              { icon: MapPin, h: "Based in", v: "New Delhi, India" },
            ].map((c) => (
              <div key={c.h} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-teal">
                  <c.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.h}</p>
                  <p className="mt-0.5 text-sm font-medium">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="mt-4 first:mt-0 sm:mt-0">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
