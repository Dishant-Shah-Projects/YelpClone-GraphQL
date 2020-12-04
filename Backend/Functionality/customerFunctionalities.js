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
      },
    );
  } catch {
    retval.Result = 'error';
    return retval;
  }
  return retval;
};

const restaurantOrder = async (req) => {
  try {
    const eventslist = await order.countDocuments();
    const orderID = 1 + eventslist;
    // eslint-disable-next-line new-cap
    const newevent = new order({
      orderID,
      ...req,
    });
    newevent.save((err, model) => {
      if (err) {
        const retval = {};
        retval.Result = 'Error';
        console.log(retval);
        return retval;
      }
      const retval = {};
      retval.Result = 'Error';
      console.log(retval);
      return retval;
    });
  } catch {
    const retval = {};
    retval.Result = 'Error';
    console.log(retval);
    return retval;
  }
};
const restaurantRatingAdd = async (req) => {
  try {
    const {
      restaurantID, Review, Rating, customerID, customerName,
    } = req;
    const review = {
      DatePosted: Date.now(),
      Review,
      Rating,
      customerID,
      customerName,
    };
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
          const retval = {};
          retval.Result = 'Error';
          console.log(retval);
          return retval;
        }
        const retval = {};
        retval.Result = 'Added';
        console.log(retval);
        return retval;
      },
    );
  } catch {
    const retval = {};
    retval.Result = 'Error';
    console.log(retval);
    return retval;
  }
};

const getOrders = async (req) => {
  try {
    const {
      CustomerID, OrderStatus, Sorted, Filtered,
    } = req;
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
      user = await Restaurant.find({ PickMethod: value }).select('-Password');
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
