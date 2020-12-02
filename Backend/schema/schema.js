/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const graphql = require('graphql');
const { Customer } = require('../models/Customer');
const { restaurant } = require('../models/Restaurant');
const { order } = require('../models/order');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// dummy data
const books = [
  {
    name: 'Name of the Wind',
    genre: 'Fantasy',
    id: '1',
    authorId: '1',
  },
  {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: '2',
    authorId: '2',
  },
  {
    name: 'The Hero of Ages',
    genre: 'Fantasy',
    id: '4',
    authorId: '2',
  },
  {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: '3',
    authorId: '3',
  },
  {
    name: 'The Colour of Magic',
    genre: 'Fantasy',
    id: '5',
    authorId: '3',
  },
  {
    name: 'The Light Fantastic',
    genre: 'Fantasy',
    id: '6',
    authorId: '3',
  },
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    restaurantID: { type: GraphQLInt },
    Name: { type: GraphQLString },
    UserName: { type: GraphQLString },
    Password: { type: GraphQLString },
    PhoneNo: { type: GraphQLInt },
    ContactEmail: { type: GraphQLString },
    PickMethod: { type: GraphQLString },
    Location: { type: GraphQLString },
    Lat: { type: GraphQLInt },
    Long: { type: GraphQLInt },
    Cusine: { type: GraphQLString },
    Hours: { type: GraphQLString },
    Description: { type: GraphQLString },
    Menu: [
      {
        ItemID: { type: GraphQLInt },
        DishName: { type: GraphQLString },
        Mainingredients: { type: GraphQLString },
        DishPrice: { type: GraphQLInt },
        Description: { type: GraphQLString },
        Category: { type: GraphQLString },
      },
    ],
    Reviews: [
      {
        DatePosted: { type: GraphQLString },
        Review: { type: GraphQLString },
        Rating: { type: GraphQLInt },
        customerID: { type: GraphQLString },
        customerName: { type: GraphQLString },
      },
    ],
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    book: {
      type: CustomerType,
      args: { customerID: { type: GraphQLString } },
      resolve(parent, args) {
        return 'apple';
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: CustomerType,
      args: {
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        UserName: { type: GraphQLString },
        Password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const ID = 1;
        const author = new Customer({
          First: args.name,
          UserName: args.UserName,
          Password: args.Password,
          FirstName: args.FirstName,
          LastName: args.LastName,
          customerID: ID,
        });
        author.save((e, _data) => {
          if (e) {
            console.log(e);
          }
        });
        console.log('Author', author);
        return author;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
