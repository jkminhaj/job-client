const SingleTab = ({job}) => {
    const {job_posting_date,application_deadline , job_applicants_number,job_title,name,salary_range} = job;
    const [firstSalary , secondSalary] = salary_range ;
    return (
        <div className="border py-3 px-4 rounded">
            <h1 className="text-2xl text-blue-400 font-medium">{job_title}</h1>
            <p>{name}</p>
            <p>Annual salary : ${firstSalary}-{secondSalary}</p>
            <p>Deadline : {application_deadline}</p>
            <p>Posted on : {job_posting_date}</p>
            <p>Total applied : {job_applicants_number}</p>
            <button>Details</button>
        </div>
    );
};

export default SingleTab;