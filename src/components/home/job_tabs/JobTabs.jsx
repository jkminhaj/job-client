import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SingleTab from './SingleTab';
import './JobTabs.css'
const JobTabs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/all_jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])
    // const handleFilter = category => {
    //     const filtered = jobs.filter(job => category === job.job_category);
    //     setFilteredJobs(filtered)
    // }
    // console.log(jobs)

    const handleFilter = (index) =>{
        let filtered ;
        switch(index){
            case 0 :
                filtered = jobs ;
                break;
            case 1 :
                filtered = jobs.filter(job => 'Remote' === job.job_category);
                break;
            case 2 :
                filtered = jobs.filter(job => 'Hybrid' === job.job_category);
                break;
            case 3 :
                filtered = jobs.filter(job => 'Part-Time' === job.job_category);
                break;
            case 4 :
                filtered = jobs.filter(job => 'On-Site' === job.job_category);
                break;
            default:
                filtered = jobs;
        }
        setFilteredJobs(filtered);
    }

    return (
        <div>
            {/* <div className="tabs tabs-boxed">
                <a className="tab">Tab 1</a>
                <a className="tab">Tab 2</a>
                <a className="tab">Tab 3</a>
            </div> */}
            <Tabs onSelect={handleFilter}  className=' my-11'>
                <TabList className='flex flex-col md:flex-row justify-center mb-5 lg:mb-9 tablist'>
                    <Tab className='tab' selectedClassName='active'>
                        <a>All Jobs</a>
                    </Tab>
                    <Tab  className='tab' selectedClassName='active' >
                        <a>Remote Jobs</a>
                    </Tab>
                    <Tab  className='tab' selectedClassName='active' >
                        <a>Hybrid Jobs</a>
                    </Tab>
                    <Tab className='tab' selectedClassName='active' >
                        <a>Part Time Jobs</a>
                    </Tab>
                    <Tab className='tab' selectedClassName='active' >
                       <a> On Site Jobs</a>
                    </Tab>
                </TabList>


                <TabPanel className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        jobs.map(job =><SingleTab key={job._id} job={job}></SingleTab>)
                    }
                </TabPanel>
                <TabPanel className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        filteredJobs.map(job =><SingleTab key={job._id} job={job}></SingleTab>)
                    }
                </TabPanel>
                <TabPanel className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        filteredJobs.map(job =><SingleTab key={job._id} job={job}></SingleTab>)
                    }
                </TabPanel>
                <TabPanel className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        filteredJobs.map(job =><SingleTab key={job._id} job={job}></SingleTab>)
                    }
                </TabPanel>
                <TabPanel className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        filteredJobs.map(job =><SingleTab key={job._id} job={job}></SingleTab>)
                    }
                </TabPanel>

            </Tabs>

        </div>
    );
};

export default JobTabs;