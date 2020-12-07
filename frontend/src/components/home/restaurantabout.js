import React, { Component } from "react";
import "../../App.css";
// import cookie from 'react-cookies';
import axios from "axios";
import { Redirect } from "react-router";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { setRawCookie } from "react-cookies";
import cookie from "react-cookies";
import { graphql, compose, withApollo } from "react-apollo";
import { profileUpdateMutation } from "../../mutations/restaurantmutations";
class ProfileUpdate3 extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      RestaurantName: "",
      RestaurantCusine: "",
      RestaurantDescription: "",
      RestaurantPublicEmail: "",
      RestaurantPublicPhone: "",
      RestaurantHours: "",
      RestaurantEmail: cookie.load("user"),
      RestaurantLocation: null,

      authFlag: false,
    };
    this.RestaurantNameChangeHandler = this.RestaurantNameChangeHandler.bind(
      this
    );
    this.RestaurantCusineChangeHandler = this.RestaurantCusineChangeHandler.bind(
      this
    );
    this.RestaurantDescriptionChangeHandler = this.RestaurantDescriptionChangeHandler.bind(
      this
    );
    this.RestaurantPublicEmailChangeHandler = this.RestaurantPublicEmailChangeHandler.bind(
      this
    );
    this.RestaurantPublicPhoneChangeHandler = this.RestaurantPublicPhoneChangeHandler.bind(
      this
    );
    this.RestaurantHoursChangeHandler = this.RestaurantHoursChangeHandler.bind(
      this
    );
    this.RestaurantLocationChangeHandler = this.RestaurantLocationChangeHandler.bind(
      this
    );

    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  RestaurantNameChangeHandler = (e) => {
    this.setState({
      RestaurantName: e.target.value,
    });
  };

  RestaurantCusineChangeHandler = (e) => {
    this.setState({
      RestaurantCusine: e.target.value,
    });
  };
  RestaurantDescriptionChangeHandler = (e) => {
    this.setState({
      RestaurantDescription: e.target.value,
    });
  };
  RestaurantPublicEmailChangeHandler = (e) => {
    this.setState({
      RestaurantPublicEmail: e.target.value,
    });
  };
  RestaurantPublicPhoneChangeHandler = (e) => {
    this.setState({
      RestaurantPublicPhone: e.target.value,
    });
  };
  RestaurantHoursChangeHandler = (e) => {
    this.setState({
      RestaurantHours: e.target.value,
    });
  };
  RestaurantLocationChangeHandler = (e) => {
    this.setState({
      RestaurantLocation: e.target.value,
    });
  };

  submit = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      Cusine: this.state.RestaurantCusine,
      Description: this.state.RestaurantDescription,
      ContactEmail: this.state.RestaurantPublicEmail,
      PhoneNo: this.state.RestaurantPublicPhone,
      Hours: this.state.RestaurantHours,
      restaurantID: this.state.RestaurantEmail,
      PickMethod: this.state.RestaurantLocation,
    };

    console.log(data);

    //set the with credentials to true
    console.log(this.state);
    this.props
      .profileUpdateMutation({
        variables: {
      Cusine: this.state.RestaurantCusine,
      Description: this.state.RestaurantDescription,
      ContactEmail: this.state.RestaurantPublicEmail,
      PhoneNo: this.state.RestaurantPublicPhone,
      Hours: this.state.RestaurantHours,
      restaurantID: this.state.RestaurantEmail,
      PickMethod: this.state.RestaurantLocation,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          authFlag: true,
        });
      });
  };

  render() {
    return (
      <>
        <br />
        <Form>
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={this.RestaurantNameChangeHandler}
          />
          <Form.Label>Cusine</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nickname"
            onChange={this.RestaurantCusineChangeHandler}
          />
          <Form.Label>Description </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            onChange={this.RestaurantDescriptionChangeHandler}
          />
          <Form.Label>Public Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.RestaurantPublicEmailChangeHandler}
          />
          <Form.Label>Public Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.RestaurantPublicPhoneChangeHandler}
          />
          <Form.Label>Hours</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.RestaurantHoursChangeHandler}
          />
          <Form.Label>Pick method</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.RestaurantLocationChangeHandler}
          />

          <Button variant="primary" type="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default compose(
  withApollo,
  graphql(profileUpdateMutation, { name: "profileUpdateMutation" })
)(ProfileUpdate3);
