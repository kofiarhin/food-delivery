import React from "react";
import Header from "../Header/header";
import { Link } from "react-router-dom";

const Customer = () => {


    return <div>

        <Header />

        <div>

            <div className="header-wrapper">

                <h1>List of Customers</h1>

                <Link className="cta" to="/admin/addCustomer"> Add Customer </Link>

            </div>


        </div>

    </div>
}

export default Customer;