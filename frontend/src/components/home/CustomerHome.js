import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import download from "./download.png";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Jumbotron,
  Image,
  Nav,
  Tab,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileUpdate from "./customeraboutupdate";
import ProfileUpdate2 from "./ProfileUpdate";
import { graphql, compose, withApollo } from "react-apollo";
import {
  profileQuery,
} from "../../queries/queries";
import { loginMutation } from "../../mutations/customermutations";
class CustomerHome extends Component {
  constructor(ownprops) {
    super(ownprops);
    console.log(ownprops);
    this.state = {
      user: cookie.load("user"),
      userinfo: "",
    };
  }
  componentDidMount() {
    this.props.client
      .query({
        query: profileQuery,
        variables: {
          customerID: this.state.user,
        },
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          userinfo: response.data.customerProfile,
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col md={9}>
                  <Card>
                    <Card.Title>
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
                        Phone Number: {this.state.userinfo.PhoneNo}
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
                  <Nav.Item>
                    <Nav.Link eventKey="second">Update Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Update About</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h1>About me</h1>
                    <h3>Find Me in : {this.state.userinfo.Findme}</h3>
                    <h3>Things I Love : {this.state.userinfo.ThingsILove}</h3>
                    <h3>Yelping Since : {this.state.userinfo.AboutMe}</h3>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <ProfileUpdate2></ProfileUpdate2>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <ProfileUpdate></ProfileUpdate>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default compose(
  withApollo,
  graphql(profileQuery, { name: "profileQuery" })
)(CustomerHome);
