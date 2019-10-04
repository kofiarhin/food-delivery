import React from "react";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {


    return <div className="dash-wrapper">

        <Link to="/customers" className="dash-unit ">
            <i class="fas fa-users"></i>
            <p> Customers </p>
        </Link>

        <Link to="/riders" className="dash-unit ">
            <i class="fas fa-motorcycle"></i>
            <p>Riders</p>
        </Link>
        <Link to="/restaurants" className="dash-unit ">

            <i class="fas fa-utensils"></i>
            <p>Restaurant</p>

        </Link>
        <Link to="/orders" className="dash-unit ">

            <i class="fas fa-concierge-bell"></i>
            <p>Orders</p>
        </Link>


    </div>
}

export default AdminDashboard;