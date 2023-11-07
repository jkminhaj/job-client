import { Helmet } from "react-helmet-async";
// import image from "../../public/img.gif"
import image from '../../public/error.gif'
import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div className="flex justify-center mt-72 md:mt-20">
            <Helmet>
                <title>Remoto | No Routes Found</title>
            </Helmet>
            <img className="w-1/2" src={image} alt="" />
            <Link to='/'><button>Home</button></Link>

        </div>
    );
};

export default Error;