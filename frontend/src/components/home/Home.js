import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';

import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerHome from './CustomerHome';
import RestaurantHome from './RestaurantHome'
import {Redirect} from 'react-router';


class Home extends Component {
    
    render(){
        //iterate over books to create a table row
        
        //if not logged in go to login page
        let redirectVar = null;
        if(cookie.load('customer')){
            return <CustomerHome></CustomerHome>
        }
        else if(cookie.load('restaurant')){
            return <RestaurantHome></RestaurantHome>
        }
        else{
            return  <Redirect to= "/login"/>
        }
        
        
    }
}

//export Home Component
export default Home;  