import React, {Component} from 'react';

import {Container,Card,Row,Col,Button,Form,FormControl,Jumbotron,Image,ListGroup,ListGroupItem,Tab,Nav} from 'react-bootstrap'
import cookie from 'react-cookies';

import axios from 'axios';
import Reviews from '../restaurantsearchtab/reviews'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import download from './download.png';
import RatingReview from '../restaurantsearchtab/ratingreview';
import Menu from '../restaurant/menu';
import { graphql, compose, withApollo } from "react-apollo";
import { restaurantprofileQuery } from "../../queries/queries";
class RestaurantPage extends Component{
    constructor(props){
        console.log(props.match.params);
        super(props);
        this.state={
            customer:cookie.load('user'),
            Restaurant:props.location.state.foo,
            Restinfo:[],
            loaded:false

        }


    }
    componentDidMount(){
        console.log(this.state);
    
    this.props.client
      .query({
        query: restaurantprofileQuery,
        variables: {
          restaurantID: this.state.Restaurant.toString(),
        },
      })
      .then((response) => {
        console.log("Status Code : ", response);
        this.setState({
          restinfo: response.data.restaurantProfile,
          loaded:true,
        });
      });
  }
    
    render(){

        var display =null;
        if(this.state.loaded){
           
            display =(
                <Container>
                <Jumbotron fluid>
            <Container>
                <Row>
                <Col md={9}>
                  <Card>
                    <Card.Title> {this.state.restinfo.Name}</Card.Title>
                    <a> {this.state.restinfo.Cusine}</a>
                    <a> {this.state.restinfo.Description}</a>
                    <a>{this.state.restinfo.Location}</a>
                    <a>Hours: {this.state.restinfo.Hours}</a>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Phone Number: {this.state.restinfo.PhoneNo}
                      </ListGroupItem>
                      <ListGroupItem>
                        Email: {this.state.restinfo.ContactEmail}
                      </ListGroupItem>
                    </ListGroup>
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
                    <Nav.Link eventKey="first">Reviews</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Add Review</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Menu and Order Food</Nav.Link>
                    </Nav.Item>
                   
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <Reviews restaurant={this.state.Restaurant}></Reviews>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <RatingReview restaurantemail={this.state.Restaurant}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Menu rest={this.state.Restaurant}/>
                    </Tab.Pane>
                    
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>


            </Container>
            )
        }
        return(<>
        
        {display}
        
        
        
        
        </>)
    }


}

export default compose(
  withApollo,
  graphql(restaurantprofileQuery, { name: "restaurantprofileQuery" })
)(RestaurantPage);