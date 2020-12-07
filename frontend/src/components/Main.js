import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './login/userlogin';
import Navbar2 from './navbar/UserNavbar';
import Home from './home/Home';
import RestaurantMaps from './restaurantsearchtab/Restaurants';

// import Delete from './Delete/Delete';
// import Create from './Create/Create';
import Signup from './signup/usersignup';
import RestaurantPage from './profile/RestaurantPage';
import Userpage from './profile/UserPage';
import Menu from './restaurant/menu';
 

import OrdersPage from './orders/OrdersPage'
import cookie from 'react-cookies';
import Navbar3 from './navbar/RestaurantNavbar';
import Restlogin from './login/restaurantlogin';
//Create a Main Component
class Main extends Component {
    constructor(props){
        super(props);  
        
    }

    render(){

        let display1=null;
        let display2=null;
        if (cookie.load("customer")){
            display1 =(
                <React.Fragment>
            <Navbar2/>
            
            </React.Fragment>

            )
            display2=(
                <React.Fragment>
                <Route path="/userlogin" component={Login}/>
                
                <Route path='/orders' component={OrdersPage}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home"  component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/user" exact component={Userpage}/>
                <Route path="/restaurant" exact component={RestaurantPage}/>
                
                <Route path="/restaurantsearch" exact component={RestaurantMaps}/>
                </React.Fragment>
            )
        }
        else{
            display1 =(
                <React.Fragment>
            <Navbar3/>
            
            </React.Fragment>

            )
        }
        return(
            <React.Fragment>
            <Navbar2></Navbar2>
            <div>
                {/*Render Different Component based on Route*/}
                 
                <Route path="/userlogin" component={Login}/>
                
                <Route path='/orders' component={OrdersPage}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home"  component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/user" exact component={Userpage}/>
                <Route path="/restaurant" exact component={RestaurantPage}/>
                <Route path="/menu" exact component={Menu}/>
                
                <Route path="/restaurantsearch" component={RestaurantMaps}/>
           
            </div>
            </React.Fragment>
        )
    }
}
//Export The Main Component
export default Main;