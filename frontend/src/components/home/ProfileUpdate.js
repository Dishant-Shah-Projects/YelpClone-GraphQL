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
import { profileUpdateMutation } from "../../mutations/customermutations";
class ProfileUpdate2 extends Component {
  constructor(ownprops) {
    super(ownprops);
    this.state = {
      details: "",
      User_name: "",
      city: "",
      state: "",
      country: "",
      nickname: "",
      userEmail: cookie.load("user"),
      email: "",
      DOB: "",
      phone: "",

      authFlag: false,
    };
    this.detailsChangeHandler = this.detailsChangeHandler.bind(this);
    this.user_nameChangeHandler = this.user_nameChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.nicknameChangeHandler = this.nicknameChangeHandler.bind(this);
    this.DOBChangeHandler = this.DOBChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);

    this.submit = this.submit.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  DOBChangeHandler = (e) => {
    this.setState({
      DOB: e.target.value,
    });
  };

  detailsChangeHandler = (e) => {
    this.setState({
      details: e.target.value,
    });
  };
  user_nameChangeHandler = (e) => {
    this.setState({
      User_name: e.target.value,
    });
  };
  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  stateChangeHandler = (e) => {
    this.setState({
      state: e.target.value,
    });
  };
  countryChangeHandler = (e) => {
    this.setState({
      country: e.target.value,
    });
  };
  nicknameChangeHandler = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };
  phoneChangeHandler = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  submit = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      City: this.state.city,
      State: this.state.state,
      Country: this.state.country,
      Nickname: this.state.nickname,
      customerID: this.state.userEmail,
      Email: this.state.email,
      phone: this.state.phone,
      Headline: this.state.details,
      DOB: this.state.DOB,
    };

    console.log(this.state);
    this.props
      .profileUpdateMutation({
        variables: {
          City: this.state.city,
          State: this.state.state,
          Country: this.state.country,
          Nickname: this.state.nickname,
          customerID: this.state.userEmail,
          Email: this.state.email,
          PhoneNo: this.state.phone.toString(),
          Headline: this.state.details,
          DOB: this.state.DOB.toString(),
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={this.user_nameChangeHandler}
          />
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nickname"
            onChange={this.nicknameChangeHandler}
          />
          <Form.Label>Headline </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            onChange={this.detailsChangeHandler}
          />
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            placeholder="Normal text"
            onChange={this.DOBChangeHandler}
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.cityChangeHandler}
          />
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.stateChangeHandler}
          />
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.countryChangeHandler}
          />
          <Form.Label>Contact Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.phoneChangeHandler}
          />
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Normal text"
            onChange={this.emailChangeHandler}
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
)(ProfileUpdate2);
