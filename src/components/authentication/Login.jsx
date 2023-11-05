import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex flex-col
         justify-center items-center gap-6 md:gap-10 mt-24">
            <div className="md:border rounded md:shadow pt-8 pb-8 px-5 w-96">
                <h1 className="text-3xl mb-2 font-medium">Sign in</h1>
                <p className="text-sm mb-5">Stay updated on your professional world</p>
                <div className="flex flex-col gap-4 mb-3">
                    <input type="email" className="w-full outline-none focus:border-blue-500 text-base border p-3 rounded" placeholder="Email or Phone" />
                    <div className="relative">
                        <input className="w-full focus:border-blue-500  text-base outline-none border p-3 rounded" type="password" placeholder="Password" />
                        <button className="absolute font-semibold hover:text-blue-300 text-blue-500 right-5  bottom-3">show</button>
                    </div>

                </div>
                <p className="font-semibold text-blue-400">Forgot password?</p>
                <button className="mt-5 w-full mb-2 border rounded-full py-3 bg-blue-400 text-white font-semibold hover:bg-blue-600">Sign in</button>
                <div className="flex items-center py-1 justify-between mb-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-600">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <p className="text-xs mb-3">By clicking Continue, you agree to Remoto’s <span className="font-semibold text-blue-400">User  Agreement</span>, <span className="font-semibold text-blue-400">Privacy Policy</span>, and <span className="font-semibold text-blue-400">Cookie Policy</span>.</p>
                <button className="w-full font-medium border py-3 rounded-full flex hover:bg-slate-200 justify-center items-center gap-1"> <img className="w-5" src="https://madeby.google.com/static/images/google_g_logo.svg" alt="" /> Continue with Google</button>
            </div>
            <div>
                <p>New to Remoto? <Link to='/join'><span className="text-blue-500 cursor-pointer font-semibold">Join now</span></Link> </p>
            </div>
        </div>
    );
};

export default Login;