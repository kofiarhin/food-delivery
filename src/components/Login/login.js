import React, { Component } from "react";
import Header from "../Header/header";
import { firebase, firebaseLooper } from "../../firebase";
import _ from "lodash";

class Login extends Component {

    state = {
        isLoading: false,
        errors: [],
        formData: {

            email: {

                value: "",
                required: true
            },

            password: {

                value: "",
                required: true
            }
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


    handleSubmit = (event) => {

        event.preventDefault();

        const formData = this.state.formData

        let dataToSubmit = {}
        let errors = [];
        for (let key in formData) {

            dataToSubmit[key] = formData[key].value

            if (formData[key].required && formData[key].value === "") {

                errors.push(`${key} is required`);
            }
        }



        //check if there are any errors
        if (errors.length > 0) {



            //set the errors
            this.setState({
                errors
            })


        } else {


            this.setState({
                isLoading: true
            })



            firebase.database().ref("login").orderByChild("email").equalTo(dataToSubmit.email).once("value").then(snapshot => {

                const loginData = firebaseLooper(snapshot)[0];

                //check if there is later and compare the password        
                if (loginData && loginData.password === dataToSubmit.password) {


                    //compare password
                    sessionStorage.setItem("loginId", loginData.id);
                    sessionStorage.setItem("role", loginData.role);
                    this.props.history.push("/dashboard");
                } else {

                    let errors = this.state.errors;

                    errors.push("Invalid email/password combination");
                    this.setState({

                        isLoading: false,
                        errors
                    })
                }
            })

            return
            //fetch user from database

        }

    }


    renderButton = () => {

        return this.state.isLoading ? <div className="loading"> Loading </div> : <button className="btn btn-main"> Login</button>
    }


    renderErrors = () => {

        const errors = this.state.errors;

        return errors ? errors.map((error, key) => {

            return <p key={key} className="error"> {error}</p>
        }) : null;

    }

    render() {

        return <div>

            <Header />

            <div className="container">


                <div className="form-wrapper form-center">

                    <h1 className="main-title text-center"> Login</h1>


                    <form onSubmit={(event) => this.handleSubmit(event)}>

                        <div className="form-element">
                            <input type="text" placeholder="Email" onChange={(event) => this.handleChange({ event, id: "email", blur: false })} value={this.state.formData.email.value} />
                        </div>

                        <div className="form-element">
                            <input type="text" placeholder="Password" onChange={(event) => this.handleChange({ event, id: "password", blur: false })} value={this.state.formData.password.value} />
                        </div>

                        {this.renderErrors()}
                        {this.renderButton()}
                    </form>

                </div>

            </div>

        </div>
    }
}

export default Login;