import React, { Component } from "react";
import Header from "../../Header/header";
import CartTemplate from "../../widgets/cart/cartTemplate";
import "./viewCart.sass";
import _ from "lodash";
import { firebase, firebaseLooper } from "../../../firebase";
import { genDate } from "../../../config";

class ViewCart extends Component {

    state = {

        cart: null,
        userData: null,
        restData: null
    }

    componentDidMount() {

        const cart = JSON.parse(sessionStorage.getItem("cart"));


        if (cart) {

            //get userData;
            const loginId = sessionStorage.getItem("loginId");

            //get the rest id
            const restIds = cart.map(item => {

                return item.restId;
            });

            console.log(restIds);

            //get the firest rest id;
            const restId = restIds[0];

            console.log(restId);

            // console.log(loginId);

            firebase.database().ref('users').orderByChild('loginId').equalTo(loginId).once("value").then(snapshot => {

                const userData = firebaseLooper(snapshot)[0];
                if (!_.isEmpty(userData)) {


                    //get restData;
                    firebase.database().ref(`restaurants/${restId}`).once("value").then(snapshot => {

                        const restData = snapshot.val();

                        this.setState({

                            cart,
                            userData,
                            restData
                        })

                    })



                }


            })


        }
    }

    clearCart = () => {

        const cart = this.state.cart;
        sessionStorage.removeItem('cart');
        this.setState({
            cart: []
        })
    }

    removeItem = (item) => {

        const cart = this.state.cart;

        if (!_.isEmpty(cart)) {

            cart.forEach((cartItem, index) => {

                if (cartItem.id === item.id) {

                    cart.splice(index, 1);
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    this.setState({
                        cart
                    })
                }

            });

        }
    }

    renderCart = () => {

        const cart = this.state.cart;

        return (!_.isEmpty(cart)) ? <div>

            <h1 className="main-title text-center"> Your Cart!</h1>
            <CartTemplate
                cartData={cart}
                text="Place Order"
                link="user/order/placeOrder"
                clearCart={() => this.clearCart()}
                removeItem={(item) => this.removeItem(item)}


            />

        </div> : <h1 className="main-title text-center">  Cart is Empty </h1>;


    }

    placeOrder = () => {

        const cart = this.state.cart;
        const userData = this.state.userData;
        const restData = this.state.restData

        const { id: userId, name, loginId, location, contact, email } = userData;


        if (userData) {

            const userInfo = {

                name,
                userId,
                loginId,
                location,
                contact,
                email

            }

            const userOrder = {
                order: cart,
                userData: userInfo,
                restData,
                status: "pending",
                createdOn: genDate()
            };


            //place order
            firebase.database().ref("orders").push(userOrder).then(() => {

                //clear the cart
                sessionStorage.removeItem('cart');
                this.setState({
                    cart: []
                })
                this.props.history.push('/dashboard');
            })

        }



    }

    renderCta = () => {

        const cart = this.state.cart;

        return (!_.isEmpty(cart)) ? <div className="btn btn-main text-center" onClick={() => this.placeOrder()}> Place Orders </div> : null;
    }

    render() {

        // console.log(this.state);
        return <div>

            <Header />
            <div className="cart view-cart">

                {this.renderCart()}
                {this.renderCta()}

            </div>

        </div>
    }
}

export default ViewCart;