import {createBrowserRouter} from "react-router-dom";
import Root from "./src/Root";
import Home from "./src/components/home/Home";
import Login from "./src/components/authentication/Login";
import Join from "./src/components/authentication/Join";

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
        }
      ]
    },
  ]);