import { Helmet } from "react-helmet-async";
import JobTabs from "./job_tabs/JobTabs";
import Banner from "./banner/Banner";
import Explore from "./explore/Explore";
import BestPlaces from "./bestPlaces/BestPlaces";

const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Helmet>
                <title>Remoto | Home</title>
            </Helmet>
            <Banner></Banner>
            <JobTabs></JobTabs>
            <BestPlaces></BestPlaces>
            <Explore></Explore>
        </div>
    );
};

export default Home;