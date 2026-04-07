import { Helmet } from "react-helmet-async";
import { useState } from "react";

const articles = [
  {
    id: 1,
    category: "Security",
    tag: "Technical",
    title: "Access tokens & refresh tokens: how they work and where to store them",
    excerpt: "An access token is a credential used to access protected resources with a limited lifetime. Understanding how these work together is crucial for any developer building secure applications.",
    body: [
      { heading: "What is an Access Token?", color: "text-blue-700", content: "An access token is a credential used to access protected resources. It usually has a limited lifetime, ensuring that if intercepted, it won't be valid forever. Access tokens can come in various forms: cryptographic keys, token strings, or token handles." },
      { heading: "What is a Refresh Token?", color: "text-blue-700", content: "A refresh token obtains a renewed access token when the current one expires. This is helpful because it allows the client to get a new access token without prompting the user for their credentials again, enabling seamless session management." },
      { heading: "Where to Store Them?", color: "text-blue-500", content: "On the client side, access tokens should be stored in memory and not persisted between sessions to prevent access by malicious scripts. Refresh tokens should be stored securely in HttpOnly cookies — not accessible via JavaScript — to protect against XSS attacks." },
    ],
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&auto=format&fit=crop&q=75",
    author: "Javed Khan",
    date: "Nov 6, 2023",
    readTime: "5 min",
  },
  {
    id: 2,
    category: "Backend",
    tag: "Framework",
    title: "NestJS vs ExpressJS: which should you use for your next project?",
    excerpt: "Both are popular Node.js frameworks for building web applications, but they take very different approaches. Here's what you need to know to make the right choice.",
    body: [
      { heading: "NestJS", color: "text-blue-700", content: "NestJS is an opinionated framework with a strong set of conventions and best practices. This makes it easier to learn and leads to more maintainable code at scale. However, it can be less flexible than other frameworks for highly custom use cases." },
      { heading: "ExpressJS", color: "text-blue-700", content: "Express is an unopinionated framework that doesn't impose any particular structure on your code. This makes it more flexible but can also make large codebases harder to maintain. It's lightweight, widely used, and has massive community support." },
      { heading: "Which to choose?", color: "text-blue-500", content: "Choose NestJS for large enterprise applications that benefit from structure and TypeScript-first development. Choose Express for small-to-medium APIs, microservices, or when you want maximum control over your architecture." },
    ],
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=700&auto=format&fit=crop&q=75",
    author: "Nami Mali",
    date: "Oct 25, 2023",
    readTime: "7 min",
  },
  {
    id: 3,
    category: "Career",
    tag: "Guide",
    title: "Building this project: full stack overview from client to database",
    excerpt: "A quick look at every layer of the Remoto platform — from the React frontend to the MongoDB-backed API — and the decisions that shaped it.",
    body: [
      { heading: "Client Side", color: "text-blue-700", content: "The frontend uses React for its component-based approach. Tailwind CSS and DaisyUI handle styling and responsiveness. Framer Motion adds smooth animations throughout the interface. React Router manages navigation, while React Helmet keeps SEO metadata organized." },
      { heading: "Server Side", color: "text-blue-700", content: "The backend runs on Node.js with Express.js as the API framework. CORS middleware ensures seamless cross-origin resource sharing. JSON Web Tokens (JWTs) handle secure user authentication. The server is deployed on Vercel's serverless infrastructure for automatic scaling." },
      { heading: "Database", color: "text-blue-500", content: "MongoDB stores data in flexible JSON-like documents. It provides a powerful, scalable solution for managing job listings, applications, and user data. JWT verification ensures that only authorized users can access their own job data and application history." },
    ],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&auto=format&fit=crop&q=75",
    author: "James Rou",
    date: "Jan 12, 2023",
    readTime: "4 min",
  },
  {
    id: 4,
    category: "Frontend",
    tag: "Best Practices",
    title: "Optimizing React apps: performance tips every developer should know",
    excerpt:
      "React is fast by default, but large applications can still slow down. Here are the techniques that keep your UI snappy and smooth.",
    body: [
      {
        heading: "Avoid Unnecessary Re-renders",
        color: "text-blue-700",
        content:
          "Use React.memo, useCallback, and useMemo to prevent components from re-rendering when their props haven't changed. This reduces wasted renders and improves responsiveness.",
      },
      {
        heading: "Code Splitting",
        color: "text-blue-700",
        content:
          "Using dynamic imports allows you to load only the code needed for the current page. This improves initial page load times and is easy to set up with React.lazy and Suspense.",
      },
      {
        heading: "Use the Right State Management",
        color: "text-blue-500",
        content:
          "Keep local UI state inside components and move global data to state managers like Zustand or React Query. This avoids prop drilling and reduces complexity.",
      },
    ],
    img:
      "https://images.unsplash.com/photo-1580894908361-967195033215?w=700&auto=format&fit=crop&q=75",
    author: "Maria Dev",
    date: "Feb 1, 2024",
    readTime: "6 min",
  },

  {
    id: 5,
    category: "Database",
    tag: "Comparison",
    title: "MongoDB vs PostgreSQL: choosing the right database for your project",
    excerpt:
      "Both are powerful databases, but they shine in different scenarios. Understanding the differences helps you avoid future scalability issues.",
    body: [
      {
        heading: "MongoDB",
        color: "text-blue-700",
        content:
          "MongoDB is a NoSQL database that stores unstructured JSON-like documents. It’s ideal for flexible schemas, rapid development, and applications where data shapes evolve over time.",
      },
      {
        heading: "PostgreSQL",
        color: "text-blue-700",
        content:
          "PostgreSQL is a relational database known for strong consistency, reliability, and advanced SQL features. Perfect for systems requiring strict data validation and transactions.",
      },
      {
        heading: "Which to Use?",
        color: "text-blue-500",
        content:
          "Choose MongoDB when your data is dynamic and you want developer flexibility. Pick PostgreSQL for financial systems, analytics, or any project that prioritizes strict structure.",
      },
    ],
    img:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=75",
    author: "Samuel Lee",
    date: "Mar 10, 2023",
    readTime: "8 min",
  },

  {
    id: 6,
    category: "DevOps",
    tag: "Tools",
    title: "Why CI/CD matters: automating deployments the right way",
    excerpt:
      "Modern development teams rely on CI/CD pipelines to deliver updates quickly and reliably. Here’s why it matters and how to use it effectively.",
    body: [
      {
        heading: "Continuous Integration",
        color: "text-blue-700",
        content:
          "CI helps ensure that every code change is tested automatically. This prevents broken builds from making their way into production and improves team collaboration.",
      },
      {
        heading: "Continuous Deployment",
        color: "text-blue-700",
        content:
          "CD automates the release process, enabling updates to go live without manual intervention. This reduces human error and streamlines delivery.",
      },
      {
        heading: "Choosing a CI/CD Tool",
        color: "text-blue-500",
        content:
          "GitHub Actions, GitLab CI, and Jenkins are popular choices. Select a tool that integrates well with your codebase, hosting provider, and workflow.",
      },
    ],
    img:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=75",
    author: "Lina Shore",
    date: "May 14, 2023",
    readTime: "6 min",
  },

  {
    id: 7,
    category: "Cloud",
    tag: "Infrastructure",
    title: "Serverless vs traditional servers: which architecture fits your app?",
    excerpt:
      "Serverless platforms like Vercel and AWS Lambda simplify scaling, but they aren’t for every use case. Here’s how they compare.",
    body: [
      {
        heading: "Serverless",
        color: "text-blue-700",
        content:
          "Serverless computing runs your code on-demand and scales automatically. It reduces infrastructure overhead but isn't ideal for long-running tasks or persistent connections.",
      },
      {
        heading: "Traditional Servers",
        color: "text-blue-700",
        content:
          "With full control of your server, you can customize environment, memory limits, and long-running jobs. However, scaling requires more manual management.",
      },
      {
        heading: "Which to Choose?",
        color: "text-blue-500",
        content:
          "Use serverless for APIs, short jobs, and modern web apps. Choose traditional servers for heavy computation, streaming, or complex custom workloads.",
      },
    ],
    img:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=75",
    author: "Alex Morgan",
    date: "Apr 2, 2024",
    readTime: "5 min",
  },
];

