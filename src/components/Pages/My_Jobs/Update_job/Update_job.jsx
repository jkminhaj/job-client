import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../../AuthProvider';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Update_job = () => {
    
    // loaded values
    const { application_deadline, description, email, job_applicants_number, job_banner, job_category, job_posting_date, job_title, name,
        salary_range, _id } = useLoaderData();
    // declare these property name as old 
    const [Oldapplication_deadline, Olddescription, Oldemail, Oldjob_applicants_number, Oldjob_banner, Oldjob_category, Oldjob_posting_date, Oldjob_title, Oldname,
        Oldsalary_Array, OLd_id] = [application_deadline, description, email, job_applicants_number, job_banner, job_category, job_posting_date, job_title, name,
            salary_range, _id]
    // end
    const { user } = useContext(AuthContext);
    const [deadline, setDeadline] = useState(new Date(Oldapplication_deadline));
    const [postingDate, setPostingDate] = useState(new Date(Oldjob_posting_date));


    const handleUpdate = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const job_title = form.title.value;
        const job_banner = form.banner.value;
        const job_applicants_number = parseInt(form.applicants.value);
        const description = form.description.value;
        const job_category = form.category.value;
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

        // Final updated values in updateJobInfo
        
        const updatedJobInfo = {name,job_title,job_banner,job_category,job_applicants_number,job_posting_date,description,application_deadline,salary_range};
        
        // Update to backend
        fetch(`http://localhost:3000/all_jobs/${_id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(updatedJobInfo)
        })
        .then((res)=>res.json()
        .then((data)=>{
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Your job has been updated",
                showConfirmButton: false,
                timer: 1500
              });
            console.log(data)
        }))


    }
    
    return (
        <div>
            <Helmet>
                <title>Remoto | Update Job</title>
            </Helmet>
            <div>
                <div className="flex justify-center mt-16">
                    <form onSubmit={handleUpdate} className='md:border rounded-lg p-8'>
                        <div className='mb-5 flex justify-center'>
                            <div className='flex items-center gap-4'>
                                <p className='text-2xl text-center text-blue-400 font-semibold'>Job Details Update</p>
                                <FontAwesomeIcon color="#0080FF" className='text-2xl' icon={faBriefcase} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 md:my-9 gap-2 mb-3">
                            <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="name" defaultValue={user?.displayName} placeholder="Name" />
                            <input required type="text" defaultValue={Oldjob_title} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="title" placeholder="Job title" />
                            <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="banner" defaultValue={Oldjob_banner} placeholder="Job banner url" />
                            <div className='relative'>
                                <input required type="number" defaultValue={Oldjob_applicants_number} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="applicants" />
                                <p className='absolute text-xs right-9 text-gray-300 top-4'>Applicants</p>
                            </div>
                            <input required type="text" defaultValue={Olddescription} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="description" placeholder="Description" />
                            <input required type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" name="salary" defaultValue={`${Oldsalary_Array[0]}-${Oldsalary_Array[1]}`} placeholder="Salary Range  ex: 99-99" />
                            <select required name="category" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded">
                                <option value='Remote'>Category</option>
                                <option selected={Oldjob_category == 'Remote' && 'selected'} value="Remote">Remote Jobs</option>
                                <option selected={Oldjob_category == 'Hybrid' && 'selected'} value="Hybrid">Hybrid Jobs</option>
                                <option selected={Oldjob_category == 'Part-Time' && 'selected'} value="Part-Time">Part Time Jobs</option>
                                <option selected={Oldjob_category == 'On-Site' && 'selected'} value="On-Site">On Site Jobs</option>
                            </select>
                            <DatePicker required placeholderText={Oldapplication_deadline} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" selected={deadline} onChange={(date) => setDeadline(date)} />
                            <DatePicker required placeholderText={Oldjob_posting_date} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" selected={postingDate} onChange={(date) => setPostingDate(date)} />
                        </div>
                        <p className="text-xs mb-1 mt-5 text-center">A brief, polite statement that summarizes the purpose of the form or <span className="font-semibold text-blue-400">thanks</span> the reader for their <span className="font-semibold text-blue-400">attention</span>.
                        </p>
                        <button className="mt-5 w-full mb-2 border rounded-full py-3 bg-blue-400 text-white font-semibold hover:bg-blue-600">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

{/* <span className="font-semibold text-blue-400">Terms of service</span>

A brief, polite statement that summarizes the purpose of the form or thanks the reader for their attention. */}


export default Update_job;