import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userevents from './Userevents';
import Restaurantevents from './RestaurantEvents'



class Events extends Component {
    
    render(){
        //iterate over books to create a table row
        
        //if not logged in go to login page
        let redirectVar = null;
        if(cookie.load('customer')){
            return <Userevents></Userevents>
        }
        else if(cookie.load('restaurant')){
            return <Restaurantevents></Restaurantevents>
        }
        else{
            return  <Redirect to= "/login"/>
        }
        
        
    }
}

//export Home Component
export default Events;  