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

            if (!_.isEmpty(orders)) {
                this.setState({
                    orders
                })

            }

        });
    }


    renderOrders = () => {

        const orders = this.state.orders;
        if (!_.isEmpty(orders)) {

            return orders.map(order => {

                return <div className="order-unit">

                    <p> Order Date: {order.createdOn}</p>
                    <p>Order: Status: {order.status}</p>
                    <h2> User Info</h2>
                    <p> {order.userData.name} </p>
                    <p> {order.userData.location} </p>
                    <p> {order.userData.contact} </p>
                    <p> {order.userData.email} </p>
                    {console.log(order)}

                    <h2> Order Details </h2>

                    {order.order.map(item => {

                        return <div>

                            <p>  {item.name}</p>

                        </div>
                    })};
                </div>
            })
        }
    }


    render() {
        return <div>

            <Header />
            <h1 className="main-title text-center">List of Orders </h1>

            {this.renderOrders()}



        </div>
    }
}

export default AdminOrders;