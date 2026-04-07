const reviews = [
  {
    name: "Sarah Chen",
    role: "UX Designer @ Figma",
    avatar: "https://content.linkedin.com/content/dam/itlist/apac/Students/kanchan.jpg",
    text: "Found my dream remote role in under a week. The job cards are clean and the application process was genuinely the smoothest I've ever experienced.",
    rating: 4,
  },
  {
    name: "Marcus Williams",
    role: "Backend Engineer @ Stripe",
    avatar: "https://images.squarespace-cdn.com/content/v1/61f6bd2477535b44b9695f14/1773703339872-6TIGY8H7PBEIAZBT77Q4/Personal-Branding-Photography-004.jpg",
    text: "I was tired of monster job boards drowning me in irrelevant listings. Remoto's filters actually work and the salary transparency is a game-changer.",
    rating: 3,
  },
  {
    name: "Priya Nair",
    role: "Product Manager @ Shopify",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEwDJquZnPUKg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726142277206?e=2147483647&v=beta&t=JMuv4NK98AaFAvXCOMNLd5h6CVSjQDyA3VQxGm6zYME",
    text: "The hybrid job filter saved me so much time. Landed two interviews in the first three days of using the platform. Really loved this platform , going to share with friends",
    rating: 4,
  },
];

const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[...Array(n)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => (
  <section className="py-12">
    <div className="text-center mb-10">
      <p className="section-label">Social proof</p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">What job seekers say</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {reviews.map((r, i) => (
        <div
          key={r.name}
          className={`p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all duration-300 animate-fade-up`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <Stars n={r.rating} />
          <p className="text-slate-700 text-sm leading-relaxed mt-3 mb-5">"{r.text}"</p>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full bg-slate-100" />
            <div>
              <p className="font-semibold text-sm text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-500">{r.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
