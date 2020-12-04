/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { secret } = require('../config');
const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');

// Fucntion to check if the emailID is already in use

const userSignup = async (req) => {
  const retval = {};
  try {
    const {
      FirstName, UserName, Password, Role,
    } = req;
    if (Role === 'Restaurant') {
      let Lat = null;
      let Long = null;
      const data = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: req.Location,
          key: 'AIzaSyBej0Pq1ieVvLjN9gq-ic0_GL81LytLEH4',
        },
      });
      Lat = data.data.results[0].geometry.location.lat;
      Long = data.data.results[0].geometry.location.lng;
      const restaurantID = await Restaurant.findOne().sort('-restaurantID');
      const newID = 1;
      const hashedPassword = await bcrypt.hash(Password, 10);
      const restaurant = new Restaurant({
        restaurantID: newID,
        UserName: UserName,
        Name: FirstName,
        Password: hashedPassword,
        Location: req.Location,
        Lat,
        Long,
      });
      restaurant.save();
      retval.Result = 'RestaurantAdded';
      return retval;
    }
    const customer = await Customer.findOne().sort('-customerID');
    const newID = customer.customerID + 1;
    console.log(customer);
    const hashedPassword = await bcrypt.hash(Password, 10);
    const custom = new Customer({
      customerID: newID,
      UserName: UserName,
      FirstName: FirstName,
      LastName: req.LastName,
      Password: hashedPassword,
    });
    custom.save();
    retval.Result = 'Customer Added';
    return retval;
  } catch (error) {
    console.log(error);
    retval.Result = 'Error';
    return retval;
  }
};
const userLogin = async (req) => {
  const retval = {};
  try {
    const { UserName, Password, Role } = req;
    console.log(req.body);
    if (Role === 'Restaurant') {
      const user = await Restaurant.findOne({ UserName });
      console.log(user);
      if (user && (await bcrypt.compare(Password, user.Password))) {
        retval.Result = 'Customer Added';
        retval.Token = user.restaurantID;
        return retval;
      } else if (user) {
        retval.Result = 'Incorrect Password';
        return retval;
      } else {
        retval.Result = 'Incorect Credentials';
        return retval;
      }
    } else {
      const user = await Customer.findOne({ UserName });
      if (user && (await bcrypt.compare(Password, user.Password))) {
        retval.Result = 'Customer Added';
        retval.Token = user.customerID;
        return retval;
      } else if (user) {
        retval.Result = 'Incorrecct Password';
        return retval;
      } else {
        retval.Result = 'Incorrecct Credentials';
        return retval;
      }
    }
  } catch {
    retval.Result = 'Error';
    return retval;
  }
};
// To logout the user
const userLogout = async (req, res) => {
  req.logout();
  res.status(200).end('Logged out');
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
};
