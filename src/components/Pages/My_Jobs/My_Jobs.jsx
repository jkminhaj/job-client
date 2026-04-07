import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider";
import { Link } from "react-router-dom";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const categoryBadge = {
  Remote: "badge-remote", Hybrid: "badge-hybrid",
  "Part-Time": "badge-parttime", "On-Site": "badge-onsite",
};

const My_Jobs = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // start as true

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://job-server-tau.vercel.app/my_jobs?email=${user.email}`, { credentials: "include" })
      .then(r => r.json())
      .then(jobs => {
        setData(jobs);
        setLoading(false); // done loading
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleDelete = id => {
    Swal.fire({
      title: "Delete this job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete",
      borderRadius: "12px",
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://job-server-tau.vercel.app/all_jobs/${id}`, { method: "DELETE" })
          .then(r => r.json())
          .then(res => {
            if (res.acknowledged) {
              setData(data.filter(j => j._id !== id));
              Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
            }
          });
      }
    });
  };

  // Inside your My_Jobs component, replace the loading part with:

  if (loading) {
    return (
      <div className="w-11/12 max-w-6xl mx-auto py-10">
        <Helmet><title>Remoto | My Jobs</title></Helmet>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="section-label">Dashboard</p>
            <h1 className="font-display text-3xl font-bold text-slate-900">My posted jobs</h1>
          </div>
          <button className="btn-primary text-sm py-2.5 px-5 opacity-50 cursor-not-allowed">+ Post a Job</button>
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Job Title", "Category", "Salary", "Posted", "Deadline", "Applicants", "Actions"].map((h, i) => (
                    <th key={i} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      <div className="h-3 bg-slate-200 rounded w-16" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-200 rounded w-full max-w-[80px]" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-6xl mx-auto py-10">
      <Helmet><title>Remoto | My Jobs</title></Helmet>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="section-label">Dashboard</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">My posted jobs</h1>
        </div>
        <Link to="/addajob">
          <button className="btn-primary text-sm py-2.5 px-5">+ Post a Job</button>
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-5"></div>
          <p className="font-display text-xl font-semibold text-slate-700 mb-2">No jobs posted yet</p>
          <p className="text-slate-400 text-sm mb-6">Start hiring by posting your first job.</p>
          <Link to="/addajob"><button className="btn-primary">Post your first job →</button></Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Job Title", "Category", "Salary", "Posted", "Deadline", "Applicants", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((info, i) => {
                  const badge = categoryBadge[info.job_category] || "badge-default";
                  return (
                    <tr key={info._id} className={`border-b border-slate-50 hover:bg-slate-50 transition animate-fade-up`} style={{ animationDelay: `${i * 0.05}s` }}>
                      <td className="px-4 py-3.5">
                        <p className="text-slate-900 max-w-[180px] truncate">{info.job_title}</p>
                        <p className="text-xs text-slate-400">{info.name}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`badge-cat ${badge}`}>{info.job_category}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-700">
                        ${info.salary_range[0]}–${info.salary_range[1]}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{info.job_posting_date}</td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{info.application_deadline}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                          {info.job_applicants_number}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <Link to={`/updatejob/${info._id}`}>
                            <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition" title="Edit">
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(info._id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default My_Jobs;