import { useState } from "react";

const stats = [
  { value: "12,400+", label: "Active Jobs" },
  { value: "3,200+", label: "Companies" },
  { value: "98%", label: "Satisfaction" },
  { value: "48h", label: "Avg. Response" },
];

const categories = ["Remote", "Hybrid", "On-Site", "Part-Time", "Full-Time", "Freelance"];

const Banner = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E2E8F0 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }}
      />
      {/* Gradient blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />

      <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-6 justify-between">
        {/* Left */}
        <div className="flex-1 max-w-xl animate-fade-up">
          <div className="flex items-center gap-2 mb-5">
            <span className="live-dot" />
            <span className="text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              New jobs added daily
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.1] font-bold text-slate-900 mb-5">
            Find work that
            <span className="block" style={{ color: "var(--blue)" }}>fits your life.</span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Explore thousands of roles across remote, hybrid, and on-site positions. Your next opportunity is one search away.
          </p>

          {/* Email subscribe */}
          {subscribed ? (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 animate-fade-in">
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium text-emerald-700">You're subscribed! We'll send you the best jobs.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 animate-fade-up stagger-2">
              <input
                type="email"
                className="input-clean flex-1 min-w-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary shrink-0">Subscribe</button>
            </form>
          )}

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-6 animate-fade-up stagger-3">
            <span className="text-xs text-slate-400 mt-1 mr-1">Browse:</span>
            {categories.map((c) => (
              <a key={c} href="/alljobs"
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                {c}
              </a>
            ))}
          </div>
        </div>

        {/* Right - illustration / stats card */}
        <div className="flex-1 flex justify-center lg:justify-end animate-fade-up stagger-2 w-full max-w-lg">
          <div className="relative w-full">
            {/* Main card */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=700&auto=format&fit=crop&q=80"
                alt="Team at work"
                className="w-full h-56 sm:h-72 object-cover"
              />
              <div className="bg-white p-5">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="text-center p-3 rounded-xl bg-slate-50">
                      <p className="font-display text-2xl font-bold text-blue-600">{value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 animate-float hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">247 applied today</p>
                <p className="text-xs text-slate-400">+12% from yesterday</p>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute -bottom-2 right-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 animate-float hidden sm:flex items-center gap-2.5" style={{animationDelay:'1s'}}>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Hired in 5 days</p>
                <p className="text-xs text-slate-400">Remote · $95k/yr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="mt-16 overflow-hidden -mx-4 sm:-mx-8">
        <div className="flex gap-6 py-3 px-4" style={{maskImage:'linear-gradient(to right,transparent,black 10%,black 90%,transparent)'}}>
          <div className="marquee-track">
            {[...Array(2)].flatMap(() => [
              "💳 Stripe","🌍 Airbnb","⚡ Vercel","🔷 Microsoft","🎵 Spotify","🛒 Shopify",
              "☁️ Cloudflare","🚀 SpaceX","🤖 OpenAI",
            ]).map((c, i) => (
              <span key={i} className="stat-chip font-medium text-slate-600">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
