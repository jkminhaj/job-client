import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = () => {
    return (
        <div>
            <div className="flex flex-col my-8 gap-3 items-center md:flex-row justify-between md:my-28">
                <div className="flex flex-col">
                    <p className="text-4xl mb-5 font-semibold">Find Your Dream Job Today!</p>
                    <p>Explore top career opportunities and connect with your ideal employer. <br /> Quick, easy, and tailored to your aspirations – your job search starts and ends here!</p>
                    <div className="flex  mt-10">
                        <input type="text" name="search" className="border rounded-r-none md:w-96 shadow-xs outline-none px-4 py-2 rounded-xl" placeholder="Front end developer" />
                        <button className="border py-2 px-3 rounded-xl rounded-l-none hover:bg-blue-500 bg-blue-400">
                            <FontAwesomeIcon color="white" icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div>
                    <img src="https://www.essenzlovo.com/wp-content/uploads/2021/06/Industries-recruitment.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;