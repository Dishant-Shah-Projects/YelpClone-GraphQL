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
      }
    );
    retval.Result = 'Customer Profile Updated';
    retval.Status = 200;
    console.log(retval);
    return retval;
  } catch {
    retval.Status = 500;
    retval.Result = 'error';
    return retval;
  }
};

const restaurantOrder = async (req) => {
  const retval = {};
  try {
    const eventslist = await order.countDocuments();
    const cust = await Customer.findOne({ customerID: req.customerID });
    const rest = await Restaurant.findOne({ restaurantID: req.restaurantID });

    const orderID = eventslist + 1;
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
    retval.Status = 200;
    console.log(retval);
    return retval;
  } catch (error) {
    retval.Result = 'Error';
    retval.Status = 200;
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
    console.log(review);
    Restaurant.findOneAndUpdate(
      { restaurantID },
      {
        $push: {
          Reviews: review,
        },
      },
      { safe: true, upsert: true, new: true },
      (err, model) => {
        if (err) {
          console.log(err);
          const retval = {};
          retval.Result = 'Error';
          console.log(retval);
          return retval;
        }
      }
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
    let { CustomerID, Sorted } = req;
    CustomerID = parseInt(CustomerID);
    let eventlist = null;
    console.log(req);
    if (Sorted === 'true') {
      eventlist = await order.find({ CustomerID }).sort({ OrderDateTime: 'descending' });
    } else {
      eventlist = await order.find({ CustomerID }).sort({ OrderDateTime: 'ascending' });
    }

    if (eventlist) {
      // eslint-disable-next-line no-empty

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
