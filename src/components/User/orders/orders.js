import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import _ from "lodash";
import { Link } from "react-router-dom";
import "./orders.sass";

class Orders extends Component {


    state = {

        orders: []
    }

    componentDidMount() {

        //get list of orders
        const loginId = sessionStorage.getItem("loginId");
        console.log(loginId);
        firebase.database().ref('orders').orderByChild('userId').equalTo(loginId).once("value").then(snapshot => {

            const orders = firebaseLooper(snapshot);

            console.log(orders);

            if (!_.isEmpty(orders)) {

                this.setState({

                    orders
                })
            }
        })
    }





    renderOrderDetails = (order) => {

        return (!_.isEmpty(order)) > 0 ? order.map(item => {

            return <div className="order-unit">

                <p>Name: {item.name} </p>
                <p>Price: {item.name} </p>
                <p>Status: {item.status} </p>
            </div>
        }) : null;
    }
    renderOrderItems = (order) => {

        return (!_.isEmpty(order)) ? this.renderOrderDetails(order.order) : null;
    }


    renderOrders = () => {

        const orders = this.state.orders;

        return (!_.isEmpty(orders)) ? orders.map((order, index) => {

            index += 1;

            return <div>

                <div className="order-wrapper">
                    <div className='order-item'>
                        <p className="order-index">Order: {index}</p>
                        {this.renderOrderItems(order)}
                    </div>
                </div>

            </div>

        }) : null;

    }




    render() {

        console.log(this.state);
        return <div>

            <Header />

            <h1 className="main-title text-center"> Your Order </h1>
            {this.renderOrders()}


        </div>

    }
}

export default Orders;