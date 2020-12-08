import React, { Component, useReducer } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  ListGroup,
  ListGroupItem,
  Image,
  Jumbotron,
  Nav,
  Tab,
} from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import download from "./download.png";
import { graphql, compose, withApollo } from "react-apollo";
import {
  profileQuery,
} from "../../queries/queries";
class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: props.location.state.foo,
      Restaurant: cookie.load("user"),
      userinfo: [],
      userimage: null,
      findmein: "",
      thingsilove: "",
      yelpingsince: "",
      loaded: false,
    };
  }
  componentDidMount() {
      console.log(this.state.customer);
    this.props.client
      .query({
        query: profileQuery,
        variables: {
          customerID: this.state.customer.toString(),
        },
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          userinfo: response.data.customerProfile,
          loaded:true
        });
      });
  }
  render() {
    console.log(this.state.userinfo);
    var display = null;
    if (this.state.loaded) {
      display = (
        <Container>
                    <Jumbotron fluid>
            <Container>
              <Row>

                <Col md={9}>
                  <Card>
                    <Card.Title>
                      {" "}
                      {this.state.userinfo.FirstName +
                        " " +
                        this.state.userinfo.LastName}
                    </Card.Title>
                    <a>Nickname:{this.state.userinfo.Nickname}</a>
                    <a>Location:{this.state.userinfo.City}</a>
                    <a>
                      {this.state.userinfo.State}, {this.state.userinfo.Country}
                    </a>
                    
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number:{this.state.userinfo.Password}
                      </ListGroupItem>
                      <ListGroupItem>
                        Email: {this.state.userinfo.Email}
                      </ListGroupItem>
                    </ListGroup>
                    <a style={{ fontStyle: "italic" }}>
                      "{this.state.userinfo.Headline}"
                    </a>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">About</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h3 style={{ color: "red" }}>About me</h3>
                    <h4 style={{ color: "black" }}>Find Me in </h4>
                    <p>{this.state.userinfo.Findme}</p>
                    <h4 style={{ color: "black" }}>Things I Love </h4>
                    <p>{this.state.userinfo.ThingsILove}</p>
                    <h4 style={{ color: "black" }}>Yelping Since </h4>
                    <p>{this.state.userinfo.AboutMe}</p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      );
    }

    return <>{display}</>;
  }
}

export default compose(
  withApollo,
  graphql(profileQuery, { name: "profileQuery" })
)(Userpage);
