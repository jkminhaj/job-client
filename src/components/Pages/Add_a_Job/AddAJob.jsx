import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../../../AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AddAJob = () => {
  const [deadline, setDeadline] = useState(null);
  const [postingDate, setPostingDate] = useState(null);
  const { user } = useContext(AuthContext);
  const [loading ,setLoading] = useState(false);

  const handleAdd = e => {
    e.preventDefault();
    const form = e.target;
    const salary = form.salary.value;
    const salaryArray = salary.split('-');
    const salary_range = [parseInt(salaryArray[0]), parseInt(salaryArray[1])];
    const newJob = {
      name: form.name.value,
      job_title: form.title.value,
      job_banner: form.banner.value,
      company_logo: form.logo.value,
      job_applicants_number: parseInt(form.applicants.value),
      description: form.description.value,
      job_category: form.category.value,
      email: user.email,
      salary_range,
      job_posting_date: format(postingDate, 'yyyy-MM-dd'),
      application_deadline: format(deadline, 'yyyy-MM-dd'),
    };
    setLoading(true);
    fetch('https://job-server-tau.vercel.app/all_jobs', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newJob),
    }).then(r => r.json()).then(data => {
      if (data.acknowledged) {
        Swal.fire({ position: "top-middle", icon: "success", title: "Job posted!", showConfirmButton: false, timer: 1500 });
        form.reset(); setDeadline(null); setPostingDate(null);
      }
      setLoading(false);
    });
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto py-10">
      <Helmet><title>Remoto | Post a Job</title></Helmet>

      <div className="mb-8">
        <p className="section-label">Hiring</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Post a job</h1>
        <p className="text-slate-500">Reach thousands of qualified candidates today.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-9 animate-fade-up">
        <form onSubmit={handleAdd} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Company Name</label>
              <input required type="text" name="name" className="input-clean" defaultValue={user?.displayName} placeholder="Recruiter name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Title</label>
              <input required type="text" name="title" className="input-clean" placeholder="e.g. Senior React Developer" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Banner Image URL</label>
              <input required type="url" name="banner" className="input-clean" placeholder="https://…" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Company logo URL</label>
              <input required type="url" name="logo" className="input-clean" placeholder="https://…" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Description</label>
            <textarea required name="description" className="input-clean resize-none" rows={4} placeholder="Describe the role, responsibilities, and requirements…" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Salary Range</label>
              <input required type="text" name="salary" className="input-clean" placeholder="e.g. 60000-90000" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Category</label>
              <select required name="category" className="input-clean">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Part-Time">Part-Time</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Initial Applicants</label>
              <input required type="number" name="applicants" className="input-clean" defaultValue="0" min="0" />
            </div>
          </div>

          {/* Row 4 — dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Posting Date</label>
              <DatePicker
                required
                placeholderText="Select posting date"
                className="input-clean"
                selected={postingDate}
                onChange={setPostingDate}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Application Deadline</label>
              <DatePicker
                required
                placeholderText="Select deadline"
                className="input-clean"
                selected={deadline}
                onChange={setDeadline}
              />
            </div>
          </div>

          <p className="text-xs text-slate-400">
            By posting this job, you agree to Remoto's{" "}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">{loading ? "Posting ..":"Post Job →"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddAJob;
