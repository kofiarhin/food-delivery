import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase, firebaseLooper } from "../../../firebase";
import { restDefaultImage } from "../../../config";
import RestMenuTemplate from "../../widgets/user/restaurant/restMenuTemplate";
import _ from "lodash";
import { Link } from "react-router-dom";

class Restaurant extends Component {


    state = {

        rest: null,
        restMenu: null,
        cart: []
    }


    componentWillMount() {

        const id = this.props.match.params.id

        const cart = JSON.parse(sessionStorage.getItem("cart"));

        if (cart) {

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



    handleSubmit = (event) => {

        event.preventDefault();
        const cart = this.state.cart;

        const cartData = {

            itemId: event.target.item.value,
            name: event.target.name.value,
            price: parseInt(event.target.price.value),
            fileUrl: event.target.fileUrl.value
        }


        if (cart && cart.length > 0) {




        } else {

            this.addItemToCart(cartData)
        }


    }


    addItemToCart = (cartData) => {
        const cart = this.state.cart;

        cart.push(cartData);

        this.setState({

            cart
        })
    }


    renderMenu = () => {


        const menuData = this.state.restMenu;


        if (!_.isEmpty(menuData)) {

            return <RestMenuTemplate menuData={menuData} handleSubmit={(event) => this.handleSubmit(event)} />
        }

    }


    renderCart = () => {


        return <div className="cart-items-wrapper">

            <h1>Your Cart</h1>

            <div className="cart-item">

                <div className="avatar"></div>
                <div className="content">
                    <p className="cart-item-name">Name: Grilled Pork </p>
                    <p className="cart-item-price">Price: 400 </p>
                </div>

                <div>

                </div>
            </div>

        </div>
    }
    render() {

        // console.log(this.state);

        return <div>

            <Header />
            <div className="container">

                {/* {this.renderProfile()} */}

                <div className="layout">

                    <div className="col-60">
                        {this.renderMenu()}
                    </div>
                    <div className="col-40"> {this.renderCart()}</div>

                </div>


            </div>

        </div >
    }

}

export default Restaurant;