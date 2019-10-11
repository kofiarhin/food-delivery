import React, { Component } from "react";
import Header from "../../Header/header";
import "./viewCart.sass";

class ViewCart extends Component {

    state = {
        cart: JSON.parse(sessionStorage.getItem("cart"))
    }

    componentDidMount() {


        const cart = JSON.parse(sessionStorage.getItem('cart'));

    }


    handleRemove = (event) => {

        event.preventDefault();

        const cart = this.state.cart;
        const itemId = event.target.itemId.value;

        cart.forEach((item, index) => {

            if (item.itemId === itemId) {

                cart.splice(index, 1)
            }

        });


        const sessionData = JSON.stringify(cart);
        sessionStorage.setItem("cart", sessionData);
        this.setState({

            cart
        })

    }

    renderCart = () => {

        const cart = this.state.cart;

        return cart ? cart.map(item => {



            return <div className="cart-unit">

                <div className="avatar" style={{
                    backgroundImage: `url(${item.fileUrl})`,
                }}> </div>

                <div className="content">
                    <p className="cart-item"> {item.name} </p>
                    <p className="cart-price"> {item.price} </p>
                </div>

                <form onSubmit={(event) => this.handleRemove(event)}>

                    <input type="hidden" name="itemId" value={item.itemId} />

                    <button type="submit" className="btn" > Remove Item </button>
                </form>
            </div >
        }) : null;
    }

    handleClear = () => {

        console.log("clear cart")

    }

    renderCta = () => {

        const cart = this.state.cart;

        return cart ? <div className="btn-wrapper">

            <button className="btn btn-success"> Proceed to payment </button>
            <button className="btn btn-danger" onClick={() => this.handleClear()}> Clear Cart </button>

        </div> : null;
    }

    render() {

        return <div>

            <Header />
            <div className="container">

                <h1 className="main-title text-center">Your Cart </h1>
                <div className="cart-wrapper">
                    {this.renderCart()}
                    {this.renderCta()}
                </div>

            </div>
        </div>
    }

}

export default ViewCart;