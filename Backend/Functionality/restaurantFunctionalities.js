/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const order = require('../models/order');

// update restaurant profile
const profileUpdate2 = async (req) => {
  const retval = {};
  try {
    const { restaurantID } = req;
    await Restaurant.findOneAndUpdate(
      { restaurantID },
      {
        ...req,
      },
      (err, results) => {
        if (err) {
          retval.Result = 'error';
          return retval;
        }
        retval.Result = 'Restaurant Updates';
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
const menuAdd = async (req) => {
  try {
    const {
      restaurantID, DishName, Mainingredients, Description, DishPrice, Category,
    } = req;
    const rest = await Restaurant.findOne({ restaurantID });
    const ItemID = 1 + rest.Menu.length;
    Restaurant.findOneAndUpdate(
      { restaurantID },
      {
        $push: {
          Menu: {
            ItemID,
            DishName,
            Mainingredients,
            DishPrice,
            Description,
            Category,
          },
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
        retval.Result = 'Added to Menu';
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
const getOrders2 = async (req) => {
  try {
    const { restaurantID } = req;
    order.find({ restaurantID }, (err, model) => {
      if (err) {
        const retval = {};
        retval.Result = 'Error';
        console.log(retval);
        return retval;
      }
      return model;
    });
  } catch {
    const retval = {};
    retval.Result = 'Error';
    console.log(retval);
    return retval;
  }
};
// update restaurant profile
const orderUpdate = async (req) => {
  try {
    const { orderID, OrderStatus } = req;
    order.findOneAndUpdate(
      { orderID },
      {
        OrderStatus,
      },
      (err, results) => {
        if (err) {
          const retval = {};
          retval.Result = 'Error';
          console.log(retval);
          return retval;
        }
        const retval = {};
        retval.Result = 'Successfully Updated';
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

module.exports = {
  profileUpdate2,
  menuAdd,
  getOrders2,
  orderUpdate,
};
