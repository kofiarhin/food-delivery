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

        restData: null,
        restMenu: null,
        cart: [],
        errors: "",
        showError: false
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
                        restData,
                        restMenu
                    })
                })



            }
        })
    }



    renderProfile = () => {



        const rest = this.state.restData;

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


    handleDelete = (item) => {

        const menuId = item.id;

        const restMenu = this.state.restMenu;

        let position = null;
        restMenu.forEach((menuItem, index) => {

            if (menuItem.id === menuId) {

                position = index
            }
        })

        restMenu.splice(position, 1);

        firebase.database().ref(`menus/${menuId}`).remove().then(() => {

            console.log("item removed")
            this.setState({
                restMenu
            })

        })


    }

    renderMenu = () => {


        const menuData = this.state.restMenu;


        if (!_.isEmpty(menuData)) {

            return <RestMenuTemplate
                menuData={menuData}
                addToCart={(item) => this.addToCart(item)}
                handleDelete={(item) => this.handleDelete(item)}

            />
        }

    }


    addToCart = (item) => {

        //set item status to pending
        item.status = "pending";
        item.restName = this.state.restData.name;
        let cart = this.state.cart;
        let errors = [];


        //check if cart is empty
        if (!_.isEmpty(cart)) {

            //check if user is ordering from the same restaurant

            cart.forEach(cartItem => {

                if (cartItem.restId !== item.restId) {

                    errors.push("cannot add item from different restaurant");
                }

            })



            //check if item has already in cart
            cart.forEach((cartItem => {

                if (cartItem.id === item.id) {

                    errors.push('Item already added to cart');
                }

            }));



            //check if error array is empty
            if (errors.length > 0) {

                this.setState({
                    errors,
                    showError: true
                })
            } else {

                //add item to cart

                cart.push(item);
                const cartData = JSON.stringify(cart);
                sessionStorage.setItem("cart", cartData);
                this.setState({
                    cart
                });

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

                cart.splice(index, 1);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                this.setState({
                    cart
                })
            }

        });


    }

    renderCart = () => {

        const cart = this.state.cart;

        return (!_.isEmpty(cart)) ? <div className='cart mini-cart'>

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

    renderError = () => {

        const errors = this.state.errors;

        return this.state.showError ? <div className="error-container">

            <div className="inner">

                {errors.map(error => {

                    return <p className="error">  {error}</p>
                })}

            </div>
            <button className="btn btn-main" onClick={() => this.setState({
                showError: false
            })}>  Close</button>
        </div> : null;
    }

    render() {

        console.log(this.state);

        return <div className="restaurant">

            <Header />
            {this.renderProfile()}
            <div>

                {this.renderMenu()}
                {this.renderCart()}
                {this.renderError()}

            </div>



        </div >
    }

}

export default Restaurant;