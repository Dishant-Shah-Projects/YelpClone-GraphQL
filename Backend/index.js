if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const { frontendURL } = require('./config');
const { mongoDB } = require('./config');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 30,
  bufferMaxEntries: 0,
  useFindAndModify: false,
};
// single connection
// eslint-disable-next-line no-unused-vars
const options2 = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 1,
  bufferMaxEntries: 0,
  useFindAndModify: false,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log('MongoDB connection Failed', err);
  } else {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
  }
});

const app = express();
// const { auth } = require('./Functionality/passport');

app.use(express.static('public'));
// auth();
app.use(cors({ origin: frontendURL, credentials: true }));
// use express session to maintain session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line func-names
// eslint-disable-next-line prefer-arrow-callback
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', frontendURL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(express.static('public'));
// app.use('/general', commonPart);

// app.use('/restaurant', restaurantRoute);

// app.use('/customer', customerRoute);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
module.exports = app;
app.listen(3001);
