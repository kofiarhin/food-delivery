import React, { Component } from "react";
import Header from "../Header/header";
import { firebase } from '../../firebase';
import Userprofile from "../widgets/user/userProfile";
import _ from "lodash";
import "./user.sass";

class User extends Component {


    state = {

        user: null
    }


    componentDidMount() {


        const userId = this.props.match.params.id;
        console.log(userId);

        //get user

        firebase.database().ref(`users/${userId}`).once('value').then(snapshot => {

            const user = snapshot.val();

            if (user) {

                this.setState({
                    user
                })
            }
        })

    }


    renderUser = () => {


        const user = this.state.user;

        if (!_.isEmpty(user)) {

            return <Userprofile user={user} />
        }


    }



    render() {

        return <div className="profile">

            <Header />
            <div className="container">

                <h1 className="main-title text-center"> Profile </h1>

                {this.renderUser()}

            </div>


            <div>

                {/* get role of user and render details */}

            </div>

        </div>
    }
}

export default User;