import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const SingleJobDetails = () => {
    const { _id, name, job_title, job_posting_date, application_deadline, salary_range, job_applicants_number, company_logo, job_banner, description, job_category, email } = useLoaderData();
    const {user} = useContext(AuthContext);
    const [err , setErr] = useState('');
    console.log(useLoaderData())
    const handleApply = e =>{
        e.preventDefault()
        const form = e.target;
        const formEmail = form.email.value;
        const dealine = new Date(application_deadline);
        const resume = form.resume.value;
        let todayDate =  new Date();
        todayDate.setHours(0,0,0,0);

        const postData = {email:formEmail,resume,job_id:_id,job_category,salary_range,job_title,name,job_posting_date}

        if(user.email===email){
            setErr('You can not apply in your own job!');
            setTimeout(() => {
                setErr('')
            }, 3000);
            return;
        }
        if(dealine < todayDate){
            setErr('Sorry deadline is over!');
            setTimeout(() => {
                setErr('')
            }, 3000);
            return;
        }else{
            fetch( `http://localhost:3000/all_applications?jobId=${_id}`,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(postData)
            }).then(res=>res.json())
            .then(data=>{
                if(data.acknowledged){
                    Swal.fire({
                        position: "top-middle",
                        icon: "success",
                        title: "Application submitted",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    form.reset();
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            })
        }
    }
    return (
        <div className="mx-auto w-11/12 mt-9 md:mt-12">
            <Helmet>
                <title>Remoto | Job Details</title>
            </Helmet>
            <div className="flex md:gap-6 flex-col lg:flex-row">
                <div>
                    <img src={job_banner} alt="" />
                </div>
                <div>
                    <div className="flex gap-3 items-center">
                        <img className="rounded-full w-6 md:w-9" src={company_logo||`https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-purple-tick-image_2292529.jpg`} alt="" />
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
                    <input type="text" name="name" required defaultValue={user.displayName} className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Full Name" />
                    <input defaultValue={user.email} readOnly type="email" name="email" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Email or Phone" />
                    <input type="text" required name="resume" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Resume Link" />
                    <p className="text-red-500 ">{err&&err}</p>
                    <button className="w-full bg-blue-400 text-xl hover:bg-blue-500 text-white py-3 rounded">Submit</button>
                    </div>
                </form>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default SingleJobDetails;