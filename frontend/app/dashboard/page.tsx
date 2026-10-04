const queries = ['domain', 'email', 'username', 'company'];

const results = [
  { label: 'Domain scan', value: 'facebook.com', severity: 'Low risk', status: 'Public metadata ready' },
  { label: 'Email footprint', value: 'admin@company.ai', severity: 'Moderate', status: 'Breach exposure review' },
  { label: 'Username audit', value: '@verisight', severity: 'Low risk', status: 'Public profiles found' }
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Workspace</p>
          <h1 className="mt-2 text-2xl font-bold text-white">Verisight Dashboard</h1>
        </div>
        <button className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          + New query
        </button>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        {queries.map((item) => (
          <button key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white transition hover:border-accent/50">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">{item}</p>
            <p className="mt-2 text-lg font-semibold capitalize">Search</p>
          </button>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <input
            placeholder="Enter domain, email, username, or company"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-muted"
          />
          <button className="rounded-xl bg-accent px-5 py-3 font-semibold text-slate-950">Run scan</button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {results.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.label}</p>
              <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-accent/10 px-2 py-1 text-xs text-accent">{item.severity}</span>
                <span className="text-xs text-muted">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
