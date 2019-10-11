import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebase, firebaseLooper } from "../../firebase";

class CustDash extends Component {


    state = {

        custData: null
    }

    componentDidMount() {


        //get user details

        const loginId = sessionStorage.getItem('loginId');
        const role = sessionStorage.getItem("role");


        firebase.database().ref('users').orderByChild("loginId").equalTo(loginId).once("value").then(snapshot => {

            const custData = firebaseLooper(snapshot)[0];

            if (custData) {


                this.setState({
                    custData
                })
            }
        })

        // firebase.database().ref(`login/${loginId}`).once("value").then(snapshot => {

        //     const email = snapshot.val().email;

        //     firebase.database().ref('users').orderByChild("email").equalTo(email).once("value").then(snapshot => {

        //         console.log(snapshot.val());
        //     })
        // })

    }


    renderDash = () => {


        const custData = this.state.custData;

        return custData ? <div
            className="dashboard"
        >

            <h1 className="main-title text-center"> Welcome <span>{custData.name}</span> </h1>
            <div className="dash-wrapper">

                <Link to="/customers" className="dash-unit ">
                    <i class="fas fa-user"></i>
                    <p> Profile </p>
                </Link>

                <Link to="/orders" className="dash-unit ">

                    <i class="fas fa-concierge-bell"></i>
                    <p>Orders</p>
                </Link>



            </div>


        </div> : null;
    }


    render() {


        console.log(this.state.custData);

        return <div> {this.renderDash()} </div>
    }
}


export default CustDash;