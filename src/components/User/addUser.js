import React, { Component } from "react";
import Header from "../Header/header";
import { firebase, firebaseLooper } from "../../firebase";
import { genDate } from "../../config";
import { Link } from "react-router-dom";

class AddUser extends Component {


    state = {

        errors: null,

        formData: {

            name: {

                value: "",
                required: true
            },

            email: {
                value: '',
                required: true
            },

            contact: {
                value: "",
                required: true
            },

            location: {

                value: '',
                required: true
            },

            role: {

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

        let errors = [];

        const formData = this.state.formData;
        let dataToSubmit = {};


        for (let key in formData) {


            //do some validation work
            if (formData[key].required && formData[key].value === "") {

                errors.push(`${key} is required`);
            }

            dataToSubmit[key] = formData[key].value;

        }

        if (errors.length > 0) {

            console.log(errors);
            this.setState({

                errors
            })
        } else {

            console.log("process user");

            this.setState({
                errors: null
            })


            dataToSubmit['createdOn'] = genDate();

            firebase.database().ref('users').push(dataToSubmit).then(() => {

                //fetch list of user

                firebase.database().ref('users').orderByChild("createdOn").limitToLast(1).once("value").then(snapshot => {

                    const userId = firebaseLooper(snapshot)[0].id;

                    if (userId) {

                        console.log(userId);

                        this.setState({

                            newUser: userId
                        })
                    }
                })

            })

        }


    }

    renderErrors = () => {

        const errors = this.state.errors;

        return errors ? errors.map(error => <p className="error"> {error} </p>) : null;
    }


    renderNewUser = () => {


        console.log(this.state);

        const newUser = this.state.newUser;

        if (newUser) {

            return <Link to={`/user/${newUser}`} className="info"> Click to view new user </Link>
        }
    }

    render() {

        return <div className="add-user">

            <Header />

            <div className="container">

                <h1 className="main-title text-center"> Add User </h1>
                <div className="form-wrapper">

                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-element">
                            <input type='text' placeholder="name"
                                onChange={(event) => this.handleChange({ event, id: "name" })}

                                value={this.state.formData.name.value}
                            />
                        </div>

                        <div className="form-element">
                            <input type='text' placeholder="email"

                                onChange={(event) => this.handleChange({ event, id: "email" })}

                                value={this.state.formData.email.value}
                            />
                        </div>


                        <div className="form-element">
                            <input type='text' placeholder="Location"

                                onChange={(event) => this.handleChange({ event, id: "location" })}

                                value={this.state.formData.location.value}

                            />
                        </div>

                        <div className="form-element">
                            <input type='number' placeholder="Contact"

                                onChange={(event) => this.handleChange({ event, id: "contact" })}

                                value={this.state.formData.contact.value}

                            />
                        </div>

                        <div className="form-element">

                            <select className="select"

                                onChange={(event) => this.handleChange({ event, id: "role" })}

                                value={this.state.formData.role.value}
                            >
                                <option value=""> Select Role </option>
                                <option value="customer"> Customer </option>
                                <option value="rider"> Rider </option>
                            </select>
                        </div>

                        {this.renderErrors()}
                        {this.renderNewUser()}

                        <button type="submit" name="submit"> Create Account </button>

                    </form>

                </div>
            </div>
        </div>
    }
}

export default AddUser;