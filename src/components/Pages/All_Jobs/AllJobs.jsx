import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../../AuthProvider";
const AllJobs = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const {user} = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://job-server-tau.vercel.app/all_jobs?job_title=${title}`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [title])
    const handleSearch = e =>{
        e.preventDefault()
        const form = e.target;
        const search = form.search.value;
        setTitle(search);
    }
    return (
        <div className=" mx-auto w-11/12 mt-7">
            <Helmet>
                <title>Remoto | All Jobs</title>
            </Helmet>
            {/* search */}
            <div className="flex justify-center mt-2 mb-12">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" name="search" className="border md:w-96 shadow-xs outline-none px-4 py-2 rounded-xl" placeholder="Search Job Title" />
                    <button className="border px-3 rounded-full hover:bg-blue-500 bg-blue-400">
                        <FontAwesomeIcon color="white" icon={faSearch} />
                    </button>
                </form>
            </div>
            {/* tables */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Posting Date</th>
                            <th>Deadline</th>
                            <th>Salary</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(info => <tr key={info._id}>
                            <th>{info.name}</th>
                            <td>{info.job_title}</td>
                            <td>{info.job_posting_date}</td>
                            <td>{info.application_deadline}</td>
                            <td>${info.salary_range[0]}-${info.salary_range[1]}</td>
                            <td><Link to={`/singlejobdetails/${info._id}`} ><button>Details</button></Link></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllJobs;