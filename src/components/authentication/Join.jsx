import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Swal from 'sweetalert2'



const Join = () => {
    const {
        loading,
        auth,
        createUser,
        setLoading,
        connectGoogle } = useContext(AuthContext)
    const [visibility, setVisibility] = useState(false);
    const [error , setError] = useState('');
    const navigate = useNavigate();


    // Sign Up button fuctions
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        let image = form.image.value;

        if(!image){
            image = 'https://editzstock.com/wp-content/uploads/2022/05/Name-logo-png.jpg';
        }

         // sweet toast
         const errorNotify = (e) => toast(e,
            {
                icon: '',
                style: {
                    borderRadius: '50px',
                    background: 'white',
                    color: 'red',
                },
            });


        // password validation
        if (password.length < 5) {
            errorNotify('Password is less than 6 characters')
            return
        } else if (!/[A-Z]/.test(password)) {
            errorNotify('Password should have at least 1 capital letter');
            return
        } else if (!/[^A-Za-z0-9]/.test(password)) {
            errorNotify('Password should have at least 1 special character');
            return
        }



        // Connect to firebase
        createUser(email, password)
            .then(res => {
                updateProfile(auth.currentUser,{
                    displayName:name,photoURL:image
                }).then(()=>{
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: 'Successfully signed in',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    navigate('/');
                    setTimeout(() => { window.location.reload() }, 1000)
                })
            })
            .catch(err => {
                setLoading(false)
                if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                    errorNotify('Email already in use')
                } else if (err.message === 'Firebase: Error (auth/invalid-email).') {
                    errorNotify('Invalid email')
                }


            })
    }
    return (
        <div className="flex flex-col
         justify-center items-center gap-6 md:gap-10 mt-24">
            <div className="md:border rounded md:shadow pt-8 md:pt-12 md:px-8 pb-8 px-5">
                <h1 className="text-3xl text-center mb-2 font-medium">Sign Up</h1>
                <p className="text-sm mb-5 text-center text-blue-500">Join the Community of Professionals</p>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:my-9 gap-2 mb-3">
                        <input type="text" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Full Name" name="name" />
                        <input type="email" name='email' className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Email or Phone" />
                        <input type="text" name="image" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Images URL" />
                        <div className="relative">
                            <input name="password" className="w-full focus:border-blue-500  text-base outline-none border p-3 rounded" type={visibility ? 'text' : 'password'} placeholder="Password" />
                            <p onClick={() => setVisibility(!visibility)} className="absolute cursor-pointer font-semibold hover:text-blue-300 text-blue-500 right-5  bottom-3">{visibility ? 'hide' : 'show'}</p>
                        </div>
                    </div>
                    <p className="text-xs mb-1 mt-5 text-center">By clicking agree and join , you agree to Remoto’s <span className="font-semibold text-blue-400">User  Agreement</span>, <span className="font-semibold text-blue-400">Privacy Policy</span>, and <span className="font-semibold text-blue-400">Cookie Policy</span>.</p>
                    <button  className="mt-5 w-full mb-2 border rounded-full py-3 bg-blue-400 text-white font-semibold hover:bg-blue-600">{loading?<span className="loading loading-ball loading-xs"></span>:'Agree & Join'}</button>
                </form>
                <div className="flex items-center py-1 justify-between mb-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-600">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button onClick={() => { connectGoogle().then(()=>{navigate('/')}) }} className="w-full font-medium border py-3 rounded-full flex hover:bg-slate-50 justify-center items-center gap-3"> <FontAwesomeIcon color="#0080FF" icon={faGoogle} /> <p>Continue with Google</p></button>
                <p className="text-center mt-6">Already on Remoto? <Link to='/login'><span className="text-blue-500 cursor-pointer font-semibold">Sign in</span></Link></p>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Join;