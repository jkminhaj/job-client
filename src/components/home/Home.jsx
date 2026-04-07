import { Helmet } from "react-helmet-async";
import JobTabs from "./job_tabs/JobTabs";
import Banner from "./banner/Banner";
import Explore from "./explore/Explore";
import BestPlaces from "./bestPlaces/BestPlaces";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto">
      <Helmet><title>Remoto | Find Work That Fits</title></Helmet>
      <Banner />
      <JobTabs />
      <BestPlaces />
      <HowItWorks />
      <Testimonials />
      <Explore />
    </div>
  );
};

export default Home;
