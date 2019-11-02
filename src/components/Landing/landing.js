import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header/header";

//styling
import "./landing.sass";

class Landing extends Component {
  state = {
    search: {
      required: true,
      value: ""
    }
  };

  handleChange = event => {
    const search = this.state.search;

    search.value = event.target.value;

    this.setState({
      search
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const search = this.state.search.value;

    if (search !== "") {
      this.props.history.push(`/search?q=${search}`);
    } else {
      this.setState({
        error: "Search Cannot be empty"
      });
    }
  };

  render() {
    return (
      <div className="landing">
        <Header />

        <div className="form-wrapper">
          <form onSubmit={event => this.handleSubmit(event)}>
            <h1 className="form-title"> Are you Hungry?</h1>
            <input
              type="text"
              name="search"
              placeholder="Enter your location"
              onChange={this.handleChange}
              value={this.state.search.value}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
