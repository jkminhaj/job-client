import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    category: "Mental Health",
    title: "How to prioritize your mental health and overcome perfectionism at work",
    excerpt: "If you've ever felt yourself tensing up while staring down a deadline, you're not alone. Here's how top performers manage it.",
    author: "Javed Khan",
    date: "Nov 6, 2023",
    readTime: "5 min",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=75",
    href: "https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work/",
    color: "#10B981",
  },
  {
    id: 2,
    category: "Personal Brand",
    title: "14 tips for building an online personal brand to grow your career",
    excerpt: "Building your personal brand online is the single most impactful thing you can do for your professional life right now.",
    author: "Nami Mali",
    date: "Oct 25, 2023",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=75",
    href: "https://www.mereka.my/blog/personal-branding-action-plan",
    color: "#8B5CF6",
  },
  {
    id: 3,
    category: "Workplace",
    title: "Is your company monitoring you? 36% of employees are unsure",
    excerpt: "When asked in a recent poll on tracking at work, many employees admitted they didn't know if they were being watched.",
    author: "James Rou",
    date: "Jan 12, 2023",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=75",
    href: "https://fortune.com/2023/07/27/remote-workers-hate-being-spied-on-less-productive/",
    color: "#F59E0B",
  },
  {
    id: 4,
    category: "Career Growth",
    title: "Ask a therapist: How childhood experiences shape your career choices",
    excerpt: "Understanding your career patterns through a psychological lens can unlock your full professional potential.",
    author: "Naila Alia",
    date: "Feb 5, 2023",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&auto=format&fit=crop&q=75",
    href: "https://jiyan.org/psychotherapy/",
    color: "#EF4444",
  },
];

const Explore = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="section-label">From the blog</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">Explore on Remoto</h2>
        </div>
        <Link to="/blogs">
          <button className="btn-outline text-sm py-2 px-4 shrink-0">All articles →</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post, i) => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`blog-card flex flex-col animate-fade-up stagger-${i + 1}`}
          >
            <div className="overflow-hidden h-44 relative">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span
                className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: post.color }}
              >
                {post.category}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-display font-semibold text-slate-900 text-sm leading-snug mb-2 line-clamp-2 flex-1">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs font-semibold text-slate-700">{post.author}</p>
                  <p className="text-xs text-slate-400">{post.date}</p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{post.readTime} read</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Explore;
