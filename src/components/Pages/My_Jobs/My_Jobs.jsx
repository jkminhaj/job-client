import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
const My_Jobs = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);

    // load data
    useEffect(() => {
        fetch(`http://localhost:3000/all_jobs?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setData(data));
    }, [user])





    const handleDelete = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                //   if confirm delete
                fetch(`http://localhost:3000/all_jobs/${id}`, {
                    method: 'DELETE'
                }).then(res => res.json())
                    .then(res => {
                        if (res.acknowledged) {
                            // if deleted completely
                            const filterdData = data.filter(job=>id!==job._id);
                            setData(filterdData)
                            Swal.fire({
                                title: "Job Deleted !",
                                text: "Your job has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div className="mx-auto w-11/12 mt-8 md:mt-16">
            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Posting Date</th>
                            <th>Salary</th>
                            <th>Category</th>
                            <th>Deadline</th>
                            <th>Applicants</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(info => <tr key={info._id}>
                            <td>{info.job_title}</td>
                            <td>{info.job_posting_date}</td>
                            <td>${info.salary_range[0]}-${info.salary_range[1]}</td>
                            <td>{info.job_category}</td>
                            <td>{info.application_deadline}</td>
                            <td>{info.job_applicants_number}</td>
                            <td><div className="flex gap-5">
                                <button onClick={() => handleDelete(info._id)}><FontAwesomeIcon className="text-red-400 text-base hover:text-black" icon={faTrashAlt} /></button>
                                <Link to={`/updatejob/${info._id}`} ><FontAwesomeIcon className="text-blue-400 text-base hover:text-black" icon={faPenToSquare} /></Link>
                            </div></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default My_Jobs;