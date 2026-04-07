import { useEffect, useState } from 'react';
import SingleTab from './SingleTab';
import { PiGlobeHemisphereEastFill , PiBuildingOfficeBold } from "react-icons/pi";
import { MdOutlineHomeWork } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";


const TABS = [
  { label: "All Jobs", key: null, icon: "✦" },
  { label: "Remote", key: "Remote", icon: <PiGlobeHemisphereEastFill /> },
  { label: "Hybrid", key: "Hybrid", icon: <MdOutlineHomeWork /> },
  { label: "Part-Time", key: "Part-Time", icon: <HiOutlineClock  /> },
  { label: "On-Site", key: "On-Site", icon: <PiBuildingOfficeBold/> },
];

const SkeletonCard = () => (
  <div className="job-card">
    <div className="flex gap-3 mb-3">
      <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1">
        <div className="skeleton h-3 w-24 mb-2" />
        <div className="skeleton h-4 w-40" />
      </div>
    </div>
    <div className="skeleton h-3 w-32 mb-3" />
    <div className="skeleton h-3 w-48 mb-4" />
    <div className="skeleton h-9 w-full mt-auto rounded-full" />
  </div>
);

const JobTabs = () => {
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://job-server-tau.vercel.app/all_jobs_public')
      .then(res => res.json())
      .then(data => { setJobs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const displayed = activeTab === 0
    ? jobs
    : jobs.filter(j => j.job_category === TABS[activeTab].key);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="section-label">Opportunities</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">Browse open positions</h2>
        </div>
        <a href="/alljobs" className="btn-outline text-sm py-2 px-4 shrink-0">View all →</a>
      </div>

      {/* Tab list */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
        {TABS.map((tab, i) => {
          const count = i === 0 ? jobs.length : jobs.filter(j => j.job_category === tab.key).length;
          return (
            <button
              key={tab.label}
              className={`tab-custom flex items-center gap-1.5 ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {!loading && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === i ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-display text-xl font-semibold text-slate-700">No jobs in this category</p>
          <p className="text-slate-400 mt-1">Try another tab or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.slice(0, 9).map((job, i) => (
            <SingleTab key={job._id} job={job} index={i} />
          ))}
        </div>
      )}

      {!loading && displayed.length > 9 && (
        <div className="text-center mt-8">
          <a href="/alljobs">
            <button className="btn-outline">
              See all {displayed.length} jobs →
            </button>
          </a>
        </div>
      )}
    </section>
  );
};

export default JobTabs;
