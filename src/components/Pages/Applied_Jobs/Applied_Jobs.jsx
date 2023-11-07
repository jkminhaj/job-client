import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider";
import { Helmet } from "react-helmet-async";

const Applied_Jobs = () => {
    const [data, setData] = useState([]);
    const [catego , setCatego] = useState('');
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`http://localhost:3000/all_applications?category=${catego}&email=${user.email}`,{credentials:'include'})
            .then(res => res.json())
            .then(data => setData(data));
    }, [catego])
    const handleSelect = e =>{
        setCatego(e.target.value)
    }
    return (
        <div className="mx-auto w-11/12">
            <Helmet>
                <title>Remoto | Applied Jobs</title>
            </Helmet>

            <div className="flex justify-end my-3">
                {/* select */}
                <select onChange={handleSelect} className="hover:bg-blue-400 border-blue-400 border  hover:text-white md:py-2  md:px-4 rounded-md focus:outline-none ">
                    <option value="">All</option>
                    <option value="Remote">Remote Jobs</option>
                    <option value="Hybrid">Hybrid Jobs</option>
                    <option value="Part-Time">Part Time Jobs</option>
                    <option value="On-Site">On Site Jobs</option>
                </select>

            </div>



            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Posting Date</th>
                            <th>Salary</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(info => <tr key={info._id}>
                            <th>{info.name}</th>
                            <td>{info.job_title}</td>
                            <td>{info.job_posting_date}</td>
                            <td>${info.salary_range[0]}-${info.salary_range[1]}</td>
                            <td>{info.job_category}</td>
                            <td><button>Details</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applied_Jobs;