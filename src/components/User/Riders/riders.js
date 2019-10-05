import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import UserList from "../../widgets/user/userList";
import _ from "lodash";
import { Link } from "react-router-dom";


class Riders extends Component {

    state = {

        users: null
    }

    componentDidMount() {

        //fetch list of all riders

        firebase.database().ref('users').orderByChild("role").equalTo('rider').once("value").then(snapshot => {

            const users = firebaseLooper(snapshot);

            if (!_.isEmpty(users)) {

                this.setState({

                    users
                })
            }

        })

    }

    renderUsers = () => {

        const users = this.state.users;

        return (!_.isEmpty(users)) ? <UserList users={users} /> : null;


    }

    render() {

        return <div>

            <Header />

            <div className="container">

                <div className="header-wrapper"> <h1 className="main-title">List of Riders</h1> <Link className="cta" to="/user/add-user">Add Rider</Link>  </div>

                {this.renderUsers()}

            </div>

        </div>

    }
}

export default Riders;