import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import _ from "lodash";
import { restDefaultImage } from "../../../config";
import RestMenuTemplate from "../../widgets/user/restaurant/restMenuTemplate";

class Menu extends Component {


    state = {

        menus: null,
        restData: null,
        cart: []
    }


    componentWillMount() {

        const restId = this.props.match.params.id;

        //get restaurant

        firebase.database().ref(`restaurants/${restId}`).once("value").then(snapshot => {


            const restData = snapshot.val();

            firebase.database().ref(`menus`).orderByChild("restId").equalTo(restId).once("value").then(snapshot => {

                const menus = firebaseLooper(snapshot);

                const data = menus.sort((a, b) => {

                    if (a.category > b.category) {

                        return 1;
                    } else {

                        return -1;
                    }
                })


                // console.log(data);

                //filter data

                if (menus) {

                    this.setState({
                        menus: data,
                        restData
                    })
                }
            })
        })

        //get restaurant menu



    }


    handleSubmit = (event) => {

        event.preventDefault();

        const cart = this.state.cart;

        const item = event.target.item.value;
        let quantity = parseInt(event.target.quantity.value);
        const price = parseInt(event.target.price.value);

        if (!quantity) {

            quantity = 1;
        }

        const itemCost = price * quantity;

        const dataToSubmit = {
            item,
            quantity,
            price,
            itemCost
        }

        cart.push(dataToSubmit);

        console.log(cart);





    }


    renderMenu = () => {

        //get list of menu items
        const menus = this.state.menus;
        let cat = [];


        return menus ? <RestMenuTemplate menuData={menus} handleSubmit={(event) => this.handleSubmit(event)} /> : null;


    }


    renderMenuItems = (item) => {


        const menus = this.state.menus;

        const datas = menus.filter(menu => {

            return menu.category === item;
        });

        return datas.map(data => {

            return <div className="menu-content">

                <div className="avatar"></div>

                <div className="content">
                    <p> Name: {data.name} </p>
                    <p> Price: {data.price} </p>
                </div>
            </div>
        })
    }


    renderProfile = () => {

        const restData = this.state.restData;



        return restData ? <div className="rest-profile-wrapper">

            <div className="avatar" style={{
                backgroundImage: `url(${restDefaultImage})`
            }}> </div>
            <h1 className="rest-name"> {restData.name} </h1>
            <p className="location">Location: {restData.location} </p>

        </div> : null;
    }


    render() {


        console.log(this.state)

        return <div>

            <Header />


            {this.renderProfile()}

            <div>
                {this.renderMenu()}
            </div>
        </div >
    }
}

export default Menu;