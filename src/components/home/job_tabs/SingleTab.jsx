import { Link } from "react-router-dom";

const categoryBadge = {
  Remote: "badge-remote",
  Hybrid: "badge-hybrid",
  "Part-Time": "badge-parttime",
  "On-Site": "badge-onsite",
};

const categoryIcon = {
  Remote: "🌐",
  Hybrid: "🏠",
  "Part-Time": "⏰",
  "On-Site": "🏢",
};

const SingleTab = ({ job, index = 0 }) => {
  const {
    job_posting_date, application_deadline, _id,
    job_applicants_number, job_title, name,
    salary_range, job_category, company_logo,
  } = job;

  const [firstSalary, secondSalary] = salary_range || [0, 0];
  const badgeClass = categoryBadge[job_category] || "badge-default";
  const icon = categoryIcon[job_category] || "💼";

  const deadlineDate = new Date(application_deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isUrgent = daysLeft <= 7 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  const delayClass = `stagger-${Math.min((index % 6) + 1, 6)}`;

  return (
    <div className={`job-card animate-fade-up ${delayClass} flex flex-col h-full`}>
      {/* Top */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
            {company_logo ? (
              <img src={company_logo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">{icon}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 truncate">{name}</p>
            <h3 className="font-display font-semibold text-slate-900 text-base leading-tight line-clamp-2">{job_title}</h3>
          </div>
        </div>
        <span className={`badge-cat shrink-0 ${badgeClass}`}>{job_category}</span>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-1.5 mb-3">
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-semibold text-slate-700">
          {/* ${firstSalary.toLocaleString()}–${secondSalary.toLocaleString()} */}
          <span className="font-normal text-slate-500 text-xs ml-1">{firstSalary}-{secondSalary}</span>
          <span className="font-normal text-slate-500 text-xs ml-1">/yr</span>
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job_applicants_number} applied
        </span>
        <span className="text-slate-300">·</span>
        <span className={`flex items-center gap-1 font-medium ${isExpired ? "text-red-500" : isUrgent ? "text-orange-500" : "text-slate-500"}`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isExpired ? "Expired" : isUrgent ? `${daysLeft}d left` : application_deadline}
        </span>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-3 border-t border-slate-100">
        <Link to={`/singlejobdetails/${_id}`} className="block">
          <button className="btn-primary z-10 relative w-full text-sm py-2.5">View Details →</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleTab;
