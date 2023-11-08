import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../../../AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AddAJob = () => {
    const [deadline, setDeadline] = useState(null);
    const [postingDate, setPostingDate] = useState(null);
    const { user } = useContext(AuthContext);


    //   Backend work
    const handleAdd = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const job_title = form.title.value;
        const job_banner = form.banner.value;
        const job_applicants_number = parseInt(form.applicants.value);
        const description = form.description.value;
        const job_category = form.category.value;
        const email = user.email;
        // All about salary
        let salary_range = [];
        const salary = form.salary.value;
        const salaryArray = salary.split('-');
        const [salary1, salary2] = salaryArray;
        const salary1num = parseInt(salary1);
        const salary2num = parseInt(salary2);
        salary_range.push(salary1num, salary2num);
        // Dates
        const job_posting_date = format(postingDate, 'yyyy-MM-dd');
        const application_deadline = format(deadline, 'yyyy-MM-dd');

        const newJob = {
            name, job_title,  job_banner, job_applicants_number, description, job_category, email, job_posting_date, application_deadline, salary_range
        }
        console.log(newJob)

        fetch('https://job-server-tau.vercel.app/all_jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newJob)
        }).then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    title: "Job Added",
                    showConfirmButton: false,
                    timer: 1500
                  });
                form.reset();
                setDeadline(null);
                setPostingDate(null);
            }
            })

    }
    return (
        <div>
            <Helmet>
                <title>Remoto | Add Job</title>
            </Helmet>
            <div className="flex justify-center mt-16">
                <form onSubmit={handleAdd} className='md:border rounded-lg p-8'>
                    <div className='mb-5 flex justify-center'>
                        <div className='flex items-center gap-4'>
                            <p className='text-2xl text-center text-blue-400 font-semibold'>Hiring? Add Your Job Here </p>
                            <FontAwesomeIcon color="#0080FF" className='text-2xl' icon={faBriefcase} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:my-9 gap-2 mb-3">
                        <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="name" defaultValue={user?.displayName} placeholder="Name" />
                        <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="title" placeholder="Job title" />
                        <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="banner" placeholder="Job banner url" />
                        <div className='relative'>
                            <input required type="number" defaultValue='0' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="applicants" />
                            <p className='absolute text-xs right-9 text-gray-300 top-4'>Applicants</p>
                        </div>
                        <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="description" placeholder="Description" />
                        <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="salary" placeholder="Salary Range  ex: 99-99" />
                        <select required name="category" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded">
                            <option value='Remote'>Category</option>
                            <option value="Remote">Remote Jobs</option>
                            <option value="Hybrid">Hybrid Jobs</option>
                            <option value="Part-Time">Part Time Jobs</option>
                            <option value="On-Site">On Site Jobs</option>
                        </select>
                        <DatePicker required placeholderText='Deadline' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" selected={deadline} onChange={(date) => setDeadline(date)} />
                        <DatePicker required placeholderText='Posting Date' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" selected={postingDate} onChange={(date) => setPostingDate(date)} />
                    </div>
                    <p className="text-xs mb-1 mt-5 text-center">By posting this job , you agree to Remoto’s <span className="font-semibold text-blue-400">Terms of service</span>, <span className="font-semibold text-blue-400">Privacy Policy</span>, and <span className="font-semibold text-blue-400">Cookie Policy</span>.</p>
                    <button className="mt-5 w-full mb-2 border rounded-full py-3 bg-blue-400 text-white font-semibold hover:bg-blue-600">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddAJob;