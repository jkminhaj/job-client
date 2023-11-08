import {createBrowserRouter} from "react-router-dom";
import Root from "./src/Root";
import Home from "./src/components/home/Home";
import Login from "./src/components/authentication/Login";
import Join from "./src/components/authentication/Join";
import AllJobs from "./src/components/Pages/All_Jobs/AllJobs";
import SingleJobDetails from "./src/components/Pages/All_Jobs/SingleJobDetails";
import PrivateRoute from "./PrivateRoute";
import Applied_Jobs from "./src/components/Pages/Applied_Jobs/Applied_Jobs";
import AddAJob from "./src/components/Pages/Add_a_Job/AddAJob";
import My_Jobs from "./src/components/Pages/My_Jobs/My_Jobs";
import Update_job from "./src/components/Pages/My_Jobs/Update_job/Update_job";
import Error from "./src/components/Error";

// All routes
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>,
        },
        {
          path:'/join',
          element:<Join></Join>
        },
        {
          path:'/alljobs',
          element:<AllJobs></AllJobs>
        },
        {
          path:'/singlejobdetails/:id',
          element:<PrivateRoute><SingleJobDetails></SingleJobDetails></PrivateRoute>,
          loader:({params})=>fetch(`https://job-server-tau.vercel.app/all_jobs/${params.id}`)
        },
        {
          path:'/appliedjobs',
          element:<PrivateRoute><Applied_Jobs></Applied_Jobs></PrivateRoute>
        },
        {
          path:'/addajob',
          element:<AddAJob></AddAJob>
        },
        {
          path:'/myjobs',
          element:<My_Jobs></My_Jobs>
        },
        {
          path:'/updatejob/:id',
          element:<Update_job></Update_job>,
          loader:({params})=>fetch(`https://job-server-tau.vercel.app/all_jobs/${params.id}`)
        }
      ]
    },
  ]);