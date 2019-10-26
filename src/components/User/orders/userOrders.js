import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";

class UserOrders extends Component {


    state = {

        orders: null
    }

    componentDidMount() {

        //get list of orders

        // console.log(sessionStorage.getItem("loginId"))
        const loginId = sessionStorage.getItem("loginId")

        firebase.database().ref("orders").once('value').then(snapshot => {

            const orderData = firebaseLooper(snapshot);

            const userOrder = orderData.filter(order => {

                console.log(order.userInfo)
            })
        })
    }

    render() {

        return <div>

            <Header />

            <h1 className="main-title"> Get List of User Orders </h1>


        </div>
    }
}

export default UserOrders;