import React, { Component } from "react";
import Header from "../Header/header";
import { firebase, firebaseLooper } from "../../firebase";
import { Link } from "react-router-dom";


class RestDash extends Component {


    state = {

        role: null,
        restId: null

    }


    componentDidMount() {

        const role = sessionStorage.getItem("role");

        if (role === "rest" || role === "admin") {

            this.setState({
                role
            })


            //get restId
            const loginId = sessionStorage.getItem("loginId");

            //fetch login details

            firebase.database().ref(`login/${loginId}`).once("value").then(snapshot => {

                const email = snapshot.val().email;

                firebase.database().ref('restaurants').orderByChild("email").equalTo(email).once("value").then(snapshot => {

                    const restData = firebaseLooper(snapshot)[0];
                    const restId = restData.id;

                    if (restId) {

                        this.setState({
                            restId
                        })
                    }
                })
            })


        } else {

            this.props.history.push("/login")

        }


    }


    render() {

        return <div>

            <div className="dash-wrapper">

                <Link to={`/restaurant/addMenuItem/${this.state.restId}`} className="dash-unit">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    <p> Add Menu </p>
                </Link>

            </div>

        </div>
    }

}

export default RestDash;