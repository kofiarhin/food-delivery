import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import _ from "lodash";
import "./orders.sass"

class RestOrders extends Component {


    state = {

        orders: null

    }

    componentDidMount() {


        //get login id

        const loginId = sessionStorage.getItem("loginId");

        // console.log(loginId);  //current loginId = -LquAriyPoT3OVc5KYEZ

        //get list of all orders
        //filter order of restaurant

        firebase.database().ref('orders').orderByChild("createdOn").once('value').then(snapshot => {

            const orders = firebaseLooper(snapshot);

            if (!_.isEmpty(orders)) {

                //get restOrders
                const restOrders = orders.filter(order => {

                    return order.restData.loginId === loginId
                });


                if (!_.isEmpty(restOrders)) {

                    this.setState({

                        orders: restOrders
                    })
                }
            }
        })

    }

    completeOrder = (orderId) => {

        const orders = this.state.orders;

        if (!_.isEmpty(orders)) {

            const order = orders.find(order => {

                return order.id === orderId
            });

            //set status to complete
            order.status = "complete";

            orders[orderId] = order;


            //update database
            firebase.database().ref(`orders/${orderId}`).update({
                status: "complete"
            }).then(() => {

                //re - render the dom
                this.setState({

                    orders
                })
            })


        }

    }


    deleteOrder = (orderId) => {

        const orders = this.state.orders;
        let position = null;
        orders.forEach((order, index) => {

            if (order.id === orderId) {

                position = index
            }
        })



        //update database

        firebase.database().ref(`orders/${orderId}`).remove().then(() => {

            orders.splice(position, 1);

            this.setState({

                orders
            })

        })



    }

    renderCta = (order) => {

        const status = order.status;

        //check the status of the order
        switch (status) {


            case "complete":
                return <button className="btn btn-danger" onClick={() => this.deleteOrder(order.id)}> Delete Order</button>

            case "pending":
                return <button className="btn btn-success" onClick={() => this.completeOrder(order.id)}>Complete Order</button>
            default:
                return null;
        }
    }



    renderOrder = () => {

        const orders = this.state.orders;


        if (!_.isEmpty(orders)) {

            return orders.map(order => {

                return <div className="order-item">

                    <div className="user-info">

                        <h2 className="name">Name: {order.userData.name}</h2>
                        <p className="location"> Location: {order.userData.location}</p>
                        <p className="contact"> Contact: {order.userData.contact}</p>
                        <p className="contact"> Date: {order.createdOn}</p>
                    </div>
                    {/* list of orders */}
                    <div>

                        {order.order.map(item => {
                            return <p> {item.name}</p>;
                        })}

                    </div>

                    <p> Status: {order.status}</p>

                    {this.renderCta(order)}
                </div>
            })
        } {

            return <div className="feedback"> No Orders </div>
        }
    }

    clearHistory = () => {

        console.log("clear all orders");
    }
    render() {

        //TODO -- CLEAN UP THE STRUCTURE OF THE ORDER
        return <div>

            <Header />
            <h1 className="main-title text-center"> List of Orders</h1>

            <div className="order-items-wrapper">
                {this.renderOrder()}



            </div>
        </div>
    }
}

export default RestOrders;