export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-muted">The page you requested does not exist.</p>
      </div>
    </main>
  );
}
