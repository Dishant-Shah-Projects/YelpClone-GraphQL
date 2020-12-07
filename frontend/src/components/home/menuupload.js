import React, {Component} from 'react';
import '../../App.css';

import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Form,Row,Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql, compose, withApollo } from "react-apollo";
import { menuUploadMutation } from "../../mutations/restaurantmutations";

class AddMenu extends Component{
    constructor(props){
        super(props);
        this.state = {  
            RestaurantEmail :  cookie.load('user'),
            ItemName: "",
            ItemCost:"",
            ItemDesc:"",
            ItemCat:"",
            Itemimg:null,
            MainIngredients:"",
            Redvar:false
        }
        this.ItemNameChangeHandler = this.ItemNameChangeHandler.bind(this);
        this.ItemCostChangeHandler = this.ItemCostChangeHandler.bind(this);
        this.ItemDescChangeHandler = this.ItemDescChangeHandler.bind(this);
        this.ItemCatChangeHandler = this.ItemCatChangeHandler.bind(this);
        this.MainIngredientsChangeHandler = this.MainIngredientsChangeHandler.bind(this);
        this.submit = this. submit.bind(this);

    }
    ItemNameChangeHandler = (e) => {
        this.setState({
            ItemName : e.target.value
        })
    }
    ItemCostChangeHandler = (e) => {
        this.setState({
            ItemCost : e.target.value
        })
    }
    ItemDescChangeHandler = (e) => {
        this.setState({
            ItemDesc : e.target.value
        })
    }
    ItemCatChangeHandler = (e) => {
        this.setState({
            ItemCat : e.target.value
        })
    }
    MainIngredientsChangeHandler = (e) => {
        this.setState({
            MainIngredients : e.target.value
        })
    }
    
    componentWillMount(){
        this.setState({
            Redvar : false,
            EventName:"",
            EventDate:""    
        })
    }

    submit = (e) => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        
        
        
        

    //set the with credentials to true
    console.log(this.state);
    this.props
      .menuUploadMutation({
        variables: {
      restaurantID: this.state.RestaurantEmail,
      DishName: this.state.ItemName,
      Mainingredients: this.state.MainIngredients,
      DishPrice: this.state.ItemCost,
      Description: this.state.ItemDesc,
      Category: this.state.ItemCat,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          authFlag: true,
        });
      }); 
    }
    render(){




        return(
            <Form>
                    <Form.Label>Item Name</Form.Label>
                   <Form.Control type="text" placeholder="Name" onChange={this.ItemNameChangeHandler}/>
                   <Form.Label>Item Cost</Form.Label>
                   <Form.Control type="number" placeholder="Nickname"onChange={this.ItemCostChangeHandler} />
                   <Form.Label>Item Desccription </Form.Label>
                   <Form.Control type="text" placeholder="" onChange={this.ItemDescChangeHandler}/>
                   <Form.Label>Item Category</Form.Label>
                   <Form.Control type="text" placeholder="Normal text"onChange={this.ItemCatChangeHandler}  />
                   <Form.Label>Main Ingredients</Form.Label>
                   <Form.Control type="text" placeholder="Normal text"onChange={this.MainIngredientsChangeHandler} />

                   <Button variant="primary" type="submit"  onClick={this.submit} >
                        Submit
                    </Button>
               </Form>
        )
    }



}
export default compose(
  withApollo,
  graphql(menuUploadMutation, { name: "menuUploadMutation" })
)(AddMenu);