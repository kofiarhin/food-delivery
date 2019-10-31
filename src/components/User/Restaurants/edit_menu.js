import React, { Component } from "react";
import { firebase } from '../../../firebase';
import _ from "lodash";
import Header from ".././../Header/header";
import Uploader from "../../widgets/Uploader/uploader";


class EditMenu extends Component {


    state = {

        menuData: null
    }


    componentDidMount() {

        const menuId = this.props.match.params.id;

        //get menu item
        firebase.database().ref(`menus/${menuId}`).once("value").then(snapshot => {

            const menuData = snapshot.val();

            if (!_.isEmpty(menuData)) {

                this.setState({

                    menuData
                })
            }
        })
    }

    handleChange = (element) => {

        const menuData = this.state.menuData;

        menuData[element.id] = element.event.target.value;

        this.setState({
            menuData
        })
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const menuId = this.props.match.params.id;
        const menuData = this.state.menuData;

        firebase.database().ref(`menus/${menuId}`).update(menuData).then(() => {

            this.props.history.push("/dashboard")
        })
    }

    storeFilename = (fileData) => {

        const menuData = this.state.menuData;
        menuData.cover = fileData;
        this.setState({
            menuData
        })

    }

    renderForm = () => {

        const menuData = this.state.menuData;

        return (!_.isEmpty(menuData)) ?

            <div className="form-wrapper">
                <form onSubmit={(event) => this.handleSubmit(event)}>

                    <div className="form-element">
                        <Uploader storeFilename={(fileData) => this.storeFilename(fileData)} />

                    </div>
                    <div className="form-element">
                        <label>Name</label>
                        <input type="text" name="title" value={menuData.name} onChange={(event) => this.handleChange({
                            event, id: "name"
                        })} />
                    </div>
                    <div className="form-element">
                        <label>Price</label>
                        <input type="text" name="title" value={menuData.price} onChange={(event) => this.handleChange({ event, id: "price" })} />
                    </div>

                    <button> Save Changes  </button>
                </form>

            </div>

            : null;
    }

    render() {


        console.log(this.state)

        return <div>

            <Header />
            <h1 className="main-title text-center"> Edit  Menu</h1>
            {this.renderForm()}
        </div>
    }
}


export default EditMenu;