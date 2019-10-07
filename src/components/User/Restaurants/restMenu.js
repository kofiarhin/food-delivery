import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../../firebase";
import Header from "../../Header/header";
import "./restMenu.sass"

class Menu extends Component {


    state = {

        menus: null,
        restId: this.props.match.params.id
    }


    componentWillMount() {

        const restId = this.props.match.params.id;

        //get restaurant menu

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
                    menus: data
                })
            }
        })

    }


    renderMenu = () => {

        //get list of menu items
        const menus = this.state.menus;
        let cat = [];

        //if menu items get categories
        if (menus) {
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

        return <div>

            <Header />

            <div className="menu-wrapper">
                {this.renderMenu()}
            </div>
        </div >
    }
}

export default Menu;