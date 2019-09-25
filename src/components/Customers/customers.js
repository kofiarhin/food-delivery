import React, { Component } from "react";
import Header from "../Header/header";
import { Link } from "react-router-dom";
import { firebase, firebaseLooper } from "../../firebase";
import _ from "lodash";

class Customers extends Component {


    state = {

        users: []
    }


    componentWillMount() {


        //fetch list of customers
        firebase.database().ref('users').once("value").then(snapshot => {

            const users = firebaseLooper(snapshot);

            if (users.length > 0) {

                this.setState({
                    users
                })
            }

        })
    }

    renderUsers = () => {

        const users = this.state.users;


        if (!_.isEmpty(users)) {

            return <div className="user-unit-wrapper">

                {users.map((user) => {

                    return <div className="user-unit">

                        <div className="face"></div>

                        <div className="content">
                            <p className="name"> {user.name} </p>
                            <p className="email"> {user.email}</p>
                        </div>


                    </div>
                })}

            </div>
        }


    }
    render() {


        console.log(this.state);

        return <div>

            <Header />

            <div className="container">


                <div className="header-wrapper">
                    <h1 className="main-title"> List of Customers </h1>
                    <Link to="/add-customer">Add Customer</Link>
                </div>

                <div>

                    {this.renderUsers()}
                </div>
            </div>

        </div>

    }

}

export default Customers;