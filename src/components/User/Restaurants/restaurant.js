import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import { restDefaultImage } from "../../../config";
import RestMenuTemplate from "../../widgets/user/restaurant/restMenuTemplate";
import _ from "lodash";
import CartTemplate from "../../widgets/cart/cartTemplate";
import { Link } from "react-router-dom";

class Restaurant extends Component {


    state = {

        rest: null,
        restMenu: null,
        cart: [],
        error: ""
    }


    componentWillMount() {

        const id = this.props.match.params.id

        const cart = JSON.parse(sessionStorage.getItem("cart"));

        if (!_.isEmpty(cart)) {

            this.setState({
                cart
            })
        }


        //fetch restaurant
        firebase.database().ref(`restaurants/${id}`).once("value").then(snapshot => {

            const restData = { id: snapshot.key, ...snapshot.val() };

            if (restData) {

                const restId = restData.id;
                //get list of menu
                firebase.database().ref(`menus`).orderByChild('restId').equalTo(restId).once("value").then(snapshot => {

                    const restMenu = firebaseLooper(snapshot);
                    restMenu.restName = restData.name
                    this.setState({
                        rest: restData,
                        restMenu
                    })
                })



            }
        })
    }



    renderProfile = () => {


        const rest = this.state.rest;

        return rest ?
            <div className="rest-profile-wrapper">

                <div className="avatar"

                    style={{
                        backgroundImage: `url(${restDefaultImage})`
                    }}
                ></div>
                <h1 className="rest-name">{rest.name}</h1>
                <p className="location">Location: {rest.location}</p>
            </div> : null;
    }




    renderMenu = () => {


        const menuData = this.state.restMenu;


        if (!_.isEmpty(menuData)) {

            return <RestMenuTemplate menuData={menuData} addToCart={(item) => this.addToCart(item)} />
        }

    }


    addToCart = (item) => {

        //set item status to pending
        item.status = "pending";
        item.restName = this.state.rest.name;

        let cart = this.state.cart;

        if (!_.isEmpty(cart)) {

            //check if item has already in cart
            const check = cart.find((cartItem => {
                return cartItem.id === item.id

            }));

            if (check) {

                this.setState({
                    error: "Item already added to cart"
                })
            } else {

                //add item to cart

                cart.push(item);
                const cartData = JSON.stringify(cart);
                sessionStorage.setItem("cart", cartData);
                this.setState({
                    cart
                })

            }

        } else {


            cart.push(item);
            const cartData = JSON.stringify(cart);
            sessionStorage.setItem("cart", cartData);
            this.setState({
                cart
            })


        }


    }


    removeItem = (item) => {

        const cart = this.state.cart;
        let itemIndex = null;
        cart.forEach((cartItem, index) => {

            if (cartItem.id === item.id) {

                cart.splice(index);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                this.setState({
                    cart
                })
            }

        });


    }

    renderCart = () => {

        const cart = this.state.cart;

        return (!_.isEmpty(cart)) ? <div className='cart'>

            <CartTemplate cartData={cart} text="proceed to cart" link="/user/viewCart" clearCart={this.clearCart} removeItem={(item) => this.removeItem(item)} />

            <Link to="/user/viewCart" class="btn btn-main text-center"> Proceed to Checkout </Link>

        </div> : null;

    }


    clearCart = () => {


        sessionStorage.removeItem('cart');
        this.setState({
            cart: []
        })
    }

    render() {

        console.log(this.state.cart);

        return <div>

            <Header />
            {this.renderProfile()}
            <div className="layout">

                <div className="menu"> {this.renderMenu()}</div>
                {this.renderCart()}

            </div>



        </div >
    }

}

export default Restaurant;