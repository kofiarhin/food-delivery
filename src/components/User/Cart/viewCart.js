import React, { Component } from "react";
import Header from "../../Header/header";
import CartTemplate from "../../widgets/cart/cartTemplate";
import "./viewCart.sass";


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

    renderCart = () => {

        const cart = this.state.cart;

        return cart ? <CartTemplate
            cartData={cart}
            text="Place Order"
            link="user/order/placeOrder"
            clearCart={() => this.clearCart()}
        /> : null;

    }

    render() {

        return <div>

            <Header />
            <div className="cart">

                {this.renderCart()}

            </div>

        </div>
    }
}

export default ViewCart;