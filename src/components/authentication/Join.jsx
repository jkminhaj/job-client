import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Join = () => {
  const { loading, auth, createUser, setLoading, connectGoogle } = useContext(AuthContext);
  const [visibility, setVisibility] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const errorNotify = (msg) => toast.error(msg, { style: { borderRadius: "12px" } });

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    let image = form.image.value || "https://api.dicebear.com/7.x/initials/svg?seed=" + name;

    if (password.length < 5) { errorNotify("Password must be at least 6 characters"); return; }
    if (!/[A-Z]/.test(password)) { errorNotify("Password needs at least 1 capital letter"); return; }
    if (!/[^A-Za-z0-9]/.test(password)) { errorNotify("Password needs at least 1 special character"); return; }

    createUser(email, password)
      .then(() => updateProfile(auth.currentUser, { displayName: name, photoURL: image }))
      .then(() => {
        Swal.fire({ position:"top-middle", icon:"success", title:"Account created!", showConfirmButton:false, timer:1500 });
        navigate(location?.state || "/");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(err => {
        setLoading(false);
        if (err.message.includes("email-already-in-use")) errorNotify("Email already in use");
        else if (err.message.includes("invalid-email")) errorNotify("Invalid email");
        else errorNotify("Something went wrong");
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Helmet><title>Remoto | Join</title></Helmet>

      <div className="w-full max-w-md animate-fade-up">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-7 sm:p-9">
          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-1">Create account</h1>
            <p className="text-sm text-slate-500">Join thousands of professionals finding great work.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Full Name</label>
                <input type="text" name="name" className="input-clean" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Email</label>
                <input type="email" name="email" className="input-clean" placeholder="jane@example.com" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Profile Photo URL <span className="text-slate-300 font-normal">(optional)</span></label>
              <input type="url" name="image" className="input-clean" placeholder="https://…" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={visibility ? "text" : "password"}
                  className="input-clean pr-16"
                  placeholder="Min 6 chars, 1 capital, 1 special"
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

            <p className="text-xs text-slate-400">
              By joining, you agree to Remoto's{" "}
              <a href="#" className="text-blue-500 hover:underline">Terms</a>,{" "}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </p>

            <button type="submit" className="btn-primary w-full py-3">
              {loading ? <span className="loading loading-ball loading-xs" /> : "Create Account →"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
            <span className="relative bg-white px-3 text-xs text-slate-400 mx-auto block w-fit">or</span>
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
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign in →</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Join;
