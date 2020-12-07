import React, { Component } from "react";
import Rating from "react-rating";
import cookie from "react-cookies";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Row, FormGroup, FormLabel, Button } from "react-bootstrap";
import { graphql, compose, withApollo } from "react-apollo";
import { ratingAddMutation } from "../../mutations/customermutations";
class RatingReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      customer: cookie.load("user"),
      restaurant: props.restaurantemail,
    };
    this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
    this.reviewChangeHandler = this.reviewChangeHandler.bind(this);
    this.submitreview = this.submitreview.bind(this);
  }
  ratingChangeHandler = (value) => {
    console.log(value);
    this.setState({
      rating: value,
    });
  };
  reviewChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      review: e.target.value,
    });
  };
  submitreview = () => {
    console.log(this.state);
    const data = {
      Rating: this.state.rating.toString(),
      Review: this.state.review,
      customerID: this.state.customer,
      restaurantID: this.state.restaurant.toString(),
    };
    console.log(data);
    this.props
      .ratingAddMutation({
        variables: data,
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
        <Form>
          <Form.Group as={Row}>
            <Form.Label>Rating</Form.Label>
            <Rating onChange={this.ratingChangeHandler} />
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label>Review</Form.Label>
            <textarea onChange={this.reviewChangeHandler}></textarea>
          </Form.Group>
          <Form.Group as={Row}>
            <Button onClick={this.submitreview}>Submit Review</Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}
export default compose(
  withApollo,
  graphql(ratingAddMutation, { name: "ratingAddMutation" })
)(RatingReview);
