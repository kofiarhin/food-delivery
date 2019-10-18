import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import _ from "lodash";

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

    renderItem = (item) => {

        const orders = item.order;

        return orders.map(order => {

            return <div className="order-item-unit">

                <p>{order.name}</p>
                <p>Price: {order.price}</p>
                <p> Restaurant: {order.restName} </p>
                <p> Status: {order.status} </p>

            </div>
        })
    }





    renderOrders = () => {

        const orders = this.state.orders;

        // console.log(orders)

        return orders ? orders.map(item => {

            return <div> {this.renderItem(item)} </div>
        }) : null;
    }

    render() {

        console.log(this.state);
        return <div>

            <Header />

            {this.renderOrders()}


        </div>

    }
}

export default Orders;