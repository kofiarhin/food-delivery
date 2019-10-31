import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";
import { Link } from "react-router-dom";


class RestDash extends Component {


    state = {

        role: null,
        restId: null,
        restData: null

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
                            restId,
                            restData
                        })
                    }
                })
            })


        } else {

            this.props.history.push("/login")

        }


    }


    renderDash = () => {

        const restData = this.state.restData;

        return restData ?


            <div className="dash-wrapper">

                <Link to={`/restaurant/addMenuItem/${this.state.restId}`} className="dash-unit">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    <p> Add Menu </p>
                </Link>


                <Link to={`/restaurant/${this.state.restId}`} className="dash-unit">
                    <i class="fas fa-menorah"></i>
                    <p> Menu </p>
                </Link>

                <Link to={`/rest/orders/${this.state.restId}`} className="dash-unit ">

                    <i class="fas fa-concierge-bell"></i>
                    <p>Orders</p>
                </Link>

            </div>

            : null;
    }


    renderName = () => {

        const restData = this.state.restData;

        return restData ? <h1 className="main-title text-center">  Welcome {restData.name}</h1> : null;
    }


    render() {


        console.log(this.state);

        return <div>


            {this.renderName()}

            {this.renderDash()}

        </div>
    }

}

export default RestDash;