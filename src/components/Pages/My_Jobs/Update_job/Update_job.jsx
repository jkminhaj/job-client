import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../../AuthProvider';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Update_job = () => {
  const job = useLoaderData();
  const { user } = useContext(AuthContext);
  const [deadline, setDeadline] = useState(new Date(job.application_deadline));
  const [postingDate, setPostingDate] = useState(new Date(job.job_posting_date));

  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const salary = form.salary.value;
    const salaryArray = salary.split('-');
    const salary_range = [parseInt(salaryArray[0]), parseInt(salaryArray[1])];

    const updatedJobInfo = {
      name: form.name.value,
      job_title: form.title.value,
      job_banner: form.banner.value,
      job_category: form.category.value,
      job_applicants_number: parseInt(form.applicants.value),
      description: form.description.value,
      salary_range,
      job_posting_date: format(postingDate, 'yyyy-MM-dd'),
      application_deadline: format(deadline, 'yyyy-MM-dd'),
    };

    fetch(`https://job-server-tau.vercel.app/all_jobs/${job._id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updatedJobInfo),
    }).then(r => r.json()).then(() => {
      Swal.fire({ position:"top-middle", icon:"success", title:"Job updated!", showConfirmButton:false, timer:1500 });
    });
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto py-10">
      <Helmet><title>Remoto | Update Job</title></Helmet>

      <div className="mb-8">
        <p className="section-label">Edit</p>
        <h1 className="font-display text-3xl font-bold text-slate-900">Update job listing</h1>
        <p className="text-slate-500 mt-1">{job.job_title}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-9 animate-fade-up">
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Company Name</label>
              <input required type="text" name="name" className="input-clean" defaultValue={user?.displayName} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Job Title</label>
              <input required type="text" name="title" className="input-clean" defaultValue={job.job_title} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Banner URL</label>
            <input required type="text" name="banner" className="input-clean" defaultValue={job.job_banner} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Description</label>
            <textarea required name="description" className="input-clean resize-none" rows={4} defaultValue={job.description} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Salary Range</label>
              <input required type="text" name="salary" className="input-clean" defaultValue={`${job.salary_range[0]}-${job.salary_range[1]}`} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Category</label>
              <select required name="category" className="input-clean" defaultValue={job.job_category}>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Part-Time">Part-Time</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Applicants</label>
              <input required type="number" name="applicants" className="input-clean" defaultValue={job.job_applicants_number} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Posting Date</label>
              <DatePicker required className="input-clean" selected={postingDate} onChange={setPostingDate} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Deadline</label>
              <DatePicker required className="input-clean" selected={deadline} onChange={setDeadline} />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3">Save Changes →</button>
        </form>
      </div>
    </div>
  );
};

export default Update_job;
