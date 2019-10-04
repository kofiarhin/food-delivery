import React, { Component } from "react";
import Header from '../../Header/header';
import { Link } from 'react-router-dom';
import { firebase, firebaseLooper } from '../../../firebase';
import { defaultImage } from "../../../config";
import _ from "lodash";

import "./rests.sass";



class Restaurants extends Component {


    state = {

        rests: null
    }

    componentWillMount() {

        //get list of all restaurants

        firebase.database().ref('restaurants').once("value").then(snapshot => {

            const rests = firebaseLooper(snapshot);

            if (rests) {

                this.setState({

                    rests
                })

            }
        })

    }



    renderRests = () => {

        const rests = this.state.rests;

        if (!_.isEmpty(rests)) {


            return rests.map(rest => {

                return <Link to={`/restaurant/${rest.id}`} className="rest-unit">

                    <div className="avatar"

                        style={{
                            backgroundImage: `url(${defaultImage})`
                        }}

                    ></div>
                    <div className="content">

                        <p> Name: {rest.name}</p>
                        <p> Location: {rest.location}</p>
                        <p> Contact: {rest.contact}</p>

                    </div>
                </Link>
            })
        }

    }



    renderCta = () => {

        const role = sessionStorage.getItem("role");
        console.log(role);

        if (role === "admin") {

            return <Link to="restaurant/add-restaurant" className="cta">Add Restaurant</Link>

        }

    }
    render() {


        // console.log(this.state);
        return <div>

            <Header />
            <div className="container">

                <div className="header-wrapper">

                    <h1 className="main-title">List of Restaurants</h1>

                    {this.renderCta()}
                </div>

                <div className="rest-wrapper">

                    {this.renderRests()}


                </div>


            </div>

        </div>
    }

}


export default Restaurants;