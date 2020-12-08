import React, { Component } from "react";
import "../../App.css";

import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Accordion,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { graphql, compose, withApollo } from "react-apollo";
import { updateStatusMutation } from "../../mutations/restaurantmutations";
// Class component for each Order under Orders for Restaurant
class ROrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Orderinfo: props.orderinfo,
      Orderitems: [],
      Orderstate: props.orderinfo.OrderStatus,
    };

    console.log(this.state);
    this.updateterm = this.updateterm.bind(this);
    this.handleupdate = this.handleupdate.bind(this);
  }
  componentDidMount() {}

  updateterm = (e) => {
    this.setState({
      Orderstate: e.target.value,
    });
  };
  handleupdate = (e) => {
    const data2 = {
      orderID: this.state.Orderinfo.orderID.toString(),
      OrderStatus: this.state.Orderstate,
    };
    console.log(data2);
    this.props
      .updateStatusMutation({
        variables: data2,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          authFlag: true,
        });
      });
  };
  render() {
    var Output = null;
    console.log(this.state.Orderitems);
    console.log(this.state.Orderinfo.Items);
    var total = 0;
    try {
      if (this.state.Orderinfo.Items.length !== 0) {
        Output = this.state.Orderinfo.Items.map((eve) => {
          total = total + eve.DishPrice;
          return (
            <React.Fragment>
              <tr>
                <td>{eve.DishName}</td>
                <td>{eve.DishQuantity}</td>
                <td>{eve.DishPrice}</td>
              </tr>
            </React.Fragment>
          );
        });
      }
    } catch {}
    let optionvalue = null;
    if (this.state.Orderinfo.OrderType === "delivery") {
      optionvalue = (
        <React.Fragment>
          <option value="Order Received">Recieved</option>
          <option value="Preparing">Preparing</option>
          <option value="On The Way">OnTheWay</option>
          <option value="Delivered">Delivered</option>
        </React.Fragment>
      );
    } else {
      optionvalue = (
        <React.Fragment>
          <option value="Order Received">Recieved</option>
          <option value="Preparing">Preparing</option>
          <option value="Pick Up ready">Ready for Pickup</option>
          <option value="Picked Up">Picked Up</option>
        </React.Fragment>
      );
    }

    return (
      <Container>
        <Form>
          <Form.Label>Order Type</Form.Label>
          <Form.Control as="select" required onChange={this.updateterm}>
            {optionvalue}
          </Form.Control>
          <Button onClick={this.handleupdate} variant="outline-success">
            Update Status
          </Button>
        </Form>
        <Accordion defaultActiveKey="1">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Order Details!
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Total</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Output}
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th>{total}</th>
                </tr>
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Accordion>
      </Container>
    );
  }
}
export default compose(
  withApollo,
  graphql(updateStatusMutation, { name: "updateStatusMutation" })
)(ROrder);
