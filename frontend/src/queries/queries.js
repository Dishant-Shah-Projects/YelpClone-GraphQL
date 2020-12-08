import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  query customers {
    customers {
      FirstName
      LastName
    }
  }
`;
const profileQuery = gql`
  query customerProfile($customerID: String) {
    customerProfile(customerID: $customerID) {
      FirstName
      LastName
      Nickname
      City
      State
      PhoneNo
      Email
      Headline
      Findme
      ThingsILove
      AboutMe
    }
  }
`;
const restaurantprofileQuery = gql`
  query restaurantProfile($restaurantID: String) {
    restaurantProfile(restaurantID: $restaurantID) {
      restaurantID
      Name
      UserName
      Password
      PhoneNo
      ContactEmail
      PickMethod
      Location
      Cusine
      Hours
      Description
    }
  }
`;

const getBooksQuery = gql`
  query {
    books {
      name
      id
    }
  }
`;
const restaurantSearchQuery = gql`
  query restaurantSearch($term: String, $value: String) {
    restaurantSearch(term: $term, value: $value) {
      restaurantID
      Lat
      Long
      Name
    }
  }
`;
const menuGetQuery = gql`
  query($restaurantID: String) {
    restaurantMenu(restaurantID: $restaurantID ) {
      ItemID
      DishName
      Mainingredients
      DishPrice
      Description
      Category
    }
  }
`;
const reviewGetQuery = gql`
  query($restaurantID: String) {
    restaurantReviews(restaurantID: $restaurantID ) {
      DatePosted
      Review
      Rating
      customerID
      customerName
    }
  }
`;
const customerOrderQuery = gql`
  query OrderQuery($customerID: String,$Sorted:String) {
    OrderQuery(customerID: $customerID,Sorted: $Sorted ) {
      restaurantID
      orderID
      customerID
      restaurantName
      OrderType
      OrderStatus
      OrderDateTime
          restaurantID,
    restaurantName
    Items{
      ItemID
      DishName
      DishPrice
      DishQuantity
    }
    }
  }
`;
const restaurantOrderQuery = gql`
  query OrderQuery($restaurantID: String) {
    OrderQuery(restaurantID: $restaurantID ) {
      restaurantID
      orderID
      restaurantName
      customerName
      customerID
      OrderType
      OrderStatus
      OrderDateTime
    Items{
      ItemID
      DishName
      DishPrice
      DishQuantity
    }
    }
  }
`;


export { getAuthorsQuery, getBooksQuery, profileQuery, restaurantSearchQuery ,restaurantprofileQuery,menuGetQuery,reviewGetQuery,customerOrderQuery,restaurantOrderQuery};
