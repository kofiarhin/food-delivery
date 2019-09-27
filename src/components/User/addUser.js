import React, { Component } from "react";
import Header from "../Header/header";

class AddUser extends Component {

    render() {

        return <div className="add-user">

            <Header />

            <div className="container">

                <h1 className="main-title text-center"> Add User </h1>
                <div className="form-wrapper">

                    <form>
                        <div className="form-element">
                            <input type='text' placeholder="name" />
                        </div>

                        <div className="form-element">
                            <input type='text' placeholder="name" />
                        </div>


                        <div className="form-element">
                            <input type='text' placeholder="name" />
                        </div>


                    </form>

                </div>
            </div>
        </div>
    }
}

export default AddUser;