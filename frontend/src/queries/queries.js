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

export { getAuthorsQuery, getBooksQuery, profileQuery, restaurantSearchQuery ,restaurantprofileQuery};
