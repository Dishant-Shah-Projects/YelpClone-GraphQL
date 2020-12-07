import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {
  Navbar,
  NavDropdown,
  Nav,
  FormControl,
  Button,
  Form,
  Container,
  Card,
  FormGroup,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Menuitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iteminfo: props.iteminfo,
      quantity: 0,
      cost: props.iteminfo.DishPrice,
      total: 0,
    };
    this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
  }

  quantityChangeHandler = (e) => {
    this.setState({
      quantity: e.target.value,
      total: e.target.value * this.state.cost,
    });
  };
  addtocart = (e) => {
    this.props.action({
      ItemID: this.state.iteminfo.ItemID,
      DishName: this.state.iteminfo.DishName,
      DishPrice: this.state.total,
      DishQuantity: this.state.quantity,
    });
  };
  render() {
    return (
      <>
        <Card>
          <Form>
            <Row>
              <Col>
                <a>{this.state.iteminfo.DishName}</a>
              </Col>
              <Col>
                <input
                  onChange={this.quantityChangeHandler}
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="Amount"
                  required
                />
              </Col>
              <Col>
                <Button onClick={this.addtocart}>Add to cart</Button>
              </Col>
            </Row>
              <Row>
                <a>{this.state.iteminfo.Description}</a>{" "}
              </Row>
              <Row>
                <a>{this.state.iteminfo.Category}</a>
              </Row>
              <a>{this.state.iteminfo.Mainingredients}</a>
              <br />
              <a>Price: ${this.state.iteminfo.DishPrice}</a>
          </Form>
        </Card>
      </>
    );
  }
}
export default Menuitem;
