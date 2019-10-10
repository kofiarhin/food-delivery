import React from "react";
import Header from "../../Header/header";
import "./viewCart.sass";

const ViewCart = (props) => {

    const cart = JSON.parse(sessionStorage.getItem('cart'));

    const renderCart = () => {


        return cart ? cart.map(item => {

            return <div className="cart-unit">

                <div className="avatar"> </div>
                <div className="content">
                    <p className="cart-item"> {item.name} </p>
                    <p className="cart-price"> {item.price} </p>
                </div>
                <form>
                    <button className="btn"> Remove Item </button>
                </form>
            </div>
        }) : null;
    }

    const handleClear = () => {

        console.log("clear cart")

    }

    const renderCta = () => {

        return cart ? <div className="btn-wrapper">

            <button className="btn btn-success"> Proceed to payment </button>
            <button className="btn btn-danger" onClick={() => handleClear()}> Clear Cart </button>

        </div> : null;
    }
    return <div>

        <Header />
        <div className="container">

            <h1 className="main-title text-center">Your Cart </h1>
            <div className="cart-wrapper">
                {renderCart()}
                {renderCta()}
            </div>

        </div>
    </div>
}

export default ViewCart;