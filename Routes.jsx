import {createBrowserRouter} from "react-router-dom";
import Root from "./src/Root";
import Home from "./src/components/home/Home";
import Login from "./src/components/authentication/Login";
import Join from "./src/components/authentication/Join";
import AllJobs from "./src/components/Pages/All_Jobs/AllJobs";
import SingleJobDetails from "./src/components/Pages/All_Jobs/SingleJobDetails";
import PrivateRoute from "./PrivateRoute";

// All routes
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
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
          loader:({params})=>fetch(`http://localhost:3000/all_jobs/${params.id}`)
        }
      ]
    },
  ]);