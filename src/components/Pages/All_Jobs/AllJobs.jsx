import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../../AuthProvider";

const CATEGORY_BADGE = {
  Remote:      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Hybrid:      "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  "Part-Time": "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  "On-Site":   "bg-stone-100 text-stone-600 ring-1 ring-stone-200",
};

const CATEGORY_DOT = {
  Remote:      "bg-emerald-500",
  Hybrid:      "bg-blue-500",
  "Part-Time": "bg-violet-500",
  "On-Site":   "bg-stone-400",
};

const CATEGORIES = ["All", "Remote", "Hybrid", "On-Site", "Part-Time"];

const CompanyLogo = ({ src, name }) => {
  const [err, setErr] = useState(false);
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-12 h-12  flex-shrink-0 flex items-center justify-center overflow-hidden">
      {src && !err ? (
        <img
          src={src}
          alt={name}
          onError={() => setErr(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm font-bold text-slate-400 tracking-tight">
          {initials}
        </span>
      )}
    </div>
  );
};

const JobRow = ({ info, index }) => {
  const navigate = useNavigate();
  const badgeCls = CATEGORY_BADGE[info.job_category] || "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  const dotCls   = CATEGORY_DOT[info.job_category]   || "bg-slate-400";

  const deadlineDate = new Date(info.application_deadline);
  const daysLeft     = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
  const isUrgent     = daysLeft <= 7 && daysLeft > 0;
  const isExpired    = daysLeft <= 0;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all duration-150"
      style={{ animation: `fadeUp 0.35s ${index * 60}ms both ease-out` }}
    >
      
      <CompanyLogo src={info.company_logo} name={info.name} />

     
      <div className="flex-1 min-w-0">
      
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className={`inline-flex items-center gap-1.5 text-[11px]  px-2.5 py-1 rounded-full ${badgeCls}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotCls}`} />
            {info.job_category}
          </span>

          {isUrgent && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-200">
              ⚡ Urgent · {daysLeft}d left
            </span>
          )}

          {isExpired && (
            <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600 ring-1 ring-red-200">
              Expired
            </span>
          )}
        </div>

        {/* Title & company */}
        <h3 className="font-semibold text-slate-900 text-[15px] truncate leading-snug mb-0.5 tracking-tight">
          {info.job_title}
        </h3>
        <p className="text-sm text-slate-400 truncate mb-2">{info.name}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {info.salary_range[0]}–{info.salary_range[1]}
            <span className="text-slate-300">/yr</span>
          </span>

          <span className={`flex items-center gap-1 text-xs ${isExpired ? "text-red-400" : isUrgent ? "text-amber-500" : "text-slate-400"}`}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isExpired ? "Expired" : `Deadline: ${info.application_deadline}`}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/singlejobdetails/${info._id}`)}
        className="group flex-shrink-0 flex items-center justify-center sm:justify-start gap-2 btn-outline text-sm py-2 px-4"
      >
        Details
        <svg
          className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
          fill="none" viewBox="0 0 16 16" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
};

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl">
    <div className="w-12 h-12 rounded-xl bg-slate-100 animate-pulse flex-shrink-0" />
    <div className="flex-1 space-y-2.5">
      <div className="h-4 w-20 bg-slate-100 rounded-full animate-pulse" />
      <div className="h-4 w-3/5 bg-slate-100 rounded-lg animate-pulse" />
      <div className="h-3 w-2/5 bg-slate-100 rounded-lg animate-pulse" />
      <div className="h-3 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
    </div>
    <div className="hidden sm:block h-10 w-24 bg-slate-100 rounded-xl animate-pulse flex-shrink-0" />
  </div>
);

const EmptyState = ({ query }) => (
  <div className="flex flex-col items-center py-20 text-center">
    <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
      <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="11" cy="11" r="8" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M21 21l-4.35-4.35" />
      </svg>
    </div>
    <p className="text-base font-bold text-slate-700 mb-1.5">No results found</p>
    <p className="text-sm text-slate-400 max-w-xs">
      {query
        ? `No jobs matching "${query}". Try a different keyword.`
        : "No jobs in this category yet. Check back soon."}
    </p>
  </div>
);

const AllJobs = () => {
  const [allJobs, setAllJobs]               = useState([]);
  const [filteredJobs, setFilteredJobs]     = useState([]);
  const [displayedJobs, setDisplayedJobs]   = useState([]);
  const [inputVal, setInputVal]             = useState("");
  const [search, setSearch]                 = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading]               = useState(true);
  const [itemsToShow, setItemsToShow]       = useState(6);
  const { user } = useContext(AuthContext);

  /* Fetch */
  useEffect(() => {
    setLoading(true);
    fetch("https://job-server-tau.vercel.app/all_jobs")
      .then((r) => r.json())
      .then((data) => { setAllJobs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  /* Filter */
  useEffect(() => {
    let jobs = [...allJobs];

    if (search) {
      const q = search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.job_title.toLowerCase().includes(q) ||
          j.name.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "All") {
      jobs = jobs.filter((j) => j.job_category === categoryFilter);
    }

    setFilteredJobs(jobs);
    setDisplayedJobs(jobs.slice(0, itemsToShow));
  }, [search, categoryFilter, allJobs, itemsToShow]);

  const handleSearch  = () => setSearch(inputVal.trim());
  const handleClear   = () => { setSearch(""); setInputVal(""); };
  const handleSeeMore = () => setItemsToShow((p) => p + 6);
  const handleKey     = (e) => { if (e.key === "Enter") handleSearch(); };

  return (
    <div  className="w-11/12 max-w-6xl mx-auto py-10">
      <Helmet><title>Remoto | All Jobs</title></Helmet>

      {/* Stagger animation keyframe */}
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header */}
      <div className="mb-8">
        
        <p className="section-label">Browse openings</p>
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">All open positions</h1>
        <p className="text-slate-500 text-[15px]">
          Find your next role from our full list of opportunities.
        </p>
      </div>

      
      <div className="flex gap-2 flex-wrap items-center mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search by title or company…"
            className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-300 transition-colors "
          />
        </div>

        <button
          onClick={handleSearch}
          className="h-11 px-5 rounded-xl btn-primary text-white text-sm font-semibold  transition-colors"
        >
          Search
        </button>

        {(search || inputVal) && (
          <button
            onClick={handleClear}
            className="h-11 px-4 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategoryFilter(cat); setItemsToShow(6); }}
            className={`h-8 px-4 rounded-full text-[13px] border transition-all duration-150
              ${categoryFilter === cat
                ? "bg-blue-600 text-white "
                : "bg-white text-slate-500 hover:bg-gray-50 hover:text-slate-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

     
      {!loading && (
        <p className="text-xs text-slate-400 mb-4">
          Showing{" "}
          <span className="font-semibold text-slate-500">{displayedJobs.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-500">{filteredJobs.length}</span>{" "}
          position{filteredJobs.length !== 1 ? "s" : ""}
          {search && (
            <> for &ldquo;<span className="text-slate-600">{search}</span>&rdquo;</>
          )}
        </p>
      )}

    
      <div className="flex flex-col gap-3">
        {loading
          ? [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
          : displayedJobs.length === 0
            ? <EmptyState query={search} />
            : displayedJobs.map((job, i) => (
                <JobRow key={job._id} info={job} index={i} />
              ))
        }
      </div>

      
      {!loading && displayedJobs.length < filteredJobs.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeMore}
            className="h-11 px-8 rounded-full border border-slate-200 text-sm text-slate-500 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all duration-150"
          >
            Show more · {filteredJobs.length - displayedJobs.length} remaining
          </button>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
