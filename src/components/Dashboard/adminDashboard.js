import React from "react";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {


    return <div className="dashBoard-wrapper">

        <Link to="/customers" className="dash-unit "> Customers </Link>
        <Link to="/riders" className="dash-unit "> Riders</Link>
        <Link to="/restaurants" className="dash-unit "> Restaurants</Link>
        <Link to="/orders" className="dash-unit "> Orders </Link>


    </div>
}

export default AdminDashboard;