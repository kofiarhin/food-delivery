import React, { Component } from "react";
import Header from "../Header/header";


class AddRestaurant extends Component {

    state = {

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
            },

            delivery: {

                value: ""
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

        let dataToSubmit = {}

        for (let key in formData) {

            dataToSubmit[key] = formData[key].value
        }

        console.log(dataToSubmit);
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

                        <div className="form-element">

                            <label>Free Delivery? </label>
                            <select

                                onChange={(event) => this.handleChange({ event, id: "delivery" })}
                            >
                                <option value="">-- select option --</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                        </div>


                        <button type="submit"> Create Account </button>

                    </form>

                </div>
            </div>

        </div>
    }
}

export default AddRestaurant;
