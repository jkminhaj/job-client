import { useContext, useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const categoryBadge = {
  Remote: "badge-remote", Hybrid: "badge-hybrid",
  "Part-Time": "badge-parttime", "On-Site": "badge-onsite",
};

const SuggestedCard = ({ job }) => (
  <Link to={`/singlejobdetails/${job._id}`} className="block">
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition group cursor-pointer">
      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
        {job.company_logo
          ? <img src={job.company_logo} alt={job.name} className="w-full h-full object-cover" />
          : <span className="text-base">💼</span>}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm text-slate-800 line-clamp-1 group-hover:text-blue-600 transition">{job.job_title}</p>
        <p className="text-xs text-slate-500 truncate">{job.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">${job.salary_range[0]}–${job.salary_range[1]}/yr</p>
      </div>
    </div>
  </Link>
);

const SingleJobDetails = () => {
  const {
    _id, name, job_title, job_posting_date, application_deadline,
    salary_range, job_applicants_number, company_logo, job_banner,
    description, job_category, email,
  } = useLoaderData();

  const { user } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const badge = categoryBadge[job_category] || "badge-default";
  const deadlineDate = new Date(application_deadline);
  const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000*60*60*24));
  const isUrgent = daysLeft <= 7 && daysLeft > 0;
  const isExpired = daysLeft <= 0;

  // Fetch suggestions
  useEffect(() => {
    fetch("https://job-server-tau.vercel.app/all_jobs_public")
      .then(r => r.json())
      .then(d => setSuggestions(d.filter(j => j._id !== _id && j.job_category === job_category).slice(0, 4)))
      .catch(() => {});
  }, [_id, job_category]);

  const handleApply = e => {
    e.preventDefault();
    const form = e.target;
    const formEmail = form.email.value;
    const resume = form.resume.value;
    const deadline = new Date(application_deadline);
    let today = new Date(); today.setHours(0,0,0,0);

    const postData = { email: formEmail, resume, job_id: _id, job_category, salary_range, job_title, name, job_posting_date };

    if (user.email === email) { setErr("You cannot apply to your own job!"); setTimeout(()=>setErr(""),3000); return; }
    if (deadline < today) { setErr("Sorry, the deadline has passed!"); setTimeout(()=>setErr(""),3000); return; }

    fetch(`https://job-server-tau.vercel.app/all_applications?jobId=${_id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(postData),
    }).then(r => r.json()).then(data => {
      if (data.acknowledged) {
        setModalOpen(false);
        Swal.fire({ position:"top-middle", icon:"success", title:"Application submitted!", showConfirmButton:false, timer:1500 });
        form.reset();
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10">
      <Helmet><title>Remoto | {job_title}</title></Helmet>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main */}
        <div className="flex-1 min-w-0">
          

          {/* Job header card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 mb-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                  {company_logo
                    ? <img src={company_logo} alt={name} className="w-full h-full object-cover" />
                    : <span className="text-2xl">🏢</span>}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{name}</p>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">{job_title}</h1>
                </div>
              </div>
              <span className={`badge-cat ${badge} self-start`}>{job_category}</span>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="stat-chip">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>${salary_range[0]}–${salary_range[1]} /yr</span>
              </div>
              <div className="stat-chip">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {job_applicants_number} applicants
              </div>
              <div className={`stat-chip ${isExpired ? "text-red-500 bg-red-50 border-red-200" : isUrgent ? "text-orange-500 bg-orange-50 border-orange-200" : ""}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {isExpired ? "Expired" : `Deadline: ${application_deadline}${isUrgent ? ` (${daysLeft}d left)` : ""}`}
              </div>
              <div className="stat-chip">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Posted: {job_posting_date}
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              disabled={isExpired}
              className={`btn-primary text-sm py-2.5 px-8 ${isExpired ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {isExpired ? "Deadline Passed" : "Apply Now →"}
            </button>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Job Description</h2>
            <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
          </div>
        </div>

        {/* Sidebar — suggestions */}
        {suggestions.length > 0 && (
          <div className="xl:w-72 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-semibold text-slate-900 mb-1 text-sm">Similar {job_category} Jobs</h3>
                <p className="text-xs text-slate-400 mb-4">You might also like these</p>
                <div className="space-y-1">
                  {suggestions.map(j => <SuggestedCard key={j._id} job={j} />)}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link to="/alljobs">
                    <button className="btn-outline w-full text-xs py-2">Browse all jobs →</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={e => { if(e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md animate-fade-up">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">Apply for this role</h3>
            <p className="text-sm text-slate-500 mb-6">{job_title} · {name}</p>
            <form onSubmit={handleApply} className="space-y-3">
              <input type="text" name="name" required defaultValue={user?.displayName} className="input-clean" placeholder="Full Name" />
              <input type="email" name="email" readOnly defaultValue={user?.email} className="input-clean bg-slate-50" />
              <input type="url" required name="resume" className="input-clean" placeholder="Resume / Portfolio URL" />
              {err && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{err}</p>}
              <button type="submit" className="btn-primary w-full py-3 mt-2">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleJobDetails;
