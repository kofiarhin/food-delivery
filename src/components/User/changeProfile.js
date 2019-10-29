import React, { Component } from "react";
import Header from "../Header/header";
import Uploader from "../widgets/Uploader/uploader";
import { firebase, firebaseLooper } from "../../firebase";
import _ from "lodash";

class ChangeProfile extends Component {


    state = {

        profileData: null,
        userData: null
    }


    componentWillMount() {

        const loginId = sessionStorage.getItem("loginId");


        //get users from  database
        firebase.database().ref("users").once("value").then(snapshot => {

            const users = firebaseLooper(snapshot);

            const user = users.find(user => {

                return user.loginId === loginId
            });

            if (!_.isEmpty(user)) {

                this.setState({

                    userData: user
                })
            }
        })
    }


    storeFilename = (fileData) => {
        this.setState({
            profileData: fileData

        })
    }


    handleProfileChange = () => {

        const loginId = sessionStorage.getItem("loginId");
        const userData = this.state.userData;

        //update database with new profileData;

        firebase.database().ref(`users/${userData.id}`).update({
            profileData: this.state.profileData
        }).then(() => {

            this.props.history.push("/dashboard")

        })
    }


    renderCta = () => {

        const profileData = this.state.profileData;

        return profileData ? <div className="btn btn-main text-center" onClick={() => this.handleProfileChange()}>  Change Profile  </div> : null;
    }
    render() {

        console.log(this.state);
        return <div>

            <Header />

            <div className="profile-change-wrapper">
                <Uploader storeFilename={(filename) => this.storeFilename(filename)} />
                {this.renderCta()}
            </div>

        </div>
    }
}

export default ChangeProfile;