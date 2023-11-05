import { Children } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/nav/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;