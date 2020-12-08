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

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import ROrder from "./RestaurantOrder";
import { graphql, compose, withApollo } from "react-apollo";
import { restaurantOrderQuery } from "../../queries/queries";
// Orders page for restaurants
class RestaurantOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: cookie.load("user"),
      Orders: [],
      dispOrders: [],
      term: "delivery",
      term2: "pickup",
    };

    this.handleupsearch = this.handleupsearch.bind(this);
    this.handleupsearch2 = this.handleupsearch2.bind(this);
    this.updateterm = this.updateterm.bind(this);
    this.updateterm2 = this.updateterm2.bind(this);
  }
  componentDidMount() {
    const data = {
      restaurantID: this.state.restaurant,
    };
    console.log(data);
    this.props.client
      .query({
        query: restaurantOrderQuery,
        variables: data,
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          Orders: response.data.OrderQuery,
          dispOrders: response.data.OrderQuery,
        });
      });
  }
  updateterm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  updateterm2 = (e) => {
    this.setState({
      term2: e.target.value,
    });
  };

  handleupsearch = (e) => {
    var output = this.state.Orders.filter(
      (order) => order.OrderType == this.state.term
    );
    this.setState({
      dispOrders: output,
    });
  };
  handleupsearch2 = (e) => {
    var output = this.state.Orders.filter(
      (order) => order.OrderStatus == this.state.term2
    );
    console.log(this.state.term2);
    console.log(output);
    this.setState({
      dispOrders: output,
    });
  };

  render() {
    let redirectVar = null;

    if (!cookie.load("user")) {
      console.log(cookie.load("user"));
      return (redirectVar = <Redirect to="/login" />);
    }

    let eventsdisp = null;
    try {
      eventsdisp = this.state.dispOrders.map((eve) => {
        console.log(eve.RestaurantEmail);
        return (
          <React.Fragment>
            <Card>
              <Card.Title>
                {" "}
                <Link
                  to={{ pathname: "/user", state: { foo: eve.customerID } }}
                >
                  {eve.customerName}
                </Link>
              </Card.Title>
              <Card.Body>
                <a>Order Status: {eve.OrderStatus}</a>
                <br />
                <a>Order Time: {eve.OrderDateTime}</a>
              </Card.Body>
              <ROrder orderinfo={eve} />
            </Card>
          </React.Fragment>
        );
      });
    } catch {
      eventsdisp = <h1>loading orders</h1>;
    }

    return (
      <Container>
        <h1>Orders</h1>
        <Row>
          <Col>
            <Form inline>
              <Form.Label>Order Type</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm}>
                <option value="delivery">delivery</option>
                <option value="pickup">pickup</option>
              </Form.Control>
              <Button onClick={this.handleupsearch} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
          <Col>
            <Form inline>
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm2}>
                <option value="Order Received">New Orders</option>
                <option value="pickup">Delivered</option>
                <option value="pickup">Cancelled</option>
              </Form.Control>
              <Button onClick={this.handleupsearch2} variant="outline-success">
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {eventsdisp}
      </Container>
    );
  }
}
export default compose(
  withApollo,
  graphql(restaurantOrderQuery, { name: "restaurantOrderQuery" })
)(RestaurantOrder);
