import React, { Component } from "react";
import Header from "../../Header/header";
import { Link } from "react-router-dom";
import { firebase, firebaseLooper } from "../../../firebase";
import { defaultImage } from "../../../config";
import UserList from "../../widgets/user/userList";
import _ from "lodash";

class Customers extends Component {


    state = {

        users: []
    }





    componentWillMount() {

        //authenticate user
        // this.auth();


        //fetch list of customers
        firebase.database().ref('users').once("value").then(snapshot => {

            const users = firebaseLooper(snapshot);

            const customers = users.filter(user => {

                return user.role === "customer";
            })

            if (users.length > 0) {

                this.setState({
                    users: customers
                })
            }

        })
    }


    auth = () => {

        const userId = sessionStorage.getItem('userId');
        const role = sessionStorage.getItem("role");

        if (!userId || role !== "admin") {

            this.props.history.push("/login")
        }

    }

    renderUsers = () => {

        const users = this.state.users;


        if (!_.isEmpty(users)) {

            return <UserList users={this.state.users} />
        }


    }
    render() {


        console.log(this.state);

        return <div>

            <Header />

            <div className="container">


                <div className="header-wrapper">
                    <h1 className="main-title"> List of Customers </h1>
                    <Link to="/user/add-user" className="cta">Add Customer</Link>
                </div>

                <div>

                    {this.renderUsers()}
                </div>
            </div>

        </div>

    }

}

export default Customers;