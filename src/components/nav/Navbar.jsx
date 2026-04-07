import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 px-1 py-0.5 border-b-2 ${
      isActive ? "text-blue-600 border-blue-600" : "text-slate-600 border-transparent hover:text-slate-900"
    }`;

  const links = (
    <>
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>
      <NavLink to="/alljobs" className={linkClass}>All Jobs</NavLink>
      {user && (
        <>
          <NavLink to="/myjobs" className={linkClass}>My Jobs</NavLink>
          <NavLink to="/addajob" className={linkClass}>Add Job</NavLink>
          <NavLink to="/appliedjobs" className={linkClass}>Applied</NavLink>
        </>
      )}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      } border-b border-slate-100`}
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 7H4C2.9 7 2 7.9 2 9v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" fill="white" opacity="0.9"/>
              <path d="M16 7V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="13" r="2" fill="white"/>
            </svg>
          </div>
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-xl font-bold text-slate-900 tracking-tight">
            Remoto
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">{links}</nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition">
                <img
                  src={user.photoURL || "https://api.dicebear.com/7.x/initials/svg?seed=" + user.displayName}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-100"
                />
                <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
                  {user.displayName?.split(" ")[0]}
                </span>
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 animate-slide-down">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user.displayName}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                </div>
                <Link to="/myjobs" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  My Jobs
                </Link>
                <Link to="/appliedjobs" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  Applied Jobs
                </Link>
                <button
                  onClick={logOut}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition mt-0.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <NavLink to="/login">
                <button className="btn-outline text-sm py-2 px-4">Sign In</button>
              </NavLink>
              <NavLink to="/join">
                <button className="btn-primary text-sm py-2 px-4">Join Free</button>
              </NavLink>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white animate-slide-down">
          <div className="w-11/12 mx-auto py-4 flex flex-col gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/blogs", label: "Blogs" },
              { to: "/alljobs", label: "All Jobs" },
              ...(user ? [
                { to: "/myjobs", label: "My Jobs" },
                { to: "/addajob", label: "Add Job" },
                { to: "/appliedjobs", label: "Applied Jobs" },
              ] : []),
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {!user && (
              <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
                <Link to="/login" className="flex-1"><button className="btn-outline w-full text-sm py-2">Sign In</button></Link>
                <Link to="/join" className="flex-1"><button className="btn-primary w-full text-sm py-2">Join Free</button></Link>
              </div>
            )}
            {user && (
              <button onClick={logOut} className="text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg mt-1">Sign Out</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
