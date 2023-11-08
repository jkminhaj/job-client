import { Link } from "react-router-dom";

const SingleTab = ({job}) => {
    const {job_posting_date,application_deadline ,_id, job_applicants_number,job_title,name,salary_range} = job;
    const [firstSalary , secondSalary] = salary_range ;
    return (
        <div className="border py-3 px-4 rounded space-y-1">
            <h1 className="text-2xl text-blue-400 font-medium">{job_title}</h1>
            <p>{name}</p>
            <p>Annual salary : ${firstSalary}-${secondSalary}</p>
            <p>Posted on : {job_posting_date}</p>
            <p>Total applied : <span className="badge">{job_applicants_number}</span></p>
            <div className="flex justify-between">
            <p className="font-medium">Deadline : <span className="text-blue-800">{application_deadline}</span></p>
            <Link to={`/singlejobdetails/${_id}`}><button className="px-3 rounded text-blue-400 hover:bg-blue-400 hover:text-white border">Details</button></Link>
            </div>
        </div>
    );
};

export default SingleTab;