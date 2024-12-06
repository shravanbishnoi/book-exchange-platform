import React from "react";
import { Navbar } from "react-bootstrap";
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