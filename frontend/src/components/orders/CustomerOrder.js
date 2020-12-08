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
import Order from "./order";
import { graphql, compose, withApollo } from "react-apollo";
import { customerOrderQuery } from "../../queries/queries";
// Orders page for users
class UserOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: cookie.load("user"),
      Orders: [],
      dispOrders: [],
      Sorted: false,
      Filtered: false,
      OrderStatus: " Order Received",
    };
    this.updateterm2 = this.updateterm2.bind(this);
    this.handleupsearch = this.handleupsearch.bind(this);
  }
  componentDidMount() {
    const data = {
      customerID: this.state.user,
      Sorted: this.state.Sorted.toString(),
    };
    console.log(data);
    this.props.client
      .query({
        query: customerOrderQuery,
        variables: data,
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          Orders: response.data.OrderQuery,
          dispOrders:response.data.OrderQuery,
        });
      });
  }
  updateterm2 = (e) => {
    this.setState({
      term2: e.target.value,
    });
  };
  updateterm = (e) => {
    this.setState({
      term: e.target.value,
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
  updateterm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  handleupcoming = (e) => {
    e.preventDefault();
    console.log(this.state.user);
    if (this.state.Sorted) {
      this.setState({
        Sorted: false,
      });
    } else {
      this.setState({
        Sorted: true,
      });
    }
    const data = {
      customerID: this.state.user,
      Sorted: this.state.Sorted.toString(),
    };
    console.log(data);
    this.props.client
      .query({
        query: customerOrderQuery,
        variables: data,
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          Orders: response.data.OrderQuery,
          dispOrders:response.data.OrderQuery,
        });
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

  render() {
    let eventsdisp = null;
    if (!cookie.load("user")) {
      console.log(cookie.load("user"));
      return <Redirect to="/login" />;
    }
    if (this.state.dispOrders) {
      eventsdisp = this.state.dispOrders.map((eve) => {
        return (
          <React.Fragment>
            <Card>
              <Card.Title>Restaurant Name: {eve.restaurantName}</Card.Title>
              <Card.Body>
                <a>Order Status: {eve.OrderStatus}</a>
                <br />
                <a>Order Time: {eve.OrderDateTime}</a>
              </Card.Body>

              <Order Orderinfo={eve} />
            </Card>
          </React.Fragment>
        );
      });
    }

    return (
      <Container>
        <h1>Orders</h1>
        <Row>
          <Col>
            <Form inline>
              <Button onClick={this.handleupcoming} variant="outline-success">
                Change Sort
              </Button>
            </Form>
          </Col>
          <Col>
            <Form inline>
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select" required onChange={this.updateterm2}>
                <option value="Order Received">Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="On The Way">OnTheWay</option>
                <option value="Delivered">Delivered</option>
                <option value="Pick Up ready">Ready for Pickup</option>
                <option value="Picked Up">Picked Up</option>
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
  graphql(customerOrderQuery, { name: "customerOrderQuery" })
)(UserOrders);
