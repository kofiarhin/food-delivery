import React, { Component } from "react";
import { firebase, firebaseLooper } from "../../firebase";



import Header from "../Header/header"

import { genDate } from "../../config";

class Register extends Component {

    state = {

        isLoading: false,
        errors: [],
        formData: {

            name: {

                value: "",
                required: true
            },

            email: {
                value: "",
                required: true
            },

            password: {
                value: '',
                required: true
            },

            contact: {

                value: "",
                required: true
            },

            location: {

                value: "",
                required: false
            }
        }
    }

    componentWillMount() {

        //check session storage form session items;



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


    handleSubmit = (event) => {

        event.preventDefault();

        const formData = this.state.formData;

        let dataToSubmit = {};

        let errors = [];
        //
        for (let key in formData) {

            dataToSubmit[key] = formData[key].value

            if (formData[key].value === "") {

                errors.push(`${key} is required`);
            }

        }


        if (errors.length > 0) {

            this.setState({
                errors
            })
        } else {
            this.setState({

                errors: [``]
            })

            console.log("process registration");

            dataToSubmit['role'] = "customer";
            dataToSubmit['createdOn'] = genDate();

            // console.log(dataToSubmit);

            //submit data to database

            this.setState({

                isLoading: true
            })


            console.log(dataToSubmit);

            //insert data to login table
            // email, password, role
            const loginData = {

                email: dataToSubmit.email,
                password: dataToSubmit.password,
                role: dataToSubmit.role,
                createdOn: dataToSubmit.createdOn
            }

            //insert data to login table
            //get login id and store to useres table
            //loginId, name, email, password, role, createdon
            console.log(loginData);

            firebase.database().ref('login').push(loginData).then(() => {

                //fetch last insert id
                firebase.database().ref('login').orderByChild("createdOn").limitToLast(1).once("value").then(snapshot => {

                    const user = firebaseLooper(snapshot)[0];

                    const loginId = user.id;

                    dataToSubmit['loginId'] = loginId;

                    firebase.database().ref('users').push(dataToSubmit).then(() => {

                        sessionStorage.setItem("success", "Accont Successfully created");
                        this.props.history.push("/login");

                    });
                })

            })
        }

    }


    renderErrors = () => {

        const errors = this.state.errors;

        return errors ? errors.map((error, index) => {
            return <p key={index} className="error" > {error}</p>
        }) : null;

    }


    renderButton = () => {

        return this.state.isLoading ? <div className="loading"> Loading.... </div> : <button className="btn btn-main" type="submit"> Create Account</button>;
    }


    render() {

        return <div className="register">

            <Header />

            <div className="container">

                <h1 className="main-title text-center"> Create An Account</h1>

                <div className="form-wrapper form-center">

                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-element">

                            <input type="text" placeholder="Enter Name" onChange={(event) => this.handleChange(({ event, id: "name", blur: false }))} value={this.state.formData.name.value} />
                        </div>

                        <div className="form-element">

                            <input type="text" placeholder="Enter Email" onChange={(event) => this.handleChange({ event, id: "email", blur: false })}
                                value={this.state.formData.email.value}
                            />
                        </div>


                        <div className="form-element">

                            <input type="text" placeholder="Enter Password" onChange={(event) => this.handleChange({ event, id: "password", blur: false })}
                                value={this.state.formData.password.value}
                            />
                        </div>

                        <div className="form-element">
                            <input type="text" placeholder="Enter Contact"

                                onChange={(event) => this.handleChange({ event, id: "contact", blur: false })}
                                value={this.state.formData.contact.value}
                            />
                        </div>


                        <div className="form-element">

                            <select onChange={(event) => this.handleChange({ event, id: "location", blur: false })}>

                                <option>Select Location</option>
                                <option value="dansoman">Dansoman</option>
                                <option value="ridge">Ridge</option>
                                <option value="cantonment">Cantonment</option>

                            </select>
                        </div>

                        {this.renderErrors()}

                        {this.renderButton()}



                    </form>
                </div>
            </div>

        </div>
    }
}


export default Register;