import Link from 'next/link';

const plans = [
  { name: 'Free', price: '₹0', description: 'Perfect for evaluation and learning.', features: ['10 searches / month', 'Basic domain checks', 'Limited reporting'] },
  { name: 'Pro', price: '₹100', description: 'For daily public intelligence workflows.', features: ['Unlimited searches', 'Advanced reporting', 'Priority support'], highlight: true },
  { name: 'Business', price: '₹200', description: 'Built for teams and agencies.', features: ['Team workspace', 'Export controls', 'Custom risk views'] }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Pricing</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Simple pricing, clear value</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-3xl border p-6 ${plan.highlight ? 'border-accent/60 bg-accent/5 shadow-glow' : 'border-white/10 bg-slate-950/60'}`}>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">{plan.name}</p>
            <p className="mt-4 text-4xl font-bold text-white">{plan.price}<span className="text-base text-muted">/mo</span></p>
            <p className="mt-2 text-muted">{plan.description}</p>
            <ul className="mt-6 space-y-3 text-sm text-text">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Link href="/login" className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-3 font-semibold ${plan.highlight ? 'bg-accent text-slate-950' : 'border border-white/10 text-text'}`}>
              Get started
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
