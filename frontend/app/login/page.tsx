'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('auth-token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-glow">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-xl font-bold text-accent">V</div>
          <h1 className="mt-4 text-2xl font-bold text-white">{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p className="mt-2 text-sm text-muted">{isLogin ? 'Secure access to your Verisight workspace.' : 'Join Verisight for public intelligence research.'}</p>
        </div>

        {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm text-muted">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-muted"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-muted">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-muted"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-muted"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-slate-950 disabled:opacity-50">
            {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-accent">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-muted">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-accent">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-accent">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
