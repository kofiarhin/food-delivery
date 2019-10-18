import React, { Component } from "react";
import Header from "../../Header/header";
import CartTemplate from "../../widgets/cart/cartTemplate";
import "./viewCart.sass";
import _ from "lodash";
import { firebase } from "../../../firebase";
import { genDate } from "../../../config";

class ViewCart extends Component {

    state = {

        cart: null
    }

    componentDidMount() {

        const cart = JSON.parse(sessionStorage.getItem("cart"));

        if (cart) {

            this.setState({

                cart
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

                    cart.splice(index);
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

        return cart ? <CartTemplate
            cartData={cart}
            text="Place Order"
            link="user/order/placeOrder"
            clearCart={() => this.clearCart()}
            removeItem={(item) => this.removeItem(item)}


        /> : null;


    }

    placeOrder = () => {

        const cart = this.state.cart;

        const userOrder = {

            order: cart,
            userId: sessionStorage.getItem('loginId'),
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

    renderCta = () => {

        const cart = this.state.cart;

        return cart ? <div className="btn btn-main text-center" onClick={() => this.placeOrder()}> Place Order </div> : null;
    }

    render() {

        return <div>

            <Header />
            <div className="view-cart">

                {this.renderCart()}
                {this.renderCta()}

            </div>

        </div>
    }
}

export default ViewCart;