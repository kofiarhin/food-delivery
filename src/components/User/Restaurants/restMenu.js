import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import "./restMenu.sass";
import _ from "lodash";
import { restDefaultImage } from "../../../config";

class Menu extends Component {


    state = {

        menus: null,
        restData: null
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


    renderMenu = () => {

        //get list of menu items
        const menus = this.state.menus;
        let cat = [];

        //if menu items get categories
        // console.log(typeof menus)
        if (!_.isEmpty(menus)) {
            menus.forEach(menu => {
                cat.push(menu.category)
            });
            //get unique values of categories
            cat = [... new Set(cat)];

            //set template to null
            let template = null;

            template = cat.map(item => {
                return <div className="menu-unit">
                    <h2> {item} </h2>
                    {this.renderMenuItems(item)}
                </div>

            })

            return template;
        } else {

            return <div> <p className="feedback"> There are no menu items </p>  </div>
        }
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



    render() {


        console.log(this.state)

        return <div>

            <Header />

            <div className="rest-profile-wrapper">

                <div className="avatar" style={{
                    backgroundImage: `url(${restDefaultImage})`
                }}> </div>
                <h1 className="rest-name"> Capitol Restaurant </h1>
                <p className="location">Location: Airport </p>

            </div>

            <div className="menu-wrapper">
                {this.renderMenu()}
            </div>
        </div >
    }
}

export default Menu;