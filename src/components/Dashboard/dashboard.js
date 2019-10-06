import React, { Component } from "react";
import RestDash from "./restDashboard";
import AdminDash from "./adminDashboard";
import Header from "../Header/header";
import "./dashboard.sass"

class DashBoard extends Component {


    state = {

        role: null
    }

    componentDidMount() {

        const role = sessionStorage.getItem("role");
        this.setState({
            role
        })
    }

    renderDash = () => {

        const role = this.state.role;

        if (role) {

            switch (role) {

                case "admin":
                    return <AdminDash {...this.props} />
                    break;
                case "rest":
                    return <RestDash {...this.props} />
                    break;
                default:
                    return null;
            }
        }



    }

    render() {

        return <div>

            <Header />
            <div>

                {this.renderDash()}
            </div>
        </div>

    }
}


export default DashBoard;