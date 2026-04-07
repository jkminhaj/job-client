import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [visibility, setVisibility] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, setLoading, loginUser, connectGoogle } = useContext(AuthContext);

  const errorNotify = (msg) => toast.error(msg, { style: { borderRadius: "12px" } });

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target;
    loginUser(email.value, password.value)
      .then(() => {
        Swal.fire({ position:"top-middle", icon:"success", title:"Welcome back!", showConfirmButton:false, timer:1500 });
        navigate(location?.state || "/");
      })
      .catch(err => {
        setLoading(false);
        if (err.message.includes("invalid-email")) errorNotify("Invalid email address");
        else if (err.message.includes("invalid-login-credentials")) errorNotify("Wrong email or password");
        else errorNotify("Something went wrong");
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Helmet><title>Remoto | Sign In</title></Helmet>

      <div className="w-full max-w-md animate-fade-up">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow p-7 sm:p-9">
          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-1">Sign in</h1>
            <p className="text-sm text-slate-500">Welcome back — your next opportunity awaits.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email</label>
              <input type="email" name="email" className="input-clean" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={visibility ? "text" : "password"}
                  className="input-clean pr-16"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setVisibility(!visibility)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-500 hover:text-blue-700 transition"
                >
                  {visibility ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-blue-500 hover:text-blue-700 font-medium transition">Forgot password?</button>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              {loading ? <span className="loading loading-ball loading-xs" /> : "Sign In →"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
            <span className="relative bg-white px-3 text-xs text-slate-400 mx-auto block w-fit">or continue with</span>
          </div>

          <button
            onClick={() => connectGoogle().then(() => navigate(location?.state || "/"))}
            className="w-full border border-slate-200 rounded-xl py-3 flex items-center justify-center gap-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-slate-400 text-center mt-4">
            By signing in, you agree to Remoto's{" "}
            <a href="#" className="text-blue-500 hover:underline">Terms</a>,{" "}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          New to Remoto?{" "}
          <Link to="/join" className="font-semibold text-blue-600 hover:underline">Join for free →</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
