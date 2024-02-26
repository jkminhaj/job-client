
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const SingleTab = ({ job }) => {
  const { job_posting_date, application_deadline, _id, job_applicants_number, job_title, name, salary_range } = job;
  const [firstSalary, secondSalary] = salary_range;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="border py-3 px-4 rounded space-y-1"
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h1 className="text-2xl font-semibold">{job_title}</h1>
      <p className="font-semibold">{name}</p>
      <div className="flex items-end justify-between mt-1">
        <div>
          <p>Annual salary: ${firstSalary}-${secondSalary}</p>
          <p>Posted on: {job_posting_date}</p>
          <p>Total applied: <span className="badge">{job_applicants_number}</span></p>
          <p className="font-medium">Deadline: <span className="">{application_deadline}</span></p>
        </div>
        <Link to={`/singlejobdetails/${_id}`}>
          <button className="px-3 rounded text-white bg-blue-400 hover:bg-blue-500 font-semibold py-1 hover:text-white border">Details</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default SingleTab;

