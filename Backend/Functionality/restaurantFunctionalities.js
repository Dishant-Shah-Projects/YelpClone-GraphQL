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
      }
    );
  } catch {
    retval.Result = 'error';
    return retval;
  }
  return retval;
};
const menuAdd = async (req) => {
  try {
    const { restaurantID, DishName, Mainingredients, Description, DishPrice, Category } = req;
    const rest = await Restaurant.findOne({ restaurantID });
    const ItemID = 1 + rest.Menu.length;
    await Restaurant.findOneAndUpdate(
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
      { safe: true, upsert: true, new: true }
    );
    const retval = {};
    retval.Result = 'Added to Menu';
    retval.Status = 200;
    console.log(retval);
    return retval;
  } catch {
    const retval = {};
    retval.Result = 'Error';
    retval.Status = 500;
    return retval;
  }
};
const getOrders2 = async (req) => {
  try {
    const { restaurantID } = req;
    const output = await order.find({ restaurantID });
    return output;
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
    await order.findOneAndUpdate(
      { orderID },
      {
        OrderStatus,
      }
    );
    const retval = {};
    retval.Result = 'Successfully Updated';
    retval.Status = 200;
    console.log(retval);
    return retval;
  } catch {
    const retval = {};
    retval.Result = 'Error';
    retval.Status = 500;
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
