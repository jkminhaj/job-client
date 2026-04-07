import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider";
import { Helmet } from "react-helmet-async";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./my_pdf/PDF";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const categoryBadge = {
  Remote: "badge-remote", Hybrid: "badge-hybrid",
  "Part-Time": "badge-parttime", "On-Site": "badge-onsite",
};

const Applied_Jobs = () => {
  const [data, setData] = useState([]);
  const [catego, setCatego] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://job-server-tau.vercel.app/all_applications?category=${catego}&email=${user.email}`, { credentials: "include" })
      .then(r => r.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [catego]);


  if (loading) {
    return (
      <div className="w-11/12 max-w-6xl mx-auto py-10">
        <Helmet><title>Remoto | Applied Jobs</title></Helmet>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="section-label">Tracker</p>
            <h1 className="font-display text-3xl font-bold text-slate-900">My applications</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2 opacity-50 cursor-not-allowed">
              <FontAwesomeIcon icon={faFileDownload} />
              Export
            </button>
            <select className="input-clean w-auto text-sm py-2 px-3 opacity-50 cursor-not-allowed">
              <option>All types</option>
            </select>
          </div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Company", "Job Title", "Posted", "Salary", "Category", "Status"].map((h, i) => (
                    <th key={i} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      <div className="h-3 bg-slate-200 rounded w-16" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className={`h-4 bg-slate-200 rounded w-full max-w-[${j === 1 ? '200px' : '80px'}]`} />
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
      <Helmet><title>Remoto | Applied Jobs</title></Helmet>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="section-label">Tracker</p>
          <h1 className="font-display text-3xl font-bold text-slate-900">My applications</h1>
        </div>
        <div className="flex items-center gap-3">
          {data.length > 0 && (
            <PDFDownloadLink document={<PDF name={user.displayName} data={data} />} fileName="applied-jobs-remoto.pdf">
              <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faFileDownload} />
                Export
              </button>
            </PDFDownloadLink>
          )}
          <select
            onChange={e => setCatego(e.target.value)}
            className="input-clean w-auto text-sm py-2 px-3"
          >
            <option value="">All types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Part-Time">Part-Time</option>
            <option value="On-Site">On-Site</option>
          </select>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-5"></div>
          <p className="font-display text-xl font-semibold text-slate-700 mb-2">No applications yet</p>
          <p className="text-slate-400 text-sm mb-6">Start exploring open positions and apply today.</p>
          <a href="/alljobs"><button className="btn-primary">Browse jobs →</button></a>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Company", "Job Title", "Posted", "Salary", "Category", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((info, i) => {
                  const badge = categoryBadge[info.job_category] || "badge-default";
                  return (
                    <tr key={info._id} className="border-b border-slate-50 hover:bg-slate-50 transition animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                      <td className="px-4 py-3.5 font-semibold text-slate-900 whitespace-nowrap">{info.name}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-slate-700 max-w-[200px] truncate">{info.job_title}</p>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{info.job_posting_date}</td>
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        ${info.salary_range[0]}–${info.salary_range[1]}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`badge-cat ${badge}`}>{info.job_category}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Under Review
                        </span>
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

export default Applied_Jobs;
