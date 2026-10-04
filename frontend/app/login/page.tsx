import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-glow">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-xl font-bold text-accent">
            V
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Secure access to your Verisight workspace.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-muted">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-muted"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-muted"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-slate-950">
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          New here?{' '}
          <Link href="/dashboard" className="text-accent">
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
