import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import download from './download.png'
import {Container,Card,Row,Col,ListGroup,ListGroupItem,Button,Jumbotron,Image,Nav,Tab} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileUpdate from './customeraboutupdate'
import ProfilePicUpload from './profilepicupload'
import ProfileUpdate2 from './ProfileUpdate'
class CustomerHome extends Component {
    constructor(ownprops){
        super(ownprops);
        this.state = {  
            user :  cookie.load('user'),
            userinfo:"",
            userimage:null,
            findmein:"",
            thingsilove:"",
            yelpingsince:""

        }
        
    }
    componentDidMount(){
        console.log(this.state.user)
        const data = {
            username : this.state.user};
        axios.post('http://localhost:3001/customerprofile',data)
        
                .then((response) => {
                //update the state with the response data
                console.log(response.data);
                this.setState({
                    userinfo : response.data
                });
            });
        axios.post('http://localhost:3001/profilepic',data)
        
            .then((response) => {
            //update the state with the response data
            
            if(response.data){
            this.setState({
                userimage : "http://localhost:3001/images/"+response.data[0].profilepicture
            });
        }
        else{
            this.setState({
                userimage : download
            });
        }
        });
        const data2 = {
            
            
            userEmail: this.state.user,
            
        }
        console.log(data2);
        axios.post('http://localhost:3001/about',data2)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        findmein : response.data.findmein,
                        thingsilove : response.data.thingsilove,
                        yelpingsince:response.data.yelpingsince,
                    })
                }
                else{
                    this.setState({
                        err:"Error with inputting information"
                    })
                }
            });
    }
    render(){
        //iterate over books to create a table row
        
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('user')){
            console.log(cookie.load('user'))
            return redirectVar = <Redirect to= "/userlogin"/>
        }
        console.log(cookie.load('user'))
        var _id='test@test.com2'
        var _id2='test@test.com'
        return(
            <React.Fragment>
            <div>
                {redirectVar}
            </div>
            <Container>
            <Jumbotron fluid>
            <Container>
                <Row>
                    <Col  md={3}>
                    <Image src={this.state.userimage} style={{width: 150, height: 150}} />
                    </Col>
                    <Col md={9} >   
                    <Card >
                        
                        <Card.Title>{this.state.userinfo.User_name}</Card.Title>
                        <a>Nickname:{this.state.userinfo.nickname}</a>
                        <a>Location:{this.state.userinfo.city}</a><a>{this.state.userinfo.state}, {this.state.userinfo.country}</a>
                       
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Phone Number: {this.state.userinfo.Conphone}</ListGroupItem>
                            <ListGroupItem>Email: {this.state.userinfo.Conemail}</ListGroupItem>
                            
                        </ListGroup>
                        <a style={{fontStyle: 'italic'}}>"{this.state.userinfo.Headline}"</a>
                        
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
                    <Nav.Item>
                    <Nav.Link eventKey="fourth">Upload Profile Picture</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <h1>About me</h1>
                    <h3>Find Me in : {this.state.findmein}</h3>
                    <h3>Things I Love : {this.state.thingsilove}</h3>
                    <h3>Yelping Since : {this.state.yelpingsince}</h3>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <ProfileUpdate2></ProfileUpdate2>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                   
                    <ProfileUpdate></ProfileUpdate>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <ProfilePicUpload/>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
            
            </Container>
            </React.Fragment>
    
        )
    }
}

//export Home Component
export default CustomerHome;  