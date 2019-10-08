import React, { Component } from "react";
import Header from "../Header/header";
import { genPassword, genDate } from "../../config";
import { firebase, firebaseLooper } from '../../firebase';
import { Link } from "react-router-dom";

class AddRestaurant extends Component {

    state = {

        errors: null,
        newRest: null,

        formData: {

            name: {
                value: '',
                required: true
            },

            email: {

                value: "",
                required: true
            },

            contact: {
                value: "",
                required: true
            },

            location: {

                value: "",
                required: true
            }

        }
    }


    handleChange = (element) => {

        const newFormData = {

            ...this.state.formData
        }

        newFormData[element.id].value = element.event.target.value;

        this.setState({
            formData: newFormData
        })


    }


    handleSubmit = (event) => {

        event.preventDefault();

        let formData = this.state.formData;
        let errors = [];

        let dataToSubmit = {}

        for (let key in formData) {

            dataToSubmit[key] = formData[key].value

            //do some validation works
            if (formData[key].required && formData[key].value === "") {
                errors.push(`${key} is required`);

            }
        }

        if (errors.length > 0) {

            this.setState({

                errors
            })
        } else {

            //clear errors
            this.setState({

                errors: null
            })


            dataToSubmit['password'] = "password"//genPassword();
            dataToSubmit['createdOn'] = genDate();

            const loginData = {

                email: dataToSubmit.email,
                password: dataToSubmit.password,
                role: "rest",
                createdOn: genDate()
            }

            //insert dataToDatabase

            firebase.database().ref('login').push(loginData).then(() => {

                firebase.database().ref('login').orderByChild('email').equalTo(dataToSubmit.email).once("value").then(snapshot => {

                    const loginId = firebaseLooper(snapshot)[0].id;

                    dataToSubmit['loginId'] = loginId;

                    firebase.database().ref('restaurants').push(dataToSubmit).then(snapshot => {

                        sessionStorage.setItem('success', "account successfully created");
                        this.props.history.push("/dashboard")

                    });

                });

            })
            return;

            //add data to database

            firebase.database().ref('restaurants').push(dataToSubmit).then(() => {

                //reset the form
                // for (let key in formData) {
                //     formData[key].value = ""
                // }


                //fetch list of restaurants

                firebase.database().ref('restaurants').orderByChild('createdOn').limitToLast(1).once("value").then(snapshot => {

                    const rest = firebaseLooper(snapshot)[0];

                    const restId = rest.id;

                    this.setState({

                        newRest: restId
                    })

                });
                this.setState({

                    formData
                })
            });
        }
    }


    renderErrors = () => {

        const errors = this.state.errors;

        return errors ? errors.map(error => <p className="error"> {error} </p>) : null;
    }


    renderNewRest = () => {

        const newRest = this.state.newRest;

        return newRest ? <Link to={`/restaurant/${newRest}`} className="feedback"> Click Here  to view new Rest </Link> : null;

    }

    render() {

        return <div>

            <Header />
            <div className="container">
                <h1 className="main-title text-center">Add Restaurant</h1>

                <div className="form-wrapper">

                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <div className="form-element">
                            <input type="text" placeholder="Enter Name of restaurant"

                                onChange={(event) => this.handleChange({ event, id: "name" })}


                                value={this.state.formData.name.value}

                            />
                        </div>


                        <div className="form-element">
                            <input type="text" placeholder="Enter Email"

                                onChange={(event) => this.handleChange({ event, id: "email" })}

                                value={this.state.formData.email.value}
                            />

                        </div>

                        <div className="form-element">
                            <input type="number" placeholder="Enter Contact"

                                onChange={(event) => this.handleChange({ event, id: "contact" })}

                                value={this.state.formData.contact.value}

                            />
                        </div>

                        <div className="form-element">

                            <label> Select Location </label>

                            <select
                                onChange={(event) => this.handleChange({ event, id: "location" })}
                            >
                                <option value="dansoman"> -- select option -- </option>
                                <option value="dansoman"> Dansoman </option>

                                <option value="osu"> Osu </option>
                                <option value="cantonment"> Cantonment </option>

                                <option value="airport"> Airport </option>
                            </select>

                        </div>

                        {/* <div className="form-element">

                            <label>Free Delivery? </label>
                            <select
                                onChange={(event) => this.handleChange({ event, id: "delivery" })}
                            >
                                <option value="">-- select option --</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                        </div> */}


                        {this.renderErrors()}
                        {this.renderNewRest()}

                        <button type="submit"> Create Account </button>

                    </form>

                </div>
            </div>

        </div>
    }
}

export default AddRestaurant;
