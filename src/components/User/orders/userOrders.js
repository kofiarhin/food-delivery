import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import _ from "lodash";
import "./user_order.sass";

class UserOders extends Component {

    state = {

        orders: null
    }

    componentWillMount() {


        //get loginId of user
        const loginId = sessionStorage.getItem("loginId");

        //get orders from database
        firebase.database().ref('orders').once('value').then(snapshot => {

            const orders = firebaseLooper(snapshot);

            //filter out user order
            const userOrder = orders.filter(order => {
                //compate loginId  and return customer order
                return order.userData.loginId === loginId;
            });

            //check if order is empty
            if (!_.isEmpty(userOrder)) {

                //set state of order to order
                this.setState({

                    orders: userOrder
                })
            }


        });



    }


    renderOrder = () => {

        const orders = this.state.orders;

        if (!_.isEmpty(orders)) {

            return orders.map(order => {

                return <div className="user-order-unit">

                    <p className="date"> Date: {order.createdOn}</p>
                    <p className="status"> Status: {order.status}</p>
                    <p className="item-title"> Order Items </p>
                    {/* render order items */}
                    {order.order.map(item => {

                        console.log(item);
                        return <div className="order-item">
                            <div className="item-avatar" style={{
                                backgroundImage: `url(${item.cover.fileUrl})`
                            }}></div>
                            <div className="content">
                                <p className="item-name"> Name: {item.name}</p>
                                <p className="item-price"> Price: GHC{item.price}</p>
                            </div>
                        </div>
                    })}

                </div>
            })
        }
    }

    clearHistory = () => {

        let orders = this.state.orders;

        orders.forEach(order => {

            firebase.database().ref(`orders/${order.id}`).remove().then(() => {


                this.setState({

                    orders: null
                })

            })


        })

    }

    renderCta = () => {

        return this.state.orders ? <div className="btn btn-main text-center" onClick={() => this.clearHistory()}> Clear History </div> : null;
    }
    render() {

        return <div>

            <Header />

            <h1 className="main-title text-center"> Order History! </h1>

            <div className="user-order-wrapper">

                {this.renderOrder()}

                {this.renderCta()}

            </div>



        </div>
    }
}

export default UserOders;