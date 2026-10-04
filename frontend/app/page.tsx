import Link from 'next/link';

const features = [
  { title: 'Domain Scan', text: 'Check domain, DNS, and public metadata.' },
  { title: 'Email Signals', text: 'Look for breach exposure and public footprint.' },
  { title: 'Username Audit', text: 'Review public account presence across channels.' },
  { title: 'Company Profile', text: 'Merge public data into a clean business report.' }
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-lg font-bold text-accent">
            V
          </div>
          <div>
            <p className="text-xl font-semibold tracking-wide">Verisight</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#security">Security</Link>
          <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 text-text">Login</Link>
        </nav>
      </header>

      <section className="grid items-center gap-10 pb-16 pt-10 md:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
            Public Intelligence Platform
          </p>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            See what is publicly visible. Act with clarity.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Verisight helps teams review public-facing business, domain, and profile signals using ethical, legal, and clearly disclosed intelligence workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-950 transition hover:brightness-110">
              Start free
            </Link>
            <Link href="#pricing" className="rounded-full border border-white/10 px-6 py-3 font-semibold text-text transition hover:border-accent/50">
              View pricing
            </Link>
          </div>

          <div className="mt-10 flex gap-8 text-sm text-muted">
            <div>
              <p className="text-2xl font-bold text-white">12k+</p>
              <p>Signals indexed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p>API uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24/7</p>
              <p>Monitoring</p>
            </div>
          </div>
        </div>

        <div className="glow-card p-5">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">System</p>
              <p className="font-semibold text-white">intel.scan</p>
            </div>
            <span className="rounded-full border border-accent/50 bg-accent/10 px-2 py-1 text-xs text-accent">LIVE</span>
          </div>

          <div className="space-y-4 font-mono text-sm text-text">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 p-3">
              <span className="text-accent">&gt; query</span>
              <span className="text-muted">facebook.com</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-muted">
              <p>{`[01] resolving public records...`}</p>
              <p>{`[02] checking exposure signals...`}</p>
              <p>{`[03] generating profile summary...`}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-muted">Status</p>
                <p className="mt-1 text-lg font-semibold text-white">Safe</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-muted">Risk</p>
                <p className="mt-1 text-lg font-semibold text-accent">Low</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="mb-8 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Features</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Purpose-built for public signal intelligence</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="glow-card p-5">
              <div className="mb-4 h-10 w-10 rounded-lg bg-accent/10 ring-1 ring-accent/20" />
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="py-16">
        <div className="glow-card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Security</p>
          <h3 className="mt-2 text-3xl font-bold text-white">Security-first by design</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-lg font-semibold text-white">Authentication</p>
              <p className="mt-2 text-muted">JWT sessions with strict input validation and access control.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-lg font-semibold text-white">Rate limiting</p>
              <p className="mt-2 text-muted">Public endpoints are protected to reduce abuse and overload.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-lg font-semibold text-white">Legal-safe scope</p>
              <p className="mt-2 text-muted">Only public and consent-based data discovery is recommended.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16">
        <div className="mb-8 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Pricing</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Simple plans for growing teams</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="glow-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Free</p>
            <p className="mt-3 text-4xl font-bold text-white">₹0</p>
            <p className="mt-2 text-muted">For exploration and learning.</p>
          </div>
          <div className="glow-card border-accent/50 bg-accent/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Pro</p>
            <p className="mt-3 text-4xl font-bold text-white">₹100</p>
            <p className="mt-2 text-muted">Unlimited lookups for daily research workflows.</p>
          </div>
          <div className="glow-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Business</p>
            <p className="mt-3 text-4xl font-bold text-white">₹200</p>
            <p className="mt-2 text-muted">Enhanced reports, collaboration, and premium export.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
