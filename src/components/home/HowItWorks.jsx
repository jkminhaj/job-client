const steps = [
  {
    n: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Search & Filter",
    desc: "Browse thousands of curated roles. Filter by type, salary, location, and more.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    n: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Create Your Profile",
    desc: "Set up your account in minutes. Showcase your skills and let employers find you.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    n: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Apply in Seconds",
    desc: "One-click apply with your saved profile. No repetitive forms, ever.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    n: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Get Hired",
    desc: "Hear back from employers fast. Track your applications in one clean dashboard.",
    color: "bg-amber-50 text-amber-600",
  },
];

const HowItWorks = () => (
  <section className="py-12">
    <div className="text-center mb-10">
      <p className="section-label">Process</p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">How Remoto works</h2>
      <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm">From first search to signed offer — we've made every step fast and painless.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {steps.map((s, i) => (
        <div
          key={s.n}
          className={`relative p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all duration-300 animate-fade-up`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
              {s.icon}
            </div>
            <span className="font-display text-3xl font-bold text-slate-100">{s.n}</span>
          </div>
          <h3 className="font-display font-semibold text-slate-900 mb-2">{s.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-slate-200 z-10" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
