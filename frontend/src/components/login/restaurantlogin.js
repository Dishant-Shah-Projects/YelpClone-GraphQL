import React, {Component} from 'react';
import '../../App.css';

import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import axios from 'axios';
//Define a Login Component
class RestLogin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            usererr:"",
            passerr:""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        console.log(props);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            usererr:"",
            passerr:""
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
         axios.post('http://localhost:3001/restaurantlogin',data)
            .then(response => {
              
              console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                       authFlag : true
                    })
                 
                }
                else if (response.status===201){
                    this.setState({
                        authFlag : true
                     })
                  
                }
                else if (response.status===202){
                    this.setState({
                        authFlag : true
                     })
                  
                }
                else{
                    this.setState({
                        authFlag : true
                     })
                }
        //set the with credentials to true
        
    })
    }
    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('user')){
            return redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Restaurant Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div className="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" placeholder="Username" required/>
                            </div>
                            {this.state.usererr !== "" &&
                            <div className="alert alert-danger">{this.state.usererr}</div>
                        }
                        <br/>
                            <div className="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required/>
                            </div>
                            {this.state.passerr !== "" &&
                            <div className="alert alert-danger">{this.state.passerr}</div>
                        }
                        <br/>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>  
                            <br/> 
                            <div className="form-group">
                            <p><Link to="/restsignup">sign up?</Link></p>
                                </div>               
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

//export Login Component
export default RestLogin;