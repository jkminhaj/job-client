import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
const Navbar = () => {
    const { user ,logOut } = useContext(AuthContext);
    // dynamic nav menu
    const links = <>
        <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/blogs'><li>Blogs</li></NavLink>
        <NavLink to='/alljobs'><li>All Jobs</li></NavLink>

        {user &&
            <>
                <NavLink to='/myjobs'><li>My Jobs</li></NavLink>
                <NavLink to='/addajob'><li>Add A Job</li></NavLink>
                <NavLink to='/appliedjobs'><li>Applied Jobs</li></NavLink>
            </>}

        {/* If logged in , will show these links */}
    </>
    console.log(user)
    return (

        // change the gap setting 
        <div className="w-11/12 mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <p className="text-4xl font-semibold text-sky-600">Remot</p>
                    <div className="flex gap-1">
                        <img className="w-10 ml-1 mt-2" src="https://thescarlet.org/wp-content/uploads/2023/03/onlyfans-logo-C7DEFE44F5-seeklogo.com_.png" alt="" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-1  font-normal">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img title={user.displayName} src={user.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            {user.displayName}
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Profile</a></li>
                                    <li><a onClick={()=>{logOut()}}>Logout</a></li>
                                </ul>
                            </div>

                        </> : <>
                            {/* If there is no user */}
                            <div className="font-semibold flex gap-2">
                                <NavLink to='/join'><button className="py-3 px-5 hover:bg-gray-100 rounded-full">Join Now</button></NavLink>
                                <NavLink to='/login'><button className="py-3 px-5 border border-blue-400 text-blue-400 hover:bg-blue-50 rounded-full">Sign In</button></NavLink>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;