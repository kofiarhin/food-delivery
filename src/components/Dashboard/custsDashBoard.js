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



    }


    renderDash = () => {


        const custData = this.state.custData;

        return custData ? <div
            className="dashboard"
        >

            <h1 className="main-title text-center"> Welcome <span>{custData.name}</span> </h1>
            <div className="dash-wrapper">

                <Link to={`/user/${custData.id}`} className="dash-unit ">
                    <i class="fas fa-user"></i>
                    <p> Profile </p>
                </Link>

                <Link to="/user/orders" className="dash-unit ">

                    <i class="fas fa-concierge-bell"></i>
                    <p>Orders</p>
                </Link>



            </div>


        </div> : null;
    }


    render() {




        return <div> {this.renderDash()} </div>
    }
}


export default CustDash;