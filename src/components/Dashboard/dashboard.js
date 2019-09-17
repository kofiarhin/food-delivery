import React, { Component } from "react";
import Header from "../Header/header";
import { firebase } from "../../firebase";
import AdminDashBoard from "./adminDashboard";
import _ from "lodash";

class Dashboard extends Component {



    state = {

        userData: []
    }


    componentWillMount() {




        //check if session exist
        //redirect user to login if not logged in
        //fetch user details
        //set state
        //check role of user
        //return user dashboard


        const userId = sessionStorage.getItem("userId");
        // console.log(userId);

        if (!userId) {

            this.props.history.push("/login")
        }


        //get users
        firebase.database().ref(`users/${userId}`).once("value")
            .then(snapshot => {

                const userData = snapshot.val();

                this.setState({

                    userData
                })


            }).catch(error => console.log(error))

    }


    renderDashboard = () => {

        const userData = this.state.userData;

        if (!_.isEmpty(userData)) {

            const role = userData.role

            switch (role) {

                case "customer":
                    return <div> Customer </div>
                    break;
                case "rider":
                    return <div> Rider </div>
                    break;
                case "admin":
                    return <div> Admin  </div>
                    break;
                default:
                    return <div> You are not authorized to view this page </div>;
            }
        }


    }

    render() {


        // console.log(this.state.userData)

        return <div>

            <Header />

            <div className="container">

                <h1 className="main-title"> Dashboard</h1>

                {/* {this.renderDashboard()} */}
                <AdminDashBoard userData={this.state.userData} />

            </div>

        </div>

    }

}

export default Dashboard;