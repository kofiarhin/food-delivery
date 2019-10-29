import React, { Component } from "react";
import Header from "../../Header/header";
import _ from "lodash";
import { firebase, firebaseLooper } from "../../../firebase";

class AdminOrders extends Component {


    state = {

        orders: null
    }



    componentDidMount() {


        firebase.database().ref('orders').once("value").then(snapshot => {

            const orders = firebaseLooper(snapshot);
            console.log(orders);

        });
    }


    render() {
        return <div>

            <Header />


        </div>
    }
}

export default AdminOrders;