const tagColors = {
  Technical: "bg-blue-50 text-blue-700",
  Framework: "bg-violet-50 text-violet-700",
  Guide: "bg-emerald-50 text-emerald-700",
};

const ArticleCard = ({ article, onClick }) => (
  <div
    onClick={onClick}
    className="blog-card cursor-pointer flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-all group animate-fade-up"
  >
    <div className="sm:w-56 h-44 sm:h-auto overflow-hidden shrink-0">
      <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[article.tag] || "bg-slate-50 text-slate-600"}`}>{article.tag}</span>
        <span className="text-xs text-slate-400">{article.readTime} read</span>
      </div>
      <h2 className="font-display font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{article.title}</h2>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{article.excerpt}</p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">{article.author}</p>
            <p className="text-xs text-slate-400">{article.date}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-blue-600 group-hover:underline">Read →</span>
      </div>
    </div>
  </div>
);

const ArticleModal = ({ article, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mt-10 mb-10 animate-fade-up overflow-hidden">
      <div className="h-52 overflow-hidden">
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 sm:p-8">
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[article.tag] || ""}`}>{article.tag}</span>
          <span className="text-xs text-slate-400">· {article.readTime} read</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 leading-tight">{article.title}</h2>
        <p className="text-slate-500 text-sm mb-6">{article.excerpt}</p>
        <div className="space-y-5">
          {article.body.map((section, i) => (
            <div key={i}>
              <h3 className={`text-xl font-bold mb-2 font-display ${section.color}`}>{section.heading}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-8 pt-5 border-t border-slate-100">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{article.author}</p>
            <p className="text-xs text-slate-400">{article.date}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Blogs = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-11/12 max-w-4xl mx-auto py-10">
      <Helmet><title>Remoto | Blog</title></Helmet>

      <div className="mb-10">
        <p className="section-label">Insights</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Remoto Blog</h1>
        <p className="text-slate-500 max-w-lg">Guides, technical deep-dives, and career advice for modern professionals.</p>
      </div>

      <div className="space-y-5">
        {articles.map(a => (
          <ArticleCard key={a.id} article={a} onClick={() => setSelected(a)} />
        ))}
      </div>

      {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Blogs;
