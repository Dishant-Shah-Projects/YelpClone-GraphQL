import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";

import "bootstrap/dist/css/bootstrap.min.css";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import MapContainer from "./RestaurantSearch";
import {
  Container,
  Jumbotron,
  Form,
  Button,
  FormControl,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { graphql, compose, withApollo } from "react-apollo";
import {
  getAuthorsQuery,
  restaurantSearchQuery,
  profileQuery,
} from "../../queries/queries";
import { loginMutation } from "../../mutations/customermutations";
class RestaurantMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locat: null,
      restaurants: [],
      searchcolumn: "",
      searchterm: "",
    };
    this.updateterm = this.updateterm.bind(this);
    this.updatecat = this.updatecat.bind(this);
    this.handleupsearch = this.handleupsearch.bind(this);
  }
  componentDidMount() {
    var locat = [];
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      const locat = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setState({ locat });
    });
    const data = {
      term: this.state.searchcolumn,
      value: this.state.searchterm,
    };
    var location = [];
    this.props.client
      .query({
        query: restaurantSearchQuery,
        variables: {
          term: this.state.searchcolumn,
          value: this.state.searchterm,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          restaurants: response.data.restaurantSearch,
          loaded: true,
        });
      });
  }
  updateterm = (e) => {
    this.setState({
      searchterm: e.target.value,
    });
  };
  updatecat = (e) => {
    this.setState({
      searchcolumn: e.target.value,
    });
  };
  handleupsearch = () => {
    this.props.client
      .query({
        query: restaurantSearchQuery,
        variables: {
          term: this.state.searchcolumn,
          value: this.state.searchterm,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          restaurants: response.data.restaurantSearch,
          loaded: true,
        });
      });
  };

  render() {
    //iterate over books to create a table row

    //if not logged in go to login page
    console.log(this.state.restaurants);
    var eventsdisp = null;
    eventsdisp = this.state.restaurants.map((eve) => {
      return (
        <>
          <ListGroup.Item>
            <Link
              to={{
                pathname: "/restaurant",
                state: { foo: eve.restaurantID },
              }}
            >
              {eve.Name}
            </Link>
          </ListGroup.Item>
        </>
      );
    });
    if (cookie.load("Customer")) {
      return (
        <Container>
          <Jumbotron>
            <Form inline justify-content-center>
              <center>
                <h2>Restaurant Search Bar</h2>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={this.updateterm}
                />
                <Form.Control as="select" required onChange={this.updatecat}>
                  <option value="cuisines">Cusine</option>
                  <option value="location">Location</option>
                  <option value="mode of delivery">Mode of Delivery</option>
                  <option value="DishName">Dish</option>
                </Form.Control>
                <Button onClick={this.handleupsearch} variant="outline-success">
                  Search
                </Button>
              </center>
            </Form>
          </Jumbotron>
          <h1> Restaurants Near Me</h1>
          <ListGroup>{eventsdisp}</ListGroup>
          <MapContainer
            location={this.state.locat}
            rest={this.state.restaurants}
          />
        </Container>
      );
    } else if (cookie.load("restaurant")) {
      return (
        <MapContainer
          location={this.state.locat}
          rest={this.state.restaurants}
        />
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default compose(
  withApollo,
  graphql(restaurantSearchQuery, { name: "restaurantSearchQuery" })
)(RestaurantMaps);
