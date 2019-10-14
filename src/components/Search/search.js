import React, { Component } from "react";
import Header from "../Header/header";
import { firebase, firebaseLooper } from "../../firebase";
import { restDefaultImage } from "../../config";
import { Link } from "react-router-dom";

class Search extends Component {


    state = {

        rests: null,
        search: null,
        error: null
    }


    componentDidMount() {

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let query = params.get('q');

        console.log(query);

        firebase.database().ref('restaurants').orderByChild('location').equalTo(query).once("value").then(snapshot => {

            const rests = firebaseLooper(snapshot);

            this.setState({

                rests
            })

        })



    }


    renderRestUnits = () => {

        const rests = this.state.rests;

        return rests ? rests.map(rest => {

            return <Link className="rest-unit" to={`restaurant/${rest.id}`}>

                <div className="avatar"

                    style={{
                        backgroundImage: `url(${restDefaultImage})`
                    }}

                > </div>
                <div className="content">
                    <p className="name">Name: {rest.name}</p>
                    <p className="location">Location: {rest.location}</p>
                    <p className="contact">Contact: {rest.contact}</p>
                </div>
            </Link>

        }) : null;
    }


    renderError = () => {

        const error = this.state.error;

        return error ? <p> {error}</p> : null;
    }
    render() {

        return <div>

            <Header />

            <div className="container">

                <h1 className="main-title">Search for restaurants around: {this.state.search} </h1>

                <div className="rest-wrapper">

                    {this.renderRestUnits()}
                    {this.renderError()}

                </div>

            </div>
        </div>
    }
}

export default Search;