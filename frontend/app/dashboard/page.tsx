'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'domain' | 'email' | 'username' | 'company';
  query: string;
  summary: string;
  risk: 'Low' | 'Moderate' | 'High';
  evidence: string[];
  timestamp: string;
}

interface SearchItem {
  id: string;
  query_type: string;
  query_value: string;
  risk_level: string;
  summary: string;
  created_at: string;
}

const searchTypes = [
  { id: 'domain', label: 'Domain', icon: '🌐' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'username', label: 'Username', icon: '👤' },
  { id: 'company', label: 'Company', icon: '🏢' }
];

const riskColors = {
  Low: 'text-green-400 bg-green-400/10',
  Moderate: 'text-yellow-400 bg-yellow-400/10',
  High: 'text-red-400 bg-red-400/10'
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('domain');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [history, setHistory] = useState<SearchItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get token from localStorage
    const authToken = localStorage.getItem('auth-token');
    if (!authToken) {
      router.push('/login');
      return;
    }
    setToken(authToken);
    fetchHistory(authToken);
  }, []);

  const fetchHistory = async (authToken: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/search/history?limit=10`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHistory(data.searches || []);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !token) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ query: query.trim(), type: searchType })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      setResults(data);
      await fetchHistory(token); // Refresh history
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-lg font-bold text-accent">V</div>
              <span className="text-xl font-semibold text-white">Verisight</span>
            </Link>
            <button onClick={handleLogout} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted hover:border-white/20">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <div className="mb-4 grid gap-2 sm:grid-cols-4">
            {searchTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSearchType(t.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  searchType === t.id ? 'border-accent/60 bg-accent/10 text-accent' : 'border-white/10 text-muted hover:border-white/20'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              placeholder={`Enter ${searchType}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-muted focus:border-accent/50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-slate-950 disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </form>

          {error && <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</div>}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Results */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">{results.type}</p>
                      <p className="mt-1 text-2xl font-bold text-white">{results.query}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${riskColors[results.risk as keyof typeof riskColors] || ''}`}>
                      {results.risk} Risk
                    </span>
                  </div>

                  <p className="text-muted">{results.summary}</p>

                  <div className="mt-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">Evidence</p>
                    <ul className="space-y-2">
                      {results.evidence.map((item, i) => (
                        <li key={i} className="text-sm text-text">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-xs text-muted">{results.legalNotice}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-12 text-center">
                <p className="text-muted">No results yet. Start by entering a search query.</p>
              </div>
            )}
          </div>

          {/* History */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Recent Searches</h3>
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item) => (
                  <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.query_type}</p>
                    <p className="mt-1 truncate font-mono text-sm text-text">{item.query_value}</p>
                    <span className={`mt-2 inline-block rounded px-2 py-1 text-xs ${riskColors[item.risk_level as keyof typeof riskColors] || ''}`}>
                      {item.risk_level}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">No searches yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
