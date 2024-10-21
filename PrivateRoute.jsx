import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);
    const location = useLocation();   
    if(loading){
        return <div className="flex justify-center mt-16"><span className="loading loading-bars loading-lg mt-28 text-center"></span></div>
    }
    if(user){
        return children ;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;