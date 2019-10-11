import React, { Component } from "react";
import Header from "../../Header/header";
import { firebase } from "../../../firebase";
import Uploader from "../../widgets/Uploader/uploader";
import { foodDefaultImage } from "../../../config";

class AddMenuItem extends Component {


    state = {

        restId: this.props.match.params.id,
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
            },

            cover: {
                required: true,
                value: {
                    filename: "default",
                    fileUrl: foodDefaultImage
                }
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

        //grab data and perform some validation
        for (let key in formData) {

            dataToSubmit[key] = formData[key].value

            //check if field is required and empty
            if (formData[key].required && formData[key].value === "") {

                errors.push(`${key} is required`);
            }


        }

        //if errors set state of errors
        if (errors.length > 0) {


            this.setState({

                errors
            })

        } else {


            //set rest id
            dataToSubmit['restId'] = this.props.match.params.id;

            firebase.database().ref("menus").push(dataToSubmit).then(() => {

                sessionStorage.setItem("success", "item successfully added");
                this.props.history.push("/dashboard");
            })


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


    storeFilename = (fileData) => {

        const formData = this.state.formData;

        formData['cover'].value = fileData;

        this.setState({

            formData
        })
    };


    render() {

        console.log(this.state);

        return <div>


            <div>

                <Header />

                <h1 className="main-title text-center"> Add Menu Item </h1>
                <div className="form-wrapper">

                    <form onSubmit={this.handleSubmit}>


                        <div className="form-element">
                            <label> Cover </label>
                            <Uploader storeFilename={(filename) => this.storeFilename(filename)} />
                        </div>


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
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="desert">Dessert</option>
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