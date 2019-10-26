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

        firebase.database().ref('orders').once('value').then(snapshot => {

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



    renderOrder = () => {

        const orders = this.state.orders;

        if (!_.isEmpty(orders)) {

            return orders.map(order => {

                return <div className="order-item">

                    <div className="user-info">

                        <p className="name"> Customer Name: {order.userInfo.name}</p>
                        <p className="location"> Location: {order.userInfo.location}</p>
                        <p className="contact"> Contact: {order.userInfo.contact}</p>

                    </div>


                    {/* list of orders */}
                    <div>

                        {order.order.map(item => {

                            return <p> {item.name}</p>;
                        })}

                    </div>

                </div>
            })
        }
    }
    render() {


        console.log(this.state);

        //TODO -- CLEAN UP THE STRUCTURE OF THE ORDER
        return <div>

            <Header />
            <h1 className="main-title"> List of Orders</h1>

            <div className="order-items-wrapper">
                {this.renderOrder()}

            </div>
        </div>
    }
}

export default RestOrders;