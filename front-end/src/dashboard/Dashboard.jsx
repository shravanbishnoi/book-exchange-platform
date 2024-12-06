import React from "react";
import Navbar from "./Navbar.jsx"
import { Outlet } from "react-router-dom";


const Dashboard = () => {

    return (
        <div>
            <Navbar />
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default Dashboard;