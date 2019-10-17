import React from "react";
import "./cartTemplate.sass"
import { Link } from "react-router-dom";
import { parse } from "url";

const CartTemplate = ({ cartData, link, text, clearCart, removeItem, placeOrder }) => {


    const renderCart = () => {

        return cartData.map(item => {

            return <div className="cart-item">
                <h2 className="item-name"> {item.name} </h2>
                <p className="item-price"> GHC {item.price} </p>
                <i class="fas fa-window-close close" onClick={() => removeItem(item)}></i>
            </div>
        })
    }

    const renderTotal = () => {

        let total = 0;

        cartData.forEach(item => {

            total += parseInt(item.price)
        });



        return <div>

            <p className='total'> Total: {total}</p>
        </div>

    }

    const renderCta = () => {

        return <div className="button-wrapper">
            {/* <Link to={link} className="cta"> {text}</Link> */}
            {/* <div className="cta clear" onClick={() => clearCart()}> Clear Cart</div> */}
        </div>

    }
    return <div className="cart-wrapper">


        {renderCart()}
        {renderTotal()}
        {renderCta()}

        <div className="order btn btn-block btn-main text-center" onClick={() => placeOrder(this.state.cart)}> Place Order </div>

    </div>
}

export default CartTemplate;