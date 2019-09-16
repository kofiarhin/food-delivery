import React, { Component } from "react";
import Header from "../Header/header";

class Dashboard extends Component {


    componentWillMount() {


        const userId = sessionStorage.getItem("userId");
        console.log(userId);

        //----TODO ---- 
        //check if session exist
        //redirect user to login if not logged in
        //fetch user details
        //set state
        //check role of user
        //return user dashboard

    }

    render() {

        return <div>

            <Header />

            <div className="container">

                <h1 className="main-title"> Dashboard</h1>

            </div>

        </div>

    }

}

export default Dashboard;