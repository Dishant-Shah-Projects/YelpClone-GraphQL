/* eslint-disable new-cap */

/* eslint-disable no-use-before-define */
const graphql = require('graphql');
const Customer = require('../models/Customer');
const restaurant = require('../models/Restaurant');

const { userSignup, userLogin } = require('../Functionality/generalFunctionalities');
const {
  profileUpdate,
  restaurantOrder,
  restaurantRatingAdd,
  getOrders,
  restaurantSearch,
} = require('../Functionality/customerFunctionalities');
const {
  profileUpdate2,
  menuAdd,
  getOrders2,
  orderUpdate,
} = require('../Functionality/restaurantFunctionalities');

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  // GraphQLID,
  GraphQLInt,
  GraphQLList,
  // GraphQLNonNull,
  GraphQLFloat,
} = graphql;

const ResultType = new GraphQLObjectType({
  name: 'Result',
  fields: () => ({
    Result: { type: GraphQLString },
    Token: { type: GraphQLString },
    Token2: { type: GraphQLString },
    Status: { type: GraphQLInt },
  }),
});
const orderitemtype = new GraphQLObjectType({
  name: 'orderitem',
  fields: () => ({
    ItemID: { type: GraphQLInt },
    DishName: { type: GraphQLString },
    DishPrice: { type: GraphQLInt },
    DishQuantity: { type: GraphQLInt },
  }),
});

const orderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    restaurantID: { type: GraphQLInt },
    customerID: { type: GraphQLInt },
    orderID: { type: GraphQLInt },
    customerName: { type: GraphQLString },
    restaurantName: { type: GraphQLString },
    OrderType: { type: GraphQLString },
    OrderStatus: { type: GraphQLString },
    OrderDateTime: { type: GraphQLString },
    Items: { type: new GraphQLList(orderitemtype) },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    Result: { type: GraphQLString },
    Role: { type: GraphQLString },
    customerID: { type: GraphQLInt },
    UserName: { type: GraphQLString },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Email: { type: GraphQLString },
    Password: { type: GraphQLString },
    PhoneNo: { type: GraphQLInt },
    AboutMe: { type: GraphQLString },
    ThingsILove: { type: GraphQLString },
    Findme: { type: GraphQLString },
    DOB: { type: GraphQLString },
    City: { type: GraphQLString },
    State: { type: GraphQLString },
    Country: { type: GraphQLString },
    Nickname: { type: GraphQLString },
    Headline: { type: GraphQLString },
  }),
});
const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    ItemID: { type: GraphQLInt },
    DishName: { type: GraphQLString },
    Mainingredients: { type: GraphQLString },
    DishPrice: { type: GraphQLInt },
    Description: { type: GraphQLString },
    Category: { type: GraphQLString },
  }),
});
const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    DatePosted: { type: GraphQLString },
    Review: { type: GraphQLString },
    Rating: { type: GraphQLInt },
    customerID: { type: GraphQLString },
    customerName: { type: GraphQLString },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    Role: { type: GraphQLString },
    restaurantID: { type: GraphQLInt },
    Name: { type: GraphQLString },
    UserName: { type: GraphQLString },
    Password: { type: GraphQLString },
    PhoneNo: { type: GraphQLInt },
    ContactEmail: { type: GraphQLString },
    PickMethod: { type: GraphQLString },
    Location: { type: GraphQLString },
    Lat: { type: GraphQLFloat },
    Long: { type: GraphQLFloat },
    Cusine: { type: GraphQLString },
    Hours: { type: GraphQLString },
    Description: { type: GraphQLString },
    Menu: {
      type: GraphQLList(MenuType),
    },
    Reviews: {
      type: GraphQLList(ReviewType),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    customerProfile: {
      type: CustomerType,
      args: { customerID: { type: GraphQLString } },
      async resolve(parent, args) {
        const customer = await Customer.findOne({ customerID: args.customerID });
        console.log(customer);
        return customer;
      },
    },
    customers: {
      type: CustomerType,
      args: { customerID: { type: GraphQLString } },
      async resolve(parent, args) {
        const customer = await Customer.findOne();
        console.log(customer);
        return customer;
      },
    },
    restaurantProfile: {
      type: RestaurantType,
      args: { restaurantID: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log('Party');
        console.log(args);
        const rest = await restaurant.findOne({ restaurantID: args.restaurantID });
        console.log(rest);
        return rest;
      },
    },
    menuget: {
      type: GraphQLList(MenuType),
      args: { restaurantID: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log('Party');
        console.log(args);
        const rest = await restaurant.findOne({ restaurantID: args.restaurantID });
        console.log(rest);
        return rest.Menu;
      },
    },
    restaurantReviews: {
      type: GraphQLList(ReviewType),
      args: { restaurantID: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log('Party');
        console.log(args);
        const rest = await restaurant.findOne({ restaurantID: args.restaurantID });
        console.log(rest);
        return rest.Reviews;
      },
    },
    restaurantMenu: {
      type: GraphQLList(MenuType),
      args: { restaurantID: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log('Party');
        console.log(args);
        const rest = await restaurant.findOne({ restaurantID: args.restaurantID });
        console.log(rest);
        return rest.Menu;
      },
    },
    OrderQuery: {
      type: GraphQLList(orderType),
      args: {
        customerID: { type: GraphQLString },
        restaurantID: { type: GraphQLString },
        Sorted: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let customer = null;
        if (args.customerID) {
          customer = await getOrders(args);
        } else {
          customer = await getOrders2(args);
        }
        return customer;
      },
    },
    restaurantSearch: {
      type: GraphQLList(RestaurantType),
      args: {
        term: { type: GraphQLString },
        value: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        const rest = await restaurantSearch(args);
        console.log(rest);
        return rest;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: ResultType,
      args: {
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        UserName: { type: GraphQLString },
        Password: { type: GraphQLString },
        Location: { type: GraphQLString },
        Role: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const value = await userSignup(args);
        console.log(value);
        return value;
      },
    },
    login: {
      type: ResultType,
      args: {
        UserName: { type: GraphQLString },
        Password: { type: GraphQLString },
        Role: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const value = await userLogin(args);
        console.log(value);
        return value;
      },
    },
    restaurantOrder: {
      type: ResultType,
      args: {
        restaurantID: { type: GraphQLString },
        customerID: { type: GraphQLString },
        OrderType: { type: GraphQLString },
        Items: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const value = await restaurantOrder(args);
        console.log(value);
        return value;
      },
    },
    restaurantRating: {
      type: ResultType,
      args: {
        Review: { type: GraphQLString },
        Rating: { type: GraphQLString },
        customerID: { type: GraphQLString },
        restaurantID: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        const value = await restaurantRatingAdd(args);
        console.log(value);
        return value;
      },
    },
    menuAddItem: {
      type: ResultType,
      args: {
        restaurantID: { type: GraphQLString },
        DishName: { type: GraphQLString },
        Mainingredients: { type: GraphQLString },
        DishPrice: { type: GraphQLString },
        Description: { type: GraphQLString },
        Category: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        const value = await menuAdd(args);
        console.log('PARTY', value);
        return value;
      },
    },
    orderUpdatestat: {
      type: ResultType,
      args: {
        orderID: { type: GraphQLString },
        OrderStatus: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const value = await orderUpdate(args);
        console.log(value);
        return value;
      },
    },
    restaurantprofileupdate: {
      type: ResultType,
      args: {
        restaurantID: { type: GraphQLString },
        Name: { type: GraphQLString },
        UserName: { type: GraphQLString },
        Password: { type: GraphQLString },
        PhoneNo: { type: GraphQLString },
        ContactEmail: { type: GraphQLString },
        PickMethod: { type: GraphQLString },
        Location: { type: GraphQLString },
        Cusine: { type: GraphQLString },
        Hours: { type: GraphQLString },
        Description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const value = await profileUpdate2(args);
        console.log(value);
        return value;
      },
    },
    customerprofileupdate: {
      type: ResultType,
      args: {
        customerID: { type: GraphQLString },
        UserName: { type: GraphQLString },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Password: { type: GraphQLString },
        PhoneNo: { type: GraphQLInt },
        AboutMe: { type: GraphQLString },
        ThingsILove: { type: GraphQLString },
        Findme: { type: GraphQLString },
        DOB: { type: GraphQLString },
        City: { type: GraphQLString },
        State: { type: GraphQLString },
        Country: { type: GraphQLString },
        Nickname: { type: GraphQLString },
        Headline: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // eslint-disable-next-line no-return-await
        const value = await profileUpdate(args);
        console.log(value);
        return value;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
