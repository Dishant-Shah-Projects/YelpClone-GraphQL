/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');

const profileUpdate = async (req) => {
  const retval = {};
  try {
    const { customerID } = req;
    console.log(req);
    await Customer.findOneAndUpdate(
      { customerID },
      {
        ...req,
      },
      (err, results) => {
        if (err) {
          retval.Result = 'error';
          return retval;
        }
        retval.Result = 'Customer Updates';
        console.log(retval);
        return retval;
      }
    );
  } catch {
    retval.Result = 'error';
    return retval;
  }
  return retval;
};

const restaurantOrder = async (req) => {
  const retval = {};
  try {
    const eventslist = await order.countDocuments();
    const cust = await Customer.findOne({ customerID: req.customerID });
    const rest = await Restaurant.findOne({ restaurantID: req.restaurantID });

    const orderID = 1;
    // eslint-disable-next-line new-cap
    console.log(req.Items);
    const Items = JSON.parse(req.Items);
    const newevent = new order({
      orderID,
      Items,
      restaurantID: req.restaurantID,
      customerID: req.customerID,
      OrderType: req.OrderType,
      OrderDateTime: Date.now(),
      OrderStatus: 'Order Received',
      customerName: `${cust.FirstName} ${cust.LastName}`,
      restaurantName: rest.Name,
    });
    await newevent.save();
    retval.Result = 'Order Received';
    console.log(retval);
    return retval;
  } catch (error) {
    retval.Result = 'Error';
    console.log(retval);
    return retval;
  }
};
const restaurantRatingAdd = async (req) => {
  try {
    const { restaurantID, Review, Rating, customerID } = req;
    const cust = await Customer.findOne({ customerID });

    const review = {
      DatePosted: Date.now(),
      Review,
      Rating,
      customerID,
      customerName: `${cust.FirstName} ${cust.LastName}`,
    };
    Restaurant.findOneAndUpdate(
      { restaurantID },
      {
        $push: {
          Reviews: review,
        },
      },
      { safe: true, upsert: true, new: true },
    );
    const retval = {};
    retval.Result = 'Added';
    console.log(retval);
    return retval;
  } catch {
    const retval = {};
    retval.Result = 'Error';
    console.log(retval);
    return retval;
  }
};

const getOrders = async (req) => {
  try {
    const { CustomerID, OrderStatus, Sorted, Filtered } = req;
    let eventlist = null;
    if (Sorted && Filtered) {
      eventlist = await order.find({ CustomerID, OrderStatus }).sort({ Date: 'descending' });
    } else if (Sorted) {
      eventlist = await order.find({ CustomerID }).sort({ Date: 'descending' });
    } else if (Filtered) {
      eventlist = await order.find({ CustomerID, OrderStatus }).sort({ Date: 'ascending' });
    } else {
      eventlist = await order.find({ CustomerID }).sort({ Date: 'ascending' });
    }

    if (eventlist) {
      return eventlist;
    }
    const retval = {};
    retval.Result = 'No Orders Found';
    console.log(retval);
    return retval;
  } catch {
    const retval = {};
    retval.Result = 'Error';
    console.log(retval);
    return retval;
  }
};
const restaurantSearch = async (req) => {
  const retval = {};
  try {
    const { term, value } = req;
    let user = null;
    if (term === 'Menu') {
      user = await Restaurant.find({ Menu: { DishName: value } }).select('-Password');
    } else if (term === 'Cusine') {
      user = await Restaurant.find({ Cusine: value }).select('-Password');
    } else if (term === 'Console') {
      user = await Restaurant.find({ Location: value }).select('-Password');
    } else {
      user = await Restaurant.find().select('-Password');
    }

    if (user) {
      return user;
    }
    retval.Result = 'No result Found';
    console.log(retval);
    return retval;
  } catch {
    retval.Result = 'No result Found';
    console.log(retval);
    return retval;
  }
};

module.exports = {
  profileUpdate,
  restaurantOrder,
  restaurantRatingAdd,
  getOrders,
  restaurantSearch,
};
