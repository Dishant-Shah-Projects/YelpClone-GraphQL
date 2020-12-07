import React, { Component } from "react";
import "../../App.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import Rating from "react-rating";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { graphql, compose, withApollo } from "react-apollo";
import { reviewGetQuery } from "../../queries/queries";
class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant,
      Reviews: [],
    };
  }
  componentDidMount() {
    const data = {
      restaurantID: this.state.restaurant.toString(),
    };
    this.props.client
      .query({
        query: reviewGetQuery,
        variables: data,
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          Reviews: response.data.restaurantReviews,
        });
      });
  }

  render() {
    let navLogin = null;
    let redirectVar = null;

    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/login">
            <span className="glyphicon glyphicon-log-in"></span> Login
          </Link>
        </li>
      </ul>
    );
    if (!cookie.load("user")) {
      console.log(cookie.load("user"));
      return (redirectVar = <Redirect to="/login" />);
    }

    let eventsdisp = null;
    try {
      eventsdisp = this.state.Reviews.map((eve) => {
        console.log(this.state.restaurant);
        return (
          <React.Fragment>
            <Card>
              <Card.Title>{eve.customerName}</Card.Title>
              <Rating initialRating={eve.Rating} />
              <Card.Body>{eve.Review}</Card.Body>
            </Card>
          </React.Fragment>
        );
      });
    } catch {
      eventsdisp = <h2>Still Loading</h2>;
    }

    return (
      <Container>
        <h1>Reviews</h1>
        {eventsdisp}
      </Container>
    );
  }
}

export default compose(
  withApollo,
  graphql(reviewGetQuery, { name: "reviewGetQuery" })
)(Reviews);
