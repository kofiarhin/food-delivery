import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase } from "../../../firebase";

class AddMenuItem extends Component {


    state = {

        restId: null,
        restData: null,

        formData: {

            name: {
                required: true,
                value: ""
            },

            price: {

                required: true,
                value: ""
            },

            category: {
                required: true,
                value: ""
            }
        }
    }


    componentDidMount() {

        const restId = this.props.match.params.id;
        //fetch rest data;

        firebase.database().ref(`restaurants/${restId}`).once("value").then(snapshot => {

            const restData = snapshot.val();

            if (restData) {

                this.setState({
                    restData
                })
            }


        })




    }



    handleSubmit = (e) => {

        e.preventDefault();

        let dataToSubmit = {}
        const formData = this.state.formData;
        const restId = this.state.restId;
        let errors = [];


        for (let key in formData) {

            dataToSubmit[key] = formData[key].value

            if (formData[key].required && formData[key].value === "") {

                errors.push(`${key} is required`);
            }


        }

        if (errors.length > 0) {


            this.setState({

                errors
            })

        } else {



            //update  rest



        }
    }


    handleChange = (element) => {

        const formData = this.state.formData;
        const field = formData[element.id];

        field.value = element.event.target.value;

        formData[element.id] = field;

        this.setState({
            formData
        })
    }

    renderErrors = () => {

        const errors = this.state.errors;

        return errors ? errors.map(error => <p className="error"> {error} </p>) : null;
    }

    render() {


        return <div>


            <div>

                <Header />

                <h1 className="main-title text-center"> Add Menu Item </h1>
                <div className="form-wrapper">

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-element">
                            <input
                                type="text" placeholder="Enter Name"
                                onChange={(event) => this.handleChange({ event, id: "name" })}
                                value={this.state.formData.name.value}
                            />


                        </div>

                        <div className="form-element">
                            <input
                                type="number" placeholder="Price per quantity"
                                onChange={(event) => this.handleChange({ event, id: "price" })}
                                value={this.state.formData.name.price}
                            />
                        </div>

                        <div className="form-element">

                            <select

                                onChange={(event) => this.handleChange({ event, id: "category" })}

                            >

                                <option value="">-- Select Category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="breakfast">Lunch</option>
                                <option value="breakfast">Dinner</option>
                                <option value="breakfast">Dessert</option>
                            </select>
                        </div>

                        {this.renderErrors()}
                        <button type="submit"> Add to Menu</button>
                    </form>
                </div>

            </div>

        </div>
    }
}

export default AddMenuItem;