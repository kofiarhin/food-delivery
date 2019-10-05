import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase } from "../../../firebase";
import { restDefaultImage } from "../../../config";

class Restaurant extends Component {


    state = {

        rest: null
    }


    componentWillMount() {

        const id = this.props.match.params.id

        //fetch restaurant
        firebase.database().ref(`restaurants/${id}`).once("value").then(snapshot => {

            const rest = snapshot.val();

            if (rest) {

                this.setState({
                    rest
                })
            }
        })
    }



    renderRest = () => {


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

    render() {

        return <div>

            <Header />
            <div className="container">

                {this.renderRest()}

            </div>

        </div >
    }

}

export default Restaurant;