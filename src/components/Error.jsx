import { Helmet } from "react-helmet-async";
// import image from "../../public/img.gif"
import image from '../../public/error.gif'
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div className="flex justify-center mt-72 md:mt-20 relative ">
            <Helmet>
                <title>Remoto | No Routes Found</title>
            </Helmet>
            <img className="w-1/2" src={image} alt="" />
            <Link to='/'><button className="btn bg-blue-400 absolute top-0 hidden md:flex md:left-40  text-white">Home</button></Link>
            <Link to='/'><button className=" rounded px-1 text-xs bg-blue-400 absolute bottom-0 md:hidden md:left-40  text-white">Home</button></Link>

        </div>
    );
};

export default Error;