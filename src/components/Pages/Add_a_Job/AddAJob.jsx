import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AddAJob = () => {
    const [deadline, setDeadline] = useState(null);
    const [postingDate, setPostingDate] = useState(null);
    //   console.log(startDate)
    //   console.log(format(startDate, 'yyyy-MM-dd'));
    const jobInfo = {};
    //     //   Picture URL of the Job Banner,
    // - Job Title,
    // - Logged In User Name.
    // - Job Category ( For example: On Site, Remote, Part-Time, Hybrid)
    // - Salary range,
    // - Job Description,
    // - Job Posting Date
    // - Application Deadline Use the [Date Picker Package]
    // - Job Applicants Number(by default it will be 0)


    //   Backend work
    const handleAdd = e => {
        e.preventDefault();
        const form = e.target;

        fetch('http://localhost:3000/all_jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(jobInfo)
        })
            .then((res) => {
                res.json()
            }).then(data => console.log(data));

    }
    return (
        <div>
            <div className="flex justify-center mt-16">
                <form onSubmit={handleAdd} className='md:border p-8'>
                    <div className='mb-5 flex justify-center'>
                        <div className='flex items-center gap-4'>
                        <p className='text-2xl text-center text-blue-400 font-semibold'>Hiring? Add Your Job Here </p>
                        <FontAwesomeIcon color="#0080FF" className='text-2xl' icon={faBriefcase} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:my-9 gap-2 mb-3">
                        <input type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="" placeholder="Name" />
                        <input type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="" placeholder="Job title" />
                        <input type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="" placeholder="Job banner url" />
                        <div className='relative'>
                            <input type="number" defaultValue='0' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="" />
                            <p className='absolute text-xs right-9 text-gray-300 top-4'>Applicants</p>
                        </div>
                        <input type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="" placeholder="Description" />
                        <input type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="" placeholder="Salary Range [00-00]" />
                        <select name="category" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded">
                            <option>Category</option>
                            <option value="Remote">Remote Jobs</option>
                            <option value="Hybrid">Hybrid Jobs</option>
                            <option value="Part-Time">Part Time Jobs</option>
                            <option value="On-Site">On Site Jobs</option>
                        </select>
                        <DatePicker placeholderText='Deadline' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" selected={deadline} onChange={(date) => setDeadline(date)} />
                        <DatePicker placeholderText='Posting Date' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" selected={postingDate} onChange={(date) => setPostingDate(date)} />
                    </div>
                    <p className="text-xs mb-1 mt-5 text-center">By posting this job , you agree to Remoto’s <span className="font-semibold text-blue-400">Terms of service</span>, <span className="font-semibold text-blue-400">Privacy Policy</span>, and <span className="font-semibold text-blue-400">Cookie Policy</span>.</p>
                    <button className="mt-5 w-full mb-2 border rounded-full py-3 bg-blue-400 text-white font-semibold hover:bg-blue-600">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddAJob;