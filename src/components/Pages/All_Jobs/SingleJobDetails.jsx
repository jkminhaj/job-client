import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider";

const SingleJobDetails = () => {
    const { _id, name, job_title, job_posting_date, application_deadline, salary_range, job_applicants_number, company_logo, job_banner, description, job_category, email } = useLoaderData();
    const {user} = useContext(AuthContext);
    const handleApply = e =>{
        e.preventDefault()
    }
    return (
        <div className="mx-auto w-11/12 mt-9 md:mt-12">
            <div className="flex md:gap-6 flex-col lg:flex-row">
                <div>
                    <img src={job_banner} alt="" />
                </div>
                <div>
                    <div className="flex gap-3 items-center">
                        <img className="rounded-full w-6 md:w-9" src={company_logo} alt="" />
                        <p className="text-2xl md:text-3xl text-blue-400 font-semibold">{job_title}</p>
                    </div>
                    <p className="mt-6  text-lg"><span className="text-xl">Job Details : </span>{description}</p>
                    <p className="mt-10 text-xl">Salary: ${salary_range[0]}- ${salary_range[1]} (annual)</p>
                    <p className="mt-5">Total applied : {job_applicants_number}</p>
                    <div className=" mt-8">
                        <label htmlFor="my_modal_7" className="mt-5 border rounded text-lg font-medium cursor-pointer bg-blue-400 text-white py-3 px-5">Apply</label>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleApply} className="modal-box">
                    <h3 className="text-lg font-semibold text-center ">Application Form !</h3>
                    <div className="p-5 space-y-3">
                    <input type="text" name="name" defaultValue={user.displayName} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Full Name" />
                    <input defaultValue={user.email} disabled type="email" name="email" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Email or Phone" />
                    <input type="text" name="resume" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Resume Link" />
                    <button className="w-full bg-blue-400 text-xl hover:bg-blue-500 text-white py-3 rounded">Submit</button>
                    </div>
                </form>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default SingleJobDetails;