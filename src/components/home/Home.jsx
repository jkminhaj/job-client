import { Helmet } from "react-helmet-async";
import JobTabs from "./job_tabs/JobTabs";

const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Helmet>
                <title>Remoto | Home</title>
            </Helmet>
            <JobTabs></JobTabs>
        </div>
    );
};

export default Home;