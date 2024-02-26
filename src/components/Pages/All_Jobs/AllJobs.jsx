// import { useContext, useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import loading from '../../../../public/loding3.gif'
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { AuthContext } from "../../../../AuthProvider";
// const AllJobs = () => {
//     const [data, setData] = useState([]);
//     const [title, setTitle] = useState('');
//     const { user } = useContext(AuthContext);
//     useEffect(() => {
//         fetch(`https://job-server-tau.vercel.app/all_jobs?job_title=${title}`)
//             .then(res => res.json())
//             .then(data => setData(data))
//     }, [title])
//     const handleSearch = e => {
//         e.preventDefault()
//         const form = e.target;
//         const search = form.search.value;
//         setTitle(search);
//     }
//     return (
//         <div className=" mx-auto w-11/12 mt-7">
//             <Helmet>
//                 <title>Remoto | All Jobs</title>
//             </Helmet>
//             {/* search */}
//             <div className="flex justify-center mt-2 mb-12">
//                 <form onSubmit={handleSearch} className="flex gap-2">
//                     <input type="text" name="search" className="border md:w-96 shadow-xs outline-none px-4 py-2 rounded-xl" placeholder="Search Job Title" />
//                     <button className="border px-3 rounded-full hover:bg-blue-500 bg-blue-400">
//                         <FontAwesomeIcon color="white" icon={faSearch} />
//                     </button>
//                 </form>
//             </div>
//             {/* tables */}
//             {
//                 data.length ?
//                     <>
//                         <div className="overflow-x-auto">
//                             <table className="table">
//                                 {/* head */}
//                                 <thead>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Job Title</th>
//                                         <th>Posting Date</th>
//                                         <th>Deadline</th>
//                                         <th>Salary</th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {data.map(info => <tr key={info._id}>
//                                         <th>{info.name}</th>
//                                         <td>{info.job_title}</td>
//                                         <td>{info.job_posting_date}</td>
//                                         <td>{info.application_deadline}</td>
//                                         <td>${info.salary_range[0]}-${info.salary_range[1]}</td>
//                                         <td><Link to={`/singlejobdetails/${info._id}`} ><button className="border px-2 py-1 rounded hover">Details</button></Link></td>
//                                     </tr>)}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </>
//                     :
//                     <>
//                     <div className="flex justify-center">
//                         <img className="" src={loading} alt="" />
//                     </div>
//                     </>
//             }
//         </div>
//     );
// };

// export default AllJobs;
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import loadinggif from "../../../../public/loding3.gif";  // Import the loading GIF
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../../AuthProvider";
import { motion } from "framer-motion";

const JobCard = ({ info }) => {
    return (
        <motion.div
            className="border p-4 mb-4 rounded-md shadow-md"
            whileHover={{ scale: 1.05 }}
        >
            <h3 className="text-lg font-semibold ">{info.job_title}</h3>
            <p className="mb-2 font-semibold text-gray-500">{info.name}</p>
            {/* <p>Posted on : {info.job_posting_date}</p> */}
            <div className="flex justify-between items-end mt-3">
                <div>
                    <p className="">Deadline: {info.application_deadline}</p>
                    <p className="">Salary: ${info.salary_range[0]}-${info.salary_range[1]}</p>
                </div>
                <div>
                    <Link to={`/singlejobdetails/${info._id}`}>
                        <button className="border px-2 py-1 rounded font-semibold text-white bg-blue-400 hover:bg-blue-500">Details</button>
                    </Link>
                </div>
            </div>


        </motion.div>
    );
};

const AllJobs = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        fetch(`https://job-server-tau.vercel.app/all_jobs?job_title=${title}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [title]);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const search = form.search.value;
        setTitle(search);
    };

    return (
        <div className="mx-auto w-11/12 mt-5">
            <Helmet>
                <title>Remoto | All Jobs</title>
            </Helmet>
            {/* search */}
            <div className="flex justify-center mt-2 mb-12">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        name="search"
                        className="border md:w-96 shadow-xs outline-none px-4 py-2 rounded-xl"
                        placeholder="Search Job Title"
                    />
                    <button className="border px-3 rounded-full hover:bg-blue-500 bg-blue-400">
                        <FontAwesomeIcon color="white" icon={faSearch} />
                    </button>
                </form>
            </div>
            {loading && (
                <div className="flex justify-center">
                    <img className="" src={loadinggif} alt="" />
                </div>
            )}
            {/* cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {!loading && data.length === 0 && (
                    <div className="text-center">
                        <p>No results found for "{title}". Try a different search.</p>
                    </div>
                )}

                {!loading &&
                    data.length > 0 &&
                    data.map((info) => <JobCard key={info._id} info={info} />)}
            </div>
        </div>
    );
};

export default AllJobs;
